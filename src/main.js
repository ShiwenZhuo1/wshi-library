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



const app = createApp(App)


app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
app.mount("#app")
