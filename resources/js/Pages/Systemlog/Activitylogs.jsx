import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import { useState, useEffect } from "react";
import { CiFilter } from "react-icons/ci";
import { FaRegFilePdf } from "react-icons/fa6";

export default function Activitylogs({
    auth,
    activitylogs,
    modules,
    queryParams = null,
    success,
    totalCount,
    currentPageCount,
    currentPage,
}) {
    queryParams = queryParams || {};

    console.log(activitylogs);

    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const [dateFrom, setDateFrom] = useState(queryParams.dateFrom || "");
    const [dateTo, setDateTo] = useState(queryParams.dateTo || "");
    const [action, setAction] = useState(queryParams.dateTo || "");
    const [module, setModule] = useState(queryParams.dateTo || "");
    const [loading, setLoading] = useState(false);


    const searchFieldChanged = (field, value) => {
        const updatedQueryParams = { ...queryParams };
        if (value) {
            updatedQueryParams[field] = value;
        } else {
            delete updatedQueryParams[field];
        }

        console.log("Updated Query Params:", updatedQueryParams);

        router.get(route("usersystemlog.index"), updatedQueryParams);
    };

    const sortChanged = (agency_name) => {
        if (agency_name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = agency_name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("usersystemlog.index"), queryParams);
    };

    const handleRowsPerPageChange = (e) => {
        const rowsPerPage = parseInt(e.target.value);
        const newParams = { ...queryParams, per_page: rowsPerPage };
        router.get(route("usersystemlog.index"), newParams);
    };

    const handleExportPdf = () => {
        if (!dateFrom || !dateTo) {
            // Show a pop-up message here indicating that the user needs to select a date
            alert("Please select a date range before exporting PDF File.");
            return; // Exit the function early if date range is not selected
        }
        setLoading(true);

        // Make API request to export endpoint with date range, shift, and other filters
        axios
            .post(
                "/activitylogs/export/pdf",
                {
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    action: action,
                    module: module,
                    submodule: submodule,
                },
                { responseType: "blob" }
            )
            .then((response) => {
                const blob = new Blob([response.data], {
                    type: "application/pdf",
                });
                const url = window.URL.createObjectURL(blob);

                // Open the PDF in a new window
                const newWindow = window.open(url, "_blank");

                // Ensure the new window is fully loaded before adding the download link
                newWindow.onload = () => {
                    const downloadLink = newWindow.document.createElement("a");
                    downloadLink.href = url;
                    downloadLink.setAttribute(
                        "download",
                        "employee_data_export.pdf"
                    );
                    downloadLink.textContent = "Download PDF";
                    newWindow.document.body.appendChild(downloadLink);
                    setLoading(false);
                };
            })
            .catch((error) => {
                console.error("Error exporting data:", error);
                setLoading(false);
            });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight flex items-center gap-2">
                        <span>Activity Logs Page</span>
                    </h2>
                </div>
            }
        >
            <Head title="Activitylogs" />

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
                                        {showDropdown && (
                                            <div
                                                className="absolute  top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-lg transition-opacity duration-300 opacity-100 z-30"
                                                style={{
                                                    maxHeight:
                                                        "calc(100vh - 64px)",
                                                }} // Adjust max-height to fit within viewport
                                            >
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex flex-col">
                                                        <InputLabel
                                                            htmlFor="dateFrom"
                                                            value="From"
                                                            className="text-sm font-semibold mb-1"
                                                        />
                                                        <TextInput
                                                            name="dateFrom"
                                                            id="dateFrom"
                                                            type="date"
                                                            className="w-full"
                                                            value={dateFrom}
                                                            onChange={(e) => {
                                                                const selectedDateFrom =
                                                                    e.target
                                                                        .value;
                                                                setDateFrom(
                                                                    selectedDateFrom
                                                                );
                                                                searchFieldChanged(
                                                                    "dateFrom",
                                                                    selectedDateFrom
                                                                );
                                                            }}
                                                        />
                                                        <InputLabel
                                                            htmlFor="dateTo"
                                                            value="To"
                                                            className="text-sm font-semibold mb-1"
                                                        />
                                                        <TextInput
                                                            name="dateTo"
                                                            id="dateTo"
                                                            type="date"
                                                            className="w-full"
                                                            value={dateTo}
                                                            onChange={(e) => {
                                                                const selectedDateTo =
                                                                    e.target
                                                                        .value;
                                                                setDateTo(
                                                                    selectedDateTo
                                                                );
                                                                searchFieldChanged(
                                                                    "dateTo",
                                                                    selectedDateTo
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                    <SelectInput
                                                        className="w-full"
                                                        value={action}
                                                        onChange={(e) => {
                                                            const selectedAction =
                                                                e.target.value;
                                                            setAction(
                                                                selectedAction
                                                            );
                                                            searchFieldChanged(
                                                                "action",
                                                                selectedAction
                                                            );
                                                        }}
                                                    >
                                                        <option value="">
                                                            Select Action
                                                        </option>
                                                        <option value="Create">
                                                            Create
                                                        </option>
                                                        <option value="Update">
                                                            Update
                                                        </option>
                                                        <option value="Delete">
                                                            Delete
                                                        </option>
                                                        <option value="Import">
                                                            Import
                                                        </option>
                                                        <option value="Export">
                                                            Export
                                                        </option>
                                                        <option value="Generate">
                                                            Generate
                                                        </option>
                                                        <option value="Validate">
                                                            Validate
                                                        </option>
                                                    </SelectInput>
                                                    <SelectInput
                                                        className="w-full"
                                                        value={module}
                                                        onChange={(e) => {
                                                            const selectedModule =
                                                                e.target.value;
                                                            setModule(
                                                                selectedModule
                                                            );
                                                            searchFieldChanged(
                                                                "module",
                                                                selectedModule
                                                            );
                                                        }}
                                                    >
                                                        <option value="">
                                                            Select Module
                                                        </option>
                                                        {modules &&
                                                            modules.map(
                                                                (
                                                                    module,
                                                                    index
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            module.id
                                                                        }
                                                                    >
                                                                        {
                                                                            module.name
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                    </SelectInput>
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            className="max-w-9xl mx-auto sm:px-6 lg:px-8 bg-emerald-600 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-500 flex items-center gap-1 sm:w-auto"
                                            onClick={handleExportPdf}
                                            title="Select date, agency, shift and section before can view this file!"
                                        >
                                            <FaRegFilePdf size={18} />
                                            <span>Export</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-auto">
                                <div className="mb-2 flex flex-wrap items-center justify-center sm:justify-start">
                                    <InputLabel
                                        htmlFor="show"
                                        value="Show"
                                        className="w-full sm:w-auto mb-2 sm:mb-0 sm:ml-2 text-lg"
                                    />
                                    <SelectInput
                                        className="w-full sm:w-auto mb-2 sm:mb-0 sm:ml-2"
                                        value={queryParams.per_page}
                                        onChange={handleRowsPerPageChange}
                                    >
                                        {[10, 20, 50, 100].map((perPage) => (
                                            <option
                                                key={perPage}
                                                value={perPage}
                                            >
                                                {perPage} Rows
                                            </option>
                                        ))}
                                    </SelectInput>
                                </div>
                                <div className="overflow-x-auto">
                                    <div className="md:h-[400px] lg:h-[500px] overflow-y-auto">
                                        <table className="w-full text-sm text-left trl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                                <tr className="text-nowrap text-center">
                                                    <TableHeading
                                                        name="user_id"
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
                                                        User Id
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="user_email"
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
                                                        User Email
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="user_ip"
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
                                                        User IP
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="activities"
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
                                                        Activities
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="action"
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
                                                        Action
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="module"
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
                                                        Module
                                                    </TableHeading>

                                                    <TableHeading
                                                        name="created_at"
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
                                                        DateTime
                                                    </TableHeading>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {activitylogs.data.map(
                                                    (activitylog) => (
                                                        <tr
                                                            className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700"
                                                            key={activitylog.id}
                                                        >
                                                            <td className="px-3 py-2">
                                                                {
                                                                    activitylog.user_id
                                                                }
                                                            </td>
                                                            <td className="px-3 py-2">
                                                                {
                                                                    activitylog.user_email
                                                                }
                                                            </td>
                                                            <td className="px-3 py-2">
                                                                {
                                                                    activitylog.user_ip
                                                                }
                                                            </td>
                                                            <td className="px-3 py-2">
                                                                {
                                                                    activitylog.activities
                                                                }
                                                            </td>
                                                            <td className="px-3 py-2">
                                                                {
                                                                    activitylog.action
                                                                }
                                                            </td>
                                                            <td className="px-3 py-2">
                                                                {
                                                                    activitylog
                                                                        ?.moduleBy
                                                                        ?.name
                                                                }
                                                            </td>

                                                            <td className="px-3 py-2">
                                                                {
                                                                    activitylog.created_at
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <Pagination
                                links={activitylogs.meta.links}
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
