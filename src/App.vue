<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="app-root min-vh-100 d-flex flex-column w-100">  <!-- w-100 很关键 -->
    <Navbar />
    <main class="flex-grow-1 d-flex justify-content-center">
      <div class="container py-4">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style>
.app-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
