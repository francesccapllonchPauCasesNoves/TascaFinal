// Crea el gràfic a partir de les dades de tasques completades per mes
export function pintarGrafic(ctx, dades) {
    if (typeof Chart === 'undefined') {
        throw new Error('Chart.js no està carregat. Assegura`t que el script de Chart.js s’ha importat abans.');
    }

    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
        existingChart.destroy();
    }

    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
            datasets: [{
                label: 'Tasques Completades',
                data: dades,
                borderWidth: 2,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}
