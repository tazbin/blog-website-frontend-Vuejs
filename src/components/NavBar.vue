<template>
  <div class="container mx-auto">
    <el-menu
      :router="true"
      :default-active="route.name"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
    >
      <el-menu-item index="0">
        <h1 class="text-xl">LET'S BLOG</h1>
      </el-menu-item>
      <div class="flex-1" />

      <el-menu-item index="signup">
        <router-link :to="{ name: 'signup' }">Signup</router-link>
      </el-menu-item>
      <el-menu-item index="signin">
        <router-link :to="{ name: 'signin' }">Signin</router-link>
      </el-menu-item>
      <el-menu-item index="">
        <router-link :to="{ name: 'blogs' }">Blogs</router-link>
      </el-menu-item>
      <el-menu-item index="profile-page" v-if="authStore.isAuthenticated">
        <router-link :to="{ name: 'profile-page', params: { bloggerId: authStore.user._id } }"
          >Profile</router-link
        >
      </el-menu-item>
      <el-button
        class="mt-3"
        v-if="authStore.isAuthenticated"
        type="danger"
        @click="authStore.logout"
      >
        Logout
      </el-button>
    </el-menu>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter, useRoute } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

watch(
  () => authStore.isAuthenticated,
  () => {
    router.push({ name: 'signin' })
  }
)
</script>
