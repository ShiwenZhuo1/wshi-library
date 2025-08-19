<template>
  <div class="container my-4">
    <h2 class="mb-4 text-center">User Information Form</h2>

    <form @submit.prevent="submitForm" novalidate>
      <div class="row g-3">
        <div class="col-12 col-lg-6">
          <label for="username" class="form-label">Username</label>
          <input
            id="username" type="text" class="form-control"
            :class="{ 'is-invalid': errors.username }"
            v-model="formData.username"
            @input="() => validateName(false)" @blur="() => validateName(true)"
          />
          <div v-if="errors.username" class="invalid-feedback d-block">{{ errors.username }}</div>
        </div>

        <div class="col-12 col-lg-6">
          <label for="password" class="form-label">Password</label>
          <input
            id="password" type="password" class="form-control"
            :class="{ 'is-invalid': errors.password }"
            v-model="formData.password"
            @input="() => validatePassword(false)" @blur="() => validatePassword(true)"
          />
          <div v-if="errors.password" class="invalid-feedback d-block">{{ errors.password }}</div>
        </div>

        <div class="col-12 col-lg-6">
          <label class="form-label d-block">Australian Resident?</label>
          <div class="d-flex gap-3">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="resident" :value="true"
                     v-model="formData.isAustralian" @change="() => validateResident(true)" id="residentYes" />
              <label class="form-check-label" for="residentYes">Yes</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="resident" :value="false"
                     v-model="formData.isAustralian" @change="() => validateResident(true)" id="residentNo" />
              <label class="form-check-label" for="residentNo">No</label>
            </div>
          </div>
          <div v-if="errors.resident" class="invalid-feedback d-block">{{ errors.resident }}</div>
        </div>

        <div class="col-12 col-lg-6">
          <label for="gender" class="form-label">Gender</label>
          <select id="gender" class="form-select"
                  :class="{ 'is-invalid': errors.gender }"
                  v-model="formData.gender"
                  @change="() => validateGender(true)" @blur="() => validateGender(true)">
            <option value="" disabled>--Select--</option>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
          <div v-if="errors.gender" class="invalid-feedback d-block">{{ errors.gender }}</div>
        </div>

        <div class="col-12">
          <label for="reason" class="form-label">Reason for joining</label>
          <textarea id="reason" rows="4" class="form-control"
                    :class="{ 'is-invalid': errors.reason }"
                    v-model="formData.reason"
                    @input="() => validateReason(false)" @blur="() => validateReason(true)"></textarea>
          <div v-if="errors.reason" class="invalid-feedback d-block">{{ errors.reason }}</div>
        </div>
      </div>

      <div class="mt-3">
        <button type="submit" class="btn btn-primary me-2">Submit</button>
        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
      </div>
    </form>

    <div v-if="submitted.length" class="mt-4">
      <div class="w-100 overflow-auto">
        <DataTable :value="submitted" class="w-100" :scrollable="true" scrollHeight="400px" tableStyle="min-width:40rem">
          <Column field="username" header="Username" />
          <Column field="password" header="Password" />
          <Column field="isAustralian" header="Australian Resident" :body="r => (r.isAustralian ? 'Yes' : 'No')" />
          <Column field="gender" header="Gender" />
          <Column field="reason" header="Reason" />
        </DataTable>
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
  isAustralian: null,
  reason: '',
  gender: ''
})

const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null
})

/* —— Username use Zod —— */
const usernameSchema = z.string().trim().min(3, 'Name must be at least 3 characters')
const validateName = (isStrict) => {
  const r = usernameSchema.safeParse(formData.value.username)
  if (r.success) {
    errors.value.username = null
  } else if (isStrict) {
    errors.value.username = r.error.issues[0].message
  }
}

const validatePassword = (blur) => {
  const p = formData.value.password || ''
  const ok = p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /\d/.test(p) && /[!@#$%^&*(),.?":{}|<>]/.test(p)
  if (ok) errors.value.password = null
  else if (blur) {
    if (p.length < 8) errors.value.password = 'Password must be at least 8 characters long'
    else if (!/[A-Z]/.test(p)) errors.value.password = 'Password must contain at least one uppercase letter'
    else if (!/[a-z]/.test(p)) errors.value.password = 'Password must contain at least one lowercase letter'
    else if (!/\d/.test(p)) errors.value.password = 'Password must contain at least one number'
    else errors.value.password = 'Password must contain at least one special character'
  }
}

const validateResident = (blur) => {
  if (formData.value.isAustralian === null) { if (blur) errors.value.resident = 'Please choose Yes or No' }
  else errors.value.resident = null
}

const validateGender = (blur) => {
  if (!formData.value.gender) { if (blur) errors.value.gender = 'Please select a gender' }
  else errors.value.gender = null
}

const validateReason = (blur) => {
  const t = (formData.value.reason || '').trim()
  if (t.length < 5) { if (blur) errors.value.reason = 'Reason must be at least 5 characters' }
  else errors.value.reason = null
}

const validateAll = () => {
  validateName(true); validatePassword(true); validateResident(true); validateGender(true); validateReason(true)
  return !errors.value.username && !errors.value.password && !errors.value.resident && !errors.value.gender && !errors.value.reason
}

const submitted = ref([])

const submitForm = () => {
  if (!validateAll()) return
  submitted.value.push({ ...formData.value })
  clearForm()
}

const clearForm = () => {
  formData.value = { username: '', password: '', isAustralian: null, reason: '', gender: '' }
  errors.value = { username: null, password: null, resident: null, gender: null, reason: null }
}
</script>

<style scoped>
h2 { font-weight: 700; }
.invalid-feedback { font-size: 0.875rem; }
:deep(.p-datatable) { width: 100%; }
</style>
