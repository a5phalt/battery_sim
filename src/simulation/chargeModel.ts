// ============================================
// БАЗОВАЯ МАТЕМАТИЧЕСКАЯ МОДЕЛЬ БАТАРЕИ
// ============================================

import type { SimulationPoint } from '../types/SimulationPoint';
import type { BatteryTypeCode } from '../types/BatteryType';
import { getVoltageFromCurve } from './voltageCurve';

const SECONDS_PER_HOUR = 3600;

/**
 * Изменение SOC за один шаг.
 * Формула: ΔSOC = (I × Δt × η) / (C × 3600) × 100%
 */
export function calculateDeltaSoc(
  current: number,
  timeStep: number,
  capacity: number,
  coulombicEfficiency: number
): number {
  return (current * timeStep * coulombicEfficiency) / (capacity * SECONDS_PER_HOUR) * 100;
}

/**
 * ⚡ НАПРЯЖЕНИЕ ПО НЕЛИНЕЙНОЙ КРИВОЙ
 * 
 * Берём значение из таблицы кривых для данного типа батареи.
 * Это даёт реалистичный график с характерными "полками" и "изгибами".
 * 
 * Например, у LiFePO4 напряжение почти не меняется в диапазоне 20-90% SOC.
 */
export function calculateCurveVoltage(
  soc: number,
  batteryType: BatteryTypeCode
): number {
  return getVoltageFromCurve(soc, batteryType);
}

/**
 * Реальное напряжение с учётом внутреннего сопротивления.
 * 
 * При РАЗРЯДЕ: U = U_кривой - I × R  (напряжение ниже)
 * При ЗАРЯДЕ:  U = U_кривой + I × R  (напряжение выше)
 */
export function calculateRealVoltage(
  curveVoltage: number,
  current: number,
  internalResistance: number,
  isCharging: boolean
): number {
  const voltageDrop = current * internalResistance;
  return isCharging
    ? curveVoltage + voltageDrop
    : curveVoltage - voltageDrop;
}

/**
 * Мощность: P = U × I
 */
export function calculatePower(voltage: number, current: number): number {
  return voltage * current;
}

/**
 * Энергия за шаг (Дж): E = P × Δt
 */
export function calculateEnergy(power: number, timeStep: number): number {
  return power * timeStep;
}

/**
 * Создаёт одну точку симуляции.
 * Теперь использует нелинейную кривую вместо линейной модели!
 */
export function calculateStep(params: {
  time: number;
  soc: number;
  batteryType: BatteryTypeCode;      // ← ДОБАВЛЕНО: тип батареи для кривой
  current: number;
  internalResistance: number;
  isCharging: boolean;
  timeStep: number;
}): SimulationPoint {
  // 1. Напряжение из нелинейной кривой (реалистичное!)
  const curveVoltage = calculateCurveVoltage(params.soc, params.batteryType);

  // 2. Реальное напряжение с учётом внутреннего сопротивления
  const voltage = calculateRealVoltage(
    curveVoltage,
    params.current,
    params.internalResistance,
    params.isCharging
  );

  // 3. Мощность и энергия
  const power = calculatePower(voltage, params.current);
  const energy = calculateEnergy(power, params.timeStep);

  return {
    time: params.time,
    soc: params.soc,
    voltage,
    current: params.current,
    power,
    energy,
  };
}