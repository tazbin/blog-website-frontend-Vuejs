import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_API_BASE_URL

export const axiosInstance = (() => {
  const axiosClient = axios.create({
    baseURL,
    timeout: 1000,
    headers: {
      Accept: 'application/json'
    }
  })

  axiosClient.interceptors.request.use(
    function (config) {
      const accessToken = localStorage.getItem('access-token')
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  axiosClient.interceptors.response.use(
    (response) => {
      return response
    },
    async function (error) {
      const originalRequest = error.config

      const refreshToken = localStorage.getItem('refresh-token')

      if( error.response && error.response.status == 401 && refreshToken ) {
        try {
          const response = await axiosInstance.post('http://localhost:3000/user/me/refresToken', {
            refreshToken
          })

          localStorage.setItem('access-token', response.data.accessToken)
          localStorage.setItem('refresh-token', response.data.refreshToken)

          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`

          return axiosInstance(originalRequest)
        } catch(err) {
          return Promise.reject(err)
        }
      }
      return Promise.reject(error)
    }
  )

  return axiosClient
})()

function makeApiRequest(meta) {
  const { url, method = 'get', headers, params, payload } = meta
  const apiRequestOptions = {
    method: method.toLowerCase(),
    url,
    headers,
    data: payload,
    params
  }

  return axiosInstance.request(apiRequestOptions)
}

export default makeApiRequest
