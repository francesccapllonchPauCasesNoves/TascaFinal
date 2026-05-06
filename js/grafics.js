//crea els grafics apartir de unes tasques com a parametre iles pinta al grafic
import Chart from 'chart.js/auto';

import { obtenirTasques } from './storage.js';

const ctx = document.getElementById('grafics').getContext('2d');

export function pintarGrafic(ctx, dades) {

    let existingChart = Chart.getChart(ctx);
    if (existingChart) {
        existingChart.destroy();
    }



new Chart(ctx, {
        type: 'line',
        animation: 'false',
    data: {
      labels: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
      
      // label dataset titol
      datasets: [{
        label: 'Tasques Completades',
        data: Object.values(dades),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });