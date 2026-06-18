<script setup lang="ts">
// Здесь логика получения текущего SOC из composables/useSimulation.ts
</script>

<template>
  <div class="w-full max-w-[160px] aspect-[1/2.5] bg-slate-100 dark:bg-slate-900 border-4 border-slate-300 dark:border-slate-600 rounded-3xl relative overflow-hidden flex flex-col justify-end p-1">
    
    <div class="bg-gradient-to-t from-green-500 to-green-400 w-full rounded-2xl transition-all duration-500 ease-in-out relative flex items-center justify-center flex-col" style="height: 78%;">
      <span class="text-white font-bold text-2xl drop-shadow-md">78%</span>
      <span class="text-white/90 text-sm font-medium mt-1">3.87 V</span>
    </div>

    <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-1/3 h-3 bg-slate-300 dark:bg-slate-600 rounded-t-md"></div>
  </div>
  
  <div class="absolute bottom-6 text-center">
    <p class="text-xs text-slate-500">Осталось времени</p>
    <p class="text-sm font-medium">2 ч 35 мин</p>
  </div>
</template>