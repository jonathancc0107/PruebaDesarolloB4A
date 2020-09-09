import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Reserva from '../views/funciones/Reserva.vue'
import Consulta from '../views/funciones/Consulta.vue'
import Soporte from '../views/funciones/Soporte.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Principal from '../views/Principal.vue'
import Perfil from '../views/Perfil.vue'
import Parse from 'parse'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/reserva',
    Name: 'Reserva',
    component: Reserva,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/consulta',
    Name: 'Consulta',
    component: Consulta,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/soporte',
    Name: 'Soporte',
    component: Soporte,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/principal',
    name: 'Principal',
    component: Principal,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: {
      requiresAuth: true
    },
  },
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(ruta => ruta.meta.requiresAuth)) {
    const user = Parse.User.current();
    if (user) {
      next();
    } else {
      next({
        name: 'Login'
      })
    }
  } else {
    next();
  }
});

export default router