import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaFilePdf } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import Pagination from "@/Components/Pagination"; // Assuming you have a Pagination component
import { useState } from "react";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { SECTION_UNIT_CLASS_MAP, SECTION_UNIT_TEXT_MAP } from "@/constant";

export default function Index({
    auth,
    appointments,
    queryParams = null, // Provide a default empty object
    totalCount,
    currentPageCount,
    currentPage,
    success,
}) {
    queryParams = queryParams || {};
    console.log(appointments);

    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const handleRowsPerPageChange = (e) => {
        const rowsPerPage = parseInt(e.target.value);
        const newParams = { ...queryParams, per_page: rowsPerPage };
        router.get(route("clientappointment.index"), newParams);
    };

    const searchFieldChanged = (field, value) => {
        const updatedQueryParams = { ...queryParams };
        if (value) {
            updatedQueryParams[field] = value;
        } else {
            delete updatedQueryParams[field];
        }

        console.log("Updated Query Params:", updatedQueryParams);

        router.get(route("clientappointment.index"), updatedQueryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const handleExportPdf = () => {
        setLoading(true);

        // Make API request to export endpoint with date range, shift, and other filters
        axios
            .post("/appointment/export/pdf", {}, { responseType: "blob" }) // <--- move `responseType` to third argument
            .then((response) => {
                const blob = new Blob([response.data], {
                    type: "application/pdf",
                });
                const url = window.URL.createObjectURL(blob);
                const newWindow = window.open(url, "_blank");

                if (newWindow) {
                    newWindow.onload = () => {
                        const downloadLink =
                            newWindow.document.createElement("a");
                        downloadLink.href = url;
                        downloadLink.setAttribute(
                            "download",
                            "od_accomplishment_report.pdf"
                        );
                        downloadLink.textContent = "Download PDF";
                        newWindow.document.body.appendChild(downloadLink);
                        setLoading(false);
                    };
                } else {
                    alert("Popup blocked. Please allow popups.");
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Error exporting data:", error);
                setLoading(false);
            });
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
        router.get(route("clientappointment.index"), queryParams);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight flex items-center gap-2">
                        <span>Appointment Page</span>
                    </h2>
                </div>
            }
        >
            <Head title="User List" />

            <div className="py-2">
                <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg darkMode ? 'dark' : ''">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="relative flex flex-col gap-4 mb-5">
                                <div className="flex justify-between items-center gap-4">
                                    <div className="relative flex items-center gap-2">
                                        <div className="relative inline-block">
                                            <button
                                                onClick={toggleDropdown}
                                                className="max-w-9xl mx-auto sm:px-6 lg:px-8 bg-gray-400 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-600 flex items-center gap-1 sm:w-auto"
                                            >
                                                <CiFilter size={18} />
                                                <span>Filters</span>
                                            </button>
                                        </div>
                                        <button
                                            onClick={handleExportPdf}
                                            className="max-w-9xl mx-auto sm:px-6 lg:px-8 bg-red-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-red-600 flex items-center gap-1 sm:w-auto"
                                        >
                                            <FaFilePdf size={18} />
                                            <span>Extract Report</span>
                                        </button>
                                        {showDropdown && (
                                            <div
                                                className="absolute  top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-lg transition-opacity duration-300 opacity-100 z-30"
                                                style={{
                                                    maxHeight:
                                                        "calc(100vh - 64px)",
                                                }}
                                            >
                                                <div className="flex flex-col gap-4">
                                                    <TextInput
                                                        className="w-full"
                                                        defaultValue={
                                                            queryParams.searchclient
                                                        }
                                                        placeholder="Enter Appointment # or Fullname"
                                                        onBlur={(e) =>
                                                            searchFieldChanged(
                                                                "searchclient",
                                                                e.target.value
                                                            )
                                                        }
                                                        onKeyPress={(e) =>
                                                            onKeyPress(
                                                                "searchclient",
                                                                e
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2 flex flex-wrap items-center justify-center sm:justify-start">
                                <InputLabel
                                    htmlFor="show"
                                    value="Show"
                                    className="w-full sm:w-auto mb-2 sm:mb-0 sm:ml-2 text-lg"
                                />
                                <SelectInput
                                    className="w-full sm:w-auto mb-2 sm:mb-0 sm:ml-2"
                                    value={queryParams.per_page || 5} // Use a default value if undefined
                                    onChange={handleRowsPerPageChange}
                                >
                                    {[10, 15, 20, 30].map((perPage) => (
                                        <option key={perPage} value={perPage}>
                                            {perPage} Rows
                                        </option>
                                    ))}
                                </SelectInput>
                            </div>
                            <div className="overflow-x-auto">
                                <div className="md:h-[400px] lg:h-[500px] overflow-y-auto">
                                    <table className="w-full text-sm text-left trl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                            <tr className="text-nowrap">
                                                <TableHeading
                                                    name="appointmentNumber "
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                >
                                                    Appointment #
                                                </TableHeading>
                                                <TableHeading
                                                    name="date"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                >
                                                    Date
                                                </TableHeading>
                                                <TableHeading
                                                    name="time"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                >
                                                    Time
                                                </TableHeading>
                                                <TableHeading
                                                    name="fullname"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                >
                                                    Fullname
                                                </TableHeading>
                                                <TableHeading
                                                    name="company"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                >
                                                    Company Name
                                                </TableHeading>
                                                <TableHeading
                                                    name="transactionType"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                >
                                                    Transaction Type
                                                </TableHeading>
                                                <TableHeading
                                                    name="unitSection"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                >
                                                    Unit/Section (Visited)
                                                </TableHeading>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments &&
                                            appointments.data.length > 0 ? (
                                                appointments.data.map(
                                                    (appointment) => (
                                                        <tr
                                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                            key={appointment.id}
                                                        >
                                                            <td className="px-3 py-2">
                                                                {
                                                                    appointment.appointmentNumber
                                                                }
                                                            </td>
                                                            <td className="px-3 py-2">
                                                                {
                                                                    appointment.date
                                                                }
                                                            </td>
                                                            <td className="px-3 py-2">
                                                                {
                                                                    appointment.time
                                                                }
                                                            </td>
                                                            <td className="px-3 py-2">
                                                                {
                                                                    appointment.fullname
                                                                }
                                                            </td>
                                                            <td className="px-3 py-2">
                                                                {
                                                                    appointment.company
                                                                }
                                                            </td>
                                                            <td className="px-3 py-2">
                                                                {
                                                                    appointment
                                                                        .transactionBy
                                                                        ?.transaction_name
                                                                }
                                                            </td>

                                                            <td className="px-3 py-2 whitespace-nowrap">
                                                                <div className="flex items-center gap-1">
                                                                    {Array.isArray(
                                                                        appointment.UnitSectionby
                                                                    ) &&
                                                                        appointment.UnitSectionby.map(
                                                                            (
                                                                                unit
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        unit.id
                                                                                    }
                                                                                >
                                                                                    <span
                                                                                        className={
                                                                                            "px-2 py-1 rounded text-white " +
                                                                                            SECTION_UNIT_CLASS_MAP[
                                                                                                unit
                                                                                                    .unit_name
                                                                                            ]
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            SECTION_UNIT_TEXT_MAP[
                                                                                                unit
                                                                                                    .unit_name
                                                                                            ]
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                </div>
                                                            </td>
                                                            <td className="px-3 py-2">
                                                                {appointment.appointmentBy
                                                                    ? <span className="text-green-600">Completed</span>
                                                                    : <span className="text-red-600">No Show</span>}
                                                            </td>
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

                            <Pagination
                                links={appointments.meta.links} // Provide default empty array if undefined
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
