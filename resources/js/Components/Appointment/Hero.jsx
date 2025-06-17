import React from "react";
import background from "../../../../public/denr_logo.png"; // Adjust path based on your structure
import { FaBook } from "react-icons/fa"; // For the User Manual icon

export const Hero = () => {
    return (
        <div
            className="relative w-full h-[700px] bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            <div className="absolute inset-0 bg-green-900 bg-opacity-80"></div>
            <div className="relative z-10 text-center px-4 text-white max-w-5xl">
                <h1 className="text-6xl md:text-5xl sm:text-4xl font-bold mb-6">
                    Online Appointment System
                </h1>

                <p className="mb-4 text-2xl md:text-2xl sm:text-xl">
                    <span className="text-yellow-400 font-semibold">
                        Importance Notice:
                    </span>{" "}
                    In the event of an emergency work suspension, please
                    reschedule your appointment to the next available time slot
                    that best fits your schedule. For notices and updates,
                    please refer to our{" "}
                    <a
                        href="#"
                        className="underline hover:text-blue-300 transition"
                    >
                        Website
                    </a>{" "}
                    and{" "}
                    <a
                        href="#"
                        className="underline hover:text-blue-300 transition"
                    >
                        Facebook page.
                    </a>
                </p>

                <p className="mb-6 text-3xl md:text-xl sm:text-base">
                    Please note that each type of transaction requires a
                    separate appointment.
                </p>

                <div className="w-full flex items-center justify-center">
                    <button className="bg-green-700 text-white text-2xl px-4 py-2 rounded-md shadow hover:bg-green-900 flex items-center gap-2 transition">
                        <FaBook />
                        User Manual
                    </button>
                </div>
            </div>
        </div>
    );
};
