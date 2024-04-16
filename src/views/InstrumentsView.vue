<script setup>
import { ref, onMounted } from 'vue'
import { instrumentsApi } from '@/services/instrumentsApi'
import { useRouter } from 'vue-router'
import { useToast } from 'vuestic-ui'
import shuffle from 'lodash/shuffle'

const router = useRouter()
const instrumentsList = ref([])
const localFilter = ref('')
const sortBy = ref('name')
const sortingOrder = ref('asc')
const { init: showToast } = useToast()
const loading = ref(true)

const sortingConfig = { sortable: true, sortingOptions: ['desc', 'asc'] }

const columns = [
  { key: 'id', label: 'ID', ...sortingConfig },
  { key: 'name', label: 'Nome', ...sortingConfig },
  { key: 'actions', label: '-', sortable: false }
]

const fetchInstruments = async () => {
  try {
    const response = await instrumentsApi.getAllInstruments()
    instrumentsList.value = shuffle(response.data)
  } catch (error) {
    showToast({
      message: `Erro ao obter as informações dos instrumentos: ${error.response.data.errors}`,
      color: 'danger'
    })
  } finally {
    loading.value = false
  }
}

onMounted(fetchInstruments)

const showInstrument = (index) => {
  const instrumentId = instrumentsList.value[index].id
  router.push({ name: 'showInstrument', params: { id: instrumentId } })
}
</script>

<template>
  <va-card class="sm:m-12 ms-20 me-6 px-6 my-6">
    <va-card-title>
      Instrumentos
    </va-card-title>

    <div class="mb-6 px-2">
      <va-input v-model="localFilter" placeholder="Buscar..." class="w-full" />
    </div>

    <va-progress-bar class="pb-6" v-if="loading" indeterminate />

    <va-data-table
      v-else
      v-model:sort-by="sortBy"
      v-model:sorting-order="sortingOrder"
      :items="instrumentsList"
      :columns="columns"
      :filter="localFilter"
      class="pb-6"
      striped
    >
    <template #cell(actions)="{ rowIndex }">
      <va-button
        preset="plain"
        icon="visibility"
        @click="showInstrument(rowIndex)"
      />
    </template>
    </va-data-table>
  </va-card>
</template>
