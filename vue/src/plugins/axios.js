import axios from 'axios'
import { auth } from '@/main.js'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',

})
axiosInstance.interceptors.request.use(config => {
  const token =  auth.springToken;
  if (token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})





export default axiosInstance

