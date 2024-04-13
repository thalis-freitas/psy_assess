<script setup>
import { ref, onMounted } from 'vue'
import { instrumentsApi } from '@/services/instrumentsApi'
import { useToast } from 'vuestic-ui'
import shuffle from 'lodash/shuffle'

const instrumentsList = ref([])
const localFilter = ref('')
const sortBy = ref('name')
const sortingOrder = ref('asc')
const { init: showToast } = useToast()

const sortingConfig = { sortable: true, sortingOptions: ['desc', 'asc'] }

const columns = [
  { key: 'id', label: 'ID', ...sortingConfig },
  { key: 'name', label: 'Nome', ...sortingConfig },
]

const fetchInstruments = async () => {
  try {
    const response = await instrumentsApi.getAllInstruments()
    console.log(response)
    instrumentsList.value = shuffle(response.data)
  } catch (error) {
    console.log(error)
    showToast({
      message: `Erro ao obter os dados: ${error.response.data.errors}`,
      color: 'danger'
    })
  }
}

onMounted(fetchInstruments)
</script>

<template>
  <va-card class="sm:mx-12 sm:px-6 ms-20 me-6 px-6 sm:mx-12 my-6 sm:my-12">
    <va-card-title>
      Instrumentos
    </va-card-title>

    <div class="mb-6 px-2">
      <va-input v-model="localFilter" placeholder="Buscar..." class="w-full" />
    </div>

    <va-data-table
      v-model:sort-by="sortBy"
      v-model:sorting-order="sortingOrder"
      :items="instrumentsList"
      :columns="columns"
      :filter="localFilter"
      class="pb-6"
      striped
    >
    </va-data-table>
  </va-card>
</template>
