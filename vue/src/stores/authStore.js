import { defineStore } from 'pinia'
import User from '@/model/User.js'
import { loginLaravelSpringToken, loginOAuth, loginUserLaravel, loginUserSpring } from '@/service/AuthService.js'
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
      //const respLaravel = await loginUserLaravel(email, password)


          const respSpring = await loginUserSpring(email, password)
          this.User =  new User(respSpring.data.userName, respSpring.data.email)
          console.log(respSpring);
        this.springToken =respSpring.data.token.token
        this.isAuthenticated = true


     await router.push("/")
    },

    async oAuthLogin(token){
      const resp = await loginOAuth(token)
      if (resp.status !== 200){

      }
      console.log(resp.data)
      this.springToken = resp.data.token
      const respLaravel = await loginLaravelSpringToken(resp.data.token)

      this.setAuthenticated(respLaravel.data.user , respLaravel.data.token)

      await router.push('/')
    },
    setAuthenticated(User,token){
      this.User = User
      this.springToken = token
      this.isAuthenticated = true

    }
    ,
    async logout(){
      this.User = null
      this.token = ''
      this.springToken=''
      this.isAuthenticated = false

      await router.push("/")
    }

  },
  persist:true
})
