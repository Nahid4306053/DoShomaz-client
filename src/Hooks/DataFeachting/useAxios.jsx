import axios from 'axios'

const instance = axios.create({
 baseURL:import.meta.env.VITE_API_URL_V1,
 withCredentials:true                   
})

export default function useAxios() {

  return instance
}
