import React from "react";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";

export default function Ratings({
    data,
    errors,
    setData,
    sections,
    employees,
    transactiontypes,
    units,
}) {
    const selectedRating = data.rating;
    //checkbox rating handler
    const handleRatingChange = (value) => {
        const isNegativeRating = value;

        if (isNegativeRating === "Bad") {
            const confirmed = window.confirm(
                "Are you sure you want to rate this as Bad?"
            );
            if (!confirmed) {
                return; // user canceled, don't change the rating
            }
        }

        if (isNegativeRating === "Very Bad") {
            const confirmed = window.confirm(
                "Are you sure you want to rate this as Very Bad?"
            );
            if (!confirmed) {
                return; // user canceled, don't change the rating
            }
        }

        // Toggle the rating (deselect if it's already selected)
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
                    <span className="text-sm text-red-600">*</span>
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
        </>
    );
}
