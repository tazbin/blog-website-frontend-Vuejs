import { defineStore } from 'pinia'
import { ref } from 'vue'
import makeApiRequest from '../services/http'

export const useAuthStore = defineStore('auth', () => {
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

  const isAuthenticated = ref(false)
  const user = ref({})

  const loginLoading = ref(false)
  const loginError = ref({})
  const loginSuccess = ref(false)

  const resetLoginState = () => {
    isAuthenticated.value = false
    user.value = {}
    loginLoading.value = false
    loginError.value = {}
    loginSuccess.value = false
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

  const loggedInUserFetchError = ref({})
  const loggedInUserFetchSuccess = ref(false)

  const getLoggedInUserData = () => {
    if (getAccessToken) {
      loggedInUserFetchError.value = {}
      loggedInUserFetchSuccess.value = false

      setTimeout(() => {
        makeApiRequest({
          url: 'http://localhost:3000/user/me',
          method: 'get'
        })
          .then((res) => {
            loggedInUserFetchSuccess.value = true
            user.value = res.data
            isAuthenticated.value = true
          })
          .catch((err) => {
            loggedInUserFetchError.value = err.response.data.error
            clearLocalStorage()
            resetLoginState()
          })
      }, 4000)
    }
  }

  const bloggerProfile = ref({})
  const bloggerProfileSuccess = ref(false)
  const bloggerProfileError = ref({})
  const isBloggerProfileLoading = ref(false)

  const getBloggerProfileData = (bloggerId) => {
    bloggerProfile.value = {}
    bloggerProfileError.value = {}
    bloggerProfileSuccess.value = false
    isBloggerProfileLoading.value = false

    setTimeout(() => {
      makeApiRequest({
        url: 'http://localhost:3000/user/bloggerProfile/' + bloggerId,
        method: 'get'
      })
        .then((res) => {
          bloggerProfileSuccess.value = true
          bloggerProfile.value = res.data
          isBloggerProfileLoading.value = false
        })
        .catch((err) => {
          bloggerProfileError.value = err.response.data.error
          isBloggerProfileLoading.value = false
        })
    }, 4000)
  }

  const registerLoading = ref(false)
  const registerError = ref({})
  const registerSuccess = ref(false)

  const register = (registerData) => {
    registerError.value = {}
    registerSuccess.value = false
    registerLoading.value = true

    makeApiRequest({
      url: 'http://localhost:3000/user/register',
      method: 'post',
      payload: {
        email: registerData.email,
        first_name: registerData.firstName,
        last_name: registerData.lastName,
        password: registerData.pass
      }
    })
      .then((res) => {
        user.value = res.data.user
        isAuthenticated.value = true

        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)

        registerSuccess.value = true
        registerLoading.value = false
      })
      .catch((err) => {
        isAuthenticated.value = false
        user.value = {}
        clearLocalStorage()

        registerError.value = err.response.data.error
        registerSuccess.value = false
        registerLoading.value = false
      })
  }

  const logout = () => {
    clearLocalStorage()
    resetLoginState()
  }

  return {
    isAuthenticated,
    user,

    login,
    loginLoading,
    loginError,
    loginSuccess,

    logout,

    loggedInUserFetchError,
    loggedInUserFetchSuccess,
    getLoggedInUserData,

    bloggerProfile,
    bloggerProfileSuccess,
    bloggerProfileError,
    isBloggerProfileLoading,
    getBloggerProfileData,

    register,
    registerError,
    registerSuccess,
    registerLoading
  }
})
