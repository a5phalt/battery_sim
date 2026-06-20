// ============================================
// БАЗОВАЯ МАТЕМАТИЧЕСКАЯ МОДЕЛЬ БАТАРЕИ
// ============================================

import type { SimulationPoint } from '../types/SimulationPoint';
import { getVoltageFromCurve } from './voltageCurves';

const SECONDS_PER_HOUR = 3600;

/**
 * Изменение SOC за один шаг.
 * ΔSOC = (I × Δt × η) / (C × 3600) × 100%
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
 * Реальное напряжение с учётом:
 * 1. Нелинейной кривой разряда (из даташитов)
 * 2. Внутреннего сопротивления
 * 
 * @param soc - уровень заряда (%)
 * @param batteryType - тип батареи
 * @param minVoltage - минимальное напряжение
 * @param maxVoltage - максимальное напряжение
 * @param current - ток (А)
 * @param internalResistance - внутреннее сопротивление (Ом)
 * @param isCharging - true если заряд, false если разряд
 * @returns напряжение на клеммах (В)
 */
export function calculateRealVoltage(
  soc: number,
  batteryType: string,
  minVoltage: number,
  maxVoltage: number,
  current: number,
  internalResistance: number,
  isCharging: boolean
): number {
  // 1. Базовое напряжение из нелинейной кривой
  const baseVoltage = getVoltageFromCurve(soc, batteryType, minVoltage, maxVoltage);

  // 2. Падение напряжения на внутреннем сопротивлении
  const voltageDrop = current * internalResistance;

  // 3. При заряде напряжение ВЫШЕ, при разряде НИЖЕ
  return isCharging
    ? baseVoltage + voltageDrop
    : baseVoltage - voltageDrop;
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
 */
export function calculateStep(params: {
  time: number;
  soc: number;
  batteryType: string;
  minVoltage: number;
  maxVoltage: number;
  current: number;
  internalResistance: number;
  isCharging: boolean;
  timeStep: number;
}): SimulationPoint {
  // Реальное напряжение с нелинейной кривой
  const voltage = calculateRealVoltage(
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