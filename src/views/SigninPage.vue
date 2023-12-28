<template>
  <div class="container mx-auto py-5">
    <div class="bg-graytext-center">
      <div class="text-center text-xl">--- Sign In ---</div>
      <div class="p-5 w-1/2 mx-auto">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          class="demo-ruleForm w-full"
        >
          <el-form-item prop="email">
            <el-input
              v-model="ruleForm.email"
              placeholder="Enter email"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              v-model="ruleForm.pass"
              type="password"
              placeholder="Enter password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm(ruleFormRef)"
              :disabled="authStore.isLoginLoading"
            >
              {{ !authStore.isLoginLoading ? 'Sign in' : 'Signing in...' }}
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <hr />
  </div>
</template>

<script setup>
import { reactive, ref, watchEffect } from 'vue'
import { useAuthStore } from '../stores/auth'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()

const router = useRouter()

watchEffect(() => {
  if (authStore.loginSuccess) {
    ElNotification({
      title: 'Signin Success',
      message: 'Signin Success',
      type: 'success',
      offset: 100
    })

    router.push({ name: 'profile-page', params: { bloggerId: authStore.user._id } })
  }

  if (Object.keys(authStore.loginError).length) {
    ElNotification({
      title: 'Signin Error',
      message: authStore.loginError.message,
      type: 'error',
      offset: 100
    })
  }
})

const ruleFormRef = ref()

const validateEmail = (rules, value, callback) => {
  if (value === '') {
    callback(new Error('Please enter en email'))
  } else {
    if (!value.includes('@')) {
      callback(new Error('Please enter valid email address'))
    }
  }
  callback()
}

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  }
  callback()
}

const ruleForm = reactive({
  email: '',
  pass: ''
})

const rules = reactive({
  email: [{ validator: validateEmail, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }]
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      authStore.login(ruleForm)
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
