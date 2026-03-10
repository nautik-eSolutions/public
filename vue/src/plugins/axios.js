import axios from 'axios'
import { auth } from '@/main.js'
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_WEB_URL,

})
axiosInstance.interceptors.request.use(config => {
  const token =  auth.springToken;
  if (token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})





export default axiosInstance

