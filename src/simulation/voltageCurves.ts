// ============================================
// НЕЛИНЕЙНЫЕ КРИВЫЕ НАПРЯЖЕНИЯ
// ============================================
// Реальные характеристики батарей из даташитов

/**
 * Табличные данные напряжения в зависимости от SOC
 * Точки взяты из реальных измерений (даташиты Panasonic, Samsung, LG)
 */
export const VOLTAGE_CURVES: Record<string, Array<{ soc: number; voltage: number }>> = {
  'Li-Ion': [
    { soc: 0, voltage: 3.0 },
    { soc: 5, voltage: 3.3 },
    { soc: 10, voltage: 3.6 },
    { soc: 15, voltage: 3.68 },
    { soc: 20, voltage: 3.72 },
    { soc: 30, voltage: 3.75 },
    { soc: 40, voltage: 3.76 },
    { soc: 50, voltage: 3.77 },
    { soc: 60, voltage: 3.78 },
    { soc: 70, voltage: 3.8 },
    { soc: 80, voltage: 3.85 },
    { soc: 90, voltage: 3.95 },
    { soc: 95, voltage: 4.05 },
    { soc: 100, voltage: 4.2 }
  ],

  'Li-Po': [
    { soc: 0, voltage: 3.0 },
    { soc: 10, voltage: 3.55 },
    { soc: 20, voltage: 3.7 },
    { soc: 30, voltage: 3.73 },
    { soc: 40, voltage: 3.75 },
    { soc: 50, voltage: 3.76 },
    { soc: 60, voltage: 3.77 },
    { soc: 70, voltage: 3.79 },
    { soc: 80, voltage: 3.85 },
    { soc: 90, voltage: 3.95 },
    { soc: 100, voltage: 4.2 }
  ],

  'LiFePO4': [
    { soc: 0, voltage: 2.5 },
    { soc: 5, voltage: 3.0 },
    { soc: 10, voltage: 3.2 },
    { soc: 15, voltage: 3.25 },
    { soc: 20, voltage: 3.27 },
    { soc: 30, voltage: 3.28 },
    { soc: 40, voltage: 3.29 },
    { soc: 50, voltage: 3.3 },
    { soc: 60, voltage: 3.31 },
    { soc: 70, voltage: 3.32 },
    { soc: 80, voltage: 3.33 },
    { soc: 90, voltage: 3.35 },
    { soc: 95, voltage: 3.45 },
    { soc: 100, voltage: 3.6 }
  ],

  'Na-Ion': [
    { soc: 0, voltage: 2.0 },
    { soc: 10, voltage: 2.8 },
    { soc: 20, voltage: 3.2 },
    { soc: 30, voltage: 3.4 },
    { soc: 40, voltage: 3.5 },
    { soc: 50, voltage: 3.55 },
    { soc: 60, voltage: 3.6 },
    { soc: 70, voltage: 3.65 },
    { soc: 80, voltage: 3.75 },
    { soc: 90, voltage: 3.85 },
    { soc: 100, voltage: 4.0 }
  ],

  'NiMH': [
    { soc: 0, voltage: 1.0 },
    { soc: 10, voltage: 1.15 },
    { soc: 20, voltage: 1.2 },
    { soc: 30, voltage: 1.22 },
    { soc: 40, voltage: 1.23 },
    { soc: 50, voltage: 1.24 },
    { soc: 60, voltage: 1.25 },
    { soc: 70, voltage: 1.26 },
    { soc: 80, voltage: 1.28 },
    { soc: 90, voltage: 1.32 },
    { soc: 100, voltage: 1.4 }
  ],

  'Lead-Acid': [
    { soc: 0, voltage: 10.5 },
    { soc: 10, voltage: 11.3 },
    { soc: 20, voltage: 11.6 },
    { soc: 30, voltage: 11.8 },
    { soc: 40, voltage: 12.0 },
    { soc: 50, voltage: 12.1 },
    { soc: 60, voltage: 12.2 },
    { soc: 70, voltage: 12.3 },
    { soc: 80, voltage: 12.4 },
    { soc: 90, voltage: 12.5 },
    { soc: 100, voltage: 12.7 }
  ],

  'Alkaline': [
    { soc: 0, voltage: 0.9 },
    { soc: 10, voltage: 1.1 },
    { soc: 20, voltage: 1.2 },
    { soc: 30, voltage: 1.28 },
    { soc: 40, voltage: 1.33 },
    { soc: 50, voltage: 1.38 },
    { soc: 60, voltage: 1.42 },
    { soc: 70, voltage: 1.46 },
    { soc: 80, voltage: 1.5 },
    { soc: 90, voltage: 1.55 },
    { soc: 100, voltage: 1.6 }
  ],

  'Custom': [
    // Линейная модель для пользовательского типа
    { soc: 0, voltage: 0 },
    { soc: 100, voltage: 1 }
  ]
};

/**
 * Получить напряжение из кривой с линейной интерполяцией
 * 
 * @param soc - уровень заряда (0-100%)
 * @param batteryType - тип батареи
 * @param minVoltage - минимальное напряжение (используется для Custom)
 * @param maxVoltage - максимальное напряжение (используется для Custom)
 * @returns напряжение в вольтах
 */
export function getVoltageFromCurve(
  soc: number,
  batteryType: string,
  minVoltage: number,
  maxVoltage: number
): number {
  // Для Custom используем линейную модель
  if (batteryType === 'Custom') {
    return minVoltage + (soc / 100) * (maxVoltage - minVoltage);
  }

  const curve = VOLTAGE_CURVES[batteryType];
  if (!curve) {
    // Если тип не найден - линейная модель
    return minVoltage + (soc / 100) * (maxVoltage - minVoltage);
  }

  // Ограничиваем SOC пределами
  soc = Math.max(0, Math.min(100, soc));

  // Ищем две соседние точки для интерполяции
  for (let i = 0; i < curve.length - 1; i++) {
    const current = curve[i];
    const next = curve[i + 1];

    if (soc >= current.soc && soc <= next.soc) {
      // Линейная интерполяция между двумя точками
      const ratio = (soc - current.soc) / (next.soc - current.soc);
      return current.voltage + ratio * (next.voltage - current.voltage);
    }
  }

  // Если SOC вне диапазона (не должно произойти)
  return soc < 0 ? curve[0].voltage : curve[curve.length - 1].voltage;
}