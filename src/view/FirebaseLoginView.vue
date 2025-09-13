<template>
  <div class="d-flex flex-column align-items-center justify-content-center w-100 h-100">
    <div class="mx-auto" style="max-width: 560px;">
      <h1>Firebase Login</h1>

      <p><input type="text" placeholder="Email" v-model.trim="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p>
        <button @click="signin" :disabled="loading">
          {{ loading ? 'Signing in…' : 'Sign in via Firebase' }}
        </button>
      </p>

      <p v-if="msg">{{ msg }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const email = ref("")
const password = ref("")
const loading = ref(false)
const msg = ref("")
const router = useRouter()
const auth = getAuth()

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((cred) => {
      console.log("Firebase signin Successful!");
      console.log("auth.currentUser:", auth.currentUser);
      if (cred.user.email === "admin@test.com") {
        msg.value = "Welcome, Admin!"
      } else {
        msg.value = `Welcome, ${cred.user.email}`
      }
      setTimeout(() => {
        router.push("/")
      }, 2000)
    })
    .catch((error) => {
      console.log(error.code);
      msg.value = "Login failed: " + error.code;
    });
};
</script>
