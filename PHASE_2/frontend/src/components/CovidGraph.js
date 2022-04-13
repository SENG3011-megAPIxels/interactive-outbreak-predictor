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

const labels = ["10-21", "11-21", "12-21", "01-22", "02-22"];
const data = {
    labels,
    datasets: [
        {
            label: 'ACT',
            data: [717, 346, 1868, 31555, 13191, 27452],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'NSW',
            data: [11393, 6388, 127871, 858176, 143939],
            borderColor: 'rgb(255, 99, 32)',
            backgroundColor: 'rgba(255, 99, 32, 0.5)',
        },
        {
            label: 'QLD',
            data: [48, 40, 11730, 397982, 143939],
            borderColor: 'rgb(255, 99, 202)',
            backgroundColor: 'rgba(255, 99, 202, 0.5)',
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
            text: 'New Cases'
        }
    }
}

function CovidGraph() {
    return (
        <div style={{width: "80%", height: 0}}>
            <Line options={options} data={data}/>
        </div>
    )
}

export { CovidGraph }
