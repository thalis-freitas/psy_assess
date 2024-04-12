<script setup >
import { authApi } from '@/services/authApi'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vuestic-ui'

const user = ref({
  email: '',
  password: '',
})

const { init: showToast } = useToast()

const router = useRouter()

const submitLogin = async function() {
  try {
    const response = await authApi.login({ user: user.value })

    processSuccess(response)
  } catch (error) {
    showToast({ message: `${error.response.data.errors}`, color: 'danger'})
  }
}

const processSuccess = (response) => {
  localStorage.setItem('psy_assess_token', response.data.token)
  localStorage.setItem('currentUser', JSON.stringify(response.data.user))

  showToast({ message: 'Boas-vindas!', color: 'success'})
  router.push('/')
}
</script>

<template>
  <va-navbar color="primary">
    <template #center>
      <va-navbar-item class="font-bold text-lg">
        PsyAssess
      </va-navbar-item>
    </template>
  </va-navbar>

  <va-card
    color="secondary"
    gradient
    class="sm:w-1/2 mx-6 sm:mx-auto my-6 sm:my-12"
  >
    <va-card-title>
      Login
    </va-card-title>
    <va-card-content>
      <va-form
        ref="loginForm"
        immediate hide-error-messages
        class="flex flex-col gap-2 mb-2"
        @submit.prevent="submitLogin"
        tag="form"
      >
        <va-input
          autofocus
          v-model="user.email"
          label="E-mail"
          name="E-mail"
        />
        <va-input
          v-model="user.password"
          label="Senha"
          type="password"
          name="Senha"
        />
        <span>
          <va-button type="submit"> Entrar </va-button>
        </span>
      </va-form>
    </va-card-content>
  </va-card>
</template>
