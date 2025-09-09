import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import PrimeVue from "primevue/config"
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'
import './style.css'
import Aura from "@primevue/themes/aura"
import "primeicons/primeicons.css"
import "./assets/main.css"
import "./style.css"

import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyB9I1h9BjgJIJXtxO6PAs2scjzHU-xNHe4",
  authDomain: "week7-wenzhuoshi.firebaseapp.com",
  projectId: "week7-wenzhuoshi",
  storageBucket: "week7-wenzhuoshi.firebasestorage.app",
  messagingSenderId: "673846011848",
  appId: "1:673846011848:web:5567b332a44e996ef902fd"
};

const app = createApp(App)
initializeApp(firebaseConfig)

app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
app.mount("#app")
