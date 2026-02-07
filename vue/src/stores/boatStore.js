import { defineStore } from 'pinia'
import { Boat } from '@/model/Boat.js'


export default defineStore('boatStore',{
  state: ()=>{
    return{
      Boat: Boat
    }
  },
  actions: {

    getBoat(){

    },

    saveBoat(){

    }


  }
})