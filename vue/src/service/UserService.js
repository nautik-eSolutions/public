import axiosInstance from '@/plugins/axios.js'
import axiosSpring from "@/plugins/axiosSpring.js";

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


export async function registerPerson(email, password, firstName, lastName,idDocument, birthDate, userName ){

    const response = await axiosSpring.post("auth/register", {
        "email":email,
        "password":password,
        "firstName":firstName,
        "lastName":lastName,
        "identificationDocument":idDocument,
        "birthDate":birthDate,
        "userName":userName
    })
    /*
  const res = await axiosInstance.post(
    'register',{
      "email":email,
      "password":password,
      "first_name":firstName,
      "last_name":lastName,
      "identification_document":idDocument,
      "birth_date":birthDate,
      "user_name":userName
    }
  )*/.catch( error => {
    return { status: 500 }
  })
    console.log(response)
  return response
}



