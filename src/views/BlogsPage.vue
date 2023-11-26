<template>
  <div class="flex container mx-auto mt-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-2/3">
    <el-card v-for="blog in blogs" :key="blog" :body-style="{ padding: '0px' }">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="w-full h-48 object-cover"
        />
        <div style="padding: 14px">
            <router-link :to="{ name: 'blog-details', params: { id: 1 } }" class="text-lg cursor-pointer font-semibold">
              Yummy hamburger
            </router-link>
          <div class="mt-2">
            <p>
              Tazbinur bhai
            </p>
            <p>
              Food categiory
            </p>
          </div>
        </div>
      </el-card>
  </div>
  <div class="w-1/3">
    <BlogCategories/>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BlogCategories from '../components/BlogCategories.vue';

const blogs = ref([1, 2, 3, 4, 5, 6])
</script>
