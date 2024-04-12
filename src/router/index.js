import { createRouter, createWebHistory } from 'vue-router'
import AuthenticatedLayout from '@/components/AuthenticatedLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginForm.vue')
    },
    {
      path: '/',
      name: '/',
      component: AuthenticatedLayout,
      children: [
        {
          path: '/',
          name: 'instruments',
          component: () => import('../views/InstrumentsView.vue')
        },
        {
          path: '/evalueted',
          name: 'evalueted',
          component: () => import('../views/EvaluetedView.vue')
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('psy_assess_token')
  if (to.name !== 'login' && !token) next({ name: 'login' })
  else next()
})

export default router
