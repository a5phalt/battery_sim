<script setup lang="ts">
// Здесь в будущем будут импорты: BatteryTypeSelect, PresetSelect, ParameterSlider
</script>

<template>
  <div class="flex flex-col h-full">
    <h2 class="text-base font-semibold mb-4">Параметры</h2>
    
    <div class="flex-1 flex flex-col gap-5">
      <div class="flex flex-col gap-1">
        <label class="text-xs text-slate-500">Тип батареи</label>
        <select class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
          <option>Li-Ion</option>
        </select>
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs text-slate-500">Пресет</label>
        <select class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
          <option>18650 Li-ion (3.0 Ah)</option>
        </select>
      </div>

      <div class="flex flex-col gap-4 mt-2">
        <div class="border-t border-slate-100 dark:border-slate-700 pt-4 text-xs text-slate-400 text-center">
          [ Компоненты ползунков (Ёмкость, Ток, Напряжение) будут здесь ]
        </div>
      </div>
    </div>

    <div class="mt-auto pt-4 flex gap-2 border-t border-slate-100 dark:border-slate-700">
      <button class="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-2 rounded-md text-sm font-medium transition-colors">
        Сбросить
      </button>
      <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium shadow-sm transition-colors">
        Применить
      </button>
    </div>
  </div>
</template>