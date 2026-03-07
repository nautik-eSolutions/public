import fs from "node:fs/promises";
import path from "node:path";

//to generate
// npm run generate:locales -- --langs=es,ca,fr

const API_BASE = process.env.TRANSLATE_API_BASE || "https://theteacher.codiblau.com";
const OUT_DIR = process.env.LOCALES_DIR || path.resolve("src/locales");
const SOURCE_LOCALE = process.env.SOURCE_LOCALE || "es";
const SOURCE_FILE = path.join(OUT_DIR, `${SOURCE_LOCALE}.json`);

const CONCURRENCY = Number(process.env.TRANSLATE_CONCURRENCY || 6);

const DEFAULT_LANGS = (process.env.TARGET_LANGS || "en,ca,fr,de,it,pt,ja").split(",").map(s => s.trim()).filter(Boolean);

function flattenObject(obj, prefix = "", out = {}) {
    for (const [key, val] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (val && typeof val === "object" && !Array.isArray(val)) {
            flattenObject(val, newKey, out);
        } else {
            out[newKey] = val;
        }
    }
    return out;
}

function unflattenObject(flat) {
    const result = {};
    for (const [compoundKey, value] of Object.entries(flat)) {
        const parts = compoundKey.split(".");
        let cur = result;
        for (let i = 0; i < parts.length; i++) {
            const p = parts[i];
            if (i === parts.length - 1) cur[p] = value;
            else cur = (cur[p] ??= {});
        }
    }
    return result;
}

function protectPlaceholders(text) {
    const vars = [];
    const protectedText = text.replace(/\{[^}]+\}/g, (m) => {
        const token = `__VAR_${vars.length}__`;
        vars.push(m);
        return token;
    });
    return { protectedText, vars };
}

function restorePlaceholders(text, vars) {
    let out = text;
    vars.forEach((v, i) => {
        out = out.replaceAll(`__VAR_${i}__`, v);
    });
    return out;
}

function normalizeApiString(data) {

    if (typeof data !== "string") return String(data);
    const trimmed = data.trim();
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
        try { return JSON.parse(trimmed); } catch { }
    }
    return trimmed;
}

function decodeHtmlEntities(str) {
    if (typeof str !== "string") return str;

    const named = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&apos;": "'",
        "&#39;": "'",
    };

    let out = str;

    out = out.replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(parseInt(num, 10)));
    out = out.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));

    out = out.replace(/&(amp|lt|gt|quot|apos);/g, (m) => named[m] ?? m);

    out = out.replaceAll("&#39;", "'");

    return out;
}

async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} - ${url}`);
    return res.json();
}

async function translateText(languageFrom, languageTo, text) {
    const { protectedText, vars } = protectPlaceholders(text);

    const res = await fetch(`${API_BASE}/public/google/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ languageFrom, languageTo, text: protectedText }),
    });

    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`Translate failed ${res.status} ${res.statusText}: ${body}`);
    }

    const raw = await res.text();
    const translated = normalizeApiString(raw);

    return decodeHtmlEntities(restorePlaceholders(translated, vars));
}

async function getLanguagesFromApi() {
    return fetchJSON(`${API_BASE}/public/google/translate/languages`);
}

async function fileExists(p) {
    try { await fs.access(p); return true; } catch { return false; }
}

function parseArgs() {
    const args = process.argv.slice(2);
    const opts = { langs: null, all: false, force: false };
    for (const a of args) {
        if (a.startsWith("--langs=")) opts.langs = a.replace("--langs=", "").split(",").map(s => s.trim()).filter(Boolean);
        if (a === "--all") opts.all = true;
        if (a === "--force") opts.force = true;
    }
    return opts;
}

async function main() {
    const opts = parseArgs();

    const sourceRaw = await fs.readFile(SOURCE_FILE, "utf-8");
    const source = JSON.parse(sourceRaw);
    const flat = flattenObject(source);

    let targetLangs = opts.langs || DEFAULT_LANGS;

    if (opts.all) {
        const langs = await getLanguagesFromApi();
        const codes = langs
            .map(l => l.language ?? l.code ?? l.id)
            .filter(Boolean)
            .map(String);

        targetLangs = [...new Set(codes)].filter(c => c !== SOURCE_LOCALE);
    }

    if (!targetLangs.length) {
        console.log("No hay idiomas objetivo. Usa --langs=es,ca o --all");
        process.exit(0);
    }

    await fs.mkdir(OUT_DIR, { recursive: true });

    console.log(`API_BASE: ${API_BASE}`);
    console.log(`SOURCE: ${SOURCE_FILE}`);
    console.log(`OUT_DIR: ${OUT_DIR}`);
    console.log(`TARGETS: ${targetLangs.join(", ")}`);
    console.log(`CONCURRENCY: ${CONCURRENCY}`);

    for (const lang of targetLangs) {
        const outFile = path.join(OUT_DIR, `${lang}.json`);

        if (!opts.force && await fileExists(outFile)) {
            console.log(`- ${lang}: existe (${outFile}) -> saltando (usa --force para sobreescribir)`);
            continue;
        }

        console.log(`\nGenerando ${lang}...`);

        const entries = Object.entries(flat);
        const resultFlat = {};
        let idx = 0;

        async function worker() {
            while (idx < entries.length) {
                const current = idx++;
                const [key, value] = entries[current];

                if (typeof value !== "string") {
                    resultFlat[key] = value;
                    continue;
                }

                const v = value.trim();
                if (!v) {
                    resultFlat[key] = value;
                    continue;
                }

                try {
                    resultFlat[key] = await translateText(SOURCE_LOCALE, lang, value);
                } catch (e) {
                    console.error(`  ! Error traduciendo [${lang}] ${key}:`, e.message);
                    resultFlat[key] = value;
                }
            }
        }

        await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

        const nested = unflattenObject(resultFlat);
        await fs.writeFile(outFile, JSON.stringify(nested, null, 2), "utf-8");
        console.log(`✓ Guardado: ${outFile}`);
    }

    console.log("\nListo.");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});