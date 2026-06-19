<script setup lang="ts">
import { ref } from 'vue'
import { useSimulation } from '../../composables/useSimulation'

const emit = defineEmits<{
  (e: 'open-panel', mode: 'presets' | 'history' | 'settings'): void
}>()

const { currentMode } = useSimulation()

const isDark = ref(false)
const isMenuOpen = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  
  // Для того чтобы в Tailwind заработал Dark Mode,
  // нужно вешать класс 'dark' на самый корень страницы (тег <html>)
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const handleMenuClick = (mode: 'presets' | 'history' | 'settings') => {
  isMenuOpen.value = false
  emit('open-panel', mode)
}
</script>

<template>
  <header
    class="sticky top-0 h-16 shrink-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700
           grid grid-cols-2 md:grid-cols-3 items-center px-6 z-40 transition-colors duration-300"
  >
    <div class="flex flex-col justify-self-start">
      <h1 class="font-logo font-bold text-xl leading-tight flex items-center gap-2 text-slate-800 dark:text-white">
        <span class="text-blue-600">⚡</span> Симулятор аккумулятора
      </h1>

      <span class="font-body text-xs text-slate-500">
        Цифровой двойник
      </span>
    </div>

    <div class="hidden md:flex relative justify-self-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl shadow-sm w-52">
      
      <div 
        class="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-slate-700 rounded-lg shadow-sm transition-transform duration-300 ease-in-out"
        :class="currentMode === 'discharge' ? 'translate-x-full' : 'translate-x-0'"
      ></div>

      <button 
        @click="currentMode = 'charge'"
        class="relative z-10 w-1/2 py-1.5 font-body text-sm font-semibold transition-colors duration-300"
        :class="currentMode === 'charge' ? 'text-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'"
      >
        Заряд
      </button>
      
      <button 
        @click="currentMode = 'discharge'"
        class="relative z-10 w-1/2 py-1.5 font-body text-sm font-semibold transition-colors duration-300"
        :class="currentMode === 'discharge' ? 'text-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'"
      >
        Разряд
      </button>
    </div>

    <div class="flex items-center gap-3 relative justify-self-end">
      
      <button 
        @click="toggleTheme"
        class="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
        title="Переключить тему оформления"
      >
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          class="w-5 h-5"
        >
          <path
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
          />
        </svg>
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
        class="absolute top-14 right-0 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1.5 z-40 flex flex-col font-body"
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