<template>
  <el-card v-for="blog in blogs" :key="blog" :body-style="{ padding: '0px' }">
    <img
      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      class="w-full h-48 object-cover"
    />
    <div style="padding: 14px">
      <router-link
        :to="{ name: 'blog-details', params: { id: 1 } }"
        class="text-lg cursor-pointer font-semibold"
      >
        Yummy hamburger
      </router-link>
      <div class="mt-2">
        <p>Tazbinur bhai</p>
        <p>Food categiory</p>
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
