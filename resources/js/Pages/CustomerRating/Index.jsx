import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import {
    RATING_STATUS_CLASS_MAP,
    RATING_STATUS_TEXT_MAP,
    GENDER_STATUS_CLASS_MAP,
    GENDER_STATUS_TEXT_MAP,
} from "@/constant";

import {
    BsEmojiAngry,
    BsEmojiFrown,
    BsEmojiSmile,
    BsEmojiLaughing,
} from "react-icons/bs";
import { differenceInMinutes, parse } from "date-fns";
import { IoIosMale, IoIosFemale } from "react-icons/io";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import Spinner from "@/Components/Spinner";

export default function Index({
    auth,
    flash,
    clientratingdatas,
    queryParams = null,
    totalCount,
    currentPageCount,
    currentPage,
}) {
    console.log(clientratingdatas);
    queryParams = queryParams || {};
    const [loading, setLoading] = useState(false);
    const [dateFrom, setDateFrom] = useState(queryParams.dateFrom || "");
    const [dateTo, setDateTo] = useState(queryParams.dateTo || "");
    const [sex, setSex] = useState(queryParams.sex || "");
    const [rating, setRating] = useState(queryParams.rating || "");
    const [sector, setSector] = useState("");

    const searchFieldChanged = (field, value) => {
        const updatedQueryParams = { ...queryParams };
        if (value) {
            updatedQueryParams[field] = value;
        } else {
            delete updatedQueryParams[field];
        }

        router.get(route("ratingdata.index"), updatedQueryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("ratingdata.index"), queryParams);
    };

    const handleExportCsv = () => {
        if (!dateFrom || !dateTo) {
            alert("Please select a date range before exporting CSV file.");
            return;
        }

        setLoading(true);

        axios
            .post(
                "/ratingdata/export/csv",
                {
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    sex: sex,
                    rating: rating,
                    sector: sector,
                },
                { responseType: "blob" }
            )
            .then((response) => {
                const blob = new Blob([response.data], {
                    type: "text/csv;charset=utf-8;",
                });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");

                // Format date strings for file name (e.g., 2024-05-01_to_2024-05-19)
                const formattedDateFrom = new Date(dateFrom)
                    .toISOString()
                    .split("T")[0];
                const formattedDateTo = new Date(dateTo)
                    .toISOString()
                    .split("T")[0];
                const fileName = `client_rating_${formattedDateFrom}_to_${formattedDateTo}.csv`;

                link.href = url;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();

                link.remove();
                window.URL.revokeObjectURL(url);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error exporting CSV:", error);
                setLoading(false);
            });
    };

    const deleteRatingInfo = (clientratingdata) => {
        if (
            !window.confirm(
                `are you sure you want to delete ${clientratingdata.companyName} data?`
            )
        ) {
            return;
        }

        router.delete(route("ratingdata.destroy", clientratingdata.id));
    };

    useEffect(() => {
        if (flash.message.success) {
            toast.success(flash.message.success);
        }

        if (flash.message.error) {
            toast.error(flash.message.error);
        }
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight flex items-center gap-2">
                        <span>Client Rating Data</span>
                    </h2>
                </div>
            }
        >
            <Head title="CustomerRating" />
            <Spinner isOpen={loading} />
            <ToastContainer />

            <div className="py-2">
                <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <div className="relative flex flex-col gap-4 mb-5">
                                    <div className="flex justify-between items-center gap-4">
                                        <div className="relative flex items-center gap-2">
                                            <div className="flex flex-wrap gap-4 mb-6">
                                                <div className="flex flex-col">
                                                    <InputLabel
                                                        htmlFor="dateFrom"
                                                        value="Date From"
                                                    />
                                                    <TextInput
                                                        type="date"
                                                        defaultValue={
                                                            queryParams.dateFrom
                                                        }
                                                        onChange={(e) =>
                                                            searchFieldChanged(
                                                                "dateFrom",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-56 text-gray-900"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <InputLabel
                                                        htmlFor="dateTo"
                                                        value="Date To"
                                                    />
                                                    <TextInput
                                                        type="date"
                                                        defaultValue={
                                                            queryParams.dateTo
                                                        }
                                                        onChange={(e) =>
                                                            searchFieldChanged(
                                                                "dateTo",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-56 text-gray-900"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <InputLabel
                                                        htmlFor="sector"
                                                        value="Filter Sector"
                                                    />
                                                    <SelectInput
                                                        defaultValue={
                                                            queryParams.sector
                                                        }
                                                        onChange={(e) =>
                                                            searchFieldChanged(
                                                                "sector",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-56 text-gray-900"
                                                    >
                                                        <option value="">
                                                            Select Sector
                                                        </option>
                                                        <option value="Government">
                                                            Government
                                                        </option>
                                                        <option value="Private">
                                                            Private
                                                        </option>
                                                        <option value="NGO">
                                                            NGO
                                                        </option>
                                                        <option value="Other">
                                                            Other
                                                        </option>
                                                    </SelectInput>
                                                </div>

                                                <div className="flex flex-col">
                                                    <InputLabel
                                                        htmlFor="sex"
                                                        value="Filter Sex"
                                                    />
                                                    <SelectInput
                                                        defaultValue={
                                                            queryParams.sex
                                                        }
                                                        onChange={(e) =>
                                                            searchFieldChanged(
                                                                "sex",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-56 text-gray-900"
                                                    >
                                                        <option value="">
                                                            Select Sex
                                                        </option>
                                                        <option value="Male">
                                                            Male
                                                        </option>
                                                        <option value="Female">
                                                            Female
                                                        </option>
                                                    </SelectInput>
                                                </div>

                                                <div className="flex flex-col">
                                                    <InputLabel
                                                        htmlFor="rating"
                                                        value="Filter Rating"
                                                    />
                                                    <SelectInput
                                                        defaultValue={
                                                            queryParams.rating
                                                        }
                                                        onChange={(e) =>
                                                            searchFieldChanged(
                                                                "rating",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-56 text-gray-900"
                                                    >
                                                        <option value="">
                                                            Select Rating
                                                        </option>
                                                        <option value="Excellent">
                                                            Excellent
                                                        </option>
                                                        <option value="Good">
                                                            Good
                                                        </option>
                                                        <option value="Bad">
                                                            Bad
                                                        </option>
                                                        <option value="Very Bad">
                                                            Very Bad
                                                        </option>
                                                    </SelectInput>
                                                </div>

                                                <div className="flex items-end">
                                                    <button
                                                        onClick={
                                                            handleExportCsv
                                                        }
                                                        className="bg-green-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-green-600 flex items-center gap-1"
                                                    >
                                                        <BsFiletypeCsv
                                                            size={18}
                                                        />
                                                        <span>Extract CSV</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <div className="md:h-[500px] lg:h-[500px] overflow-y-auto">
                                        <table className="w-full text-sm text-left trl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500 z-10 sticky top-0">
                                                <tr className="text-nowrap">
                                                    <TableHeading
                                                        name="id"
                                                        sort_field={
                                                            queryParams.sort_field
                                                        }
                                                        sort_direction={
                                                            queryParams.sort_direction
                                                        }
                                                        sortChanged={
                                                            sortChanged
                                                        }
                                                    >
                                                        ID
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="odName"
                                                        sort_field={
                                                            queryParams.sort_field
                                                        }
                                                        sort_direction={
                                                            queryParams.sort_direction
                                                        }
                                                        sortChanged={
                                                            sortChanged
                                                        }
                                                    >
                                                        Officer of the Day
                                                        (Name)
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="date"
                                                        sort_field={
                                                            queryParams.sort_field
                                                        }
                                                        sort_direction={
                                                            queryParams.sort_direction
                                                        }
                                                        sortChanged={
                                                            sortChanged
                                                        }
                                                    >
                                                        Date
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="clientName"
                                                        sort_field={
                                                            queryParams.sort_field
                                                        }
                                                        sort_direction={
                                                            queryParams.sort_direction
                                                        }
                                                        sortChanged={
                                                            sortChanged
                                                        }
                                                    >
                                                        Client Name
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="sex"
                                                        sort_field={
                                                            queryParams.sort_field
                                                        }
                                                        sort_direction={
                                                            queryParams.sort_direction
                                                        }
                                                        sortChanged={
                                                            sortChanged
                                                        }
                                                    >
                                                        Sex
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="sector"
                                                        sort_field={
                                                            queryParams.sort_field
                                                        }
                                                        sort_direction={
                                                            queryParams.sort_direction
                                                        }
                                                        sortChanged={
                                                            sortChanged
                                                        }
                                                    >
                                                        Sector
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="companyName"
                                                        sort_field={
                                                            queryParams.sort_field
                                                        }
                                                        sort_direction={
                                                            queryParams.sort_direction
                                                        }
                                                        sortChanged={
                                                            sortChanged
                                                        }
                                                    >
                                                        Company Name
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="unit"
                                                        sort_field={
                                                            queryParams.sort_field
                                                        }
                                                        sort_direction={
                                                            queryParams.sort_direction
                                                        }
                                                        sortChanged={
                                                            sortChanged
                                                        }
                                                    >
                                                        Section/Unit
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="timeIn"
                                                        sort_field={
                                                            queryParams.sort_field
                                                        }
                                                        sort_direction={
                                                            queryParams.sort_direction
                                                        }
                                                        sortChanged={
                                                            sortChanged
                                                        }
                                                    >
                                                        Time In
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="timeOut"
                                                        sort_field={
                                                            queryParams.sort_field
                                                        }
                                                        sort_direction={
                                                            queryParams.sort_direction
                                                        }
                                                        sortChanged={
                                                            sortChanged
                                                        }
                                                    >
                                                        Time Out
                                                    </TableHeading>
                                                    <th>Total Time Process</th>
                                                    <TableHeading
                                                        name="rating"
                                                        sort_field={
                                                            queryParams.sort_field
                                                        }
                                                        sort_direction={
                                                            queryParams.sort_direction
                                                        }
                                                        sortChanged={
                                                            sortChanged
                                                        }
                                                    >
                                                        Rating
                                                    </TableHeading>
                                                    <th className="px-3 py-2">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {clientratingdatas &&
                                                clientratingdatas.data.length >
                                                    0 ? (
                                                    clientratingdatas.data.map(
                                                        (clientratingdata) => (
                                                            <tr
                                                                className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700"
                                                                key={
                                                                    clientratingdata.id
                                                                }
                                                            >
                                                                <td className="px-3 py-2">
                                                                    {
                                                                        clientratingdata.id
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {
                                                                        clientratingdata.odName
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {
                                                                        clientratingdata.date
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {
                                                                        clientratingdata.clientName
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {clientratingdata.sex ===
                                                                    "Male" ? (
                                                                        <IoIosMale
                                                                            className="text-blue-500 inline-block mr-1"
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <IoIosFemale
                                                                            className="text-pink-500 inline-block mr-1"
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    )}
                                                                    {
                                                                        <span
                                                                            className={
                                                                                "px-2 py-1 rounded text-white " +
                                                                                GENDER_STATUS_CLASS_MAP[
                                                                                    clientratingdata
                                                                                        .sex
                                                                                ]
                                                                            }
                                                                        >
                                                                            {
                                                                                GENDER_STATUS_TEXT_MAP[
                                                                                    clientratingdata
                                                                                        .sex
                                                                                ]
                                                                            }
                                                                        </span>
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {
                                                                        clientratingdata.sector
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {
                                                                        clientratingdata.companyName
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {
                                                                        clientratingdata
                                                                            .unitBy
                                                                            ?.unit_name
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {
                                                                        clientratingdata.timeIn
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {
                                                                        clientratingdata.timeOut
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {(() => {
                                                                        const timeIn =
                                                                            parse(
                                                                                clientratingdata.timeIn,
                                                                                "HH:mm",
                                                                                new Date()
                                                                            );
                                                                        const timeOut =
                                                                            parse(
                                                                                clientratingdata.timeOut,
                                                                                "HH:mm",
                                                                                new Date()
                                                                            );

                                                                        const totalMinutes =
                                                                            differenceInMinutes(
                                                                                timeOut,
                                                                                timeIn
                                                                            );
                                                                        const hours =
                                                                            Math.floor(
                                                                                totalMinutes /
                                                                                    60
                                                                            );
                                                                        const minutes =
                                                                            totalMinutes %
                                                                            60;

                                                                        return `${hours}h ${minutes}m`;
                                                                    })()}
                                                                </td>
                                                                <td>
                                                                    {clientratingdata.rating ===
                                                                    "Very Bad" ? (
                                                                        <BsEmojiAngry
                                                                            className="text-red-500 inline-block mr-1"
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    ) : clientratingdata.rating ===
                                                                      "Bad" ? (
                                                                        <BsEmojiFrown
                                                                            className="text-yellow-500 inline-block mr-1"
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    ) : clientratingdata.rating ===
                                                                      "Good" ? (
                                                                        <BsEmojiSmile
                                                                            className="text-blue-500 inline-block mr-1"
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    ) : clientratingdata.rating ===
                                                                      "Excellent" ? (
                                                                        <BsEmojiLaughing
                                                                            className="text-green-500 inline-block mr-1"
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    ) : null}

                                                                    <span
                                                                        className={
                                                                            "px-2 py-1 rounded text-white " +
                                                                            RATING_STATUS_CLASS_MAP[
                                                                                clientratingdata
                                                                                    .rating
                                                                            ]
                                                                        }
                                                                    >
                                                                        {
                                                                            RATING_STATUS_TEXT_MAP[
                                                                                clientratingdata
                                                                                    .rating
                                                                            ]
                                                                        }
                                                                    </span>
                                                                </td>
                                                                <td className="px-3 py-2 flex text-nowrap">
                                                                    <Link
                                                                        href={route(
                                                                            "ratingdata.edit",
                                                                            clientratingdata.id
                                                                        )}
                                                                        className="font-medium text-blue dark:text-blue-500 hover:underline mx-1"
                                                                    >
                                                                        <FaPencilAlt
                                                                            className="text-green-500"
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    </Link>
                                                                    <button
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            deleteRatingInfo(
                                                                                clientratingdata
                                                                            )
                                                                        }
                                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                                    >
                                                                        <FaTrashAlt
                                                                            className="text-red-600"
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    </button>
                                                                </td>
                                                                <td className="px-3 py-2 flex text-nowrap"></td>
                                                            </tr>
                                                        )
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="11"
                                                            className="text-center py-4"
                                                        >
                                                            No data available
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <Pagination
                                links={
                                    clientratingdatas &&
                                    clientratingdatas.meta.links
                                }
                                totalCount={totalCount}
                                currentPageCount={currentPageCount}
                                currentPage={currentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
