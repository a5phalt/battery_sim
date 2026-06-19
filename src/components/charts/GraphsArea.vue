<script setup lang="ts">
import { ref } from 'vue'
import VoltageChart from './VoltageChart.vue'
import SocChart from './SocChart.vue'
import type { SimulationPoint } from '../../types/SimulationPoint'

// Данные для графиков (пока заглушка, потом подключишь к симуляции)
const simulationPoints = ref<SimulationPoint[] | null>(null)
</script>

<template>
  <!-- График напряжения -->
  <div class="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col min-h-[250px]">
    <h3 class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Напряжение (V)</h3>
    <VoltageChart :points="simulationPoints" />
  </div>

  <!-- График SOC -->
  <div class="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col min-h-[250px]">
    <h3 class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Заряд (SOC, %)</h3>
    <SocChart :points="simulationPoints" />
  </div>
</template>