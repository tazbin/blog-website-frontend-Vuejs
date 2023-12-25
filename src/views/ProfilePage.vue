<template>
  <div class="container mx-auto my-8">
    <div class="grid grid-cols-10 gap-2">
      <div class="col-span-2">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="h-48 object-cover rounded"
        />
      </div>

      <div class="col-span-2">
        <span class="font-bold mb-2 inline-block"> First name: </span> Tazbinur Bhai
        <br />
        <span class="font-bold mb-2 inline-block"> First name: </span> Tazbinur Bhai
        <br />
        <span class="font-bold mb-2 inline-block"> First name: </span> Tazbinur Bhai
        <br />
        <span class="font-bold mb-2 inline-block"> First name: </span> Tazbinur Bhai
        <br />
        <span class="font-bold mb-2 inline-block"> First name: </span> Tazbinur Bhai
        <br />
        <span class="font-bold mb-2 inline-block"> First name: </span> Tazbinur Bhai
        <br />
      </div>

      <div class="col-span-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates laborum, qui eum modi
        hic corporis architecto debitis earum. Dolorum pariatur accusantium possimus velit dolores
        magni ipsum animi blanditiis. Rerum, itaque. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Omnis unde delectus, molestias debitis culpa, et consequatur tempora
        cumque, repellat aut rerum minima eum! Earum accusamus, omnis ad aut illum et?
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
        <blog-card :blogs="blogs" class="col-span-1" />
      </div>
      <div class="col-span-1">
        <BlogCategories />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import BlogCategories from '../components/BlogCategories.vue'

const blogs = ref([1, 2, 3, 4, 5, 6])
</script>
