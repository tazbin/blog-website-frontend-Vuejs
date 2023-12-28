<template>
  <div
    class="p-4 mb-2 bg-slate-100 rounded cursor-pointer hover:bg-slate-200"
    @click="viewCategorizedBlogs({ _id: 'all' })"
  >
    All
    <span class="bg-slate-300 px-3 rounded-lg">
      {{ blogStore.categories.reduce((count, category) => count + category.count, 0) }}
    </span>
  </div>
  <div
    v-for="(category, index) in blogStore.categories"
    :key="index"
    class="p-4 mb-2 bg-slate-100 rounded cursor-pointer hover:bg-slate-200"
    @click="viewCategorizedBlogs(category)"
  >
    {{ category.name }} <span class="bg-slate-300 px-3 rounded-lg"> {{ category.count }} </span>
  </div>
</template>

<script setup>
import { ElNotification } from 'element-plus'
import { onBeforeMount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'

const blogStore = useBlogStore()
const router = useRouter()

onBeforeMount(() => {
  blogStore.getCategories()
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

const viewCategorizedBlogs = (category) => {
  router.push({ name: 'blogs', params: { categoryId: category._id } })
}
</script>
