<script setup lang="ts">
// Определяем эмиттер для связи с App.vue (открытие боковых панелей)
const emit = defineEmits<{
  (e: 'open-panel', mode: 'presets' | 'history' | 'settings'): void
}>()
</script>

<template>
  <header class="h-16 shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 z-10 relative">
    
    <div class="flex flex-col">
      <h1 class="font-bold text-lg leading-tight flex items-center gap-2">
        <span class="text-blue-600">⚡</span> Симулятор аккумулятора
      </h1>
      <span class="text-xs text-slate-500">Цифровой двойник</span>
    </div>

    <div class="hidden md:flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
      <button class="px-6 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-slate-700 shadow-sm">Заряд</button>
      <button class="px-6 py-1.5 text-sm font-medium rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white">Разряд</button>
    </div>

    <div class="flex items-center gap-3">
      <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">☀️</button>
      <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">🌙</button>
      <button @click="emit('open-panel', 'presets')" class="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600">⋮</button>
    </div>
    
  </header>
</template>