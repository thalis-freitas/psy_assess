import { createRouter, createWebHistory } from 'vue-router'
import AuthenticatedLayout from '@/components/AuthenticatedLayout.vue'
import InstrumentsView from '@/views/InstrumentsView.vue'
import EvaluetedView from '@/views/EvaluetedView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AuthenticatedLayout,
      children: [
        {
          path: '/',
          name: 'instruments',
          component: InstrumentsView
        },
        {
          path: '/evalueted',
          name: 'evalueted',
          component: EvaluetedView
        },
      ]
    }
  ]
})

export default router
