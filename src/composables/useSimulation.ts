import { reactive, ref, computed, watch } from 'vue'
import { simulateDischarge } from '../simulation/dischargeModel'
import { simulateCharge } from '../simulation/chargeSimulation'
import type { SimulationPoint } from '../types/SimulationPoint'
import type { BatteryType, BatteryTypeCode } from '../types/BatteryType'

// ИСПРАВЛЕННЫЙ ПУТЬ: загружаем именно вашу базу данных
import batteryData from '../data/batteryDatabase.json'


const batteryTypes = (batteryData.types || batteryData) as BatteryType[]

// Создаем переменную для хранения выбранного типа (по умолчанию - первый из базы)
const activeTypeCode = ref<BatteryTypeCode>(
  batteryTypes[0].code
)
// Вычисляемое свойство: всегда возвращает полный объект текущей батареи с лимитами
const activeType = computed<BatteryType>(() => {
  return (
    batteryTypes.find(t => t.code === activeTypeCode.value) ||
    batteryTypes[0]
  )
})
// Инициализируем параметры дефолтными значениями из выбранной батареи
const params = reactive({
  capacity: activeType.value.capacity.default,
  maxVoltage: activeType.value.voltage.max,
  minVoltage: activeType.value.voltage.min,
  current: activeType.value.current.defaultCharge,
  initialSoc: 100,
  simulationTime: 3.0
})

const currentMode = ref<'charge' | 'discharge'>('discharge')
const simulationPoints = ref<SimulationPoint[]>([])

// Следим за изменением переменной activeTypeCode.
// При смене типа в выпадающем списке подтягиваем новые дефолтные значения.
watch(activeTypeCode, (newCode) => {
  const typeDef = batteryTypes.find((t: any) => t.code === newCode)
  if (typeDef) {
    params.capacity = typeDef.capacity.default
    params.maxVoltage = typeDef.voltage.max
    params.minVoltage = typeDef.voltage.min
    params.current = typeDef.current.defaultCharge
  }
})

export function useSimulation() {
  
  // Функция сброса параметров возвращает ползунки к дефолтам ТЕКУЩЕЙ выбранной батареи
  const resetParams = () => {
    params.capacity = activeType.value.capacity.default
    params.maxVoltage = activeType.value.voltage.max
    params.minVoltage = activeType.value.voltage.min
    params.current = activeType.value.current.defaultCharge
    params.initialSoc = 100
    params.simulationTime = 3.0
  }
  const runSimulation = () => {
    const result =
  currentMode.value === 'charge'
    ? simulateCharge({
      initialSoc: params.initialSoc,
      current: params.current,
      timeStep: 60, // шаг 1 минута
      batteryType: activeType.value,
      capacity: params.capacity,
      minVoltage: params.minVoltage,
      maxVoltage: params.maxVoltage
    })
    : simulateDischarge({
      initialSoc: params.initialSoc,
      current: params.current,
      timeStep: 60, // шаг 1 минута
      batteryType: activeType.value,
      capacity: params.capacity,
      minVoltage: params.minVoltage,
      maxVoltage: params.maxVoltage
  })
    


    simulationPoints.value = result.points
  }

  return {
    params,
    currentMode,
    batteryTypes,    // Отдаем список типов для выпадающего меню
    activeTypeCode,  // Отдаем выбранный код для v-model
    activeType,      // Отдаем объект с лимитами для min/max ползунков
    simulationPoints, // Отдаем массив точек для графика
    runSimulation,
    resetParams
  }

  
}