<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
  mode: 'presets' | 'history' | 'settings'
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Заголовки в зависимости от режима
const title = computed(() => {
  if (props.mode === 'presets') return 'Пресеты'
  if (props.mode === 'history') return 'История симуляций'
  if (props.mode === 'settings') return 'Настройки'
  return ''
})
</script>

<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
    @click="emit('close')"
  ></div>

  <aside 
    class="fixed top-0 right-0 h-full w-full sm:w-[450px] md:w-[600px] bg-white dark:bg-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="h-16 shrink-0 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6">
      <h2 class="font-bold text-lg">{{ title }}</h2>
      <button @click="emit('close')" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500">
        ✕
      </button>
    </div>

    <div class="flex-1 overflow-y-auto p-6">
      <div v-if="mode === 'presets'" class="text-slate-500 text-sm">
        [ Компонент PresetsPanel.vue ]
        </div>
      <div v-if="mode === 'history'" class="text-slate-500 text-sm">
        [ Компонент HistoryPanel.vue ]
      </div>
      <div v-if="mode === 'settings'" class="text-slate-500 text-sm">
        [ Компонент SettingsPanel.vue ]
      </div>
    </div>
  </aside>
</template>