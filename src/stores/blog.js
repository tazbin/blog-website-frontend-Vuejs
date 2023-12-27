import { defineStore } from 'pinia'
import { ref } from 'vue'
import makeApiRequest from '../services/http'

export const useBlogStore = defineStore('blog', () => {
  const blogsWithPagination = ref({})
  const getBlogsSuccess = ref(false)
  const getBlogsError = ref({})
  const isGetBlogsLoading = ref(false)

  const getBlogs = (page = 1) => {
    getBlogsError.value = {}
    getBlogsSuccess.value = false
    isGetBlogsLoading.value = true

    setTimeout(() => {
      makeApiRequest({
        url: 'http://localhost:3000/blog/all',
        params: {
          page
        },
        method: 'get'
      })
        .then((res) => {
          blogsWithPagination.value = res.data
          getBlogsSuccess.value = true
          isGetBlogsLoading.value = false
        })
        .catch((err) => {
          getBlogsSuccess.value = false
          getBlogsError.value = err.response.data.error
          isGetBlogsLoading.value = false
        })
    }, 4000)
  }

  const blogDetails = ref({})
  const blogDetailsSuccess = ref(false)
  const blogDetailsError = ref({})
  const isBlogDetailsLoading = ref(false)

  const getBlogDetails = (blogId) => {
    blogDetails.value = {}
    blogDetailsSuccess.value = false
    blogDetailsError.value = {}
    isBlogDetailsLoading.value = false

    setTimeout(() => {
      makeApiRequest({
        url: 'http://localhost:3000/blog/details/' + blogId,
        method: 'get'
      })
        .then((res) => {
          blogDetails.value = res.data
          blogDetailsSuccess.value = true
          isBlogDetailsLoading.value = false
        })
        .catch((err) => {
          blogDetailsSuccess.value = false
          blogDetailsError.value = err.response.data.error
          isGetBlogsLoading.value = false
        })
    }, 4000)
  }

  return {
    blogsWithPagination,
    getBlogsSuccess,
    getBlogsError,
    isGetBlogsLoading,
    getBlogs,

    blogDetails,
    blogDetailsSuccess,
    blogDetailsError,
    isBlogDetailsLoading,
    getBlogDetails
  }
})
