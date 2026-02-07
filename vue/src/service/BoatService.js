import {Boat} from "@/model/Boat.js";
import axiosInstance from '@/plugins/axios.js'

export async function getBoats(){
  const response = await axiosInstance("boats")
}