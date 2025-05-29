import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdHome } from "react-icons/md";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enUS from "date-fns/locale/en-US";
import Modal from "@/Components/Modal";
import Import from "./Modal/Import";
import Create from "./Modal/Create";
import { FaPlus } from "react-icons/fa";
import Spinner from "@/Components/Spinner";
import { AiOutlineUpload, AiOutlineDownload } from "react-icons/ai";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export default function Index({
    auth,
    flash,
    queryParams = null,
    officerschedules,
}) {
    console.log(officerschedules);

    queryParams = queryParams || {};
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModalImport, setShowModalImport] = useState(false);
    const [showProgressModal, setShowProgressModal] = useState(false);
    const [userButtons, setUserButtons] = useState([]);

    useEffect(() => {
        if (!auth?.user?.id) return; // Early return if user ID is not available

        const userId = auth.user.id; // Extract user ID from auth object

        // Fetch user modules and submodules in parallel only if there are updates
        const fetchData = async () => {
            try {
                // Make the two requests in parallel
                const [buttonResponse] = await Promise.all([
                    axios.get(`/user/${userId}/buttons`),
                ]);

                // Update the state with the new data
                setUserButtons(buttonResponse.data);
            } catch (error) {
                console.error(
                    "There was an error fetching the user data!",
                    error
                );
            }
        };

        fetchData(); // Call the fetch function
    }, [auth?.user?.id]);

    const hasButton = (buttonId) => userButtons.includes(Number(buttonId));

    const events = useMemo(() => {
        if (!officerschedules || !officerschedules.data) return [];

        return officerschedules.data.map((schedule) => ({
            title: `Officer: ${schedule.odName}`,
            start: new Date(`${schedule.date}T${schedule.timeStart}`),
            end: new Date(`${schedule.date}T${schedule.timeEnd}`),
            tooltip: `${schedule.odName} will be the officer of the day`,
        }));
    }, [officerschedules]);

    const handleExportCsv = () => {
        // if (!dateFrom || !dateTo) {
        //     alert("Please select a date range before exporting CSV file.");
        //     return;
        // }

        setLoading(true);

        axios
            .post("/officerschedule/export/csv", {}, { responseType: "blob" })
            .then((response) => {
                const blob = new Blob([response.data], {
                    type: "text/csv;charset=utf-8;",
                });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");

                const fileName = "Officer of the Day Schedules";

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

    useEffect(() => {
        if (flash.message.success) {
            toast.success(flash.message.success);
        }

        if (flash.message.error) {
            toast.error(flash.message.error);
        }
    }, [flash]);

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
                        <span>Officer of the Day Scheduler</span>
                    </h2>
                </div>
            }
        >
            <Head title="OfficerSchedule" />
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
                                            {hasButton(1) && (
                                                <button
                                                    onClick={() =>
                                                        setShowModal(true)
                                                    } // Open modal on click
                                                    className="max-w-9xl mx-auto sm:px-6 lg:px-8 bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 flex items-center gap-1"
                                                >
                                                    <FaPlus size={16} />
                                                    <span>Create Schedule</span>
                                                </button>
                                            )}
                                            {hasButton(5) && (
                                                <button
                                                    onClick={() =>
                                                        setShowModalImport(true)
                                                    } // Open modal on click
                                                    className="max-w-9xl mx-auto sm:px-6 lg:px-8 bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-600 flex items-center gap-1"
                                                >
                                                    <AiOutlineUpload
                                                        size={16}
                                                    />
                                                    <span>Import Csv</span>
                                                </button>
                                            )}
                                            {hasButton(6) && (
                                                <button
                                                    onClick={handleExportCsv} // Open modal on click
                                                    className="max-w-9xl mx-auto sm:px-6 lg:px-8 bg-emerald-700 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-900 flex items-center gap-1"
                                                >
                                                    <AiOutlineDownload
                                                        size={16}
                                                    />
                                                    <span>Download Csv</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white shadow-md rounded-lg p-6">
                                    <div style={{ height: "600px" }}>
                                        <Calendar
                                            localizer={localizer}
                                            events={events}
                                            startAccessor="start"
                                            endAccessor="end"
                                            defaultView="month" //starts in month view
                                            views={["month", "week", "day"]} // enables all views
                                            style={{ height: 500 }}
                                            tooltipAccessor="tooltip"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                closeable={true}
            >
                <Create auth={auth} closeModal={() => setShowModal(false)} />
            </Modal>

            <Modal
                show={showModalImport}
                onClose={() => setShowModalImport(false)}
                closeable={true}
            >
                <Import closeModal={() => setShowModalImport(false)} />
            </Modal>
        </AuthenticatedLayout>
    );
}
