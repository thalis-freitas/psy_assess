<script setup>
import { ref, onMounted } from 'vue'
import { evaluatedApi } from '@/services/evaluatedApi'
import shuffle from 'lodash/shuffle'
import DataTable from '@/components/DataTable.vue'

const evaluatedList = ref([])

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nome' },
  { key: 'cpf', label: 'CPF' },
  { key: 'email', label: 'E-mail' },
  { key: 'birth_date', label: 'Data de nascimento' }
]

const fetchEvaluated = async () => {
  try {
    const response = await evaluatedApi.getAllEvaluated()
    evaluatedList.value = shuffle(response.data.evaluated)
  } catch (error) {
    console.error(`Erro ao obter dados: ${error}`)
  }
}

onMounted(fetchEvaluated)

const sortBy = ref('name')
const sortingOrder = ref('asc')
const filteredCount = ref(0)
</script>


<template>
  <va-card
    class="sm:mx-12 sm:px-6 ms-20 me-6 px-6 sm:mx-auto my-6 sm:my-12"
  >
    <va-card-title>
      Avaliados
    </va-card-title>
    <data-table
      :items="evaluatedList"
      :base-columns="columns"
      :initial-sort-by="sortBy"
      :initial-sorting-order="sortingOrder"
      @update:filteredCount="filteredCount = $event"
    />
  </va-card>
</template>
