import {defineStore} from 'pinia'
import { registerUser } from '@/service/UserService.js'
import User from '@/model/User.js'
import router from '@/router/index.js'



export const useUserStore =  defineStore('userStore',{
  state:()=>{
    return{
      User:User
    }
  },
  actions:{
    async register(password){
      if (!User.email&&!User.userName){
        await router.push("/register/email-username")
      }
      const resp = await registerUser(this.User,password)


    }
    ,
    createUser(email,userName){
      this.User = new User(userName,email);
    }
  },

})