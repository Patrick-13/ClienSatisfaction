import React from "react";
import { FaSpinner } from "react-icons/fa";

const Spinner = ({ isOpen }) => {
    return (
        <div
            className={`fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 ${
                isOpen ? "" : "hidden"
            }`}
        >
            <div className="bg-white  p-5 rounded-lg shadow-lg">
                <FaSpinner className="animate-spin text-blue-500 text-4xl mx-auto" />
                <p className="text-center mt-4">Loading...</p>
            </div>
        </div>
    );
};

export default Spinner;
