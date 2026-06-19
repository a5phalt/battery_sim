// ============================================
// ТИПЫ ДАННЫХ: РЕЗУЛЬТАТ СИМУЛЯЦИИ
// ============================================

import type { BatteryPreset } from './BatteryPreset';
import type { SimulationParams } from './SimulationParams';
import type { SimulationPoint } from './SimulationPoint';

// Итоговая статистика (показывается в StatsBar внизу экрана)
export interface SimulationSummary {
  totalEnergy: number;          // Общая энергия (Вт·ч)
  deliveredCapacity: number;    // Отданная/принятая ёмкость (А·ч)
  efficiency: number;           // КПД (%)
  finalSoc: number;             // Конечный SOC (%)
  finalVoltage: number;         // Конечное напряжение (В)
  duration: number;             // Длительность симуляции (с)
}

// Полный результат одного запуска симуляции
export interface SimulationResult {
  id: string;                   // Уникальный ID результата
  timestamp: number;            // Когда была запущена (Unix timestamp)
  params: SimulationParams;     // Параметры запуска
  preset: BatteryPreset;        // Какой пресет использовался
  points: SimulationPoint[];    // Все точки для графиков
  summary: SimulationSummary;   // Итоговая статистика
}

// Настройки приложения (хранятся в LocalStorage)
export interface AppSettings {
  theme: 'light' | 'dark';      // Тема оформления
  defaultMode: 'charge' | 'discharge'; // Режим по умолчанию
  timeStep: number;             // Шаг расчёта по умолчнию (с)
}