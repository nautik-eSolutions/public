import axiosInstance from '@/plugins/axios.js'

export async function addNewUser(payload) {
  const res = await axiosInstance
    .post('register', {
      user_name: payload.userName,
      email: payload.email,
      password: payload.password,
      birth_date: payload.birth_date,
    })
    .then((resp) => resp)

  return res
}
