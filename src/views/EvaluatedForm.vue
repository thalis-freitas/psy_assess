<script setup>
import { evaluatedApi } from '@/services/evaluatedApi'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vuestic-ui'

const { init: showToast } = useToast()

const router = useRouter()

const evaluated = ref({
  name: '',
  cpf: '',
  email: '',
  birth_date: ''
})

const formErrors = ref({})

const submit = async () => {
  formErrors.value = {}

  try {
    await evaluatedApi.createEvaluated(evaluated.value)

    processSuccess()
  } catch (error) {
    formErrors.value = error.response.data.errors
    showToast({
      message: 'Não foi possível realizar o cadastro. ' +
               'Verifique os erros e tente novamente',
      color: 'danger'
    })
  }
}

const processSuccess = () => {
  showToast({
    message: 'Cadastro realizado com sucesso!',
    color: 'success'
  })

  router.push('/evaluated')
}
</script>


<template>
  <va-card
    class="sm:mx-12 sm:px-6 ms-20 me-6 px-6 sm:mx-auto my-6 sm:my-12"
  >
    <va-card-title>
      Cadastrar avaliado
    </va-card-title>

    <va-card-content>
      <va-form
        class="flex flex-col gap-2 mb-2"
        @submit.prevent="submit"
        tag="form"
      >
        <va-input
          autofocus
          v-model="evaluated.name"
          label="Nome"
          type="text"
        />

        <va-alert
          v-if="formErrors.name"
          dense
          color="warning"
          icon="warning"
          class="w-full"
        >
          Nome {{ formErrors.name[0] }}
        </va-alert>

        <va-input
          v-model="evaluated.cpf"
          label="CPF"
          type="number"
        />

        <va-alert
          v-if="formErrors.cpf"
          dense
          color="warning"
          icon="warning"
          class="w-full"
        >
          CPF {{ formErrors.cpf[0] }}
        </va-alert>

        <va-input
          v-model="evaluated.email"
          label="E-mail"
          type="email"
        />

        <va-alert
          v-if="formErrors.email"
          dense
          color="warning"
          icon="warning"
          class="w-full"
        >
          E-mail {{ formErrors.email[0] }}
        </va-alert>

        <va-input
          v-model="evaluated.birth_date"
          label="Data de nascimento"
          type="date"
        />

        <va-alert
          v-if="formErrors.birth_date"
          dense
          color="warning"
          icon="warning"
          class="w-full"
        >
          Data de nascimento {{ formErrors.birth_date[0] }}
        </va-alert>
        <span>
          <va-button type="submit"> Salvar </va-button>
        </span>
      </va-form>
    </va-card-content>
  </va-card>
</template>
