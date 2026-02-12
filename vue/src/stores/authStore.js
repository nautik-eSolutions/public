import { defineStore } from 'pinia'
import User from '@/model/User.js'
import { loginUserLaravel, loginUserSpring } from '@/service/AuthService.js'
import router from '@/router/index.js'

export const useAuthStore  =  defineStore('authStore', {

  state: () => {
    return {
      User: User,
      token: '',
      springToken:'',
      isAuthenticated: false,
    }
    },

  actions: {
    async loginUser(email, password) {
      const respLaravel = await loginUserLaravel(email, password)

        if (respLaravel.status === 200 ) {
          const respSpring = await loginUserSpring(respLaravel.data.user.userName, password)
          this.User =  new User(respLaravel.data.user.userName, respLaravel.data.user.email)
        this.token =  respLaravel.data.token
        this.springToken =respSpring.data.token
        this.isAuthenticated = true

      }

     await router.push("/")
    },
    setAuthenticated(User,token){
      this.User = User
      this.token = token
      this.isAuthenticated = true

    }
    ,
    async logout(){
      this.User = null
      this.token = ''
      this.isAuthenticated = false

      await router.push("/")
    }

  },
  persist:true
})
