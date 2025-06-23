import { Contactus } from "@/Components/Appointment/Contactus";
import { Form } from "@/Components/Appointment/Form";
import { Hero } from "@/Components/Appointment/Hero";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Appointment({ flash, transactiontypes, units, appointmentLimits }) {
    const [showPrivacyModal, setShowPrivacyModal] = useState(true);

    const handlePrivacyAgree = () => {
        setShowPrivacyModal(false);
    };

    //function toast success message
    useEffect(() => {
        if (flash.message.success) {
            toast.success(flash.message.success);
        }

        if (flash.message.error) {
            toast.error(flash.message.error);
        }

        if (flash.message.info) {
            toast.info(flash.message.info);
        }
    }, [flash]);

    return (
        <>
            <Head title="Client" />
            <ToastContainer />
            <div className="py-2">
                <div className="flex justify-center">
                    <div className="w-full max-w-9xl sm:px-6 lg:px-8">
                        <Hero />
                        {showPrivacyModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white  border-l-8 border-blue-700 rounded-xl shadow-lg max-w-2xl w-full p-6 space-y-4 overflow-y-auto max-h-[80vh]">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
                                        Data Privacy Act of 2012
                                    </h2>
                                    <p className="text-gray-700 dark:text-gray-300 text-xl">
                                        By continuing to use this online
                                        appoinment system, you consent to the
                                        collection, processing, and storage of
                                        your personal information as outlined
                                        under Republic Act No. 10173 or the Data
                                        Privacy Act of 2012. Your data will be
                                        used solely for official purposes by the
                                        DENR - EMB. We ensure confidentiality
                                        and security in accordance with the law
                                        and its Implementing Rules and
                                        Regulations.
                                    </p>
                                    <div className="text-right">
                                        <button
                                            onClick={handlePrivacyAgree}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
                                        >
                                            I Agree
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <Form
                            transactiontypes={transactiontypes}
                            units={units}
                            appointmentLimits={appointmentLimits}
                        />
                        <div className="bg-green-700 px-6 py-4 text-white text-md sm:text-lg md:text-2xl text-center font-bold">
                            Contact Us
                        </div>
                        <Contactus />
                        <div className="bg-green-700 px-6 py-4 text-white text-md sm:text-lg md:text-2xl text-center font-bold tracking-wide">
                            © Copyright 2025 Environmental Management Bureau
                            Region XI - All Rights Reserved
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
