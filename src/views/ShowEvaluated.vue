<script setup>
import { evaluatedApi } from '@/services/evaluatedApi'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const evaluated = ref({})


const fetchEvaluated = async () => {
  try {
    const response = await evaluatedApi.getEvaluatedById(route.params.id)

    evaluated.value = response.data.evaluated
  } catch (error) {
    console.error(`Erro ao obter dados: ${error}`)
  }
}

onMounted(fetchEvaluated)
</script>

<template>
  <va-card
    class="sm:mx-12 sm:px-6 ms-20 me-6 px-6 sm:mx-12 my-6 sm:my-12"
    color="secondary"
    gradient
  >
    <va-card-title>
      Informações - {{ evaluated.name }}
    </va-card-title>

    <va-card-content>
      <va-card outlined class="ps-3 mb-2">
        Nome: {{ evaluated.name }}
      </va-card>
      <va-card outlined class="ps-3 mb-2">
        CPF: {{ evaluated.cpf }}
      </va-card>
      <va-card outlined class="ps-3 mb-2">
        E-mail: {{ evaluated.email }}
      </va-card>
      <va-card outlined class="ps-3 mb-2">
        Data de nascimento: {{ evaluated.birth_date }}
      </va-card>

    </va-card-content>

  </va-card>
</template>
