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

const errors = ref({})

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
      message: `Erro ao obter os dados do instrumento: ${error.response.data.errors}`,
      color: 'danger'
    })
  } finally {
    loading.value = false
  }
}

onMounted(fetchEvaluation)

const submitResponses = async () => {
  errors.value = {}

  try {
    await processSubmit()
  } catch (error) {
    errors.value = error.response.data.errors

    showToast({
      message: 'Ocorreu um erro ao enviar as respostas.',
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
    v-else
    class="sm:mx-12 sm:px-6 ms-20 me-6 px-6 sm:mx-12 my-6 sm:my-12"
    color="secondary"
    gradient
  >
    <va-card-title>
      Execução do instrumento - {{ evaluation.instrument.name }}
    </va-card-title>

    <va-card-content>
      <va-alert
        v-if="errors.base"
        dense
        color="warning"
        icon="warning"
        class="w-full mb-4"
      >
        {{ errors.base[0] }}
      </va-alert>

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
