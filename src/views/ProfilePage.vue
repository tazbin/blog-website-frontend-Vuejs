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
        <span class="font-bold mb-2 inline-block"> Last name: </span> {{ authStore.bloggerProfile.last_name }}
        <br />
        <span class="font-bold mb-2 inline-block"> Email: </span> {{ authStore.bloggerProfile.email }}
        <br />
        <span class="font-bold mb-2 inline-block"> Job: </span> {{ authStore.bloggerProfile.job }}
        <br />
        <span class="font-bold mb-2 inline-block"> Joined: </span> {{ authStore.bloggerProfile.joined }}
        <br />
        <span class="font-bold mb-2 inline-block"> Address: </span> {{ authStore.bloggerProfile.address }}
        <br />
      </div>

      <div class="col-span-6">
        {{ authStore.bloggerProfile.about }}
      </div>
    </div>

    <div class="grid grid-cols-4 gap-8 container mx-auto mt-14">
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="50"
        class="mt-4 col-span-4"
      />
      <div class="col-span-3 grid grid-cols-3 gap-4">
        <!-- <blog-card :blogs="blogs" class="col-span-1" /> -->
      </div>
      <div class="col-span-1">
        <BlogCategories />
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

const props = defineProps({
  bloggerId: String
})

const authStore = useAuthStore()

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

onBeforeMount(() => {
  console.log(props.bloggerId)
  authStore.getBloggerProfileData(props.bloggerId)
})

// watch(() => props.bloggerId, () => {
//   authStore.getBloggerProfileData(props.bloggerId)
// })

const blogs = ref([1, 2, 3, 4, 5, 6])
</script>

<style scoped>
body {
  margin: 0;
}
.example-showcase .el-loading-mask {
  z-index: 2;
}
</style>
