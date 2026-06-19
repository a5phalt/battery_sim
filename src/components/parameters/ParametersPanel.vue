<script setup lang="ts">
import { useSimulation } from '../../composables/useSimulation'

// Вытягиваем наши параметры
const { params } = useSimulation()
</script>

<template>
  <div class="flex flex-col h-full">
    <h2 class="text-base font-bold mb-5 text-slate-800 dark:text-white">Параметры</h2>
    
    <div class="flex-1 flex flex-col gap-5 overflow-y-auto pr-2 pb-2 custom-scrollbar">
      
      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Тип батареи</label>
        <select class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors cursor-pointer">
          <option>Li-Ion</option>
          <option>Li-Po</option>
          <option>LiFePO4</option>
          <option>NiMH</option>
          <option>Свинцово-кислотный</option>
          <option>Пользовательский</option>
        </select>
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Пресет</label>
        <select class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors cursor-pointer text-slate-500">
          <option>Выберите пресет</option>
          <option>18650 Li-ion (3.0 Ah)</option>
          <option>Свой вариант</option>
        </select>
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center mb-1">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Ёмкость, Ah</label>
          <span class="text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5 text-slate-700 dark:text-slate-300">{{ params.capacity }}</span>
        </div>
        <input type="range" v-model.number="params.capacity" min="0.1" max="100" step="0.1" 
          class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-blue-600">
        <div class="flex justify-between text-xs text-slate-500 mt-1">
          <span>0.1</span>
          <span>100</span>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center mb-1">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Макс. напряжение, V</label>
          <span class="text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5 text-slate-700 dark:text-slate-300">{{ params.maxVoltage }}</span>
        </div>
        <input type="range" v-model.number="params.maxVoltage" min="2.5" max="4.3" step="0.1" 
          class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-blue-600">
        <div class="flex justify-between text-xs text-slate-500 mt-1">
          <span>2.5</span>
          <span>4.3</span>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center mb-1">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Мин. напряжение, V</label>
          <span class="text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5 text-slate-700 dark:text-slate-300">{{ params.minVoltage }}</span>
        </div>
        <input type="range" v-model.number="params.minVoltage" min="2.5" max="4.3" step="0.1" 
          class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-blue-600">
        <div class="flex justify-between text-xs text-slate-500 mt-1">
          <span>2.5</span>
          <span>4.3</span>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center mb-1">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Ток, A</label>
          <span class="text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5 text-slate-700 dark:text-slate-300">{{ params.current }}</span>
        </div>
        <input type="range" v-model.number="params.current" min="0.1" max="100" step="0.1" 
          class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-blue-600">
        <div class="flex justify-between text-xs text-slate-500 mt-1">
          <span>0.1</span>
          <span>100</span>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center mb-1">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">SOC (начальный), %</label>
          <span class="text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5 text-slate-700 dark:text-slate-300">{{ params.initialSoc }}</span>
        </div>
        <input type="range" v-model.number="params.initialSoc" min="0" max="100" step="1" 
          class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-blue-600">
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
          class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-blue-600">
        <div class="flex justify-between text-xs text-slate-500 mt-1">
          <span>0.1</span>
          <span>10</span>
        </div>
      </div>

    </div>

    <div class="mt-4 pt-5 flex gap-3 shrink-0 bg-white dark:bg-slate-800">
      <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors">
        Применить
      </button>
      <button class="flex-1 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-600 border border-slate-200 dark:border-slate-600 py-2.5 rounded-lg text-sm font-semibold transition-colors">
        Сохранить пресет
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Скрываем громоздкий скроллбар */
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