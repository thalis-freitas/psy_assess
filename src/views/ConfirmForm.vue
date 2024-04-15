<script setup>
import { confirmApi } from '@/services/confirmApi'
import { convertDate } from '@/helpers/dateUtils'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vuestic-ui'

const { init: showToast } = useToast()

const route = useRoute()

const evaluationId = ref('')

const evaluated = ref({
  name: '',
  cpf: '',
  email: '',
  birth_date: ''
})

const formErrors = ref([])

onMounted(async () => {
  const token = route.params.token
  if (token) {
    try {
      const response = await confirmApi.getConfirm(token)

      evaluated.value = response.data.evaluated
      evaluationId.value = response.data.evaluation.id
      evaluated.value.birth_date = convertDate(evaluated.value.birth_date)
    } catch (error) {
      showToast({
        message: 'Erro ao obter os dados do avaliado.',
        color: 'danger'
      })
    }
  }
})

const confirmDataToStartInstrument = async () => {
  formErrors.value = {}

  try {
    await confirmApi.postConfirmData(evaluationId.value, {
      evaluated: evaluated.value
    })

    showToast({
      message: 'Dados confirmados!',
      color: 'success'
    })
  } catch (error) {
    formErrors.value = error.response.data.errors
    showToast({
      message: 'Não foi possível realizar a operação. ' +
               'Verifique os erros e tente novamente',
      color: 'danger'
    })
  }
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
    class="sm:w-1/2 mx-6 sm:mx-auto my-6 sm:my-12"
    color="secondary"
    gradient
  >
    <va-card-title>
      Confirmação de dados para iniciar o instrumento
    </va-card-title>

    <va-card-content>
      <va-form
        class="flex flex-col gap-2 mb-2"
        @submit.prevent="confirmDataToStartInstrument"
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
          <va-button type="submit"> Próximo </va-button>
        </span>
      </va-form>
    </va-card-content>
  </va-card>
</template>
