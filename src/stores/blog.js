import { defineStore } from 'pinia'
import { ref } from 'vue'
import makeApiRequest from '../services/http'

export const useBlogStore = defineStore('blog', () => {
  const blogsWithPagination = ref({})
  const getBlogsSuccess = ref(false)
  const getBlogsError = ref({})
  const isGetBlogsLoading = ref(false)

  const getBlogs = (blogCriterions) => {
    blogsWithPagination.value = {}
    getBlogsError.value = {}
    getBlogsSuccess.value = false
    isGetBlogsLoading.value = true

    let url = 'blog/all'
    if (blogCriterions.categoryId) {
      url += `/${blogCriterions.categoryId}`
    }

    makeApiRequest({
      url,
      params: {
        page: blogCriterions.page ?? 1
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
  }

  const getBloggerBlogs = (blogCriterions) => {
    blogsWithPagination.value = {}
    getBlogsError.value = {}
    getBlogsSuccess.value = false
    isGetBlogsLoading.value = true

    let url = `blog/${blogCriterions.bloggerId}/${blogCriterions.categoryId}`

    makeApiRequest({
      url,
      params: {
        page: blogCriterions.page ?? 1
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

    makeApiRequest({
      url: 'blog/details/' + blogId,
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
  }

  const postCommentSuccess = ref(false)
  const postCommentError = ref({})
  const isPostCommentLoading = ref(false)

  const postComment = (commentData) => {
    postCommentSuccess.value = false
    postCommentError.value = {}
    isPostCommentLoading.value = false

    makeApiRequest({
      url: 'blog/comment',
      method: 'post',
      payload: {
        blogId: commentData.blogId,
        body: commentData.body
      }
    })
      .then(() => {
        postCommentSuccess.value = true
        postCommentError.value = {}
        isPostCommentLoading.value = false
      })
      .catch((err) => {
        postCommentSuccess.value = false
        postCommentError.value = err.response.data.error
        isPostCommentLoading.value = false
      })
  }

  const categories = ref([])
  const getCategoriesSuccess = ref(false)
  const getCategoriesError = ref({})
  const isGetCategoriesLoading = ref(false)

  const getCategories = () => {
    categories.value = []
    getCategoriesSuccess.value = false
    getCategoriesError.value = {}
    isGetCategoriesLoading.value = false

    makeApiRequest({
      url: 'category/categorizedBlogs/all',
      method: 'get'
    })
      .then((res) => {
        categories.value = res.data
        getCategoriesSuccess.value = true
        isGetCategoriesLoading.value = false
      })
      .catch((err) => {
        postCommentSuccess.value = false
        postCommentError.value = err.response.data.error
        isPostCommentLoading.value = false
      })
  }

  const getBloggerBlogCategories = (bloggerId) => {
    categories.value = []
    getCategoriesSuccess.value = false
    getCategoriesError.value = {}
    isGetCategoriesLoading.value = false

    makeApiRequest({
      url: 'category/categorizedBlogs/' + bloggerId,
      method: 'get'
    })
      .then((res) => {
        categories.value = res.data
        getCategoriesSuccess.value = true
        isGetCategoriesLoading.value = false
      })
      .catch((err) => {
        postCommentSuccess.value = false
        postCommentError.value = err.response.data.error
        isPostCommentLoading.value = false
      })
  }

  return {
    blogsWithPagination,
    getBlogsSuccess,
    getBlogsError,
    isGetBlogsLoading,
    getBlogs,
    getBloggerBlogs,

    blogDetails,
    blogDetailsSuccess,
    blogDetailsError,
    isBlogDetailsLoading,
    getBlogDetails,

    postCommentSuccess,
    postCommentError,
    isPostCommentLoading,
    postComment,

    categories,
    getCategoriesSuccess,
    getCategoriesError,
    isGetCategoriesLoading,
    getCategories,
    getBloggerBlogCategories
  }
})
