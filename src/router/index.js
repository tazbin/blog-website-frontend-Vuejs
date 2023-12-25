import { createRouter, createWebHistory } from 'vue-router'
import SigninPage from '../views/SigninPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import BlogsPage from '../views/BlogsPage.vue'
import BlogDetailPage from '../views/BlogDetailPage.vue'
import { useAuthStore } from '../stores/auth'

const authGuard = (to, from, next) => {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    next()
  } else {
    next({ name: 'signin' })
  }
}

const noAuthGuard = (to, from, next) => {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) {
    next()
  } else {
    next({ name: 'profile-page', params: { id: authStore.user._id } })
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'blogs',
      component: BlogsPage
    },
    {
      path: '/blogs/:id',
      name: 'blog-details',
      component: BlogDetailPage,
      props: true
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupPage.vue'),
      beforeEnter: noAuthGuard
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninPage,
      beforeEnter: noAuthGuard
    },
    {
      path: '/profile/:id',
      name: 'profile-page',
      propes: true,
      component: ProfilePage,
      beforeEnter: authGuard
    }
  ]
})

export default router
