import axiosSpring from '@/plugins/axiosSpring.js'


export async function createFixedMooringRequest(data){
  return await axiosSpring.post('fixed-mooring-requests',data)
}