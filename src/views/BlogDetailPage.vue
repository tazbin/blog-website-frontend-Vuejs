<template>
  <div class="container mx-auto my-4 flex">
    <div class="w-2/3">
        <div>
      <img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        class="w-full h-48 object-cover"
      />
    </div>
    <p class="text-xl py-2">This is the title {{ id }}</p>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, consequatur nesciunt
      debitis, praesentium tempora, ad accusamus labore sapiente at vero reprehenderit harum
      molestias ea quos dignissimos. Temporibus voluptates ipsum cumque. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Suscipit, consequatur nesciunt debitis, praesentium tempora, ad
      accusamus labore sapiente at vero reprehenderit harum molestias ea quos dignissimos.
      Temporibus voluptates ipsum cumque. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Suscipit, consequatur nesciunt debitis, praesentium tempora, ad accusamus labore sapiente at
      vero reprehenderit harum molestias ea quos dignissimos. Temporibus voluptates ipsum cumque.
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, consequatur nesciunt
      debitis, praesentium tempora, ad accusamus labore sapiente at vero reprehenderit harum
      molestias ea quos dignissimos. Temporibus voluptates ipsum cumque.
    </p>
    <div class="py-2 mb-2">
      <el-button plain>Plain</el-button>
      <el-button type="primary" plain>Primary</el-button>
      <el-button type="success" plain>Success</el-button>
      <el-button type="info" plain>Info</el-button>
      <el-button type="warning" plain>Warning</el-button>
      <el-button type="danger" plain>Danger</el-button>
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
            <el-input v-model="commentForm.text" placeholder="Enter comment" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(commentRef)">Sign in</el-button>
            <el-button @click="resetForm(commentRef)">Cancel</el-button>
          </el-form-item>
        </el-form>
    </div>

    <div class="flex">
      <div class="w-1/12">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="h-24 object-cover rounded"
        />
      </div>
      <div class="w-11/12 pl-8">
        <p class="font-bold">Tazbinr bhai</p>
        <p class="text-xs italic mb-2 mt-1">14th Feb, 3023</p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam vitae ut possimus incidunt
        nulla ipsam saepe consequatur nisi recusandae accusantium non exercitationem omnis quaerat
        praesentium voluptatem, eveniet pariatur iusto assumenda?
      </div>
    </div>
    </div>
    <div class="w-1/3 pl-12">
    <div class="bg-gray-50 p-4 rounded text-center mb-4 shadow-md">
      <p class="text-xl">
        Tazbinur Bhai
      </p>
      <router-link class="bg-gray-200 block p-2 rounded mt-4" :to="{ name: 'profile-page', params: { id: 34 } }">
        View profile
      </router-link>
    </div>
        <blog-categories/>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import BlogCategories from "../components/BlogCategories.vue"

const { id } = defineProps({
  id: {
    type: String,
    required: true
  }
})

const validateText = (rule, value, callback) => {
    if( value.trim() === '' ) {
        callback(new Error('Comment must not be empty'))
    }
    callback()
}

const commentRef = ref()

const commentForm = reactive({
    text: ''
})

const commentRules = reactive({
    text: [{ validator: validateText, trigger: 'blur' }],
})

const submitForm = (commentEl) => {
    if( !commentEl ) {
        return
    }

    commentEl.validate((valid) => {
        if( valid ) {
            console.log(commentForm)
        } else {
            console.log('Invalid comment')
        }
    })
}

const resetForm = (commentEl) => {
    if( !commentEl ) {
        return
    }
    commentEl.resetFields()
}

</script>
