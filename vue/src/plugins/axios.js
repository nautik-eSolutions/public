import axios from 'axios'
import { useAuthStore } from '@/stores/authStore.js'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
})



export default axiosInstance
