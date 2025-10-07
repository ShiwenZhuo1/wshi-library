<!-- eslint-disable vue/multi-word-component-names -->
<!-- src/components/Navbar.vue -->
<template>
  <nav class="border-bottom py-3">
    <div class="container">
      <ul class="nav nav-pills gap-3 justify-content-center">
      <li class="nav-item">
        <RouterLink to="/" class="nav-link" active-class="active">Home (Week 5)</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/about" class="nav-link" active-class="active">About</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/Fireregister" class="nav-link" active-class="active">Fireregister</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/Firelogin" class="nav-link" active-class="active">Firelogin</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink :to="{ name: 'AddBook' }" class="nav-link" active-class="active">
            Add Book
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/GetBookCount" class="nav-link" active-class="active">Get Book Count</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/WeatherCheck" class="nav-link" active-class="active">Get Weather</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/CountBookAPI" class="nav-link" active-class="active">Count Book API</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/GetAllBooks" class="nav-link" active-class="active">Get All Books</RouterLink>
      </li>
      <li class="ms-auto d-flex align-items-center" v-if="loggedIn">
        <span class="me-2 small text-muted">👤 {{ userEmail }}</span>
        <button class="btn btn-outline-danger btn-sm" @click="logout">Logout</button>
      </li>
    </ul>
  </div>
</nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"

const auth = getAuth()
const router = useRouter()

const loggedIn = ref(false)
const userEmail = ref("")

let unsub
onMounted(() => {
  unsub = onAuthStateChanged(auth, (user) => {
    loggedIn.value = !!user
    userEmail.value = user?.email || ""
  })
})
onBeforeUnmount(() => unsub && unsub())

const logout = async () => {
  await signOut(auth)
  console.log("Current user after logout:", auth.currentUser)
  router.push("/Firelogin")
}
</script>
