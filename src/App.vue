<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="app-root">
    <header>
      <Navbar />
    </header>

    <main>
      <router-view />
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
