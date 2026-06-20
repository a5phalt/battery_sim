<script setup lang="ts">
import { computed } from 'vue'
import { useSimulation } from '../../composables/useSimulation'

const { params, currentMode } = useSimulation()

const remainingTime = computed(() => {
  if (params.current <= 0) {
    return '∞'
  }

  let hours = 0

  if (currentMode.value === 'discharge') {
    hours =
      (params.capacity * (params.initialSoc / 100)) /
      params.current
  } else {
    hours =
      (params.capacity * ((100 - params.initialSoc) / 100)) /
      params.current
  }

  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)

  return `${h} ч ${m} мин`
})
</script>

<template>
  <div
    class="
      relative w-[75%] sm:w-[50%] lg:w-[85%] xl:w-[70%]
      max-w-[280px] min-w-[150px] aspect-[1/2.8]
      border-4 border-slate-300 dark:border-slate-600
      rounded-[2.5rem] 2xl:rounded-[3.5rem]
      p-1.5 md:p-2.5 flex flex-col justify-end
      shadow-sm mx-auto transition-all duration-300

      /* 🔥 ФОН БАЗЫ (СДЕЛАНО ТЕМНЕЕ ДЛЯ КОНТРАСТА) */
      bg-slate-300 dark:bg-slate-900
    "
  >

    <!-- верх батарейки -->
    <div
      class="
        absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2
        w-[35%] h-3 md:h-4
        border-4 border-b-0 border-slate-300 dark:border-slate-600
        rounded-t-lg md:rounded-t-xl
        bg-slate-300 dark:bg-slate-900
      "
    ></div>

    <!-- SOC ЗАЛИВКА (НЕ МЕНЯЕМ ВООБЩЕ) -->
    <div
      class="
        w-full rounded-[2rem] 2xl:rounded-[3rem]
        transition-all duration-300 ease-out relative
      "
      :class="
        currentMode === 'charge'
          ? 'bg-gradient-to-t from-green-500 to-green-400'
          : 'bg-gradient-to-t from-blue-600 to-blue-400'
      "
      :style="{
        height: `${params.initialSoc}%`,
        minHeight: '8%'
      }"
    ></div>

    <!-- текст -->
    <div
      class="
        absolute inset-0 flex flex-col items-center justify-center
        z-20 pointer-events-none
        py-8 xl:py-12
      "
    >

      <div class="flex flex-col items-center mt-auto">
        <span class="text-[10px] xl:text-xs font-semibold opacity-90 tracking-wider uppercase mb-1 text-white drop-shadow-md">
          SOC
        </span>
        <span class="text-4xl sm:text-5xl 2xl:text-6xl font-bold leading-none text-white drop-shadow-md">
          {{ params.initialSoc }}%
        </span>
      </div>

      <div class="w-10 xl:w-16 h-px bg-white/40 my-4 xl:my-6"></div>

      <span class="text-lg sm:text-xl 2xl:text-2xl font-semibold tracking-wide text-white drop-shadow-md">
        {{ params.maxVoltage }} V
      </span>

      <div class="w-10 xl:w-16 h-px bg-white/40 my-4 xl:my-6"></div>

      <div class="flex flex-col items-center mb-auto">
        <span class="text-[10px] xl:text-xs font-medium opacity-90 mb-1 text-white drop-shadow-md">
          Осталось времени
        </span>
        <span class="text-xs sm:text-sm 2xl:text-base font-bold whitespace-nowrap text-white drop-shadow-md">
          {{ remainingTime }}
        </span>
      </div>

    </div>
  </div>
</template>