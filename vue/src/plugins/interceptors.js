import axiosInstance from '@/plugins/axios.js'
import { useAuthStore } from '@/stores/authStore.js'

const auth = useAuthStore();

axiosInstance.interceptors.request.use(function(config){
  const token = auth.token;
  config.header.Authorization = `Bearer ${token}`
  return config
})