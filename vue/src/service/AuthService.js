import axiosInstance from '@/plugins/axios.js'
import User from '@/model/User.js'
import axiosSpring from '@/plugins/axiosSpring.js'



export async function loginUserLaravel(email, password) {
    const response = await axiosInstance.post('login', {
        "email": email,
        "password": password,
      })
      .then((resp) => resp)

    return response ;

  }


  export async function loginLaravelSpringToken(token){
  const response = await axiosInstance.post("login/oauth",{
    "token":token
  })

    return response
  }

export async function loginUserSpring(email, password) {
  const response = await axiosSpring
    .post('auth/login/email', {
      email: email,
      password: password,
    })
    .then((resp) => resp)

  return response
}

export async function loginOAuth(token){
  const response = await axiosSpring
    .post("auth/login/oauth",{},
      {
        headers:{
          'Google-Token':token
        }
      })
  return response
}


