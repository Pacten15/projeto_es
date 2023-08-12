<template>
  <Bar :chart-data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import BarChartStats from '@/models/dashboard/BarChartStats';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
name: 'BarChart',
components: { Bar },
props: {
  barChartStats: {
    type: BarChartStats,
    required: true
  }
},
data() {
  return {
    chartData: {
      labels: this.getLabels(), 
      datasets: this.getDatasets(),
    },
  }
  return data;
},
methods: {
  getLabels: function() {
    let labels = [];
    let len = this.barChartStats.courseExecutionsYears.length;
    for (let i=0; i < len && i < 3; i++) {
      if (i == (len - 1)) {
        labels.push(this.barChartStats.courseExecutionsYears[i] + ' (current)');
      } else {
        labels.push(this.barChartStats.courseExecutionsYears[i]);
      }
    }
    return labels;
  },
  getDatasets: function() {
    let datasets = [];
    let colors = ['#ff0000', '#00ff00', '#0000ff'];
    for (let i=0; i < 3; i++) {
      datasets.push({
        label: this.barChartStats.datasetLabels[i],
        backgroundColor: colors[i],
        data: this.getData(i)
      })
    }
    return datasets;
  },
  getData: function(statsId) {
    let data = [];
    let len = this.barChartStats.courseExecutionsYears.length;
    switch (statsId) {
      case 0: 
        for (let i=0; i < len && i < 3; i++) {
          data.push(this.barChartStats.stats1[i]);
        }
        break;
      case 1:
        for (let i=0; i < len && i < 3; i++) {
          data.push(this.barChartStats.stats2[i]);
        }
        break;
      case 2:
        for (let i=0; i < len && i < 3; i++) {
          data.push(this.barChartStats.stats3[i]);
        }
        break;
      default: break;
    }
    return data;
  },
}
}
</script>
