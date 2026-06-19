<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/header/AppHeader.vue'
import SimulationLayout from './layouts/SimulationLayout.vue'
import StatsBar from './components/stats/StatsBar.vue'
import SidePanel from './components/sidepanel/SidePanel.vue'

// Управление состоянием боковой панели (Архитектурная задача)
const isSidePanelOpen = ref(false)
const sidePanelMode = ref<'presets' | 'history' | 'settings'>('presets')

const openSidePanel = (mode: 'presets' | 'history' | 'settings') => {
  sidePanelMode.value = mode
  isSidePanelOpen.value = true
}

const closeSidePanel = () => {
  isSidePanelOpen.value = false
}
</script>

<template>
  <div class="min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col font-sans transition-colors duration-300 dark:bg-slate-900 dark:text-white">
    
    <AppHeader @open-panel="openSidePanel" />

    <main class="flex-1 p-4 lg:p-6 flex flex-col relative z-0">
      <SimulationLayout />
    </main>

    <div class="px-4 lg:px-6 pb-4 shrink-0 mt-auto">
      <StatsBar />
    </div>

    <SidePanel 
      :is-open="isSidePanelOpen" 
      :mode="sidePanelMode" 
      @close="closeSidePanel" 
    />
    
  </div>
</template>