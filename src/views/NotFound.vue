<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <div class="w-full min-h-screen bg-gradient-to-b from-black to-zinc-900 flex justify-center items-center">
    <div class="flex flex-wrap items-center">
      <div class="w-full sm:w-1/2 px-5 text-7xl text-green-600 sm:text-center font-mono font-bold">404</div>
      <div class="w-full sm:w-1/2 px-5">
        <div class="text-2xl text-white font-sans whitespace-nowrap pb-3">Page Not Found</div>
        <div>
          <button @click="router.push('/')" class="border-2 border-green-500 px-2 py-1 rounded-lg hover:bg-green-500 text-sm text-neutral-100 font-sans font-bold duration-100">Back to Home</button>
        </div>
      </div>
    </div>
  </div>

</template>
