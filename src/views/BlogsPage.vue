<template>
  <div class="grid grid-cols-4 gap-8 container mx-auto mt-4">
    <div v-show="!blogStore.getBlogsSuccess" class="col-span-4 grid w-full">
      <el-skeleton :rows="0" animated class="w-full" />
    </div>

    <div v-show="!blogStore.getBlogsSuccess" class="col-span-3 grid grid-cols-3 gap-4">
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

    <div class="col-span-4">
      <el-pagination
        v-show="blogStore.getBlogsSuccess"
        :current-page="blogStore.blogsWithPagination.currentPage"
        :page-size="6"
        :small="small"
        :background="false"
        layout="total, prev, pager, next"
        :total="totalPage"
        @current-change="handleCurrentChange"
      />
    </div>
    <div v-show="blogStore.getBlogsSuccess" class="col-span-3 grid grid-cols-3 gap-4">
      <blog-card :blogs="blogStore.blogsWithPagination.result" class="col-span-1" />
    </div>
    <div class="col-span-1">
      <BlogCategories v-show="blogStore.getBlogsSuccess" />
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
  categoryId: {
    type: String,
    required: false,
    default: null
  }
})

const blogStore = useBlogStore()
const totalPage = ref(0)

watch(
  () => blogStore.blogsWithPagination,
  () => {
    if (
      blogStore.blogsWithPagination?.totalBlogs &&
      blogStore.blogsWithPagination.totalBlogs != totalPage.value
    ) {
      totalPage.value = blogStore.blogsWithPagination.totalBlogs
    }
  }
)

const handleCurrentChange = (val) => {
  blogStore.getBlogs({ categoryId: props.categoryId, page: val })
}

onBeforeMount(() => {
  blogStore.getBlogs({
    categoryId: props.categoryId
  })
})

watch(
  () => props.categoryId,
  () => {
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
