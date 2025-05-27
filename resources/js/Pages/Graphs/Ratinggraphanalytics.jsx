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
import Modal from "@/Components/Modal";
import Ratingdatatable from "@/Modal/Ratingdatatable";

// Register bar chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Ratinggraphanalytics({
    auth,
    excellent,
    veryGood,
    Bad,
    veryBad,
}) {
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");

    const data = {
        labels: ["Excellent", "Good", "Bad", "Very Bad"],
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
            <h2 className="text-lg font-semibold text-center mb-4">Ratings</h2>
            <Bar data={data} options={options} />

            {/* ✅ Conditional rendering of modal */}
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
