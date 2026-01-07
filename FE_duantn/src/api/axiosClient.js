import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

export default axiosClient
