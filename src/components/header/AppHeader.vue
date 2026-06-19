<script setup lang="ts">
import { ref } from 'vue'

// Эмиттер для связи с главным файлом App.vue (открытие боковой панели)
const emit = defineEmits<{
  (e: 'open-panel', mode: 'presets' | 'history' | 'settings'): void
}>()

// Состояние темы: true — включена тёмная тема, false — светлая
const isDark = ref(false)

// Функция переключения темы
const toggleTheme = () => {
  isDark.value = !isDark.value
  
  // Для того чтобы в Tailwind заработал Dark Mode, нужно вешать класс 'dark' на самый корень страницы (тег <html>)
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<template>
  <header class="h-16 shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 z-10 relative transition-colors duration-300">
    
    <div class="flex flex-col">
      <h1 class="font-bold text-lg leading-tight flex items-center gap-2">
        <span class="text-blue-600">⚡</span> Симулятор аккумулятора
      </h1>
      <span class="text-xs text-slate-500">Цифровой двойник</span>
    </div>

    <div class="hidden md:flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
      <button class="px-6 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-slate-700 shadow-sm transition-colors">
        Заряд
      </button>
      <button class="px-6 py-1.5 text-sm font-medium rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
        Разряд
      </button>
    </div>

    <div class="flex items-center gap-3">
      
      <button 
        @click="toggleTheme" 
        class="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-lg transition-all duration-200 active:scale-95 shadow-sm"
        title="Переключить тему оформления"
      >
        <span v-if="isDark">☀️</span>
        <span v-else>🌙</span>
      </button>

      <button 
        @click="emit('open-panel', 'presets')" 
        class="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-base font-bold transition-colors active:scale-95 shadow-sm"
      >
        ⋮
      </button>
    </div>
    
  </header>
</template>