import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import { MdHome } from "react-icons/md";

export default function Loginlogs({
    auth,
    loginlogs,
    queryParams = null,
    success,
    totalCount,
    currentPageCount,
    currentPage,
}) {
    queryParams = queryParams || {};

    console.log(loginlogs);

    const searchFieldChanged = (field, value) => {
        const updatedQueryParams = { ...queryParams };
        if (value) {
            updatedQueryParams[field] = value; // Use field instead of agencyName
        } else {
            delete updatedQueryParams[field]; // Use field instead of agencyName
        }
        console.log("Updated Query Params:", updatedQueryParams); // Log updated query params
        router.replace(route("userloginlog.index"), {
            method: "get",
            data: updatedQueryParams,
        });
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
        router.get(route("userloginlog.index"), queryParams);
    };

    const handleRowsPerPageChange = (e) => {
        const rowsPerPage = parseInt(e.target.value);
        const newParams = { ...queryParams, per_page: rowsPerPage };
        router.get(route("userloginlog.index"), newParams);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight flex items-center gap-2">
                        <Link
                            href="/"
                            className="hover:text-blue-500 transition"
                        >
                            <MdHome
                                size={32}
                                className="cursor-pointer text-green-700"
                            />
                        </Link>
                        <span>Login Logs Page</span>
                    </h2>
                </div>
            }
        >
            <Head title="loginlogs" />

            <div className="py-2">
                <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg darkMode ? 'dark' : ''">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
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
                                <table className="w-full text-sm text-left trl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="user_id"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
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
                                                sortChanged={sortChanged}
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
                                                sortChanged={sortChanged}
                                            >
                                                User IP
                                            </TableHeading>
                                            <TableHeading
                                                name="action"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Action
                                            </TableHeading>
                                            <TableHeading
                                                name="created_at"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                DateTime
                                            </TableHeading>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {loginlogs.data.map((loginlog) => (
                                            <tr
                                                className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700"
                                                key={loginlog.id}
                                            >
                                                <td className="px-3 py-2">
                                                    {loginlog.user_id}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {loginlog.user_email}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {loginlog.user_ip}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {loginlog.action}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {loginlog.created_at}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                links={loginlogs.meta.links}
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
