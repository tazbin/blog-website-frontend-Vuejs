<template>
  <div class="grid grid-cols-4 gap-8 container mx-auto mt-4">
    <div v-if="!blogStore.getBlogsSuccess" class="col-span-4 grid w-full">
      <el-skeleton :rows="0" animated class="w-full" />
    </div>

    <div v-if="!blogStore.getBlogsSuccess" class="col-span-3 grid grid-cols-3 gap-4">
      <el-skeleton
        style="width: 240px"
        v-for="(blog, index) in [1, 2, 3, 4, 5, 6]"
        :key="index"
        animated
      >
        <template #template>
          <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
          <div style="padding: 14px">
            <el-skeleton-item variant="p" style="width: 50%" />
            <div style="display: flex; align-items: center; justify-items: space-between">
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="width: 30%" />
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>

    <el-pagination
      v-show="blogStore.getBlogsSuccess"
      small
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :total="blogStore.blogsWithPagination.totalBlogs"
      class="mt-4 col-span-4"
      @current-change="(pageNumber) => paginate(pageNumber)"
    />
    <div v-if="blogStore.getBlogsSuccess" class="col-span-3 grid grid-cols-3 gap-4">
      <blog-card :blogs="blogStore.blogsWithPagination.result" class="col-span-1" />
    </div>
    <div class="col-span-1">
      <BlogCategories />
    </div>
  </div>
</template>

<script setup>
import { ElNotification } from 'element-plus'
import { onBeforeMount, ref, watch } from 'vue'
import BlogCard from '../components/blogcard.vue'
import BlogCategories from '../components/BlogCategories.vue'
import { useBlogStore } from '../stores/blog'

const props = defineProps({
  categoryId: String
})

const currentPage = ref(1)

const blogStore = useBlogStore()

onBeforeMount(() => {
  if (Object.keys(blogStore.blogsWithPagination).length == 0) {
    blogStore.getBlogs({
      categoryId: props.categoryId
    })
  }
})

const paginate = (pageNumber) => {
  currentPage.value = pageNumber
  blogStore.getBlogs({ categoryId: props.categoryId, page: pageNumber })
}

watch(
  () => props.categoryId,
  () => {
    currentPage.value = 1
    blogStore.getBlogs({
      categoryId: props.categoryId
    })
  }
)

watch(
  () => blogStore.getBlogsError,
  () => {
    if (Object.keys(blogStore.getBlogsError).length) {
      ElNotification({
        title: 'Failed to fetch blogs',
        message: blogStore.getBlogsError.message,
        type: 'error',
        offset: 100
      })
    }
  }
)
</script>
