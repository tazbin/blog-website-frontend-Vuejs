<template>
  <div class="grid grid-cols-4 gap-8 container mx-auto mt-4">
    <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="50"
        class="mt-4 col-span-4"
      />
    <div class="col-span-3 grid grid-cols-3 gap-4">
      <blog-card :blogs="blogs" class="col-span-1" />
    </div>
    <div class="col-span-1">
      <BlogCategories />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import BlogCategories from '../components/BlogCategories.vue'

const blogs = ref([1, 2, 3, 4, 5, 6])
</script>
