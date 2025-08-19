import './assets/main.css'
import './style.css'

import { createApp } from 'vue'
import App from './App.vue'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// PrimeVue
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// PrimeIcons
import 'primeicons/primeicons.css'


const app = createApp(App)

app.use(PrimeVue, {
  theme: { preset: Aura }
})

app.mount('#app')
