// ============================================
// ИНТЕРПОЛЯЦИЯ НАПРЯЖЕНИЯ ПО КРИВОЙ
// ============================================
// Берём таблицу точек и находим напряжение для любого SOC.
// Между точками — линейная интерполяция (прямая линия).

import type { BatteryTypeCode } from '../types/BatteryType';
import voltageCurvesData from '../data/voltageCurves.json';

// Тип одной точки кривой
interface CurvePoint {
  soc: number;
  voltage: number;
}

// Все кривые (загружаются из JSON)
const VOLTAGE_CURVES: Record<string, CurvePoint[]> = voltageCurvesData;

/**
 * Находит напряжение для заданного SOC по таблице точек.
 * 
 * Как работает:
 * 1. Ищем две соседние точки, между которыми лежит наш SOC
 * 2. Считаем, на каком мы "проценте" между ними
 * 3. Берём напряжение как среднее между точками
 * 
 * Пример: SOC = 45%, точки (40%, 3.72В) и (50%, 3.75В)
 * Мы ровно посередине → напряжение = 3.735В
 */
export function getVoltageFromCurve(
  soc: number,
  batteryType: BatteryTypeCode
): number {
  const curve = VOLTAGE_CURVES[batteryType];
  
  if (!curve || curve.length === 0) {
    throw new Error(`Кривая для типа ${batteryType} не найдена`);
  }

  // Ограничиваем SOC пределами
  const clampedSoc = Math.max(0, Math.min(100, soc));

  // Если SOC ровно на точке — возвращаем её значение
  const exactPoint = curve.find(p => p.soc === clampedSoc);
  if (exactPoint) {
    return exactPoint.voltage;
  }

  // Ищем две соседние точки
  for (let i = 0; i < curve.length - 1; i++) {
    const left = curve[i];
    const right = curve[i + 1];

    if (clampedSoc >= left.soc && clampedSoc <= right.soc) {
      // Линейная интерполяция
      const ratio = (clampedSoc - left.soc) / (right.soc - left.soc);
      return left.voltage + ratio * (right.voltage - left.voltage);
    }
  }

  // Если что-то пошло не так — возвращаем последнюю точку
  return curve[curve.length - 1].voltage;
}

/**
 * Проверка: есть ли кривая для данного типа батареи.
 */
export function hasVoltageCurve(batteryType: BatteryTypeCode): boolean {
  return !!VOLTAGE_CURVES[batteryType] && VOLTAGE_CURVES[batteryType].length > 0;
}