import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/entries'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/entries'
      },
      {
        path: 'entries',
        component: () => import('@/views/Entries.vue')
      },
      {
        path: 'stats',
        component: () => import('@/views/Stats.vue')
      }
    ]
  },
  {
    path: '/tabs/entries/add',
    component: () => import('@/views/AddEntry.vue')
  },
  {
    path: '/test',
    component: () => import('@/views/Test.vue')
  },
  {
    path: '/auth',
    component: () => import('@/views/Register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
