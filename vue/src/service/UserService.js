import axiosInstance from '@/plugins/axios.js'
import router from '@/router/index.js'

export async function registerUser(user,password) {
  const res = await axiosInstance
    .post('register', {
      "user_name": user.userName,
      "email": user.email,
      "password": password,
    })
    .then((resp) => resp)

  return res
}


export async function registerPerson(firstName, lastName,idDocument, birthDate ){
  const res = await axiosInstance.post(
    'users/persons',{
      "first_name":firstName,
      "last_name":lastName,
      "identification_document":idDocument,
      "birth_date":birthDate
    }
  )

  if (res.status === 204 || res.status === 200){
    await router.push("/")
  }
}



