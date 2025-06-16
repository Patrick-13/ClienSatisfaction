import React, { useEffect, useState } from "react";
import axios from "axios";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    ChartDataLabels
);

export default function QuarterlyRatinganalytics() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("/ratingdata/quarterly-ratings").then((response) => {
            console.log(response);
            const responseData = response.data;
            const labels = responseData.map((item) => item.quarter);
            const excellent = responseData.map((item) => item.excellent);
            const good = responseData.map((item) => item.good);
            const bad = responseData.map((item) => item.bad);
            const veryBad = responseData.map((item) => item.very_bad);

            setData({
                labels,
                datasets: [
                    {
                        label: "Excellent",
                        data: excellent,
                        backgroundColor: "#00674F",
                    },
                    {
                        label: "Good",
                        data: good,
                        backgroundColor: "#0F4C81",
                    },
                    {
                        label: "Bad",
                        data: bad,
                        backgroundColor: "#BB2649",
                    },
                    {
                        label: "Very Bad",
                        data: veryBad,
                        backgroundColor: "#FF0000",
                    },
                ],
            });
        });
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            datalabels: {
                anchor: "center",
                align: "center",
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
        <div className="mt-8">
            <h2 className="text-lg font-semibold text-center mb-4">
                Quarterly Ratings Overview
            </h2>
            {data && <Bar data={data} options={options} />}
        </div>
    );
}
