import { defineStore } from 'pinia'
import User from '@/model/User.js'
import { loginLaravelSpringToken, loginUserSpring, loginOAuth } from '@/service/AuthService.js'
import router from '@/router'
import { useLoadingStore } from '@/stores/loadingStore'
import { useNotificationStore } from '@/stores/notificationStore'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    User: User,
    springToken: '',
    isAuthenticated: false,
  }),
  actions: {
    async loginUser(email, password) {
      const loadingStore = useLoadingStore()
      const notificationStore = useNotificationStore()

      loadingStore.show()
      try {
        const respSpring = await loginUserSpring(email, password)
        this.User = new User(respSpring.data.userName, respSpring.data.email)
        this.springToken = respSpring.data.token.token
        this.isAuthenticated = true

        notificationStore.showNotification('Inicio de sesión exitoso. ¡Bienvenido!', 'success')
        await router.push('/')
      } catch (error) {
        let message = 'Error al iniciar sesión'
        if (error.response && error.response.data) {
          message = error.response.data.detail || error.response.data.message || message
        } else if (error.message) {
          message = error.message
        }
        notificationStore.showNotification(message, 'error')
      } finally {
        loadingStore.hide()
      }
    },

    async oAuthLogin(token) {
      const loadingStore = useLoadingStore()
      const notificationStore = useNotificationStore()

      loadingStore.show()
      try {
        const resp = await loginOAuth(token)
        if (resp.status !== 200) {
          throw new Error('Error en autenticación OAuth')
        }

        this.springToken = resp.data.token

        notificationStore.showNotification('Inicio de sesión con OAuth exitoso', 'success')
        await router.push('/')
      } catch (error) {
        let message = 'Error en autenticación OAuth'
        if (error.response && error.response.data) {
          message = error.response.data.detail || error.response.data.message || message
        } else if (error.message) {
          message = error.message
        }
        notificationStore.showNotification(message, 'error')
      } finally {
        loadingStore.hide()
      }},
    setAuthenticated(User, token) {
      this.User = User
      this.springToken = token
      this.isAuthenticated = true
    },
    async logout() {
      this.User = null
      this.token = ''
      this.springToken = ''
      this.isAuthenticated = false
      await router.push('/')
    },
  },
  persist: true,
})
