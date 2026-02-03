export class Boat {
    constructor(name, registerNumber, length, beam, draft) {
        this.name = name;
        this.registerNumber = registerNumber;
        this.length = length;
        this.beam = beam;
        this.draft = draft;
    }

    static fromJson(json) {
        return new Boat(
            json.name,
            json.registry_number,
            json.length,
            json.beam,
            json.draft

        );
    }
}