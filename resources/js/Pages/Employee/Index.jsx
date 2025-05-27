import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import { FaPencil, FaPlus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { CiImport } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react"; // Remember to import useState!
import Modal from "@/Components/Modal";
import Create from "./Modal/Create";
import Import from "./Modal/Import";
import Edit from "./Modal/Edit";
import { AiOutlineUpload } from "react-icons/ai";

export default function Index({
    auth,
    flash,
    employees,
    queryParams = null,
    totalCount,
    currentPageCount,
    currentPage,
    divisions,
    sections,
    units,
}) {
    console.log(employees);
    queryParams = queryParams || {};
    const [showDropdown, setShowDropdown] = useState(false); // Added state for dropdown
    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const [showModal, setShowModal] = useState(false);
    const [showModalImport, setShowModalImport] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const searchFieldChanged = (key, value) => {
        if (value) {
            queryParams[key] = value;
        } else {
            delete queryParams[key];
        }

        router.get(route("employee.index"), queryParams, {
            preserveScroll: true,
            preserveState: true, // Important to preserve UI state
            onSuccess: () => {
                setShowDropdown(true); // Reopen dropdown if needed
            },
        });
    };
    const onKeyPress = (employee_id, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(employee_id, e.target.value);
    };

    const sortChanged = (employee_id) => {
        if (employee_id === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = employee_id;
            queryParams.sort_direction = "asc";
        }
        router.get(route("employee.index"), queryParams);
    };

    const deleteEmployee = (employee) => {
        if (
            !window.confirm(
                `Are you sure you want to delete the ${employee.fullName} Employee?`
            )
        ) {
            return;
        }
        router.delete(route("employee.destroy", employee.id));
    };

    useEffect(() => {
        if (flash.message.success) {
            toast.success(flash.message.success);
        }

        if (flash.message.error) {
            toast.error(flash.message.error);
        }
    }, [flash]);

    const handleEditClick = async (employeeId) => {
        try {
            const response = await axios.get(`/employee/${employeeId}/edit`);
            setSelectedEmployee(response.data); // Set the fetched product data
            console.log(response.data);
            setShowModalEdit(true); // Open the modal
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    const handleRowsPerPageChange = (e) => {
        const rowsPerPage = parseInt(e.target.value);
        const newParams = { ...queryParams, per_page: rowsPerPage };
        router.get(route("employee.index"), newParams);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight flex items-center gap-2">
                        <span>Employees Page</span>
                    </h2>
                </div>
            }
        >
            <Head title="Employees" />
            <ToastContainer />
            <div className="py-2">
                <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
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
                                                <CiImport size={18} />
                                                <span>Filters</span>
                                            </button>
                                        </div>
                                        {showDropdown && (
                                            <div
                                                className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-lg transition-opacity duration-300 opacity-100 z-30"
                                                style={{
                                                    maxHeight:
                                                        "calc(100vh - 64px)", // Adjust max-height to fit within viewport
                                                }}
                                            >
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.searchemployee
                                                    }
                                                    placeholder="Employee Name or Id"
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "searchemployee",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress(
                                                            "searchemployee",
                                                            e
                                                        )
                                                    }
                                                />
                                            </div>
                                        )}

                                        <button
                                            onClick={() => setShowModal(true)} // Open modal on click
                                            className="max-w-9xl mx-auto sm:px-6 lg:px-8 bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 flex items-center gap-1"
                                        >
                                            <FaPlus size={16} />
                                            <span>Create</span>
                                        </button>

                                        <button
                                            onClick={() =>
                                                setShowModalImport(true)
                                            } // Open modal on click
                                            className="max-w-9xl mx-auto sm:px-6 lg:px-8 bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-600 flex items-center gap-1"
                                        >
                                            <AiOutlineUpload size={16} />
                                            <span>Import</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto mt-4">
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
                                                        name="embId"
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
                                                        EMB ID
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="date_registered"
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
                                                        Date Hired
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="fullName"
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
                                                        Full Name
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="designation"
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
                                                        Designation
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="email"
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
                                                        Email
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="division"
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
                                                        Division
                                                    </TableHeading>
                                                    <TableHeading
                                                        name="section"
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
                                                        Section
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
                                                        Unit
                                                    </TableHeading>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {employees &&
                                                employees.data.length > 0 ? (
                                                    employees.data.map(
                                                        (employee) => (
                                                            <tr
                                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                                key={
                                                                    employee.id
                                                                }
                                                            >
                                                                <td className="px-3 py-2">
                                                                    {
                                                                        employee.id
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {
                                                                        employee.embId
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {
                                                                        employee.date_registered
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {
                                                                        employee.fullName
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {
                                                                        employee.designation
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {
                                                                        employee.email
                                                                    }
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {employee
                                                                        .divisionBy
                                                                        ?.division_name ?? (
                                                                        <span className="text-red-500">
                                                                            No
                                                                            Division
                                                                            Assigned
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {employee
                                                                        .sectionBy
                                                                        ?.section_name ?? (
                                                                        <span className="text-red-500">
                                                                            No
                                                                            Section
                                                                            Assigned
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="px-3 py-2">
                                                                    {employee
                                                                        .unitBy
                                                                        ?.unit_name ?? (
                                                                        <span className="text-red-500">
                                                                            No
                                                                            Unit
                                                                            Assigned
                                                                        </span>
                                                                    )}
                                                                </td>

                                                                <td className="px-3 py-2 flex text-nowrap">
                                                                    <button
                                                                        onClick={() =>
                                                                            handleEditClick(
                                                                                employee.id
                                                                            )
                                                                        }
                                                                        className="font-medium text-blue dark:text-blue-500 hover:underline mx-1"
                                                                    >
                                                                        <FaPencil
                                                                            className="text-green-500"
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    </button>

                                                                    <button
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            deleteEmployee(
                                                                                employee
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
                                links={employees.meta.links}
                                totalCount={totalCount}
                                currentPageCount={currentPageCount}
                                currentPage={currentPage} // Make sure currentPage is passed
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                closeable={true}
            >
                <Create
                    divisions={divisions}
                    sections={sections}
                    units={units}
                    closeModal={() => setShowModal(false)}
                />
            </Modal>

            <Modal
                show={showModalImport}
                onClose={() => setShowModalImport(false)}
                closeable={true}
            >
                <Import closeModal={() => setShowModalImport(false)} />
            </Modal>

            <Modal
                show={showModalEdit}
                onClose={() => setShowModalEdit(false)}
                closeable={true}
            >
                <Edit
                    employee={selectedEmployee}
                    divisions={divisions}
                    sections={sections}
                    units={units}
                    closeModal={() => setShowModalEdit(false)}
                />
            </Modal>
        </AuthenticatedLayout>
    );
}
