import axiosInstance from '@/plugins/axios.js'
import { auth } from '@/main.js'

const token = auth.token;

this.$axios.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${token}`
})
