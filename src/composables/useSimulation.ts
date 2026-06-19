import { reactive, ref } from 'vue'
// Импортируем типы именно из твоего файла SimulationParams.ts
import type { SimulationParams, SimulationMode } from '../types/SimulationParams'

// Создаем реактивный объект и говорим TypeScript, что он должен строго соответствовать интерфейсу SimulationParams
const params = reactive<SimulationParams>({
  capacity: 3.0,
  maxVoltage: 4.2,
  minVoltage: 3.0,
  current: 1.0,
  initialSoc: 100,
  simulationTime: 3.0
})

// Текущий режим работы, по умолчанию — разряд
const currentMode = ref<SimulationMode>('discharge')

export function useSimulation() {
  
  // Функция сброса параметров
  const resetParams = () => {
    params.capacity = 3.0
    params.maxVoltage = 4.2
    params.minVoltage = 3.0
    params.current = 1.0
    params.initialSoc = 100
    params.simulationTime = 3.0
  }

  return {
    params,
    currentMode,
    resetParams
  }
}