import axios from 'axios'

export const axiosInstance = (() => {
  const axiosClient = axios.create({
    baseURL: 'localhost:3000',
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
