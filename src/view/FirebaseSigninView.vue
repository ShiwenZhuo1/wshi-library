<template>

  <div class="d-flex flex-column align-items-center justify-content-center w-100 h-100">
    <div class="mx-auto" style="max-width: 560px;">
      <h1>Create an Account</h1>

      <p>
        <input type="text" placeholder="Email" v-model="email" />
      </p>

      <p>
        <input type="password" placeholder="Password" v-model="password" />
      </p>

      <p>
        <button @click="register">Save to Firebase</button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Firebase Register Successful!");
      router.push("/Firelogin");
    })
    .catch((error) => {
      console.log(error.code);
    });
};
</script>
