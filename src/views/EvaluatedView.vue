<script setup>
import { ref, onMounted } from 'vue'
import { evaluatedApi } from '@/services/evaluatedApi'
import { useRouter } from 'vue-router'
import { useToast } from 'vuestic-ui'
import shuffle from 'lodash/shuffle'

const router = useRouter()
const evaluatedList = ref([])
const localFilter = ref('')
const sortBy = ref('name')
const sortingOrder = ref('asc')
const { init: showToast } = useToast()

const sortingConfig = { sortable: true, sortingOptions: ['desc', 'asc'] }

const columns = [
  { key: 'id', label: 'ID', ...sortingConfig },
  { key: 'name', label: 'Nome', ...sortingConfig },
  { key: 'cpf', label: 'CPF', ...sortingConfig },
  { key: 'email', label: 'E-mail', ...sortingConfig },
  { key: 'birth_date', label: 'Data de nascimento', ...sortingConfig },
  { key: 'actions', label: '-', sortable: false }
]

const fetchEvaluated = async () => {
  try {
    const response = await evaluatedApi.getAllEvaluated()
    evaluatedList.value = shuffle(response.data.evaluated)
  } catch (error) {
    console.log(error)
    showToast({
      message: `Erro ao obter os dados: ${error.response.data.errors}`,
      color: 'danger'
    })
  }
}

onMounted(fetchEvaluated)

const addNewEvaluated = () => {
  router.push({ name: 'evaluatedForm' })
}

const updateEvaluated = (index) => {
  const evaluatedId = evaluatedList.value[index].id
  router.push({ name: 'evaluatedFormEdit', params: { id: evaluatedId } })
}

const showEvaluated = (index) => {
  const evaluatedId = evaluatedList.value[index].id
  router.push({ name: 'showEvaluated', params: { id: evaluatedId } })
}
</script>

<template>
  <va-card class="sm:mx-12 sm:px-6 ms-20 me-6 px-6 sm:mx-12 my-6 sm:my-12">
    <div class="flex justify-between items-center">
      <va-card-title>
        Avaliados
      </va-card-title>
      <div class="flex flex-col items-end me-2">
        <va-button
          icon="add"
          color="success"
          gradient
          @click="addNewEvaluated"
        >
          Novo Avaliado
        </va-button>
      </div>
    </div>

    <div class="mb-6 px-2">
      <va-input v-model="localFilter" placeholder="Buscar..." class="w-full" />
    </div>

    <va-data-table
      v-model:sort-by="sortBy"
      v-model:sorting-order="sortingOrder"
      :items="evaluatedList"
      :columns="columns"
      :filter="localFilter"
      class="pb-6"
      striped
    >
    <template #cell(actions)="{ rowIndex }">
      <va-button
        preset="plain"
        icon="edit"
        @click="updateEvaluated(rowIndex)"
        class="pe-2"
      />

      <va-button
        preset="plain"
        icon="visibility"
        @click="showEvaluated(rowIndex)"
      />
    </template>
    </va-data-table>
  </va-card>
</template>
