import { defineStore } from 'pinia'
import User from '@/model/User.js'
import { loginUser } from '@/service/AuthService.js'

export default defineStore('authStore', {

  state: () => ({
    User: User,
    token:'',
    isAuthenticated:false
  }),

  actions: {
    async loginUser(email, password) {
      const res = await loginUser(email, password)
      if (res.status === 200) {

      }
    },
  },
})
