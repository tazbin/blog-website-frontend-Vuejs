<template>
  <div class="container mx-auto py-5">
    <div class="bg-gray flex">
      <div class="flex w-1/2 text-justify p-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam unde beatae labore et
        architecto quibusdam ullam, ipsum temporibus debitis id, minima at asperiores, quia
        reiciendis. Tempora ratione hic aut quaerat? Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Illo rem voluptate, obcaecati aliquam ullam nostrum numquam blanditiis
        facere maxime minus officia voluptates quibusdam eos, ducimus sapiente, provident ad nisi!
        A? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae at cum repellendus, quis
        consequuntur hic optio alias adipisci magni officia pariatur accusamus debitis odio
        accusantium obcaecati velit quas doloribus nemo?
        <br />
        <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptates aperiam libero
        perspiciatis dolor saepe atque iusto cupiditate sint numquam molestias, blanditiis vitae eum
        consequatur quo sequi suscipit, quam impedit!
      </div>
      <div class="flex w-1/2 p-5">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm w-full"
        >
          <el-form-item prop="firstName">
            <el-input
              v-model="ruleForm.firstName"
              placeholder="Enter first name"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="lastName">
            <el-input
              v-model="ruleForm.lastName"
              placeholder="Enter last name"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
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
          <el-form-item prop="confirmPass">
            <el-input
              v-model="ruleForm.confirmPass"
              type="password"
              placeholder="Confirm password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <hr />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const ruleFormRef = ref()

const validateFirstName = (rules, value, callback) => {
  if (value === '') {
    callback(new Error('Please enter first name'))
  }
  callback()
}

const validateLastName = (rules, value, callback) => {
  if (value === '') {
    callback(new Error('Please enter last name'))
  }
  callback()
}

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
  } else {
    if (ruleForm.confirmPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('confirmPass', () => null)
    }
    callback()
  }
}

const validateConfirmPass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  pass: '',
  confirmPass: ''
})

const rules = reactive({
  firstName: [{ validator: validateFirstName, trigger: 'blur' }],
  lastName: [{ validator: validateLastName, trigger: 'blur' }],
  email: [{ validator: validateEmail, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }],
  confirmPass: [{ validator: validateConfirmPass, trigger: 'blur' }]
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      console.log(ruleForm)
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
