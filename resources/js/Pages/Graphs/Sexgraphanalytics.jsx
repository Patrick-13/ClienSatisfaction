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

// Register bar chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Sexgraphanalytics({ male, female }) {
    const data = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "Sex Distribution",
                data: [male, female],
                backgroundColor: ["#36A2EB", "#FF6384"],
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
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0, // ensures whole numbers
                },
            },
        },
    };

    return (
        <div className="w-full px-6 mt-6">
            <h2 className="text-lg font-semibold text-center mb-4">
                Male vs Female
            </h2>
            <Bar data={data} options={options} />
        </div>
    );
}
