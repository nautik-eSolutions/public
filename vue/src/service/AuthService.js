import axiosInstance from '@/plugins/axios.js'

export class AuthService {
  static async loginUser(email,password) {


    return await axiosInstance.post('login',{
      "email":email,
      "password":password
    }).then((resp) => resp)
  }
}