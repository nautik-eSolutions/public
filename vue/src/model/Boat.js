export class Boat {
    constructor(name, registerNumber, length, beam, draft, id, user_id) {
        this.name = name;
        this.registerNumber = registerNumber;
        this.length = length;
        this.beam = beam;
        this.draft = draft;
        this.id =id
        this.user_id = user_id;
    }

    static fromJson(json) {
        return new Boat(
            json.name,
            json.registry_number,
            json.length,
            json.beam,
            json.draft,
            json.id,
            json.user_id
        );
    }
}