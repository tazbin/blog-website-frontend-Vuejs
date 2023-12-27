<template>
  <div class="container mx-auto">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
      <el-menu-item index="0">
        <h1 class="text-xl">LET'S BLOG</h1>
      </el-menu-item>
      <div class="flex-1" />

      <el-menu-item index="1">
        <router-link to="/signup">Signup</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/signin">Signin</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/">Blogs</router-link>
      </el-menu-item>
      <el-menu-item index="4" v-if="authStore.isAuthenticated">
        <router-link :to="{ name: 'profile-page', params: { id: authStore.user._id } }"
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
import { ref, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const activeIndex = ref('1')

watch(
  () => authStore.isAuthenticated,
  () => {
    router.push({ name: 'signin' })
  }
)
</script>
