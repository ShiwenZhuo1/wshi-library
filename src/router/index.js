import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../view/HomeView.vue'
import AboutView from '../view/AboutView.vue'
import FirebaseSigninView from '../view/FirebaseSigninView.vue'
import FirebaseLoginView from '@/view/FirebaseLoginView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
