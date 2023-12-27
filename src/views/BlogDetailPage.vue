<template>
  <div class="container mx-auto my-4 flex">
    <div class="w-2/3">
      <div>
        <img :src="blogStore.blogDetails.img" class="w-full h-48 object-cover" />
      </div>
      <p class="text-xl py-2">{{ blogStore.blogDetails.title }}</p>
      <p>
        {{ blogStore.blogDetails.body }}
      </p>
      <div class="py-2 mb-2">
        <el-badge
          :value="blogStore.blogDetails.reacts.like.length"
          class="item mr-4"
          type="primary"
        >
          <el-button type="primary" plain>Like </el-button>
        </el-badge>

        <el-badge :value="blogStore.blogDetails.reacts.love.length" class="item mr-4" type="danger">
          <el-button type="danger" plain>Love</el-button>
        </el-badge>

        <el-badge
          :value="blogStore.blogDetails.reacts.funny.length"
          class="item mr-4"
          type="warning"
        >
          <el-button type="warning" plain>Funny</el-button>
        </el-badge>

        <el-badge :value="blogStore.blogDetails.reacts.sad.length" class="item mr-4" type="info">
          <el-button type="info" plain>Sad</el-button>
        </el-badge>

        <el-badge
          :value="blogStore.blogDetails.reacts.informative.length"
          class="item mr-4"
          type="success"
        >
          <el-button type="success" plain>Informative</el-button>
        </el-badge>
      </div>

      <div class="my-4">
        <el-form
          ref="commentRef"
          :model="commentForm"
          status-icon
          :rules="commentRules"
          class="demo-ruleForm w-full"
        >
          <el-form-item prop="text">
            <el-input
              v-model="commentForm.text"
              placeholder="Enter comment"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(commentRef)">Sign in</el-button>
            <el-button @click="resetForm(commentRef)">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div
        class="flex mb-4"
        v-for="(comment, index) in blogStore.blogDetails.comments"
        :key="index"
      >
        <div class="w-1/12">
          <img :src="comment.people.img" class="h-24 object-cover rounded" />
        </div>
        <div class="w-11/12 pl-8">
          <p class="font-bold">{{ comment.people.first_name }}</p>
          <p class="text-xs italic mb-2 mt-1">{{ comment.time }}</p>
          {{ comment.body }}
        </div>
      </div>
    </div>
    <div class="w-1/3 pl-12">
      <div class="bg-gray-50 p-4 rounded text-center mb-4 shadow-md">
        <p class="text-xl">{{ blogStore.blogDetails.writter.first_name }}</p>
        <router-link
          class="bg-gray-200 block p-2 rounded mt-4"
          :to="{ name: 'profile-page', params: { id: blogStore.blogDetails.writter._id } }"
        >
          View profile
        </router-link>
      </div>
      <blog-categories />
    </div>
  </div>
</template>

<script setup>
import { ElNotification } from 'element-plus'
import { onBeforeMount, reactive, ref, watch } from 'vue'
import BlogCategories from '../components/BlogCategories.vue'
import { useBlogStore } from '../stores/blog'

const { id } = defineProps({
  id: {
    type: String,
    required: true
  }
})

const blogStore = useBlogStore()

onBeforeMount(() => {
  blogStore.getBlogDetails(id)
})

watch(
  () => blogStore.blogDetailsError,
  () => {
    if (Object.keys(blogStore.blogDetailsError).length) {
      ElNotification({
        title: 'Failed to fetch blog details',
        message: blogStore.blogDetailsError.message,
        type: 'error',
        offset: 100
      })
    }
  }
)

const validateText = (rule, value, callback) => {
  if (value.trim() === '') {
    callback(new Error('Comment must not be empty'))
  }
  callback()
}

const commentRef = ref()

const commentForm = reactive({
  text: ''
})

const commentRules = reactive({
  text: [{ validator: validateText, trigger: 'blur' }]
})

const submitForm = (commentEl) => {
  if (!commentEl) {
    return
  }

  commentEl.validate((valid) => {
    if (valid) {
      console.log(commentForm)
    } else {
      console.log('Invalid comment')
    }
  })
}

const resetForm = (commentEl) => {
  if (!commentEl) {
    return
  }
  commentEl.resetFields()
}
</script>
