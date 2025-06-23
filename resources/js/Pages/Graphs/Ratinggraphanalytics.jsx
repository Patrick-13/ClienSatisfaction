import React, { useState } from "react";
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
import Modal from "@/Components/Modal";
import Ratingdatatable from "@/Modal/Ratingdatatable";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    ChartDataLabels
);

export default function Ratinggraphanalytics({
    auth,
    excellent,
    veryGood,
    Bad,
    veryBad,
}) {
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");

    const total = excellent + veryGood + Bad + veryBad;

    const data = {
        labels: ["😊 Excellent", "🙂 Good", "😟 Bad", "😠 Very Bad"],
        datasets: [
            {
                label: "Ratings Distribution",
                data: [excellent, veryGood, Bad, veryBad],
                backgroundColor: ["#00674F", "#0F4C81", "#BB2649", "#FF0000"],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: "y", // Makes the bars horizontal
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                anchor: "start",
                align: "end",
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
            x: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
        onClick: (event, elements, chart) => {
            if (elements.length > 0) {
                const clickedIndex = elements[0].index;
                const clickedLabel = data.labels[clickedIndex];
                setSelectedCategory(clickedLabel);
                setShowModal(true);
            }
        },
    };

    return (
        <div className="w-full px-6 mt-6">
            <h2 className="text-lg font-semibold text-center mb-4 text-white py-2 px-4 rounded-full bg-gradient-to-r from-green-500 via-blue-500 via-red-500 to-orange-500">
                Ratings
            </h2>

            <Bar data={data} options={options} />

            <Modal
                show={showModal}
                maxWidth="4xl"
                onClose={() => setShowModal(false)}
                closeable={true}
            >
                <Ratingdatatable
                    auth={auth}
                    filterCategory={selectedCategory}
                    closeModal={() => setShowModal(false)}
                />
            </Modal>
        </div>
    );
}
