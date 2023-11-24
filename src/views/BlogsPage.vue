<template>
  <div>
    <h1>Blogs page</h1>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo id tempore, et nesciunt dolorum
    corrupti. Sapiente debitis fugiat impedit neque at? Sequi, corporis! Aut odit laboriosam
    exercitationem necessitatibus dolor reprehenderit.
    <hr />

    <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>

  <div class="flex">
    <el-button type="primary" :icon="Edit" />
    <el-button type="primary" :icon="Share" />
    <el-button type="primary" :icon="Delete" />
    <el-button type="primary" :icon="Search">Search</el-button>
    <el-button type="primary">
      Upload<el-icon class="el-icon--right"><Upload /></el-icon>
    </el-button>
  </div>

  </div>
</template>

<script setup>
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
</script>
