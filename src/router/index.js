import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/register'
import Movie from '@/components/movies/'
import Reservation from '@/components/reservations/'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
    	path: '/register',
    	component: Register
    },
    {
      path: '/movies',
      component: Movie
    },
    {
      path: '/reservations',
      component: Reservation
    }
  ],

  linkActiveClass: 'active',
  mode: 'history'
  
})
