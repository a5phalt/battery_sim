<script setup lang="ts">
import ParametersPanel from '../components/parameters/ParametersPanel.vue'
import BatteryVisualization from '../components/battery/BatteryVisualization.vue'
import GraphsArea from '../components/charts/GraphsArea.vue'
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full flex-1">
    
    <section class="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col overflow-y-auto">
      <ParametersPanel />
    </section>

    <section class="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col items-center justify-center relative">
      <BatteryVisualization />
    </section>

    <section class="lg:col-span-6 flex flex-col gap-6">
      <GraphsArea />
    </section>

  </div>
</template>