import Pagination from "@/Components/Pagination";
import { router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import { IoIosMale, IoIosFemale } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { GENDER_STATUS_CLASS_MAP, GENDER_STATUS_TEXT_MAP } from "@/constant";
import axios from "axios";

export default function Ratingdatatable({
    filterCategory,
    queryParams = null,
}) {
    queryParams = queryParams || {};
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (filterCategory) {
            axios
                .get(`/ratings/show/${encodeURIComponent(filterCategory)}`, {
                    headers: {
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    const data = res.data;
                    setFilteredData(data);
                })
                .catch((err) => {
                    console.error("Failed to fetch stats", err);
                });
        }
    }, [filterCategory]);

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

    return (
        <>
            <div className="py-2">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <div className="overflow-x-auto">
                            <div className="md:h-[500px] lg:h-[500px] overflow-y-auto">
                                <table className="w-full text-sm text-left trl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500 z-10 sticky top-0">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="odName"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                OD Name (Officer of Day the)
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
                                                name="clientName"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
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
                                                sortChanged={sortChanged}
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
                                                sortChanged={sortChanged}
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
                                                sortChanged={sortChanged}
                                            >
                                                Company Name
                                            </TableHeading>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.length > 0 ? (
                                            filteredData.map((item, index) => (
                                                <tr
                                                    className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700"
                                                    key={index}
                                                >
                                                    <td className="px-3 py-2">
                                                        {item.odName}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {item.date}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {item.clientName}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {item.sex === "Male" ? (
                                                            <IoIosMale
                                                                className="text-blue-500 inline-block mr-1"
                                                                size={16}
                                                            />
                                                        ) : (
                                                            <IoIosFemale
                                                                className="text-pink-500 inline-block mr-1"
                                                                size={16}
                                                            />
                                                        )}
                                                        {
                                                            <span
                                                                className={
                                                                    "px-2 py-1 rounded text-white " +
                                                                    GENDER_STATUS_CLASS_MAP[
                                                                        item.sex
                                                                    ]
                                                                }
                                                            >
                                                                {
                                                                    GENDER_STATUS_TEXT_MAP[
                                                                        item.sex
                                                                    ]
                                                                }
                                                            </span>
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {item.sector}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {item.companyName}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-center py-4"
                                                >
                                                    No "{filterCategory}"
                                                    ratings found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* <Pagination
                        links={
                            filteredData && filteredData.meta.links
                        }
                        totalCount={totalCount}
                        currentPageCount={currentPageCount}
                        currentPage={currentPage}
                    /> */}
                </div>
            </div>
        </>
    );
}
