// ============================================
// БАЗОВАЯ МАТЕМАТИЧЕСКАЯ МОДЕЛЬ БАТАРЕИ
// ============================================

import type { SimulationPoint } from '../types/SimulationPoint';
import type { BatteryTypeCode } from '../types/BatteryType';
import { calculateNonLinearVoltage } from './voltageCurve';

const SECONDS_PER_HOUR = 3600;

/**
 * Изменение SOC за один шаг.
 * SOC меняется ЛИНЕЙНО при постоянном токе.
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
 * Рассчитывает напряжение с учётом нелинейной кривой.
 * 
 * ВАЖНО: minVoltage и maxVoltage ОБЯЗАТЕЛЬНО используются!
 * Кривая масштабируется под эти значения.
 */
export function calculateVoltage(
  soc: number,
  batteryType: BatteryTypeCode,
  minVoltage: number,
  maxVoltage: number,
  current: number,
  internalResistance: number,
  isCharging: boolean
): number {
  // 1. Базовое напряжение по нелинейной кривой
  //    ← ВОТ ЗДЕСЬ используется импортированная функция!
  let voltage = calculateNonLinearVoltage(
    soc,
    batteryType,
    minVoltage,
    maxVoltage
  );

  // 2. Учёт внутреннего сопротивления
  const voltageDrop = current * internalResistance;
  voltage = isCharging ? voltage + voltageDrop : voltage - voltageDrop;

  // 3. Ограничиваем напряжение пределами
  voltage = Math.max(minVoltage, Math.min(maxVoltage, voltage));

  return voltage;
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
 * Собирает все расчёты в один объект SimulationPoint.
 */
export function calculateStep(params: {
  time: number;
  soc: number;
  batteryType: BatteryTypeCode;
  minVoltage: number;
  maxVoltage: number;
  current: number;
  internalResistance: number;
  isCharging: boolean;
  timeStep: number;
}): SimulationPoint {
  // ← ЗДЕСЬ вызываем calculateVoltage, которая внутри использует calculateNonLinearVoltage
  const voltage = calculateVoltage(
    params.soc,
    params.batteryType,
    params.minVoltage,
    params.maxVoltage,
    params.current,
    params.internalResistance,
    params.isCharging
  );

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