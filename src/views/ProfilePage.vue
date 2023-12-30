<template>
  <div class="container mx-auto my-8">
    <el-skeleton v-if="!authStore.bloggerProfileSuccess" :rows="5" animated />
    <div v-else class="grid grid-cols-10 gap-2">
      <div class="col-span-2">
        <img :src="authStore.bloggerProfile.img" class="h-48 object-cover rounded" />
      </div>

      <div class="col-span-2">
        <span class="font-bold mb-2 inline-block"> First name: </span>
        {{ authStore.bloggerProfile.first_name }}
        <br />
        <span class="font-bold mb-2 inline-block"> Last name: </span>
        {{ authStore.bloggerProfile.last_name }}
        <br />
        <span class="font-bold mb-2 inline-block"> Email: </span>
        {{ authStore.bloggerProfile.email }}
        <br />
        <span class="font-bold mb-2 inline-block"> Job: </span> {{ authStore.bloggerProfile.job }}
        <br />
        <span class="font-bold mb-2 inline-block"> Joined: </span>
        {{ authStore.bloggerProfile.joined }}
        <br />
        <span class="font-bold mb-2 inline-block"> Address: </span>
        {{ authStore.bloggerProfile.address }}
        <br />
      </div>

      <div class="col-span-6">
        {{ authStore.bloggerProfile.about }}
      </div>
    </div>

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
        class="col-span-4 mt-4"
        v-show="blogStore.getBlogsSuccess"
        :current-page="blogStore.blogsWithPagination.currentPage"
        :page-size="6"
        :small="small"
        :background="false"
        layout="total, prev, pager, next"
        :total="totalPage"
        @current-change="handleCurrentChange"
      />
      <div v-if="blogStore.getBlogsSuccess" class="col-span-3 grid grid-cols-3 gap-4">
        <blog-card :blogs="blogStore.blogsWithPagination.result" class="col-span-1" />
      </div>
      <div class="col-span-1">
        <BlogCategories v-if="authStore.bloggerProfile._id" :profiled-categories="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import BlogCategories from '../components/BlogCategories.vue'
import { useAuthStore } from '../stores/auth'
import { ElNotification } from 'element-plus'
import { useBlogStore } from '../stores/blog'

const props = defineProps({
  bloggerId: String,
  categoryId: {
    type: String,
    default: null
  }
})

const authStore = useAuthStore()
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

watch(
  () => authStore.bloggerProfileError,
  () => {
    if (Object.keys(authStore.bloggerProfileError).length) {
      ElNotification({
        title: 'Failed to fetch blogger data',
        message: authStore.bloggerProfileError.message,
        type: 'error',
        offset: 100
      })
    }
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

onBeforeMount(() => {
  authStore.getBloggerProfileData(props.bloggerId)
  blogStore.getBloggerBlogs({
    bloggerId: props.bloggerId,
    categoryId: props.categoryId || 'all'
  })
})

watch(
  () => props.bloggerId,
  () => {
    authStore.getBloggerProfileData(props.bloggerId)
  }
)
</script>

<style scoped>
body {
  margin: 0;
}
.example-showcase .el-loading-mask {
  z-index: 2;
}
</style>
