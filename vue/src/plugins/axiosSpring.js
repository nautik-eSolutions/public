import axios from 'axios'
import { auth } from '@/main.js'

const axiosSpring = axios.create({
  baseURL: 'http://localhost:80/api/v1',
})
axiosSpring.interceptors.request.use((config) => {
  const token = auth.springToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


export default  axiosSpring;