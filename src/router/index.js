import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/view/index.vue'),
      meta: {
        role: 'user'
      }
    },
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: () => import('@/components/HelloWorld.vue'),
      meta: {
        role: 'user'
      }
    },
    {
      path: '/computer',
      name: 'Computer',
      component: () => import('@/components/computer.vue'),
      meta: {
        role: '123'
      }
    },
    {
      path: '/computer',
      name: 'Computer',
      component: () => import('@/components/computer.vue'),
      meta: {
        role: '123'
      }
    }
  ]
})
