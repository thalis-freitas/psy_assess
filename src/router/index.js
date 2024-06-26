import { createRouter, createWebHistory } from 'vue-router'
import AuthenticatedLayout from '@/components/AuthenticatedLayout.vue'
import EvaluatedForm from '../views/EvaluatedForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginForm.vue')
    },
    {
      path: '/confirm/:token',
      name: 'confirmForm',
      component: () => import('../views/ConfirmForm.vue'),
      props: true
    },
    {
      path: '/evaluation/:id/start',
      name: 'formEvaluation',
      component: () => import('../views/FormEvaluation.vue'),
      props: true
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
          path: '/evaluated',
          name: 'evaluated',
          component: () => import('../views/EvaluatedView.vue'),
        },
        {
          path: '/evaluated/form',
          name: 'evaluatedForm',
          component: EvaluatedForm,
        },
        {
          path: '/evaluated/form/:id',
          name: 'evaluatedFormEdit',
          component: EvaluatedForm,
          props: true
        },
        {
          path: '/evaluated/:id',
          name: 'showEvaluated',
          component: () => import('../views/ShowEvaluated.vue'),
          props: true
        },
        {
          path: '/instruments/:id',
          name: 'showInstrument',
          component: () => import('../views/ShowInstrument.vue'),
          props: true
        },
        {
          path: '/evaluation/:id',
          name: 'showEvaluation',
          component: () => import('../views/ShowEvaluation.vue'),
          props: true
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('psyAssessToken')
  const openRoutes = ['login', 'confirmForm', 'formEvaluation']

  if (openRoutes.includes(to.name) || token) next()
  next({ name: 'login' })
})

export default router
