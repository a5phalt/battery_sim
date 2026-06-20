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
 */
export function simulateDischarge(params: DischargeParams): DischargeResult {
  const points: SimulationPoint[] = [];
  let currentSoc = params.initialSoc;
  let time = 0;

  while (currentSoc > 0) {
    const point = calculateStep({
      time,
      soc: currentSoc,
      batteryType: params.batteryType.code, // ← Передаём тип батареи
      minVoltage: params.minVoltage,
      maxVoltage: params.maxVoltage,
      current: params.current,
      internalResistance: params.batteryType.internalResistance,
      isCharging: false,
      timeStep: params.timeStep,
    });
    points.push(point);

    const deltaSoc = calculateDeltaSoc(
      params.current,
      params.timeStep,
      params.capacity,
      params.batteryType.coulombicEfficiency
    );
    currentSoc = Math.max(0, currentSoc - deltaSoc);

    time += params.timeStep;
  }

  // Финальная точка (SOC = 0)
  points.push(calculateStep({
    time,
    soc: 0,
    batteryType: params.batteryType.code,
    minVoltage: params.minVoltage,
    maxVoltage: params.maxVoltage,
    current: params.current,
    internalResistance: params.batteryType.internalResistance,
    isCharging: false,
    timeStep: params.timeStep,
  }));

  return {
    points,
    duration: time,
    finalSoc: 0,
  };
}