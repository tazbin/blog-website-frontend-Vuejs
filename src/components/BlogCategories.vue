<template>
  <div v-for="(category, index) in blogStore.categories" :key="index" class="p-4 mb-2 bg-slate-100 rounded cursor-pointer hover:bg-slate-200">
    {{ category.name }} <span class="bg-slate-300 px-3 rounded-lg"> {{ category.count }} </span>
  </div>
</template>

<script setup>
import { ElNotification } from 'element-plus';
import { onBeforeMount, watch } from 'vue';
import { useBlogStore } from '../stores/blog';

const blogStore = useBlogStore()

onBeforeMount(() => {
  blogStore.getCategories
})

watch(
  () => blogStore.getCategoriesError,
  () => {
    if (Object.keys(blogStore.getCategoriesError).length) {
      ElNotification({
        title: 'Failed to fetch categories',
        message: blogStore.getCategoriesError.message,
        type: 'error',
        offset: 100
      })
    }
  }
)
</script>
