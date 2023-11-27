import { createRouter, createWebHistory } from 'vue-router'
import SigninPage from '../views/SigninPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import BlogsPage from '../views/BlogsPage.vue'
import BlogDetailPage from '../views/BlogDetailPage.vue'

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
      component: () => import('../views/SignupPage.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninPage
    },
    {
      path: '/profile/:id',
      name: 'profile-page',
      propes: true,
      component: ProfilePage
    },
  ]
})

export default router
