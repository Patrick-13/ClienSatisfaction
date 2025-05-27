import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState({
        bad: 0,
        veryBad: 0,
    });

    // console.log(notifications);
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("/notifications", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`, // Adjust as necessary
                    },
                });

                // Set notifications data from the response
                setNotifications(response.data);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            }
        };

        fetchNotifications();

        const intervalId = setInterval(fetchNotifications, 10000); // Poll every 10 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <NotificationContext.Provider value={notifications}>
            {children}
        </NotificationContext.Provider>
    );
};
