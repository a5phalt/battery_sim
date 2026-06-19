import type { BatteryType, BatteryTypeCode } from '../types/BatteryType';
import batteryDatabase from '../data/batteryDatabase.json';

// Добавляем "as BatteryType[]" — говорим TypeScript: "я знаю, что делаю"
export const BATTERY_TYPES: BatteryType[] = batteryDatabase.types as BatteryType[];

export function getBatteryType(code: BatteryTypeCode): BatteryType | undefined {
  return BATTERY_TYPES.find(t => t.code === code);
}

export function getChargeableTypes(): BatteryType[] {
  return BATTERY_TYPES.filter(t => t.supportsCharge);
}

export function getAllTypes(): BatteryType[] {
  return BATTERY_TYPES;
}