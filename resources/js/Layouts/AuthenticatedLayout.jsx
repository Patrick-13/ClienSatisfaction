import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { useNotifications } from "@/Contexts/NotificationContext";
import { formatDistanceToNow } from "date-fns";
import { HiOutlineBell } from "react-icons/hi";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [userModules, setUserModules] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const { badCount, veryBadCount, bads, veryBads } = useNotifications();

    const toggleTasks = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (!user?.id) return; // Early return if user ID is not available

        const userId = user.id; // Extract user ID from auth object

        axios
            .get(`/user/${userId}/modules`) // Use the userId dynamically
            .then((response) => {
                setUserModules(response.data);
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the user modules!",
                    error
                );
            });
    }, [user]);

    const hasModule = (moduleId) => userModules.includes(Number(moduleId));

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex items-center">
                                <Link href="/dashboard">
                                    <ApplicationLogo className="h-9" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {hasModule(1) && (
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        Dashboard
                                    </NavLink>
                                )}
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {hasModule(2) && (
                                    <NavLink
                                        href={route("ratingdata.index")}
                                        active={route().current(
                                            "ratingdata.index"
                                        )}
                                        className="relative flex items-center space-x-2"
                                    >
                                        {" "}
                                        <span className="text-sm text-gray-700">
                                            Client Satisfaction Data
                                        </span>
                                    </NavLink>
                                )}
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {hasModule(3) && (
                                    <NavLink
                                        href={route("officerschedule.index")}
                                        active={route().current(
                                            "officerschedule.index"
                                        )}
                                    >
                                        Officer Scheduler
                                    </NavLink>
                                )}
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {hasModule(5) && (
                                    <NavLink
                                        href={route("employee.index")}
                                        active={route().current(
                                            "employee.index"
                                        )}
                                    >
                                        Employees List
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center space-x-4">
                            <div className="relative">
                                <button
                                    onClick={toggleTasks}
                                    className="relative text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                                >
                                    <HiOutlineBell className="w-6 h-6" />
                                    {(veryBadCount ?? 0) + (badCount ?? 0) >
                                        0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                            {(veryBadCount ?? 0) +
                                                (badCount ?? 0)}
                                        </span>
                                    )}
                                </button>

                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50 p-2">
                                        <ul className="space-y-2 max-h-60 overflow-y-auto">
                                            {/* veryBad notifications */}
                                            {veryBads.length === 0 &&
                                            bads.length === 0 ? (
                                                <li className="p-2 text-center text-gray-500 dark:text-gray-400">
                                                    No Notifications
                                                </li>
                                            ) : (
                                                <>
                                                    {veryBads.map((item) => (
                                                        <Link
                                                            key={item.id}
                                                            href={route(
                                                                "notifications.show",
                                                                {
                                                                    clientId:
                                                                        item.id,
                                                                }
                                                            )}
                                                            className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                                                        >
                                                            <div className="text-xs font-semibold">
                                                                OD Name:{" "}
                                                                {item.odName}
                                                            </div>
                                                            <div className="text-xs font-semibold text-red-500">
                                                                Rating:{" "}
                                                                {item.rating}
                                                            </div>
                                                            <div className="text-xs">
                                                                Client:{" "}
                                                                {
                                                                    item.clientName
                                                                }
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {formatDistanceToNow(
                                                                    new Date(
                                                                        item.created_at
                                                                    ),
                                                                    {
                                                                        addSuffix: true,
                                                                    }
                                                                )}
                                                            </div>
                                                        </Link>
                                                    ))}
                                                    {bads.map((item) => (
                                                        <Link
                                                            key={item.id}
                                                            href={route(
                                                                "notifications.show",
                                                                {
                                                                    clientId:
                                                                        item.id,
                                                                }
                                                            )}
                                                            className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                                                        >
                                                            <div className="text-xs font-semibold">
                                                                OD Name:{" "}
                                                                {item.odName}
                                                            </div>
                                                            <div className="text-xs font-semibold text-orange-500">
                                                                Rating:{" "}
                                                                {item.rating}
                                                            </div>
                                                            <div className="text-xs">
                                                                Client:{" "}
                                                                {
                                                                    item.clientName
                                                                }
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {formatDistanceToNow(
                                                                    new Date(
                                                                        item.created_at
                                                                    ),
                                                                    {
                                                                        addSuffix: true,
                                                                    }
                                                                )}
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                        {hasModule(4) && (
                                            <Dropdown.Link
                                                href={route("usermodule.index")}
                                            >
                                                User Module
                                            </Dropdown.Link>
                                        )}
                                        {hasModule(6) && (
                                            <Dropdown.Link
                                                href={route(
                                                    "usersystemlog.index"
                                                )}
                                            >
                                                User System Logs
                                            </Dropdown.Link>
                                        )}

                                        {hasModule(6) && (
                                            <Dropdown.Link
                                                href={route(
                                                    "userloginlog.index"
                                                )}
                                            >
                                                User Login Logs
                                            </Dropdown.Link>
                                        )}
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                            {hasModule(4) && (
                                <Dropdown.Link href={route("usermodule.index")}>
                                    User Module
                                </Dropdown.Link>
                            )}
                            {hasModule(6) && (
                                <Dropdown.Link
                                    href={route("usersystemlog.index")}
                                >
                                    User System Logs
                                </Dropdown.Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
