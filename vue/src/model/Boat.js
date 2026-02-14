export class Boat {
    constructor(name, registerNumber, length, beam, draft, id) {
        this.name = name;
        this.registerNumber = registerNumber;
        this.length = length;
        this.beam = beam;
        this.draft = draft;
        this.id =id
    }

    static fromJson(json) {
        return new Boat(
            json.name,
            json.registry_number,
            json.length,
            json.beam,
            json.draft,
            json.id
        );
    }
}