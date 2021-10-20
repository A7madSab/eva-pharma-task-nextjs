import axios from "axios"
import { deleteSession } from "src/context/Auth"

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.status === 401) {
      deleteSession()
    }
    return Promise.reject(error.response)
  }
)

export default axiosInstance
