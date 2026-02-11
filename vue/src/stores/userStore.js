import { defineStore } from 'pinia'
import User from '@/model/User.js'
import router from '@/router/index.js'
import { registerPerson, registerUser } from '@/service/UserService.js'
import { auth } from '@/main.js'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      User: User,
    }
  },
  actions: {
    async register(password) {
      if (!User.email && !User.userName) {
        await router.push('/register/email-username')
      }
      const resp = await registerUser(this.User, password)

      if (resp.status === 200 || resp.status === 201) {
        const user = new User(resp.data.user.userName, resp.data.user.email)
        auth.setAuthenticated(user, resp.data.token)
      }
    },


    createUser(email, userName) {
      this.User = new User(userName, email)
    },

    async registerUser(formData) {
      const resp = await registerPerson(
        formData.value.email.$value,
        formData.value.password.$value,
        formData.value.firstName.$value,
        formData.value.lastName.$value,
        formData.value.idDocument.$value,
        formData.value.birthDate.$value,
        formData.value.userName.$value
      )
      if (!resp){
        return
      }


      if (resp.status === 200 || resp.status === 201){
        const user = new User(resp.data.user.userName, resp.data.user.email)
        auth.setAuthenticated(user, resp.data.token)
      }


      await router.push("/")
    },
  },
})
