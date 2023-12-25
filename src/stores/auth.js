import { defineStore } from 'pinia'
import { ref } from 'vue'
import makeApiRequest from '../services/http'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref({})
  const loginLoading = ref(false)
  const loginError = ref({})
  const loginSuccess = ref(false)

  const resetState = () => {
    isAuthenticated.value = false
    user.value = {}
    loginLoading.value = false
    loginError.value = {}
    loginSuccess.value = false
  }

  const getAccessToken = () => {
    return localStorage.getItem('access-token')
  }

  const setAccessToken = (accessToken) => {
    localStorage.setItem('access-token', accessToken)
  }

  const setRefreshToken = (refreshToken) => {
    localStorage.setItem('refresh-token', refreshToken)
  }

  const clearLocalStorage = () => {
    localStorage.clear()
  }

  const login = (loginData) => {
    loginError.value = {}
    loginSuccess.value = false
    loginLoading.value = true

    return makeApiRequest({
      url: 'http://localhost:3000/user/login',
      method: 'post',
      payload: {
        email: loginData.email,
        password: loginData.pass
      }
    })
      .then((res) => {
        user.value = res.data.user
        isAuthenticated.value = true

        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)

        loginSuccess.value = true
        loginLoading.value = false
      })
      .catch((err) => {
        isAuthenticated.value = false
        user.value = {}
        clearLocalStorage()

        loginError.value = err.response.data.error
        loginSuccess.value = false
        loginLoading.value = false
      })
  }

  const getLoggedInUserData = async () => {
    if (getAccessToken) {
      return makeApiRequest({
        url: 'http://localhost:3000/user/me',
        method: 'get'
      })
        .then((res) => {
          user.value = res.data
          isAuthenticated.value = true
        })
        .catch(() => {
          clearLocalStorage()
          resetState()
        })
    }
  }

  const logout = () => {
    clearLocalStorage()
    resetState()
  }

  return {
    isAuthenticated,
    user,
    login,
    loginLoading,
    loginError,
    loginSuccess,

    logout,

    getLoggedInUserData
  }
})
