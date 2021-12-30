<template>
  <vue3-chart-js
    :id="id"
    :type="type"
    :data="getChartData"
    :options="chartOptions"
    :key="randomNumber()"
  ></vue3-chart-js>
</template>

<script>
import { bgColors } from '@/config/settings'
import { randomNumber } from '@/helpers/utils';
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

export default {
  name: 'VChart',
  
  components: {
    Vue3ChartJs,
  },

  props: {
    id: {
      type: String,
      default: 'vchart' 
    },
    type: {
      type: String,
      default: 'bar' 
    },
    data: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => {}
    },
    showLegend: {
      type: Boolean,
      default: false
    },
    legendPosition: {
      type: String,
      default: 'left'
    },
    colors: {
      type: Array,
      default: () => []
    }
  },

  data(){
    return {
      bgColors: bgColors,
      chartOptions: {
        maintainAspectRatio: false,
        skipNull: true,
        responsive: true,
        scales: this.type == 'line' ? {
          y: {
            beginAtZero: true
          }
        } : {},
        plugins: {
          legend: {
            display: this.showLegend,
            position: this.legendPosition,
            maxHeight: 100
          }
        },
        ticks: {
          stepSize: 500
        },
        cutout: '80%'
      },
    }
  },

  computed: {
    getChartData () {
      // let randomIndex = Math.floor(Math.random()*this.bgColors.length);
      // 'rgb(121, 135, 119)'
      let datasets = [
        {
          backgroundColor: this.type == 'line' ? '#42C2F2' : (this.data.labels[0] == 'No data yet' ? '#f5f5f5' : (this.colors.length > 0 ? this.colors : this.bgColors)),
          borderColor: this.type == 'line' ? '#42C2F2' : '#ddd',
          borderWidth: this.type == 'line' ? 2 : 0.5,
          tension: this.type == 'line' ? 0 : 0,
          // tension: this.type == 'line' ? .5 : 0,
          pointRadius: this.type == 'line' ? 3 : 0,
          borderRadius: 2,
          // fill: this.type == 'line',
          data: this.data ? this.data.values : [],
        }
      ]

      let charData = {
        labels: this.data ? this.data.labels : [],
        datasets: datasets
      }

      return charData;
    }
  },

  methods: {
    randomNumber
  }
}
</script>

