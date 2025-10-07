import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../view/HomeView.vue'
import AboutView from '../view/AboutView.vue'
import FirebaseSigninView from '../view/FirebaseSigninView.vue'
import FirebaseLoginView from '@/view/FirebaseLoginView.vue'
import AddBookView from '@/view/AddBookView.vue'
import GetBookCountView from '../view/GetBookCountView.vue'
import WeatherView from '@/view/WeatherView.vue'
import CountBookAPI from '../view/CountBookAPI.vue'
import GetAllBookAPI from '@/view/GetAllBookAPI.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/Firelogin',
    name: 'Firelogin',
    component: FirebaseLoginView
  },
  {
    path: '/Fireregister',
    name: 'Fireregister',
    component: FirebaseSigninView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/AddBook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/GetAllBooks',
    name: 'GetAllBooks',
    component: GetAllBookAPI
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
