import axiosInstance from '@/plugins/axios.js'

export async function registerUser(user,password) {
  const res = await axiosInstance
    .post('register', {
      user_name: user.userName,
      email: user.email,
      password: password,
    })
    .then((resp) => resp)

  return res
}
