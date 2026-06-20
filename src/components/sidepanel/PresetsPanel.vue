<script setup lang="ts">
import { ref } from 'vue'
import { usePresets } from '../../composables/usePresets'
import { useSimulation } from '../../composables/useSimulation'

const {
  presets,
  exportPresets,
  importPresets
} = usePresets()

const {
  params,
  activeTypeCode
} = useSimulation()

const fileInput = ref<HTMLInputElement | null>(null)

const applyPreset = (presetId: string) => {
  const preset = presets.value.find(
    p => p.id === presetId
  )

  if (!preset) return

  activeTypeCode.value = preset.typeId

  params.capacity = preset.capacity
  params.minVoltage = preset.minVoltage
  params.maxVoltage = preset.maxVoltage
  params.current = preset.current
}

const handleImport = (event: Event) => {
  const file =
    (event.target as HTMLInputElement)
      .files?.[0]

  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    try {
      const data = JSON.parse(
        reader.result as string
      )

      if (!Array.isArray(data)) {
        throw new Error()
      }

      importPresets(data)
    } catch {
      alert('Некорректный файл пресетов')
    }
  }

  reader.readAsText(file)
}
</script>

<template>
  <div class="flex flex-col gap-4">

    <input
      ref="fileInput"
      type="file"
      accept=".json"
      class="hidden"
      @change="handleImport"
    />

    <div class="flex justify-end gap-2">

      <button
        @click="fileInput?.click()"
        class="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm"
      >
        Импорт
      </button>

      <button
        @click="exportPresets"
        class="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm"
      >
        Экспорт
      </button>

    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <button
        v-for="preset in presets"
        :key="preset.id"
        @click="applyPreset(preset.id)"
        class="text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all bg-white dark:bg-slate-900"
      >
        <h3 class="font-semibold text-base mb-3">
          {{ preset.name }}
        </h3>

        <div class="text-sm text-slate-500 space-y-1">
          <div>
            Тип: {{ preset.typeId }}
          </div>

          <div>
            Ёмкость: {{ preset.capacity }} Ah
          </div>

          <div>
            {{ preset.minVoltage }} – {{ preset.maxVoltage }} V
          </div>

          <div>
            Ток: {{ preset.current }} A
          </div>
        </div>
      </button>
    </div>

  </div>
</template>