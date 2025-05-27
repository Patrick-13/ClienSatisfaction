import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaTrashAlt } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import Pagination from "@/Components/Pagination"; // Assuming you have a Pagination component
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import TextInput from "@/Components/TextInput";

export default function Index({
    auth,
    users,
    queryParams = null, // Provide a default empty object
    totalCount,
    currentPageCount,
    currentPage,
    success,
}) {
    queryParams = queryParams || {};
    console.log(users);
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const deleteUser = (user) => {
        if (
            !window.confirm(
                `Are you sure you want to delete the ${user.name} User?`
            )
        ) {
            return;
        }
        router.delete(route("user.destroy", user.id));
    };

    const handleRowsPerPageChange = (e) => {
        const rowsPerPage = parseInt(e.target.value);
        const newParams = { ...queryParams, per_page: rowsPerPage };
        router.get(route("usermodule.index"), newParams);
    };

    const searchFieldChanged = (field, value) => {
        const updatedQueryParams = { ...queryParams };
        if (value) {
            updatedQueryParams[field] = value;
        } else {
            delete updatedQueryParams[field];
        }

        console.log("Updated Query Params:", updatedQueryParams);

        router.get(route("usermodule.index"), updatedQueryParams);
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
        router.get(route("usermodule.index"), queryParams);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight flex items-center gap-2">
                        <span>Users Module List</span>
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
                                        {showDropdown && (
                                            <div
                                                className="absolute  top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-lg transition-opacity duration-300 opacity-100 z-30"
                                                style={{
                                                    maxHeight:
                                                        "calc(100vh - 64px)",
                                                }}
                                            >
                                                <div className="flex flex-col gap-4">
                                                    <TextInput
                                                        className="w-full"
                                                        defaultValue={
                                                            queryParams.name
                                                        }
                                                        placeholder="Enter User Name"
                                                        onBlur={(e) =>
                                                            searchFieldChanged(
                                                                "name",
                                                                e.target.value
                                                            )
                                                        }
                                                        onKeyPress={(e) =>
                                                            onKeyPress(
                                                                "name",
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
                                                <th className="px-3 py-2">
                                                    ID
                                                </th>
                                                <th className="px-3 py-2">
                                                    Username
                                                </th>
                                                <th className="px-3 py-2">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.data.map((user) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    key={user.id}
                                                >
                                                    <td className="px-3 py-2">
                                                        {user.id}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {user.name}
                                                    </td>
                                                    <td className="px-3 py-2 flex text-nowrap gap-2">
                                                        <Link
                                                            href={route(
                                                                "usermodule.show",
                                                                user.id
                                                            )}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            <FaEye
                                                                className="text-blue-500"
                                                                size={18}
                                                            />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <Pagination
                                links={users.links} // Provide default empty array if undefined
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
