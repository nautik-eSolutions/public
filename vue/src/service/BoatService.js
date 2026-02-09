import {Boat} from "@/model/Boat.js";
import axiosInstance from '@/plugins/axios.js'

export async function getBoats(){
  const response = await axiosInstance.get("boats")
      .then(resp=>resp);

  return response
}

export async function createBoat(name , registry_number, length, beam, draft, boat_type){
  const response = await axiosInstance.post('boats',{
    "name":name,
    "registry_number":registry_number,
    "length":length,
    "beam":beam,
    "draft":draft,
    "boat_type":boat_type
  });

  return response
}