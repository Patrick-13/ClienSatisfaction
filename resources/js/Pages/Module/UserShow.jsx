import React, { useState, useEffect } from "react";
import { Head, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdHome } from "react-icons/md";

export default function UserShow({ auth, flash, user, modules, buttons }) {
    // State for selected modules
    console.log(buttons);
    const [selectedModules, setSelectedModules] = useState(new Set());
    const [selectedButtons, setSelectedButtons] = useState(new Set());

    useEffect(() => {
        // Initialize selected modules based on user data
        const userModules = new Set(user.modules.map((module) => module.id));
        setSelectedModules(userModules);
    }, [user]);

    useEffect(() => {
        // Initialize selected modules based on user data
        const userButtons = new Set(user.buttons.map((button) => button.id));
        setSelectedButtons(userButtons);
    }, [user]);

    // Handle module selection
    const handleModuleChange = (moduleId) => {
        setSelectedModules((prev) => {
            const updatedModules = new Set(prev);
            if (updatedModules.has(moduleId)) {
                updatedModules.delete(moduleId);
            } else {
                updatedModules.add(moduleId);
            }
            // Update access with selected modules only
            updateModuleAccess(user.id, Array.from(updatedModules));
            return updatedModules;
        });
    };

    const handleButtonChange = (buttonId) => {
        setSelectedButtons((prev) => {
            const updatedButtons = new Set(prev);
            if (updatedButtons.has(buttonId)) {
                updatedButtons.delete(buttonId);
            } else {
                updatedButtons.add(buttonId);
            }
            // Update access with selected modules only
            updatebuttonAccess(user.id, Array.from(updatedButtons));
            return updatedButtons;
        });
    };

    const updateModuleAccess = (usermoduleId, modulesArray) => {
        router.put(
            route("usermodule.updateModuleAccess", { id: usermoduleId }),
            {
                modules: modulesArray,
            }
        );
    };

    // Update access buttons method
    const updatebuttonAccess = (userbuttonId, buttonsArray) => {
        router.put(route("button.updatebuttonAccess", { id: userbuttonId }), {
            buttons: buttonsArray,
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
                        <span>{user.name}'s Module Access</span>
                    </h2>
                </div>
            }
        >
            <Head title={`${user.name}'s Modules`} />
            <ToastContainer />

            <div className="py-2">
                <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr>
                                        <th className="px-3 py-2">Module</th>
                                        <th className="px-3 py-2">Access</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {modules.map((module) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2">
                                                {module.name}
                                            </td>
                                            <td className="px-3 py-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedModules.has(
                                                        module.id
                                                    )}
                                                    onChange={() =>
                                                        handleModuleChange(
                                                            module.id
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr>
                                        <th className="px-3 py-2">Button</th>
                                        <th className="px-3 py-2">Access</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {buttons.map((button) => (
                                        <tr
                                            key={button.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            <td className="px-3 py-2">
                                                {button.button_name}
                                            </td>
                                            <td className="px-3 py-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedButtons.has(
                                                        button.id
                                                    )}
                                                    onChange={() =>
                                                        handleButtonChange(
                                                            button.id
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>{" "}
                            <div className="mt-4">
                                <Link
                                    href={route("usermodule.index")}
                                    className="bg-gray-500 py-2 px-4 text-white rounded shadow hover:bg-gray-600"
                                >
                                    Back to User List
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
