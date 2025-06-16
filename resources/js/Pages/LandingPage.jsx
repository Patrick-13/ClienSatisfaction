import TextInput from "@/Components/TextInput";
import { useState } from "react";

export default function LandingPage() {
    const [agreed, setAgreed] = useState(false);

    const handleProceed = () => {
        if (!agreed) {
            alert(
                "Please agree to the Terms and Conditions before proceeding."
            );
            return;
        }
        // Replace with navigation or further action
        console.log("Proceeding to appointment...");
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-7xl w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
                    EMB Online Appointment System
                </h1>

                <p className="text-gray-700 dark:text-gray-300 text-lg">
                    Please read the information below carefully before
                    proceeding with your online appointment.
                </p>

                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <strong className="font-semibold">Reminder:</strong>
                    <p>
                        Applicants are recommended to use Google email accounts
                        in securing an appointment to avoid any technical
                        incompatibilities.
                    </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                        Terms and Conditions
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                        By proceeding with this application, I understand that I
                        am signifying my unequivocal consent to the disclosure,
                        collection, and use of my personal information and the
                        data required under the DENR - EMB as amended and its
                        Implementing Rules and Regulations. My consent
                        effectively constitutes a waiver of any and all privacy
                        rights pertaining to the disclosure, collection, and use
                        of my personal information and data under the specific
                        terms and condition of the DENR - EMB Online Appointment
                        System Website's Privacy Policy, the Data Privacy Act of
                        2012 and its Implementing Rules and Regulations, and
                        other pertinent DENR - EMB rules, regulations, policies
                        on the matter.
                    </p>
                </div>

                <div className="flex items-start space-x-3">
                    <TextInput
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded"
                        id="terms"
                    />
                    <label
                        htmlFor="terms"
                        className="text-gray-700 dark:text-gray-300"
                    >
                        I agree to the Terms and Conditions
                    </label>
                </div>

                <button
                    onClick={handleProceed}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
                >
                    Proceed
                </button>
            </div>
        </div>
    );
}
