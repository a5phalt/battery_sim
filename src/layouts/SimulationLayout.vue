<script setup lang="ts">
import ParametersPanel from '../components/parameters/ParametersPanel.vue'
import BatteryVisualization from '../components/battery/BatteryVisualization.vue'
import VoltageChart from '../components/charts/VoltageChart.vue'
import SocChart from '../components/charts/SocChart.vue'
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
      <VoltageChart :timeLabels="[]" :voltageData="[]" />
      <SocChart :timeLabels="[]" :socData="[]" />
    </section>

  </div>
</template>