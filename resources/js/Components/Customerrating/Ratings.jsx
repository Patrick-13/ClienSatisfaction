import React from "react";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import TextAreaInput from "@/Components/TextAreaInput";
import { useState } from "react";

export default function Ratings({
    data,
    errors,
    setData,
    employees,
    transactiontypes,
    units,
}) {
    console.log(employees);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingRating, setPendingRating] = useState(null);

    const selectedRating = data.rating;
    //checkbox rating handler
    const handleRatingChange = (value) => {
        if (value === "Bad" || value === "Very Bad") {
            setPendingRating(value);
            setShowConfirmModal(true);
            return;
        }

        setData("rating", selectedRating === value ? "" : value);
    };

    // Filter transaction types under that division
    const selectedTransaction = transactiontypes.find(
        (t) => t.id === data.transactionType
    );

    // Filter units under that transaction type
    const filteredUnits = selectedTransaction
        ? units.filter((unit) => unit.transaction_id === selectedTransaction.id)
        : [];

    // 3. Filter employees by selected section (unitVisited = section_id)
    const filteredEmployees = data.unitVisited
        ? employees.filter((emp) => emp.unit_id === data.unitVisited)
        : [];
    return (
        <>
            {/* Time In */}
            <div className="mt-4">
                <div className="flex items-center gap-1">
                    <span className="text-sm text-red-600">*</span>
                    <InputLabel htmlFor="timeIn" value="Time In" />
                </div>

                <TextInput
                    id="timeIn"
                    type="time"
                    name="timeIn"
                    value={data.timeIn}
                    className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                    isFocused={true}
                    onChange={(e) => setData("timeIn", e.target.value)}
                />
                <InputError message={errors.timeIn} className="mt-2" />
            </div>
            {/* Time Out */}
            <div className="mt-4">
                <div className="flex items-center gap-1">
                    <span className="text-sm text-red-600">*</span>
                    <InputLabel htmlFor="timeOut" value="Time Out" />
                </div>

                <TextInput
                    id="timeOut"
                    type="time"
                    name="timeOut"
                    value={data.timeOut}
                    className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                    isFocused={true}
                    onChange={(e) => setData("timeOut", e.target.value)}
                />
                <InputError message={errors.timeOut} className="mt-2" />
            </div>

            {/* Transaction Type */}
            <div className="mt-4">
                <div className="flex items-center 1">
                    <span className="text-sm text-red-600">*</span>
                    <InputLabel
                        htmlFor="transactionType"
                        value=" Transaction Type"
                    />
                </div>

                <SelectInput
                    id="transactionType"
                    name="transactionType"
                    value={data.transactionType}
                    className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                    onChange={(e) =>
                        setData("transactionType", parseInt(e.target.value))
                    }
                >
                    <option value="">Select Transaction Type</option>
                    {transactiontypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.transaction_name}
                        </option>
                    ))}
                </SelectInput>

                <InputError message={errors.transactionType} className="mt-2" />
            </div>

            {/* Unit/Section Visited */}

            <div className="mt-4">
                <div className="flex items-center gap-1">
                    <span className="text-sm text-red-600">*</span>
                    <InputLabel
                        htmlFor="unitVisited"
                        value="Unit/Section Visited"
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        (Select first the Transaction type)
                    </span>
                </div>

                <SelectInput
                    id="unitVisited"
                    name="unitVisited"
                    value={data.unitVisited}
                    onChange={(e) =>
                        setData("unitVisited", parseInt(e.target.value))
                    }
                    className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                >
                    <option value="">Select Section</option>
                    {filteredUnits.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                            {unit.unit_name}
                        </option>
                    ))}
                </SelectInput>

                <InputError message={errors.unitVisited} className="mt-2" />
            </div>

            {/* Personnel Handling Transaction */}
            <div className="mt-4">
                <div className="flex items-center gap-1">
                    <InputLabel htmlFor="personnel" value="Personnel" />
                </div>
                <SelectInput
                    id="personnel"
                    name="personnel"
                    value={data.personnel}
                    onChange={(e) =>
                        setData("personnel", parseInt(e.target.value))
                    }
                    className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                >
                    <option value="">Select Employee</option>
                    {filteredEmployees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                            {employee.fullName + " - " + employee.designation}
                        </option>
                    ))}
                </SelectInput>
                <InputError message={errors.personnel} className="mt-2" />
            </div>

            {/* Customer Rating (Radio Buttons with Emojis) */}
            <div className="mt-4">
                <div className="flex items-center gap-1">
                    <span className="text-sm text-red-600">*</span>
                    <InputLabel htmlFor="raing" value="Customer Rating" />
                </div>

                <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mt-2 items-start md:items-center">
                    <label className="inline-flex items-center">
                        <Checkbox
                            name="rating"
                            value="Excellent"
                            checked={selectedRating === "Excellent"}
                            onChange={() => handleRatingChange("Excellent")}
                            className="form-checkbox scale-150"
                        />
                        <span className="ml-2">😊 Excellent</span>
                    </label>

                    <label className="inline-flex items-center">
                        <Checkbox
                            name="rating"
                            value="Good"
                            checked={selectedRating === "Good"}
                            onChange={() => handleRatingChange("Good")}
                            className="form-checkbox scale-150"
                        />
                        <span className="ml-2">🙂 Good</span>
                    </label>

                    <label className="inline-flex items-center">
                        <Checkbox
                            name="rating"
                            value="Bad"
                            checked={selectedRating === "Bad"}
                            onChange={() => handleRatingChange("Bad")}
                            className="form-checkbox scale-150"
                        />
                        <span className="ml-2">😟 Bad</span>
                    </label>

                    <label className="inline-flex items-center">
                        <Checkbox
                            name="rating"
                            value="Very Bad"
                            checked={selectedRating === "Very Bad"}
                            onChange={() => handleRatingChange("Very Bad")}
                            className="form-checkbox scale-150"
                        />
                        <span className="ml-2">😠 Very Bad</span>
                    </label>
                </div>

                <InputError message={errors.rating} className="mt-2" />
            </div>
            {/* Comments and Suggestions */}
            <div className="mt-4">
                <div className="flex items-center gap-1">
                    <span className="text-sm text-red-600">*</span>
                    <InputLabel
                        htmlFor="comments"
                        value="Comments/Suggestions"
                    />
                </div>

                <TextAreaInput
                    id="comments"
                    value={data.comments}
                    onChange={(e) => setData("comments", e.target.value)}
                    maxLength={100} // <-- limit to 200 characters
                    rows="4"
                    className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                    isFocused={true}
                />

                {/* Live Character Counter */}
                <div
                    className={`text-sm mt-1 ${
                        data.comments && data.comments.length >= 100
                            ? "text-red-600"
                            : "text-gray-500"
                    }`}
                >
                    {data.comments && data.comments.length} / 100 characters
                </div>
                {data.comments &&
                    !/^(?!\s*$)[a-zA-Z\s]+$/.test(data.comments) && (
                        <div className="text-sm text-red-600 mt-1">
                            Only letters and spaces are allowed. No symbols or
                            all spaces.
                        </div>
                    )}

                <InputError message={errors.comments} className="mt-2" />
            </div>

            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md text-center max-w-sm">
                        <img
                            src="/sad.gif"
                            alt="Sad GIF"
                            className="w-32 mx-auto mb-4"
                        />
                        <p className="text-lg font-semibold mb-4">
                            Are you sure you want to rate this as{" "}
                            {pendingRating}?
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => {
                                    setData(
                                        "rating",
                                        selectedRating === pendingRating
                                            ? ""
                                            : pendingRating
                                    );
                                    setShowConfirmModal(false);
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
