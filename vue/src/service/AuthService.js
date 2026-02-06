import axiosInstance from '@/plugins/axios.js'
import User from '@/model/User.js'



export async function loginUser(email,password) {
    const response = await axiosInstance.post('login', {
        "email": email,
        "password": password,
      })
      .then((resp) => resp)

    return response ;

  }




