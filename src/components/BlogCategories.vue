<template>
  <el-skeleton v-if="!blogStore.getCategoriesSuccess" :rows="5" animated class="w-full" />
  <div v-else>
    <h2 v-if="props.profiledCategories" class="mb-4"> {{ authStore.bloggerProfile.first_name }}'s categories </h2>
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
  </div>
</template>

<script setup>
import { ElNotification, ElSkeleton } from 'element-plus'
import { onBeforeMount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useBlogStore } from '../stores/blog'

const props = defineProps({
  profiledCategories: {
    type: Boolean,
    default: false
  }
})

const authStore = useAuthStore()
const blogStore = useBlogStore()
const router = useRouter()

onBeforeMount(() => {
  if( props.profiledCategories ) {
    blogStore.getBloggerBlogCategories(authStore.bloggerProfile._id)
  } else {
    blogStore.getCategories()
  }
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
  if( props.profiledCategories ) {
    // router.push({ name: 'profile-page', params: { bloggerId: authStore.bloggerProfile._id, categoryId: category._id } })
    blogStore.getBloggerBlogs({
      bloggerId: authStore.bloggerProfile._id, 
      categoryId: category._id
    })
  } else {
    router.push({ name: 'blogs', params: { categoryId: category._id } })
  }
}
</script>
