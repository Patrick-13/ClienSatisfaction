// OfficeSchedule.js
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// Sample event data
const events = [
    {
        title: "Office: Alice",
        start: new Date(2025, 4, 19, 9, 0), // May 19, 2025
        end: new Date(2025, 4, 19, 17, 0),
    },
    {
        title: "Office: Bob",
        start: new Date(2025, 4, 20, 9, 0),
        end: new Date(2025, 4, 20, 17, 0),
    },
    {
        title: "Office: Carol",
        start: new Date(2025, 4, 21, 9, 0),
        end: new Date(2025, 4, 21, 17, 0),
    },
];

const OfficeSchedule = () => (
    <div style={{ height: "600px" }}>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            views={["week", "day"]}
            style={{ height: 500 }}
        />
    </div>
);

export default OfficeSchedule;
