import { defineStore } from 'pinia'
import User from '@/model/User.js'
import { loginUser } from '@/service/AuthService.js'
import router from '@/router/index.js'

export default defineStore('authStore', {

  state: () => {
    return {
      User: User,
      token: '',
      isAuthenticated: false,
    }
    },

  actions: {
    async loginUser(email, password) {
      const resp = await loginUser(email, password)
      if (resp.status === 200) {
        this.User =  new User(resp.data.user.userName, resp.data.user.email)
        this.token =  resp.data.token
      }
      this.isAuthenticated =  true;

     await  router.push("/")
    }

  },
})
