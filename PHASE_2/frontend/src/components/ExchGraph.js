import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const labels = ["08-21", "09-21", "10-21", "11-21", "12-21", "01-22", "02-22", "03-22", "04-22"];
const data = {
    labels,
    datasets: [
        {
        label: 'AUD Currency Exchange Rate',
        data: [1.36, 1.35, 1.37, 1.32, 1.40, 1.37, 1.40, 1.37, 1.33],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ]
}
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'Percentage of Unemployment'
        }
    }
}

function ExchGraph() {
    return (
        <div style={{width: "80%", height: 0}}>
            <Line options={options} data={data}/>
        </div>
    )
}

export { ExchGraph }
