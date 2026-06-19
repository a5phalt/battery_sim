// ============================================
// БАЗОВАЯ МАТЕМАТИЧЕСКАЯ МОДЕЛЬ БАТАРЕИ
// ============================================

import type { SimulationPoint } from '../types/SimulationPoint';

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
 * Напряжение по линейной модели (без учёта сопротивления).
 * U = Vmin + (SOC / 100) × (Vmax - Vmin)
 */
export function calculateLinearVoltage(
  soc: number,
  minVoltage: number,
  maxVoltage: number
): number {
  return minVoltage + (soc / 100) * (maxVoltage - minVoltage);
}

/**
 * Реальное напряжение с учётом внутреннего сопротивления.
 * 
 * При РАЗРЯДЕ: напряжение НИЖЕ линейного
 *   U = U_linear - I × R
 *   (ток "тянет" напряжение вниз)
 * 
 * При ЗАРЯДЕ: напряжение ВЫШЕ линейного
 *   U = U_linear + I × R
 *   (нужно "продавить" ток внутрь батареи)
 */
export function calculateRealVoltage(
  linearVoltage: number,
  current: number,
  internalResistance: number,
  isCharging: boolean
): number {
  const voltageDrop = current * internalResistance;
  return isCharging
    ? linearVoltage + voltageDrop
    : linearVoltage - voltageDrop;
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
  minVoltage: number;
  maxVoltage: number;
  current: number;
  internalResistance: number;
  isCharging: boolean;
  timeStep: number;
}): SimulationPoint {
  // 1. Линейное напряжение (идеальное, без потерь)
  const voltageLinear = calculateLinearVoltage(
    params.soc,
    params.minVoltage,
    params.maxVoltage
  );

  // 2. Реальное напряжение (с учётом внутреннего сопротивления)
  const voltage = calculateRealVoltage(
    voltageLinear,
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