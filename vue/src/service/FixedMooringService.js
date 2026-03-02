import axiosSpring from '@/plugins/axiosSpring.js'


export async function createFixedMooringRequest(data){
  return await axiosSpring.post('fixed-mooring-requests',data)
}

export async function getFixedMooringsRequests(){
  return await axiosSpring.get('fixed-mooring-requests')
}