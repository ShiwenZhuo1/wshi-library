<script setup>
import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

const submittedCards = ref([])

const submitForm = () => {
  submittedCards.value.push({
    ...formData.value
  })
  clearForm()
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
  }
}
</script>

<template>
  <div class="container my-4">
    <h2 class="mb-4 text-center">User Information Form</h2>

    <form @submit.prevent="submitForm">
      <div class="row row-cols-1 row-cols-lg-2 g-3">
        <div class="col">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            type="text"
            class="form-control"
            v-model="formData.username"
          />
        </div>

        <div class="col">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            type="password"
            class="form-control"
            v-model="formData.password"
          />
        </div>

        <div class="col d-flex align-items-center">
          <div class="form-check mt-1">
            <input
              id="isAustralian"
              class="form-check-input"
              type="checkbox"
              v-model="formData.isAustralian"
            />
            <label class="form-check-label ms-2" for="isAustralian">
              Australian Resident?
            </label>
          </div>
        </div>

        <div class="col">
          <label for="gender" class="form-label">Gender</label>
          <select
            id="gender"
            class="form-select"
            v-model="formData.gender"
          >
            <option value="" disabled>--Select--</option>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
        </div>
      </div>

      <div class="row g-3 mt-1">
        <div class="col-12">
          <label for="reason" class="form-label">Reason for joining</label>
          <textarea
            id="reason"
            rows="4"
            class="form-control"
            v-model="formData.reason"
          ></textarea>
        </div>
      </div>

      <div class="mt-3">
        <button type="submit" class="btn btn-primary me-2">Submit</button>
        <button type="button" class="btn btn-secondary" @click="clearForm">
          Clear
        </button>
      </div>
    </form>

    <div v-if="submittedCards.length" class="mt-4">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        <div
          v-for="(user, i) in submittedCards"
          :key="i"
          class="col"
        >
          <div class="card h-100 shadow-sm">
            <div class="card-header bg-primary text-white">
              User Information
            </div>
            <div class="card-body">
              <p><strong>Username:</strong> {{ user.username }}</p>
              <p><strong>Password:</strong> {{ user.password }}</p>
              <p><strong>Australian Resident:</strong> {{ user.isAustralian ? 'Yes' : 'No' }}</p>
              <p><strong>Gender:</strong> {{ user.gender || '-' }}</p>
              <p><strong>Reason:</strong> {{ user.reason || '-' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 { font-weight: 700; }
</style>
