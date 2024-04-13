<script setup>
  import { ref } from 'vue'
  import { useBreakpoint } from 'vuestic-ui'
  import NavBar from './NavigationBar.vue'

  const showSidebar = ref(window.innerWidth <= 640)
  const breakpoints = useBreakpoint()

  window.addEventListener('resize', () => {
    showSidebar.value = window.innerWidth <= 640
  })
</script>

<template>
  <va-layout
    style="height: 100vh"
    :left="{ absolute: breakpoints.smDown }"
  >
    <template #top>
      <nav-bar
        :showSidebar="showSidebar"
        @toggleSidebar="showSidebar = !showSidebar"
      />
    </template>

    <template #left>
      <va-sidebar class="py-4" :minimized="showSidebar" minimized-width="64px">
        <router-link to="/">
          <va-sidebar-item>
            <va-sidebar-item-content>
              <va-icon name="quiz" />
              <va-sidebar-item-title>
                Instrumentos
              </va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
        </router-link>

        <router-link to="/evaluated">
          <va-sidebar-item>
            <va-sidebar-item-content>
              <va-icon name="people" />
              <va-sidebar-item-title>
                Avaliados
              </va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
        </router-link>

      </va-sidebar>
    </template>

    <template #content>
      <div
        class="pb-1 overflow-y-auto h-screen"
        style="height: calc(100vh - 80px)"
      >
        <router-view/>
      </div>
    </template>

  </va-layout>
</template>
