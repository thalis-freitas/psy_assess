<script setup>
import { evaluatedApi } from '@/services/evaluatedApi'
import { evaluationsApi } from '@/services/evaluationsApi'
import { instrumentsApi } from '@/services/instrumentsApi'
import { onMounted, ref } from 'vue'
import shuffle from 'lodash/shuffle'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vuestic-ui'

const { init: showToast } = useToast()

const loading = ref(false)
const route = useRoute()
const router = useRouter()
const evaluated = ref({})
const showModal = ref(false)

const instrument = ref('')
const instruments = ref([])
const formErrors = ref([])

const evaluatedInstuments = ref([])

const fetchEvaluated = async () => {
  try {
    const response = await evaluatedApi.getEvaluatedById(route.params.id)

    evaluated.value = response.data.evaluated
  } catch (error) {
    showToast({
      message: `Erro ao obter os dados do avaliado: ${error.response.data}`,
      color: 'danger'
    })
  }
}

const fetchInstruments = async () => {
  try {
    const response = await instrumentsApi.getAllInstruments()

    instruments.value = shuffle(response.data).map(instrument => ({
      text: instrument.name,
      id: instrument.id
    }))
  } catch (error) {
    showToast({
      message: `Erro ao carregar os instrumentos: ${error.response.data}`,
      color: 'danger'
    })
  } finally {
    loading.value = false
  }
}

const fetchEvaluatedInstruments = async () => {
  try {
    const response = await evaluatedApi.getInstuments(route.params.id)

    evaluatedInstuments.value = response.data
  } catch (error) {
    showToast({
      message: `Erro ao obter os instumentos do avaliado: ${error.response.data}`,
      color: 'danger'
    })
  }
}

onMounted(
  fetchEvaluated(),
  fetchInstruments(),
  fetchEvaluatedInstruments()
)

const applyInstrument = async () => {
  console.log(instrument.value)

  try {
    await evaluationsApi.applyInstrument({
      evaluated_id: evaluated.value.id,
      instrument_id: instrument.value.id
    })

    processSuccess()
  } catch (error) {
    formErrors.value = error.response.data

    showToast({
      message: 'Ocorreu um erro ao aplicar o instrumento',
      color: 'danger'
    })
  }
}

const processSuccess = () => {
  showToast({
    message: 'Instrumento aplicado com sucesso!',
    color: 'success'
  })

  fetchEvaluatedInstruments()
  showModal.value = false
}

const goToEvaluation = (evaluationId) => {
  router.push({ name: 'showEvaluation', params: { id: evaluationId } })
}

</script>

<template>
  <va-card
    class="sm:mx-12 sm:px-6 ms-20 me-6 px-6 sm:mx-12 my-6 sm:my-12"
  >
    <div class="flex justify-between items-center">
      <va-card-title>
        Informações - {{ evaluated.name }}
      </va-card-title>
      <div class="flex flex-col items-end me-2">
        <va-button
          icon="send"
          color="secondary"
          gradient
          @click="showModal = !showModal"
        >
          Aplicar Instrumento
        </va-button>
      </div>
    </div>

    <va-card-content>
      <va-card class="ps-3 py-2 mb-2">
        Nome: {{ evaluated.name }} <br>
        CPF: {{ evaluated.cpf }} <br>
        E-mail: {{ evaluated.email }} <br>
        Data de nascimento: {{ evaluated.birth_date }}
      </va-card>

      <va-card
        v-if="evaluatedInstuments && evaluatedInstuments.length > 0"
        outlined
        class="ps-3 mb-2"

      >
        <va-card-title>
          Instrumentos aplicados
        </va-card-title>


        <div
          v-for="instrument in evaluatedInstuments" :key="instrument.id"
          class="flex flex-col"
        >
          <div>
            <va-badge
              v-if="instrument.status == 'finished'"
              text="finalizado"
              color="success"
              class="top-2 mx-14"
            />

            <va-badge
              v-else-if="instrument.status == 'sent'"
              text="enviado"
              color="primary"
              class="top-2 mx-14"
            />

            <va-badge
              v-else
              text="erro | e-mail não enviado"
              color="danger"
              class="top-2 mx-14"
            />

            <va-button
              class="mb-2 pointer mx-12 block"
              @click="goToEvaluation(instrument.id)"
              :disabled="instrument.status != 'finished'"
              preset="secondary"
            >
              {{ instrument.name }}
            </va-button>
          </div>
        </div>
      </va-card>
    </va-card-content>
  </va-card>

  <va-modal
    v-model="showModal"
    hide-default-actions
  >
    <h3 class="va-h5">
      Aplicar instrumento para {{ evaluated.name }}
    </h3>

    <div class="mt-4 flex flex-col gap gap-4">
      <va-select
        v-model="instrument"
        :options="instruments"
        placeholder="Selecione um instrumento"
        searchable
        label="Instrumento"
      />

      <va-alert
        v-if="formErrors.instrument_id"
        dense
        color="warning"
        icon="warning"
        class="w-full"
      >
        {{ formErrors.instrument_id[0] }}
      </va-alert>

      <div>
        <va-button @click="applyInstrument">
          Aplicar
        </va-button>
      </div>
    </div>

  </va-modal>
</template>
