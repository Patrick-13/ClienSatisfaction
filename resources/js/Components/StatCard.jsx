import React from "react";

export default function StatCard({ title, count, label, bg }) {
    return (
        <div
            className={`bg-${bg}-500 dark:bg-${bg}-700 rounded-lg shadow-md p-6 text-white`}
        >
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-3xl font-bold mt-2">{count}</p>
            <p className="text-sm mt-1">{label}</p>
        </div>
    );
}
