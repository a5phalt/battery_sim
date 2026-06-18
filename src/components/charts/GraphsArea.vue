<script setup lang="ts">
// Импорты: VoltageChart, SocChart
</script>

<template>
  <div class="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col min-h-[250px]">
    <h3 class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Напряжение (V)</h3>
    <div class="flex-1 border border-dashed border-slate-200 dark:border-slate-700 rounded flex items-center justify-center text-slate-400 text-sm">
      [ Компонент VoltageChart.vue (Аналитик) ]
    </div>
  </div>

  <div class="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col min-h-[250px]">
    <h3 class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Заряд (SOC, %)</h3>
    <div class="flex-1 border border-dashed border-slate-200 dark:border-slate-700 rounded flex items-center justify-center text-slate-400 text-sm">
      [ Компонент SocChart.vue (Аналитик) ]
    </div>
  </div>
</template>