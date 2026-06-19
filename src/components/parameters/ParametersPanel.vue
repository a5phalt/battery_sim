<script setup lang="ts">
import { useSimulation } from '../../composables/useSimulation'

// Вытягиваем наши параметры и новые переменные для типов батарей
const { 
  params, 
  batteryTypes, 
  activeTypeCode, 
  activeType, 
  resetParams 
} = useSimulation()
</script>

<template>
  <div class="flex flex-col h-full">
    <h2 class="text-base font-bold mb-5 text-slate-800 dark:text-white">Параметры</h2>
    
    <div class="flex-1 flex flex-col gap-5 overflow-y-auto pr-2 pb-2 custom-scrollbar">
      
      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Тип батареи</label>
        <select 
          v-model="activeTypeCode"
          class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors cursor-pointer"
        >
          <option v-for="type in batteryTypes" :key="type.code" :value="type.code">
            {{ type.label }}
          </option>
        </select>
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Пресет</label>
        <select class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors cursor-pointer text-slate-500">
          <option>Выберите пресет</option>
          <option>Свой вариант</option>
        </select>
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center mb-1">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Ёмкость, Ah</label>
          <span class="text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5 text-slate-700 dark:text-slate-300">{{ params.capacity }}</span>
        </div>
        <input type="range" v-model.number="params.capacity" 
          :min="activeType.capacity.min" 
          :max="activeType.capacity.max" 
          step="0.1" 
          :style="{ '--val': params.capacity, '--min': activeType.capacity.min, '--max': activeType.capacity.max }"
          class="custom-range w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-blue-600">
        <div class="flex justify-between text-xs text-slate-500 mt-1">
          <span>{{ activeType.capacity.min }}</span>
          <span>{{ activeType.capacity.max }}</span>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center mb-1">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Макс. напряжение, V</label>
          <span class="text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5 text-slate-700 dark:text-slate-300">{{ params.maxVoltage }}</span>
        </div>
        <input type="range" v-model.number="params.maxVoltage" 
          :min="activeType.voltage.min" 
          :max="activeType.voltage.max" 
          step="0.1" 
          :style="{ '--val': params.maxVoltage, '--min': activeType.voltage.min, '--max': activeType.voltage.max }"
          class="custom-range w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-blue-600">
        <div class="flex justify-between text-xs text-slate-500 mt-1">
          <span>{{ activeType.voltage.min }}</span>
          <span>{{ activeType.voltage.max }}</span>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center mb-1">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Мин. напряжение, V</label>
          <span class="text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5 text-slate-700 dark:text-slate-300">{{ params.minVoltage }}</span>
        </div>
        <input type="range" v-model.number="params.minVoltage" 
          :min="activeType.voltage.min" 
          :max="activeType.voltage.max" 
          step="0.1" 
          :style="{ '--val': params.minVoltage, '--min': activeType.voltage.min, '--max': activeType.voltage.max }"
          class="custom-range w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-blue-600">
        <div class="flex justify-between text-xs text-slate-500 mt-1">
          <span>{{ activeType.voltage.min }}</span>
          <span>{{ activeType.voltage.max }}</span>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center mb-1">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Ток, A</label>
          <span class="text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5 text-slate-700 dark:text-slate-300">{{ params.current }}</span>
        </div>
        <input type="range" v-model.number="params.current" 
          :min="activeType.current.min" 
          :max="activeType.current.max" 
          step="0.1" 
          :style="{ '--val': params.current, '--min': activeType.current.min, '--max': activeType.current.max }"
          class="custom-range w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-blue-600">
        <div class="flex justify-between text-xs text-slate-500 mt-1">
          <span>{{ activeType.current.min }}</span>
          <span>{{ activeType.current.max }}</span>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center mb-1">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">SOC (начальный), %</label>
          <span class="text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5 text-slate-700 dark:text-slate-300">{{ params.initialSoc }}</span>
        </div>
        <input type="range" v-model.number="params.initialSoc" min="0" max="100" step="1" 
          :style="{ '--val': params.initialSoc, '--min': 0, '--max': 100 }"
          class="custom-range w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-blue-600">
        <div class="flex justify-between text-xs text-slate-500 mt-1">
          <span>0</span>
          <span>100</span>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center mb-1">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Время моделирования, ч</label>
          <span class="text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5 text-slate-700 dark:text-slate-300">{{ params.simulationTime }}</span>
        </div>
        <input type="range" v-model.number="params.simulationTime" min="0.1" max="10" step="0.1" 
          :style="{ '--val': params.simulationTime, '--min': 0.1, '--max': 10 }"
          class="custom-range w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-blue-600">
        <div class="flex justify-between text-xs text-slate-500 mt-1">
          <span>0.1</span>
          <span>10</span>
        </div>
      </div>

    </div>

    <div class="mt-4 pt-5 flex gap-3 shrink-0 bg-white dark:bg-slate-800">
      <button @click="resetParams" class="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-2.5 rounded-lg text-sm font-semibold transition-colors">
        Сбросить
      </button>
      <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors">
        Применить
      </button>
    </div>
  </div>
</template>

<style scoped>
.custom-range {
  --percent: calc((var(--val) - var(--min)) / (var(--max) - var(--min)) * 100%);
  background: linear-gradient(to right, #2563eb var(--percent), #e2e8f0 var(--percent));
}
.dark .custom-range {
  background: linear-gradient(to right, #2563eb var(--percent), #334155 var(--percent));
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #475569;
}
</style>