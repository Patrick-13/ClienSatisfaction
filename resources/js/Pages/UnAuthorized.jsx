// Import necessary components
import { useForm } from "@inertiajs/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function UnAuthorized() {
    const { post } = useForm();

    const handleLogout = () => {
        post(route("logout"));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                <div className="flex justify-center mb-4">
                    <ExclamationTriangleIcon className="h-12 w-12 text-red-500" />
                </div>
                <h1 className="text-2xl font-semibold text-red-600 mb-2">
                    Unauthorized Access
                </h1>
                <p className="text-gray-700 mb-4">
                    You do not have permission to view this page. Please contact
                    your IT department or system administrator for further
                    assistance.
                </p>
                <button
                    onClick={handleLogout}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition duration-200"
                >
                    Return to Login
                </button>
            </div>
        </div>
    );
}
