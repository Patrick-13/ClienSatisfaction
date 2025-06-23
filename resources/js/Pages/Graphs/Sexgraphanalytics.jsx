import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ChartDataLabels);

// Register bar chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Sexgraphanalytics({ male, female }) {
    const total = male + female;

    const data = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "Sex Distribution",
                data: [male, female],
                backgroundColor: ["#36A2EB", "#FF6384"], // Different colors
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            datalabels: {
                anchor: "center",
                align: "center",
                formatter: (value) => {
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${percentage}%`;
                },
                color: "#fff",
                font: {
                    weight: "bold",
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    return (
        <div className="w-full px-6 mt-6">
            <h2 className="text-lg font-semibold text-center mb-4 bg-gradient-to-r from-blue-500 to-pink-400 text-white py-2 px-4 rounded-full">
                Male vs Female
            </h2>
            <Bar data={data} options={options} plugins={[ChartDataLabels]} />
        </div>
    );
}
