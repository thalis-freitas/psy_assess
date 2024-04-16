<script setup>
import { evaluationsApi } from '@/services/evaluationsApi'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vuestic-ui'

const { init: showToast } = useToast()

const route = useRoute()
const evaluation = ref({})

const fetchEvaluation = async () => {
  try {
    const response = await evaluationsApi.getEvaluationById(route.params.id)

    evaluation.value = response.data.evaluation
  } catch (error) {
    showToast({
      message: `Erro ao obter os dados da avaliação: ${error.response.data.errors}`,
      color: 'danger'
    })
  }
}

onMounted(fetchEvaluation)
</script>

<template>
  <va-card
    class="sm:m-12 ms-20 me-6 px-6 my-6"
    color="secondary"
    gradient
    v-if="evaluation.status == 'finished'"
  >
    <va-card-title>
      Informações da avaliação finalizada
    </va-card-title>

    <va-card-content>
      <ul class="ps-4 list-disc">
        <li>
          Avaliado: {{ evaluation.evaluated }}
        </li>
        <li>
          Instrumento: {{ evaluation.instrument }}
        </li>
        <li>
          Descrição: {{ evaluation.description }}
        </li>
        <li>
          Resultado: {{ evaluation.score }}
        </li>
      </ul>
    </va-card-content>
  </va-card>

  <va-card
    v-else
    class="sm:px-6 ms-20 me-6 px-4 sm:mx-12 my-6 sm:my-12 py-2"
    color="secondary"
    gradient
  >
    <va-card-title>
      Informações da avaliação finalizada
    </va-card-title>
    <va-card-content>
      Avaliação em andamento!
    </va-card-content>
  </va-card>
</template>
