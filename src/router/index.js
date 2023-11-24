import { createRouter, createWebHistory } from 'vue-router'
import SigninPage from '../views/SigninPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import BlogsPage from '../views/BlogsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'blogs',
      component: BlogsPage
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignupPage.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninPage
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    },
  ]
})

export default router
