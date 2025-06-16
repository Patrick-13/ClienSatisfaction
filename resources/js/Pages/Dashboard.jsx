import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import Sexgraphanalytics from "./Graphs/Sexgraphanalytics";
import Ratinggraphanalytics from "./Graphs/Ratinggraphanalytics";
import QuarterlyRatinganalytics from "./Graphs/QuarterlyRatinganalytics";

export default function Dashboard({
    excellent,
    veryGood,
    Bad,
    veryBad,
    male,
    female,
}) {
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [sex, setSex] = useState("");
    const [rating, setRating] = useState("");
    const [sector, setSector] = useState("");
    const [stats, setStats] = useState({
        excellent,
        veryGood,
        Bad,
        veryBad,
        male,
        female,
    });

    useEffect(() => {
        let intervalId;

        const fetchData = () => {
            axios
                .get(
                    route("ratingsdashboard.index", {
                        dateFrom,
                        dateTo,
                        sex,
                        rating,
                        sector,
                    }),
                    {
                        headers: {
                            Accept: "application/json",
                        },
                    }
                )
                .then((res) => {
                    setStats(res.data);
                })
                .catch((err) => {
                    console.error("Failed to fetch stats", err);
                });
        };

        // If both dates are empty, run fetch in interval mode
        if (!dateFrom && !dateTo && !sex) {
            fetchData(); // Initial fetch immediately
            intervalId = setInterval(fetchData, 5000); // Every 5 seconds
        } else {
            fetchData(); // Fetch just once if filters are set
        }

        return () => {
            if (intervalId) clearInterval(intervalId); // Clear interval on cleanup
        };
    }, [dateFrom, dateTo, sex, rating, sector]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-4">
                <div className="mx-auto max-w-9xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex flex-wrap gap-4 mb-6">
                                <div className="flex flex-col">
                                    <InputLabel
                                        htmlFor="dateFrom"
                                        value="Date From"
                                    />
                                    <TextInput
                                        id="dateFrom"
                                        value={dateFrom}
                                        type="date"
                                        onChange={(e) => {
                                            const selectedDateFrom =
                                                e.target.value;
                                            setDateFrom(selectedDateFrom);
                                        }}
                                        className="w-56 text-gray-900"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <InputLabel
                                        htmlFor="dateTo"
                                        value="Date To"
                                    />
                                    <TextInput
                                        id="dateTo"
                                        value={dateTo}
                                        type="date"
                                        onChange={(e) => {
                                            const selectedDateTo =
                                                e.target.value;
                                            setDateTo(selectedDateTo);
                                        }}
                                        className="w-56 text-gray-900"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <InputLabel
                                        htmlFor="sector"
                                        value="Filter Sector"
                                    />
                                    <SelectInput
                                        id="sector"
                                        value={sector}
                                        onChange={(e) => {
                                            const selectedSector =
                                                e.target.value;
                                            setSector(selectedSector);
                                        }}
                                        className="w-56 text-gray-900"
                                    >
                                        <option value="">Select Sector</option>
                                        <option value="Government">
                                            Government
                                        </option>
                                        <option value="Private">Private</option>
                                        <option value="NGO">NGO</option>
                                        <option value="Other">Other</option>
                                    </SelectInput>
                                </div>
                                <div className="flex flex-col">
                                    <InputLabel
                                        htmlFor="sex"
                                        value="Filter Sex"
                                    />
                                    <SelectInput
                                        id="sex"
                                        value={sex}
                                        onChange={(e) => {
                                            const selectedSex = e.target.value;
                                            setSex(selectedSex);
                                        }}
                                        className="w-56 text-gray-900"
                                    >
                                        <option value="">Select Sex</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </SelectInput>
                                </div>

                                <div className="flex flex-col">
                                    <InputLabel
                                        htmlFor="rating"
                                        value="Filter Rating"
                                    />
                                    <SelectInput
                                        id="rating"
                                        value={rating}
                                        onChange={(e) => {
                                            const selectedRating =
                                                e.target.value;
                                            setRating(selectedRating);
                                        }}
                                        className="w-56 text-gray-900"
                                    >
                                        <option value="">Select Rating</option>
                                        <option value="Excellent">
                                            Excellent
                                        </option>
                                        <option value="Good">Good</option>
                                        <option value="Bad">Bad</option>
                                        <option value="Very Bad">
                                            Very Bad
                                        </option>
                                    </SelectInput>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white shadow-md rounded-lg p-6">
                                    <Sexgraphanalytics
                                        male={stats.male}
                                        female={stats.female}
                                    />
                                </div>

                                <div className="bg-white shadow-md rounded-lg p-6">
                                    <Ratinggraphanalytics
                                        excellent={stats.excellent}
                                        veryGood={stats.veryGood}
                                        Bad={stats.Bad}
                                        veryBad={stats.veryBad}
                                    />
                                </div>
                                <div className="bg-white shadow-md rounded-lg p-6">
                                    <QuarterlyRatinganalytics />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
