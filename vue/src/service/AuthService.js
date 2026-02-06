import axiosInstance from '@/plugins/axios.js'

export class AuthService {
  static async loginUser(email,password) {
    const res = await axiosInstance.post('login', {
        email: email,
        password: password,
      })
      .then((resp) => resp)

    return res;
  }
  static async addNewUser(payload){
    const res = await axiosInstance.post('register',{
        "user_name":payload.userName,
        "email":payload.email,
        "password":payload.password,
        "birth_date":payload.birth_date
    }).then(resp=>resp)

    return res;
}



}