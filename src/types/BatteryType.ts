// ============================================
// ТИПЫ ДАННЫХ: ТИПЫ БАТАРЕЙ
// ============================================

export type BatteryTypeCode =
  | 'Li-Ion'
  | 'Li-Po'
  | 'LiFePO4'
  | 'Na-Ion'
  | 'NiMH'
  | 'Lead-Acid'
  | 'Alkaline'
  | 'Custom';

export type SimulationMode = 'charge' | 'discharge';

export interface BatteryType {
  code: BatteryTypeCode;
  label: string;
  color: string;
  supportsCharge: boolean;

  capacity: {
    min: number;
    max: number;
    default: number;
  };

  voltage: {
    min: number;
    max: number;
  };

  current: {
    min: number;
    max: number;
    defaultCharge: number;
    defaultDischarge: number;
  };

  coulombicEfficiency: number;

  // НОВОЕ ПОЛЕ: внутреннее сопротивление (Ом)
  // Чем больше — тем сильнее "проседает" напряжение под нагрузкой
  internalResistance: number;
}