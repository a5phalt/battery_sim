<template>
  <div class="chart-container">
    <Line 
      v-if="chartData"
      :data="chartData" 
      :options="chartOptions" 
    />
    <div v-else class="chart-placeholder">
      Запустите симуляцию для отображения графика
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import type { SimulationPoint } from '../../types/SimulationPoint'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const props = defineProps<{
  points: SimulationPoint[] | null
}>()

const chartData = computed(() => {
  if (!props.points || props.points.length === 0) {
    return null
  }

  return {
    labels: props.points.map(p => (p.time / 60).toFixed(1)),
    datasets: [
      {
        label: 'Напряжение (В)',
        data: props.points.map(p => p.voltage),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      callbacks: {
        label: (context: any) => {
          return `Напряжение: ${context.parsed.y.toFixed(3)} В`
        }
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Время (мин)'
      },
      grid: {
        display: false
      }
    },
    y: {
      title: {
        display: true,
        text: 'Напряжение (В)'
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      }
    }
  },
  interaction: {
    mode: 'nearest' as const,
    axis: 'x' as const,
    intersect: false
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #9CA3AF;
  font-size: 0.875rem;
}
</style>