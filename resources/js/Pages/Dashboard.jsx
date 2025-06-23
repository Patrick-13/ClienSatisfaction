import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import Sexgraphanalytics from "./Graphs/Sexgraphanalytics";
import Ratinggraphanalytics from "./Graphs/Ratinggraphanalytics";

export default function Dashboard({
    excellent,
    veryGood,
    Bad,
    veryBad,
    male,
    female,
    completed,
    noshow,
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
        completed,
        noshow,
    });

    console.log("completed" , stats.completed);
    console.log("noshow" , stats.noshow);

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
                                <div className="flex flex-col w-full sm:w-56">
                                    <InputLabel
                                        htmlFor="dateFrom"
                                        value="Date From"
                                    />
                                    <TextInput
                                        id="dateFrom"
                                        value={dateFrom}
                                        type="date"
                                        onChange={(e) =>
                                            setDateFrom(e.target.value)
                                        }
                                        className="text-gray-900"
                                    />
                                </div>

                                <div className="flex flex-col w-full sm:w-56">
                                    <InputLabel
                                        htmlFor="dateTo"
                                        value="Date To"
                                    />
                                    <TextInput
                                        id="dateTo"
                                        value={dateTo}
                                        type="date"
                                        onChange={(e) =>
                                            setDateTo(e.target.value)
                                        }
                                        className="text-gray-900"
                                    />
                                </div>

                                <div className="flex flex-col w-full sm:w-56">
                                    <InputLabel
                                        htmlFor="sector"
                                        value="Filter Sector"
                                    />
                                    <SelectInput
                                        id="sector"
                                        value={sector}
                                        onChange={(e) =>
                                            setSector(e.target.value)
                                        }
                                        className="text-gray-900"
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

                                <div className="flex flex-col w-full sm:w-56">
                                    <InputLabel
                                        htmlFor="sex"
                                        value="Filter Sex"
                                    />
                                    <SelectInput
                                        id="sex"
                                        value={sex}
                                        onChange={(e) => setSex(e.target.value)}
                                        className="text-gray-900"
                                    >
                                        <option value="">Select Sex</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </SelectInput>
                                </div>

                                <div className="flex flex-col w-full sm:w-56">
                                    <InputLabel
                                        htmlFor="rating"
                                        value="Filter Rating"
                                    />
                                    <SelectInput
                                        id="rating"
                                        value={rating}
                                        onChange={(e) =>
                                            setRating(e.target.value)
                                        }
                                        className="text-gray-900"
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
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                                <div className="bg-gray-100 shadow-md rounded-lg p-6 flex items-center justify-center">
                                    Coming Soon
                                </div>
                                <div className="bg-gray-100 shadow-md rounded-lg p-6 flex items-center justify-center">
                                    Coming Soon
                                </div>

                                <div className="grid grid-rows F-1 lg:grid-rows-2 gap-8">
                                    <div className="bg-gray-100 border-l-4 border-blue-500 shadow-sm rounded-xl p-5 flex items-center justify-between hover:shadow-md transition">
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-500">
                                                Total Appointments
                                            </h3>
                                            <p className="text-2xl font-bold text-gray-800">
                                                {(stats?.completed || 0) +
                                                    (stats?.noshow || 0)}
                                            </p>
                                        </div>

                                        <div className="text-blue-500 text-3xl flex items-center h-full">
                                            📋
                                        </div>
                                    </div>

                                     <div className="bg-gray-100 border-l-4 border-green-500 shadow-sm rounded-xl p-5 flex items-center justify-between hover:shadow-md transition">
                                         <div>
                                        <h3 className="text-sm font-semibold text-gray-500">
                                            Completed
                                        </h3>
                                        <p className="text-2xl font-bold text-gray-800">
                                            {stats?.completed || 0}
                                        </p>
                                        </div>

                                        <div className="text-blue-500 text-3xl flex items-center h-full">
                                            ✅
                                        </div>
                                    </div>
                                      <div className="bg-gray-100 border-l-4 border-red-500 shadow-sm rounded-xl p-5 flex items-center justify-between hover:shadow-md transition">
                                              <div>
                                        <h3 className="text-sm font-semibold text-gray-500">
                                            No Show
                                        </h3>
                                        <p className="text-2xl font-bold text-gray-800">
                                            {stats?.noshow || 0}
                                        </p>
                                        </div> 
                                        <div className="text-blue-500 text-3xl flex items-center h-full">
                                            ❌
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
