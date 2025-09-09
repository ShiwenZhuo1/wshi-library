<template>
  <div class="container my-4">
    <h2 class="mb-2"><span class="me-2">🧾</span> W5. Library Registration Form</h2>
    <p class="text-muted mb-4">Let’s build some more advanced features into our form.</p>

    <form @submit.prevent="submitForm" novalidate class="mb-4">
      <div class="row g-3">
        <!-- 1st row -->
        <div class="col-12 col-lg-6">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.username }"
            v-model="formData.username"
            @input="() => validateName(false)"
            @blur="() => validateName(true)"
          />
          <div v-if="errors.username" class="invalid-feedback d-block">{{ errors.username }}</div>
        </div>

        <div class="col-12 col-lg-6">
          <label for="gender" class="form-label">Gender</label>
          <select
            id="gender"
            class="form-select"
            :class="{ 'is-invalid': errors.gender }"
            v-model="formData.gender"
            @change="() => validateGender(true)"
            @blur="() => validateGender(true)"
          >
            <option value="" disabled>--Select--</option>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
          <div v-if="errors.gender" class="invalid-feedback d-block">{{ errors.gender }}</div>
        </div>

        <!-- 2nd row -->
        <div class="col-12 col-lg-6">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors.password }"
            v-model="formData.password"
            @input="() => validatePassword(false)"
            @blur="() => validatePassword(true)"
          />
          <div v-if="errors.password" class="invalid-feedback d-block">{{ errors.password }}</div>
        </div>

        <div class="col-12 col-lg-6">
          <label for="confirm" class="form-label">Confirm password</label>
          <input
            id="confirm"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors.confirm }"
            v-model="formData.confirm"
            @input="() => validateConfirm(false)"
            @blur="() => validateConfirm(true)"
          />
          <div v-if="errors.confirm" class="invalid-feedback d-block">{{ errors.confirm }}</div>
        </div>

        <!-- 3rd row -->
        <div class="col-12">
          <label class="form-label d-block">Australian Resident?</label>
          <div class="d-flex gap-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="resident"
                :value="true"
                v-model="formData.isAustralian"
                @change="() => validateResident(true)"
                id="residentYes"
              />
              <label class="form-check-label" for="residentYes">Yes</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="resident"
                :value="false"
                v-model="formData.isAustralian"
                @change="() => validateResident(true)"
                id="residentNo"
              />
              <label class="form-check-label" for="residentNo">No</label>
            </div>
          </div>
          <div v-if="errors.resident" class="invalid-feedback d-block">{{ errors.resident }}</div>
        </div>

        <div class="col-12">
          <label for="reason" class="form-label">Reason for joining</label>
          <textarea
            id="reason"
            rows="4"
            class="form-control"
            :class="{ 'is-invalid': errors.reason }"
            v-model="formData.reason"
            @input="() => validateReason(false)"
            @blur="() => validateReason(true)"
          ></textarea>
          <div v-if="errors.reason" class="invalid-feedback d-block">{{ errors.reason }}</div>
          <div v-if="formData.reason.toLowerCase().includes('friend')" class="text-success mt-1">
            Great to have a friend
          </div>
        </div>
        <div class="col-12">
            <label for="reason" class="form-label">Suburb</label>
            <input type="text" class="form-control" id="suburb" v-bind:value="formData.suburb" />
          </div>
      </div>

      <div class="mt-3">
        <button type="submit" class="btn btn-primary me-2">Submit</button>
        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
      </div>
    </form>
    <div v-if="submitted.length" class="mt-3">
      <div class="w-100 overflow-auto">
        <DataTable
          :value="submitted"
          class="w-100"
          :scrollable="true"
          scrollHeight="400px"
          tableStyle="min-width:40rem"
        >
          <Column field="username" header="Username" />
          <Column field="password" header="Password" :body="(r) => maskPwd(r.password)" />
          <Column
            field="isAustralian"
            header="Australian Resident"
            :body="(r) => (r.isAustralian ? 'Yes' : 'No')"
          />
          <Column field="gender" header="Gender" />
          <Column field="reason" header="Reason" />
        </DataTable>
      </div>
    </div>

    <div v-if="submitted.length" class="mt-4">
      <div class="row g-3">
        <div v-for="(u, i) in submitted" :key="i" class="col-12 col-md-6 col-xl-4">
          <div class="card shadow-sm h-100">
            <div class="card-header bg-primary text-white fw-semibold">User Information</div>
            <div class="card-body small">
              <p class="mb-1"><span class="text-muted">Username:</span> {{ u.username }}</p>
              <p class="mb-1">
                <span class="text-muted">Password:</span> {{ maskPwd(u.password) }}
              </p>
              <p class="mb-1">
                <span class="text-muted">Australian Resident:</span>
                {{ u.isAustralian ? 'Yes' : 'No' }}
              </p>
              <p class="mb-1"><span class="text-muted">Gender:</span> {{ u.gender }}</p>
              <p class="mb-0"><span class="text-muted">Reason:</span> {{ u.reason }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { z } from 'zod'

const formData = ref({
  username: '',
  password: '',
  confirm: '',
  isAustralian: null,
  reason: '',
  gender: '',
  suburb: 'Clayton'
})

const errors = ref({
  username: null,
  password: null,
  confirm: null,
  resident: null,
  gender: null,
  reason: null,
  suburb: null
})

const usernameSchema = z.string().trim().min(3, 'Name must be at least 3 characters')
const validateName = (strict) => {
  const r = usernameSchema.safeParse(formData.value.username)
  errors.value.username = r.success ? null : strict ? r.error.issues[0].message : null
}

const validatePassword = (strict) => {
  const p = formData.value.password || ''
  const ok =
    p.length >= 8 &&
    /[A-Z]/.test(p) &&
    /[a-z]/.test(p) &&
    /\d/.test(p) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(p)
  if (ok) errors.value.password = null
  else if (strict) {
    if (p.length < 8) errors.value.password = 'Password must be at least 8 characters long'
    else if (!/[A-Z]/.test(p))
      errors.value.password = 'Password must contain at least one uppercase letter'
    else if (!/[a-z]/.test(p))
      errors.value.password = 'Password must contain at least one lowercase letter'
    else if (!/\d/.test(p)) errors.value.password = 'Password must contain at least one number'
    else errors.value.password = 'Password must contain at least one special character'
  }
}

const validateConfirm = (strict) => {
  const { password, confirm } = formData.value
  errors.value.confirm =
    strict &&
    (!confirm
      ? 'Please confirm your password'
      : confirm !== password
        ? 'Passwords do not match'
        : null)
}

const validateResident = (strict) => {
  errors.value.resident =
    formData.value.isAustralian === null && strict ? 'Please choose Yes or No' : null
}
const validateGender = (strict) => {
  errors.value.gender = !formData.value.gender && strict ? 'Please select a gender' : null
}
const validateReason = (strict) => {
  const t = (formData.value.reason || '').trim()
  errors.value.reason = t.length < 5 && strict ? 'Reason must be at least 5 characters' : null
}

const validateAll = () => {
  validateName(true)
  validatePassword(true)
  validateConfirm(true)
  validateResident(true)
  validateGender(true)
  validateReason(true)
  const e = errors.value
  return !e.username && !e.password && !e.confirm && !e.resident && !e.gender && !e.reason
}

const submitted = ref([])
const submitForm = () => {
  if (!validateAll()) return
  submitted.value.push({ ...formData.value })
  clearForm()
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirm: '',
    isAustralian: null,
    reason: '',
    gender: '',
  }
  errors.value = {
    username: null,
    password: null,
    confirm: null,
    resident: null,
    gender: null,
    reason: null,
  }
}

const maskPwd = (p) => (p && p.length >= 6 ? p.slice(0, 3) + '***' : p || '')
</script>

<style scoped>
h2 {
  font-weight: 700;
}
.invalid-feedback {
  font-size: 0.875rem;
}
:deep(.p-datatable) {
  width: 100%;
}
</style>
