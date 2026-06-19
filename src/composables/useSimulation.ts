import { reactive, ref, computed, watch } from 'vue'

// ИСПРАВЛЕННЫЙ ПУТЬ: загружаем именно вашу базу данных
import batteryData from '../data/batteryDatabase.json'

// Защита от разных форматов JSON: если данные обернуты в {"types": [...]}, берем .types, иначе сам массив
const batteryTypes = batteryData.types || batteryData

// Создаем переменную для хранения выбранного типа (по умолчанию - первый из базы)
const activeTypeCode = ref(batteryTypes[0].code)

// Вычисляемое свойство: всегда возвращает полный объект текущей батареи с лимитами
const activeType = computed(() => {
  return batteryTypes.find((t: any) => t.code === activeTypeCode.value) || batteryTypes[0]
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

  return {
    params,
    currentMode,
    batteryTypes,    // Отдаем список типов для выпадающего меню
    activeTypeCode,  // Отдаем выбранный код для v-model
    activeType,      // Отдаем объект с лимитами для min/max ползунков
    resetParams
  }
}