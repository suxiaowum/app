import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../components/HelloWorld.vue'
import Mytodo from '../views/Mytodo.vue';
import login from '../views/login.vue';
import newTask from '../views/newTask.vue';
import app from '../App.vue';
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'login',
    component:login
  },{
    path: '/index',
    name: 'index',
    component: index
  },{
    path: '*',
    component: index
  }
  
]

const router = new VueRouter({
  mode: 'history',
  // base: '/base',
  routes
})

export default router
