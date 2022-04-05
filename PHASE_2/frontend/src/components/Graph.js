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

function Graph(data, options) {
    console.log(data);
    return (
        <div style={{width: "80%", height: 0}}>
            <Line options={options} data={data}/>
        </div>
    )
}

export { Graph }