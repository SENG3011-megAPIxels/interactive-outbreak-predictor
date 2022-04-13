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

const labels = ["10-21", "11-21", "12-21", "01-22", "02-22", "03-22", "04-22", "05-22", "06-22", "07-22"];
const data = {
    labels,
    datasets: [
        {
        label: '% of Unemployment in AUS',
        data: [5.22, 4.61, 4.15, 4.19, 4.04, 4.0, 3.9, 3.85, 3.8, 3.78],
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

function UnGraph() {
    return (
        <div style={{width: "80%", height: 0}}>
            <Line options={options} data={data}/>
        </div>
    )
}

export { UnGraph }
