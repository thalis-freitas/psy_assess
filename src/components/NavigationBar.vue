
<script setup>
  defineProps({
    showSidebar: Boolean
  })

  defineEmits(['toggleSidebar'])
</script>

<template>
  <va-navbar color="primary" class="py-2">
    <template #left>
      <va-button
        :icon="$props.showSidebar ? 'menu_open' : 'menu'"
        @click="$emit('toggleSidebar')"
      />
    </template>
    <template #center>
      <va-navbar-item class="font-bold text-lg">
        PsyAssess
      </va-navbar-item>
    </template>
  </va-navbar>
</template>
