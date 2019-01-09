import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import Vote from '@/components/Vote'
import Admin from '@/components/admin'
import Display from '@/components/display'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
      {
          path: '/login',
          name: 'login',
          component: Login
      },
      {
          path: '/vote',
          name: 'vote',
          component: Vote
      },
      {
          path: '/admin',
          name: 'admin',
          component: Admin
      },
      {
          path: '/display',
          name: 'display',
          component: Display
      }
  ]
})
