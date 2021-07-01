import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profesores from '../views/Profesores.vue'
import Alumnos from '../views/Alumnos.vue'
import Login from '../views/Login.vue'
import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profesores',
    name: 'Profesores',
    component: Profesores,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/alumnos',
    name: 'Alumno',
    component: Alumnos,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  // if (to.matched.some(record=>record.me.requiresAuth)){
  //   if (store.getters.isLoggedIn){
  //     next();
  //     return
  //   }
  //   next('/login')
  // }else{
  //   next();
  // }
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
