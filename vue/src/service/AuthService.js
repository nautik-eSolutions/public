import axiosInstance from '@/plugins/axios.js'



export async function loginUser(email,password) {
    const res = await axiosInstance.post('login', {
        email: email,
        password: password,
      })
      .then((resp) => resp)

    return res;
  }




