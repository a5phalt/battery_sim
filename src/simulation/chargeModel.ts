// ============================================
// МОДЕЛЬ ЗАРЯДА БАТАРЕИ
// ============================================

import type { BatteryType } from '../types/BatteryType';
import type { SimulationPoint } from '../types/SimulationPoint';
import { calculateDeltaSoc, calculateStep } from './batteryModel';

export interface ChargeParams {
  initialSoc: number;
  current: number;
  timeStep: number;
  batteryType: BatteryType;
  capacity: number;
  minVoltage: number;
  maxVoltage: number;
}

export interface ChargeResult {
  points: SimulationPoint[];
  duration: number;
  finalSoc: number;
}

/**
 * Симуляция заряда до SOC = 100%.
 */
export function simulateCharge(params: ChargeParams): ChargeResult {
  const points: SimulationPoint[] = [];
  let currentSoc = params.initialSoc;
  let time = 0;

  while (currentSoc < 100) {
    const point = calculateStep({
      time,
      soc: currentSoc,
      minVoltage: params.minVoltage,
      maxVoltage: params.maxVoltage,
      current: params.current,
      internalResistance: params.batteryType.internalResistance,
      isCharging: true,
      timeStep: params.timeStep,
    });
    points.push(point);

    const deltaSoc = calculateDeltaSoc(
      params.current,
      params.timeStep,
      params.capacity,
      params.batteryType.coulombicEfficiency
    );
    currentSoc = Math.min(100, currentSoc + deltaSoc);

    time += params.timeStep;
  }

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
    finalSoc: 100,
  };
}