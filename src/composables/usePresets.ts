import { ref } from 'vue'
import defaultPresets from '../data/defaultPresets.json'
import type { BatteryPreset } from '../types/BatteryPreset'

const STORAGE_KEY = 'battery-simulator-presets'

const presets = ref<BatteryPreset[]>(loadPresets())

function loadPresets(): BatteryPreset[] {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      console.error('Ошибка чтения пресетов')
    }
  }

  return defaultPresets.presets as BatteryPreset[]
}

function saveToStorage() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(presets.value)
  )
}

export function usePresets() {

  const savePreset = (preset: BatteryPreset) => {
    presets.value.push(preset)
    saveToStorage()
  }

  const deletePreset = (id: string) => {
    presets.value = presets.value.filter(p => p.id !== id)
    saveToStorage()
  }

  const updatePreset = (preset: BatteryPreset) => {
    const index = presets.value.findIndex(p => p.id === preset.id)

    if (index !== -1) {
      presets.value[index] = preset
      saveToStorage()
    }
  }

  const exportPresets = () => {
    const blob = new Blob(
      [JSON.stringify(presets.value, null, 2)],
      { type: 'application/json' }
    )

    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'battery-presets.json'
    a.click()

    URL.revokeObjectURL(url)
  }

  const importPresets = (
  imported: BatteryPreset[]
) => {

  imported.forEach(preset => {
    const exists = presets.value.some(
      p => p.id === preset.id
    )

    if (!exists) {
      presets.value.push(preset)
    }
  })

  saveToStorage()
}

return {
  presets,
  savePreset,
  deletePreset,
  updatePreset,
  exportPresets,
  importPresets
}
}

