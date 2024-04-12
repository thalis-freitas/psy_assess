<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  items: Array,
  baseColumns: Array,
  initialSortBy: String,
  initialSortingOrder: String
})

const addSorting = (columns) => {
  return columns.map(column => ({
    ...column,
    sortable: true,
    sortingOptions: ["desc", "asc"]
  }))
}

const columns = addSorting(props.baseColumns);

const emit = defineEmits(['update:filteredCount'])

const localFilter = ref('')
const localSortBy = ref(props.initialSortBy || 'name')
const localSortingOrder = ref(props.initialSortingOrder || 'asc')
const filteredCount = ref(props.items.length)

const updateFilteredCount = (event) => {
  filteredCount.value = event.items.length
  emit('update:filteredCount', filteredCount.value)
}

watch(() => props.items, (newVal) => filteredCount.value = newVal.length )

</script>

<template>
  <div class="mb-6 px-2">
    <va-input v-model="localFilter" placeholder="Buscar..." class="w-full" />
  </div>

  <va-data-table
    v-model:sort-by="localSortBy"
    v-model:sorting-order="localSortingOrder"
    :items="items"
    :columns="columns"
    :filter="localFilter"
    @filtered="updateFilteredCount"
    hoverable
    class="pb-6"
  />
</template>
