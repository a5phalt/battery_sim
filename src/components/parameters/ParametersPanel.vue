<script setup lang="ts">
import { useSimulation } from '../../composables/useSimulation'

// Вытягиваем наши параметры и новые переменные для типов батарей
const {
  params,
  batteryTypes,
  activeTypeCode,
  activeType,
  runSimulation
} = useSimulation()

// Обновленная функция валидации без alert
const validateInput = (field: keyof typeof params, min: number, max: number, event: Event) => {
  const target = event.target as HTMLInputElement
  let val = parseFloat(target.value)

  // Если пользователь стер все или ввел буквы, ставим минимум
  if (isNaN(val)) {
    val = min
  }

  // Просто "тихо" обрезаем значение до лимитов
  if (val < min) val = min
  if (val > max) val = max

  // Записываем проверенное значение обратно в глобальный стейт
  params[field] = val
  // Принудительно обновляем текст в окошке
  target.value = val.toString()
}
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
          <input 
            type="number" 
            :value="params.capacity"
            @change="validateInput('capacity', activeType.capacity.min, activeType.capacity.max, $event)"
            class="hide-arrows w-16 text-center text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-1 py-0.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
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
          <input 
            type="number" 
            :value="params.maxVoltage"
            @change="validateInput('maxVoltage', activeType.voltage.min, activeType.voltage.max, $event)"
            class="hide-arrows w-16 text-center text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-1 py-0.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
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
          <input 
            type="number" 
            :value="params.minVoltage"
            @change="validateInput('minVoltage', activeType.voltage.min, activeType.voltage.max, $event)"
            class="hide-arrows w-16 text-center text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-1 py-0.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
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
          <input 
            type="number" 
            :value="params.current"
            @change="validateInput('current', activeType.current.min, activeType.current.max, $event)"
            class="hide-arrows w-16 text-center text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-1 py-0.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
        <input type="range" v-model.number="params.current" 
          :min="activeType.current.min" 
          :max="activeType.current.max" 
          step="0.01" 
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
          <input 
            type="number" 
            :value="params.initialSoc"
            @change="validateInput('initialSoc', 0, 100, $event)"
            class="hide-arrows w-16 text-center text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-1 py-0.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
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
          <input 
            type="number" 
            :value="params.simulationTime"
            @change="validateInput('simulationTime', 0, 10, $event)"
            class="hide-arrows w-16 text-center text-sm font-medium border border-slate-200 dark:border-slate-700 rounded px-1 py-0.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
        <input type="range" v-model.number="params.simulationTime" min="0" max="10" step="0.1" 
          :style="{ '--val': params.simulationTime, '--min': 0, '--max': 10 }"
          class="custom-range w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-blue-600">
        <div class="flex justify-between text-xs text-slate-500 mt-1">
          <span>0</span>
          <span>10</span>
        </div>
      </div>

    </div>

    <div class="mt-4 pt-5 flex gap-3 shrink-0 bg-white dark:bg-slate-800">
      <button  @click="runSimulation" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors">
        Применить
      </button>
      <button class="flex-1 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-600 border border-slate-200 dark:border-slate-600 py-2.5 rounded-lg text-sm font-semibold transition-colors">
        Сохранить пресет
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Прячем дефолтные стрелочки (спиннеры) внутри input type="number" во всех браузерах */
.hide-arrows::-webkit-outer-spin-button,
.hide-arrows::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.hide-arrows {
  -moz-appearance: textfield;
  appearance: textfield; /* <-- Добавили стандартное свойство, и предупреждение уйдет */
}

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