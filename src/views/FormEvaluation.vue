<script setup>
import { evaluationsApi } from '@/services/evaluationsApi'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vuestic-ui'

const { init: showToast } = useToast()
const route = useRoute()
const evaluation = ref({
  instrument: {
    questions: []
  }
})

const loading = ref(true)
const responses = ref({})

const fetchEvaluation = async () => {
  try {
    const response = await evaluationsApi.getStartEvaluation(route.params.id)

    evaluation.value = response.data.evaluation

    evaluation.value.instrument.questions.forEach(question => {
      responses.value[question.id] = null
    })
  } catch (error) {
    showToast({
      message: `Erro ao obter os dados do instrumento: ${error.response.data.message}`,
      color: 'danger'
    })
  } finally {
    loading.value = false
  }
}

onMounted(fetchEvaluation)

const submitResponses = async () => {
  try {
    await processSubmit()
  } catch (error) {
    showToast({
      message:  'Ocorreu um erro ao enviar as respostas! Tente novamente.',
      color: 'danger'
    })
  }
}

const processSubmit = async () => {
  const answers = []

  Object.entries(responses.value).forEach(([questionId, optionId]) => {
    answers.push({ question_id: questionId, option_id: optionId })
  })

  await evaluationsApi.submitAnswers(evaluation.value.id, { answers: answers })
  showToast({
    message: 'Respostas enviadas com sucesso!',
    color: 'success'
  })

  fetchEvaluation()
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

  <va-progress-bar class="pb-6"  v-if="loading" indeterminate />

  <va-card
    v-else-if="evaluation.status == 'finished'"
    class="sm:px-6 ms-20 me-6 px-4 sm:mx-12 my-6 sm:my-12 py-2"
    color="secondary"
    gradient
  >
    <va-card-title>
      Execução do instrumento
    </va-card-title>
    <va-card-content>
      Instrumento finalizado!
    </va-card-content>
  </va-card>
  <va-card
    v-else
    class="sm:m-12 ms-20 me-6 px-6 my-6"
    color="secondary"
    gradient
  >
    <va-card-title>
      Execução do instrumento - {{ evaluation.instrument.name }}
    </va-card-title>
    <va-card-content>
      <form
        @submit.prevent="submitResponses" :key="evaluation.id"
      >
        <div
          v-for="question in evaluation.instrument.questions"
          :key="question.id"
          class="mb-4"
        >
          <va-card outlined class="ps-3 mb-2">
            {{ question.text }}
          </va-card>
          <ul class="ps-4 list-decimal">
            <li v-for="option in question.options" :key="option.id">
              <va-radio
                v-model="responses[question.id]"
                :option="option.id"
                :label="option.text"
                :name="`question-${question.id}`"
              />
            </li>
          </ul>
        </div>

        <va-button
          type="submit"
          color="success"
        >
          Finalizar
        </va-button>
      </form>
    </va-card-content>
  </va-card>
</template>
