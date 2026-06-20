import { ref, onMounted } from 'vue'

export function useTheme() {
  const isDark = ref(false)

  // Проверяем localStorage при первой загрузке
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      isDark.value = true
      document.documentElement.classList.add('dark')
    } else {
      isDark.value = false
      document.documentElement.classList.remove('dark')
    }
  }

  // Переключаем тему и сохраняем в память браузера
  const toggleTheme = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Запускаем проверку при загрузке
  onMounted(() => {
    initTheme()
  })

  return {
    isDark,
    toggleTheme
  }
}