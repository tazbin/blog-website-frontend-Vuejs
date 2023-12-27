<template>
  <el-card v-for="blog in blogs" :key="blog" :body-style="{ padding: '0px' }">
    <img :src="blog.img" class="w-full h-48 object-cover" />
    <div style="padding: 14px">
      <router-link
        :to="{ name: 'blog-details', params: { id: blog._id } }"
        class="text-lg cursor-pointer font-semibold"
      >
        {{ blog.title }}
      </router-link>
      <div class="mt-2">
        <p>{{ blog.writter.first_name }}</p>
        <p>{{ blog.category.name }}</p>
      </div>
    </div>
  </el-card>
</template>

<script setup>
const { blogs } = defineProps({
  blogs: {
    type: Array,
    default: () => []
  }
})
</script>
