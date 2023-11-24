<template>
  <div class="container mx-auto">
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
  >
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
  </el-menu>
</div>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref('1')
</script>
