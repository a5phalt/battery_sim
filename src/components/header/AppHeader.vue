```vue
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

  // Для того чтобы в Tailwind заработал Dark Mode,
  // нужно вешать класс 'dark' на самый корень страницы (тег <html>)
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<template>
  <header
    class="h-16 shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700
           grid grid-cols-3 items-center px-6 z-10 relative transition-colors duration-300"
  >
    <div class="flex flex-col justify-self-start">
      <h1 class="font-logo font-bold text-xl leading-tight">
        Симулятор аккумулятора
      </h1>

      <span class="font-body text-xs text-slate-500">
        Цифровой двойник
      </span>
    </div>

    <div class="hidden md:flex justify-self-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl shadow-sm">
      <button
        class="font-body px-7 py-2 text-sm font-semibold rounded-lg bg-white dark:bg-slate-700 shadow-sm transition-all duration-200"
      >
        Заряд
      </button>

      <button
        class="font-body px-7 py-2 text-sm font-semibold rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
      >
        Разряд
      </button>
    </div>

    <div class="flex items-center gap-3 justify-self-end">

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
        @click="emit('open-panel', 'presets')"
        class="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-base font-bold transition-colors active:scale-95 shadow-sm"
      >
        ⋮
      </button>

    </div>
  </header>
</template>