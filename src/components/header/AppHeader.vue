<script setup lang="ts">
import { ref } from 'vue'

// Эмиттер для связи с главным файлом App.vue
const emit = defineEmits<{
  (e: 'open-panel', mode: 'presets' | 'history' | 'settings'): void
}>()

const isDark = ref(false)
const isMenuOpen = ref(false) // Состояние выпадающего меню

// Переключение светлой/темной темы
const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Функция для обработки клика по пункту выпадающего меню
const handleMenuClick = (mode: 'presets' | 'history' | 'settings') => {
  isMenuOpen.value = false // Сначала закрываем маленькое меню
  emit('open-panel', mode) // Затем даем команду App.vue открыть большую панель
}
</script>

<template>
  <header
    class="h-16 shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700
           grid grid-cols-2 md:grid-cols-3 items-center px-6 z-20 relative transition-colors duration-300"
  >
    <div class="flex flex-col justify-self-start">
      <h1 class="font-bold text-lg leading-tight flex items-center gap-2 text-slate-800 dark:text-white">
        <span class="text-blue-600">⚡</span> Симулятор аккумулятора
      </h1>
      <span class="text-xs text-slate-500">Цифровой двойник</span>
    </div>

    <div class="hidden md:flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg justify-self-center">
      <button class="px-6 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-slate-700 shadow-sm transition-colors text-slate-800 dark:text-white">
        Заряд
      </button>
      <button class="px-6 py-1.5 text-sm font-medium rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
        Разряд
      </button>
    </div>

    <div class="flex items-center gap-3 relative justify-self-end">
      
      <button 
        @click="toggleTheme" 
        class="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-lg transition-all duration-200 active:scale-95 shadow-sm"
      >
        <span v-if="isDark">☀️</span>
        <span v-else>🌙</span>
      </button>

      <button 
        @click="isMenuOpen = !isMenuOpen" 
        class="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-base font-bold transition-colors active:scale-95 shadow-sm text-slate-700 dark:text-slate-200"
        :class="{ 'bg-slate-200 dark:bg-slate-600': isMenuOpen }"
      >
        ⋮
      </button>

      <div 
        v-if="isMenuOpen" 
        @click="isMenuOpen = false" 
        class="fixed inset-0 z-30"
      ></div>

      <div 
        v-if="isMenuOpen"
        class="absolute top-14 right-0 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1.5 z-40 flex flex-col"
      >
        <button 
          @click="handleMenuClick('presets')" 
          class="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors w-full text-left"
        >
          <span class="text-blue-500 text-base">📘</span> Пресеты
        </button>

        <button 
          @click="handleMenuClick('settings')" 
          class="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors w-full text-left"
        >
          <span class="text-slate-400 text-base">⚙️</span> Настройки
        </button>

        <div class="h-px bg-slate-100 dark:bg-slate-700 my-1 mx-3"></div>

        <button 
          class="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-400 dark:text-slate-500 w-full text-left cursor-default"
        >
          <div class="flex items-center gap-3">
            <span class="text-slate-300 dark:text-slate-600 text-base">🕒</span> История
          </div>
          <span class="text-[10px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Скоро
          </span>
        </button>
      </div>

    </div>
  </header>
</template>