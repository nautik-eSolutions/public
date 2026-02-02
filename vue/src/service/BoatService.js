import {Boat} from "@/model/Boat.js";

export class BoatService {
    static async getBoats(userId) {
        const url = "http://localhost:8085/api/users/"+userId+"/boats";
        const response = await fetch(url);
        const json = await response.json();
        const boats = [];
        console.log(json);
        json.forEach((item) => {
            boats.push(Boat.fromJson(item));
        })
        return boats;
    }

}