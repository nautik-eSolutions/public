import {defineStore} from 'pinia'
import {addNewUser} from '@/service/UserService.js'



export default defineStore('userStore',{
  state: ()=>{

  },
  actions:{
    createUser(email, password){

    }
  }
})