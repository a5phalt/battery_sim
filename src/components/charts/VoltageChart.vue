<script setup lang="ts">
// АРХИТЕКТУРНЫЙ КОНТРАКТ:
// Говорим компоненту, что он должен принимать массивы чисел для отрисовки.
// Аналитик (математик) потом передаст сюда рассчитанные данные из useSimulation.
defineProps<{
  timeLabels: number[]   // Массив времени (ось X)
  voltageData: number[]  // Массив напряжения (ось Y)
}>()

// Заметка для Аналитика: здесь будет логика инициализации Chart.js
</script>

<template>
  <div class="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col min-h-[260px] transition-colors duration-300">
    
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-semibold text-slate-800 dark:text-slate-200">Напряжение (V)</h3>
    </div>
    
    <div class="flex-1 relative w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-900/40 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
      
      <span class="text-xs font-medium text-slate-400 text-center px-4">
        Ожидание данных от математической модели...<br/>
        <span class="text-[10px] opacity-70">(Место для Chart.js)</span>
      </span>
      
      </div>
  </div>
</template>