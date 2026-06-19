// ============================================
// МОДЕЛЬ РАЗРЯДА БАТАРЕИ
// ============================================

import type { BatteryType } from '../types/BatteryType';
import type { SimulationPoint } from '../types/SimulationPoint';
import { calculateDeltaSoc, calculateStep } from './batteryModel';

export interface DischargeParams {
  initialSoc: number;
  current: number;
  timeStep: number;
  batteryType: BatteryType;
  capacity: number;
  minVoltage: number;
  maxVoltage: number;
}

export interface DischargeResult {
  points: SimulationPoint[];
  duration: number;
  finalSoc: number;
}

/**
 * Симуляция разряда до SOC = 0%.
 * На каждом шаге:
 *   1. Считаем точку с текущим SOC
 *   2. Уменьшаем SOC на ΔSOC
 *   3. Останавливаемся, когда SOC ≤ 0
 */
export function simulateCharge(params: DischargeParams): DischargeResult {
  const points: SimulationPoint[] = [];
  let currentSoc = params.initialSoc;
  let time = 0;

 while (currentSoc < 100)  {
    // Считаем точку
    const point = calculateStep({
      time,
      soc: currentSoc,
      minVoltage: params.minVoltage,
      maxVoltage: params.maxVoltage,
      current: params.current,
      internalResistance: params.batteryType.internalResistance,
      isCharging: false,
      timeStep: params.timeStep,
    });
    points.push(point);

    // Уменьшаем SOC
    const deltaSoc = calculateDeltaSoc(
      params.current,
      params.timeStep,
      params.capacity,
      params.batteryType.coulombicEfficiency
    );
    currentSoc = Math.min(
        100,
        currentSoc + deltaSoc
        )

    time += params.timeStep;
  }

  // Финальная точка (SOC = 0)
  points.push(calculateStep({
    time,
    soc: 100,
    minVoltage: params.minVoltage,
    maxVoltage: params.maxVoltage,
    current: params.current,
    internalResistance: params.batteryType.internalResistance,
    isCharging: true,
    timeStep: params.timeStep,
  }));

  return {
    points,
    duration: time,
    finalSoc: 0,
  };
}