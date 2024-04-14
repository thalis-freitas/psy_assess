<script setup>
import { instrumentsApi } from '@/services/instrumentsApi'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const instrument = ref({})

const fetchInstrument = async () => {
  try {
    const response = await instrumentsApi.getInstrumentById(route.params.id)

    instrument.value = response.data
  } catch (error) {
    showToast({
      message: `Erro ao obter os dados do instrumento: ${error.response.data.errors}`,
      color: 'danger'
    })
  }
}

onMounted(fetchInstrument)
</script>

<template>
  <va-card
    class="sm:mx-12 sm:px-6 ms-20 me-6 px-6 sm:mx-12 my-6 sm:my-12"
    color="secondary"
    gradient
  >
    <va-card-title>
      Informações do instrumento - {{ instrument.name }}
    </va-card-title>

    <va-card-content>
      <ul class="ps-4 list-disc">
        <li>
          Nome: {{ instrument.name }}
        </li>
        <li>
          Descrição: {{ instrument.description }}
        </li>

      </ul>
    </va-card-content>

    <va-card-title>
      Questões do Instrumento
    </va-card-title>

    <va-card-content>
      <div
        v-for="question in instrument.questions"
        :key="question.id" class="mb-4"
      >
        <va-card outlined class="ps-3 mb-2">
          {{ question.text }}
        </va-card>
        <ul class="ps-4 list-decimal">
          <li v-for="option in question.options" :key="option.id">
            {{ option.text }} (Valor: {{ option.score_value }})
          </li>
        </ul>
      </div>

    </va-card-content>
  </va-card>
</template>
