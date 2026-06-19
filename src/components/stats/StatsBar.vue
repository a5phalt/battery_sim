<script setup lang="ts">
</script>

<template>
  <div class="h-auto md:h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-wrap md:flex-nowrap items-center justify-between px-6 py-4 md:py-0 gap-4">
    
    <div class="flex items-center gap-4">
      <div class="text-yellow-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          class="w-5 h-5"
        >
          <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/>
        </svg>
      </div>
      <div>
        <div
          class="text-xs font-medium text-slate-500"
          style="font-family: 'Inter', sans-serif;"
        >
          Энергия
        </div>

        <div
          class="text-base font-semibold text-slate-900 dark:text-white"
          style="font-family: 'Inter', sans-serif;"
        >
          7.81 Wh
        </div>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <div class="text-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          class="w-5 h-5"
        >
          <rect
            x="4"
            y="6"
            width="14"
            height="12"
            rx="2"
            stroke-width="2"
          />
          <path
            d="M18 10h2v4h-2"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div>
        <div class="text-xs font-medium text-slate-500">Отдано</div>
        <div class="text-base font-semibold text-slate-900 dark:text-white">2.18 Ah</div>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <div class="text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          class="w-5 h-5"
        >
          <path
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 4v6h6M20 20v-6h-6M20 10a8 8 0 00-13.66-4M4 14a8 8 0 0013.66 4"
          />
        </svg>
      </div>
      <div>
        <div class="text-xs font-medium text-slate-500">КПД</div>
        <div class="text-base font-semibold text-slate-900 dark:text-white">94%</div>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <div class="text-indigo-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          class="w-5 h-5"
        >
          <circle
            cx="12"
            cy="13"
            r="8"
            stroke-width="2"
          />
          <path
            d="M12 9v4l3 2"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M9 3h6"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div>
        <div class="text-xs font-medium text-slate-500">Циклы</div>
        <div class="text-base font-semibold text-slate-900 dark:text-white">120</div>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <div class="text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          class="w-5 h-5"
        >
          <path
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14 14.76V5a2 2 0 10-4 0v9.76a4 4 0 104 0z"
          />
        </svg>
      </div>
      <div>
        <div class="text-xs font-medium text-slate-500">Температура</div>
        <div class="text-base font-semibold text-slate-900 dark:text-white">— °C</div>
      </div>
    </div>

  </div>
</template>