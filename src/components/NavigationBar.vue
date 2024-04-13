
<script setup>
  import api from '@/services/api'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useToast } from 'vuestic-ui'

  defineProps({
    showSidebar: Boolean
  })

  defineEmits(['toggleSidebar'])

  const router = useRouter()

  const { init: showToast } = useToast()

  const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))

  const logout = () => {
    localStorage.removeItem('psyAssessToken')
    localStorage.removeItem('currentUser')
    delete api.defaults.headers.common['Authorization']
    currentUser.value = ''
    showToast({ message: 'Até logo!', color: 'success'})
    router.push('login')
  }
</script>

<template>
  <va-navbar color="primary">
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

    <template #right>
      <va-navbar-item>
        <va-dropdown class="hidden sm:block">
          <template #anchor>
            {{ currentUser.name }}
          </template>

          <va-dropdown-content
            @click="logout"
            class="mt-4 pointer"
          >
            Sair
          </va-dropdown-content>
        </va-dropdown>

        <span
          class="block sm:hidden pointer"
          @click="logout"
        >
          Sair
        </span>
      </va-navbar-item>
    </template>
  </va-navbar>
</template>
