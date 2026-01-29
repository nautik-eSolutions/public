export class Boat {
    constructor(name, registerNumber, length, bream, draft) {
        this.name = name;
        this.registerNumber = registerNumber;
        this.length = length;
        this.bream = bream;
        this.draft = draft;
    }

    static fromJson(json) {
        return new Boat(
            json.name,
            json.registry_number,
            json.length,
            json.bream,
            json.draft

        );
    }
}