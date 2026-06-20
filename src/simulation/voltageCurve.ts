// ============================================
// НЕЛИНЕЙНАЯ МОДЕЛЬ НАПРЯЖЕНИЯ
// ============================================
// Использует табличные данные и интерполяцию
// для построения реалистичной кривой напряжения.

import type { BatteryTypeCode } from '../types/BatteryType';
import voltageCurvesData from '../data/voltageCurves.json';

// Тип для точки кривой
interface VoltagePoint {
  soc: number;
  voltage: number;
}

// Загруженные кривые (из JSON)
const voltageCurves: Record<string, VoltagePoint[]> = voltageCurvesData;

/**
 * Находит напряжение для заданного SOC по таблице.
 * Использует линейную интерполяцию между точками.
 */
function interpolateVoltage(soc: number, curve: VoltagePoint[]): number {
  const clampedSoc = Math.max(0, Math.min(100, soc));
  
  for (let i = 0; i < curve.length - 1; i++) {
    const current = curve[i];
    const next = curve[i + 1];
    
    if (clampedSoc >= current.soc && clampedSoc <= next.soc) {
      const ratio = (clampedSoc - current.soc) / (next.soc - current.soc);
      return current.voltage + ratio * (next.voltage - current.voltage);
    }
  }
  
  if (clampedSoc <= curve[0].soc) return curve[0].voltage;
  return curve[curve.length - 1].voltage;
}

/**
 * Получает кривую напряжения для типа батареи.
 */
export function getVoltageCurve(batteryType: BatteryTypeCode): VoltagePoint[] | null {
  return voltageCurves[batteryType] || null;
}

/**
 * Рассчитывает напряжение по нелинейной кривой.
 * 
 * ⭐ ЗДЕСЬ находится код масштабирования под min/max пользователя!
 * 
 * @param soc - уровень заряда (0-100%)
 * @param batteryType - тип батареи
 * @param minVoltage - минимальное напряжение (В)
 * @param maxVoltage - максимальное напряжение (В)
 * @returns напряжение (В)
 */
export function calculateNonLinearVoltage(
  soc: number,
  batteryType: BatteryTypeCode,
  minVoltage: number,
  maxVoltage: number
): number {
  const curve = getVoltageCurve(batteryType);
  
  if (!curve) {
    // Если кривая не найдена — используем линейную модель
    return minVoltage + (soc / 100) * (maxVoltage - minVoltage);
  }
  
  // 1. Получаем базовое напряжение из кривой
  const baseVoltage = interpolateVoltage(soc, curve);
  
  // 2. Находим диапазон в таблице
  const curveMin = curve[0].voltage;
  const curveMax = curve[curve.length - 1].voltage;
  const curveRange = curveMax - curveMin;
  
  if (curveRange === 0) {
    return minVoltage;
  }
  
  // 3. ⭐ МАСШТАБИРОВАНИЕ ПОД MIN/MAX ПОЛЬЗОВАТЕЛЯ ⭐
  // Нормализуем напряжение в диапазон 0..1
  const normalizedVoltage = (baseVoltage - curveMin) / curveRange;
  
  // 4. Переводим в диапазон пользователя minVoltage..maxVoltage
  return minVoltage + normalizedVoltage * (maxVoltage - minVoltage);
}