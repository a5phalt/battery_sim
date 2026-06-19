<script setup lang="ts">
import { ref } from 'vue'
import ParametersPanel from '../components/parameters/ParametersPanel.vue'
import BatteryVisualization from '../components/battery/BatteryVisualization.vue'
import VoltageChart from '../components/charts/VoltageChart.vue'
import SocChart from '../components/charts/SocChart.vue'
import type { SimulationPoint } from '../types/SimulationPoint'

// Точки симуляции от аналитика (логика полностью сохранена)
const simulationPoints = ref<SimulationPoint[] | null>(null)
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 w-full">
    
    <section class="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col transition-colors duration-300">
      <ParametersPanel />
    </section>

    <section class="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col items-center justify-center relative transition-colors duration-300 min-h-[500px]">
      <BatteryVisualization />
    </section>

    <section class="lg:col-span-6 flex flex-col gap-6 w-full">
      
      <div class="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col min-h-[250px] transition-colors duration-300">
        <h3 class="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">Напряжение (V)</h3>
        <div class="flex-1 relative w-full h-full flex flex-col justify-center items-center">
          <VoltageChart :points="simulationPoints" class="w-full h-full" />
        </div>
      </div>

      <div class="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col min-h-[250px] transition-colors duration-300">
        <h3 class="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">Заряд (SOC, %)</h3>
        <div class="flex-1 relative w-full h-full flex flex-col justify-center items-center">
          <SocChart :points="simulationPoints" class="w-full h-full" />
        </div>
      </div>

    </section>

  </div>
</template>