import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaSpinner } from "react-icons/fa"; // Importing a loading spinner icon
import { MdHome } from "react-icons/md";

export default function Import({}) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showProgressModal, setShowProgressModal] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setShowProgressModal(true);

        try {
            const formData = new FormData();
            formData.append("dtr_file", file);

            const response = await fetch("/officerschedule/import/csv", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: formData,
                // Track upload progress
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadPercentage(percentCompleted);
                },
            });

            if (response.ok) {
                setSuccessMessage("Employee Schedule data imported successfully.");
            } else {
                const responseData = await response.json(); // Assuming the response contains JSON data

                if (responseData && responseData.error) {
                    setErrorMessage(responseData.error);
                } else {
                    setErrorMessage(
                        "Error importing Employee Schedule data. Please try again later."
                    );
                }
            }
        } catch (error) {
            console.error("Error importing Employee Schedule data:", error);
            setErrorMessage("Error follow file format to upload data!.");
        } finally {
            setLoading(false);
            setShowProgressModal(false);
        }
    };

    return (
        <>
            <form
                className="p-6 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                onSubmit={handleSubmit}
            >
                <div className="mb-6">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                        Import Bulk Employee Schedule Data for OD
                    </h2>
                </div>
                <div>
                    <input
                        type="file"
                        name="dtr_file"
                        onChange={handleFileChange}
                        disabled={loading}
                        required
                    />
                </div>
                {file && (
                    <div className="mt-2 flex items-center">
                        <span className="mr-2">{file.name}</span>
                        <button
                            type="button"
                            onClick={() => setFile(null)}
                            className="text-red-600 hover:text-red-800"
                        >
                            Clear
                        </button>
                    </div>
                )}

                <div className="mt-4 text-right">
                    <Link
                        href={route("officerschedule.index")}
                        className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                    >
                        Cancel
                    </Link>
                    <button
                        id="submitBtn"
                        type="submit"
                        className={`bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 ${
                            loading && "opacity-50 cursor-not-allowed"
                        }`}
                        disabled={loading || !file}
                    >
                        {loading ? <>Uploading...</> : "Submit"}
                    </button>
                </div>

                {successMessage && (
                    <div className="mt-4 text-green-600">{successMessage}</div>
                )}
                {errorMessage && (
                    <div className="mt-4 text-red-600">{errorMessage}</div>
                )}
            </form>

            {showProgressModal && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4 inline-block py-1 px-2 uppercase">
                            Uploading
                        </h2>
                        <FaSpinner className="animate-spin text-4xl text-emerald-600" />
                    </div>
                </div>
            )}
        </>
    );
}
