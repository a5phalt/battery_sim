// Определяем возможные режимы работы
export type SimulationMode = 'charge' | 'discharge'

// Описываем структуру параметров
export interface SimulationParams {
  capacity: number;       // Ёмкость
  maxVoltage: number;     // Максимальное напряжение
  minVoltage: number;     // Минимальное напряжение
  current: number;        // Ток
  initialSoc: number;     // Начальный SOC (уровень заряда)
  simulationTime: number; // Время симуляции
}