import React from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "../TextAreaInput";

export const Form = ({ transactiontypes, units }) => {
    const { data, setData, post, reset, errors } = useForm({
        transactionType: "",
        unitSection: "",
        date: "",
        time: "",
        fullname: "",
        sex: "",
        sector: "",
        company: "",
        address: "",
        contactNo: "",
        email: "",
        remarks: "",
        termsandcondition: "",
    });

    const selectedSex = data.sex;
    const selectedSector = data.sector;

    // Filter transaction types under that division
    const selectedTransaction = transactiontypes.find(
        (t) => t.id === data.transactionType
    );

    // Filter units under that transaction type
    const filteredUnits = selectedTransaction
        ? units.filter((unit) => unit.transaction_id === selectedTransaction.id)
        : [];

    //checkbox gender handler
    const handleSexChange = (value) => {
        setData("sex", selectedSex === value ? "" : value);
    };

    //checkbox sector handler
    const handleSectorChange = (value) => {
        setData("sector", selectedSector === value ? "" : value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        post(route("clientappointment.store"), {
            onSuccess: () => {
                reset(); // This clears the form fields
            },
        });
    };
    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <main className="mt-10">
                <form
                    onSubmit={onSubmit}
                    className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Date */}
                        <div className="mt-4">
                            <h2 className="text-3xl font-extrabold mb-2 text-gray-800 dark:text-white">
                                Advisory
                            </h2>
                            <a
                                href="ADVISORY-SIGNED-USE-OF-ONLINE-SYSTEM-IN-ALL-TRANSACTIONS.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block border border-gray-300 hover:border-blue-500 rounded-md overflow-hidden shadow-md transition duration-300"
                            >
                                <img
                                    src="advisory.png"
                                    alt="Click to open PDF"
                                    className="w-full h-[1000px] object-cover"
                                    title="Sample PDF"
                                />
                            </a>
                        </div>

                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
                                Schedule Information
                            </h1>
                            {/* Transaction Type */}
                            <div className="mt-4">
                                <div className="flex items-center 1">
                                    <span className="text-sm text-red-600">
                                        *
                                    </span>
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
                                        setData(
                                            "transactionType",
                                            parseInt(e.target.value)
                                        )
                                    }
                                >
                                    <option value="">
                                        Select Transaction Type
                                    </option>
                                    {transactiontypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.transaction_name}
                                        </option>
                                    ))}
                                </SelectInput>

                                <InputError
                                    message={errors.transactionType}
                                    className="mt-2"
                                />
                            </div>

                            {/* Unit/Section Visited */}

                            <div className="mt-4">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-red-600">
                                        *
                                    </span>
                                    <InputLabel
                                        htmlFor="unitSection"
                                        value="Unit/Section Visited"
                                    />
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        (Select first the Transaction type)
                                    </span>
                                </div>

                                <SelectInput
                                    id="unitSection"
                                    name="unitSection"
                                    value={data.unitSection}
                                    onChange={(e) =>
                                        setData(
                                            "unitSection",
                                            parseInt(e.target.value)
                                        )
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

                                <InputError
                                    message={errors.unitVisited}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-red-600">
                                        *
                                    </span>
                                    <InputLabel htmlFor="date" value="Date" />
                                </div>
                                <TextInput
                                    id="date"
                                    type="date"
                                    name="date"
                                    value={data.date}
                                     className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                                    isFocused={true}
                                    min={new Date().toISOString().split("T")[0]} // 👈 disables past dates
                                    onChange={(e) =>
                                        setData("date", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.date}
                                    className="mt-2"
                                />
                            </div>
                            {/* Time Dropdown - only shows if date is selected */}
                            {data.date && (
                                <div className="mt-4">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-red-600">
                                            *
                                        </span>
                                        <InputLabel
                                            htmlFor="time"
                                            value="Time"
                                        />
                                    </div>
                                    <select
                                        id="time"
                                        name="time"
                                        value={data.time}
                                        onChange={(e) =>
                                            setData("time", e.target.value)
                                        }
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">
                                            -- Select Time --
                                        </option>
                                        {[
                                            "10:00",
                                            "11:00",
                                            "12:00",
                                            "13:00",
                                            "14:00",
                                            "15:00",
                                            "16:00",
                                        ].map((time) => (
                                            <option key={time} value={time}>
                                                {new Date(
                                                    `1970-01-01T${time}:00`
                                                ).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.time}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
                                Personal Information
                            </h1>
                            {/* Client's Name */}
                            <div className="mt-4">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-red-600">
                                        *
                                    </span>
                                    <InputLabel
                                        htmlFor="fullname"
                                        value="Fullname"
                                    />
                                </div>

                                <TextInput
                                    id="fullname"
                                    type="text"
                                    name="fullname"
                                    value={data.fullname}
                                    className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("fullname", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.fullname}
                                    className="mt-2"
                                />
                            </div>

                            {/* Sex (Checkboxes) */}
                            <div className="mt-4">
                                <div className="flex items-center">
                                    <span className="text-sm text-red-600">
                                        *
                                    </span>
                                    <InputLabel htmlFor="sex" value="Sex" />
                                </div>

                                <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mt-2 items-start md:items-center gap-4">
                                    <label className="inline-flex items-center gap-2">
                                        <Checkbox
                                            name="sex"
                                            value="Male"
                                            checked={selectedSex === "Male"}
                                            onChange={() =>
                                                handleSexChange("Male")
                                            }
                                            className="form-checkbox scale-150"
                                        />
                                        <span className="ml-2">Male</span>
                                    </label>
                                    <label className="inline-flex items-center gap-2">
                                        <Checkbox
                                            name="sex"
                                            value="Female"
                                            checked={selectedSex === "Female"}
                                            onChange={() =>
                                                handleSexChange("Female")
                                            }
                                            className="form-checkbox scale-150 "
                                        />
                                        <span className="ml-2">Female</span>
                                    </label>
                                </div>
                                <InputError
                                    message={errors.sex}
                                    className="mt-2"
                                />
                            </div>

                            {/* Sector (Checkboxes) */}
                            <div className="mt-4">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-red-600">
                                        *
                                    </span>
                                    <InputLabel
                                        htmlFor="sector"
                                        value="Sector"
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mt-2 items-start md:items-center gap-4">
                                    <label className="inline-flex items-center gap-2">
                                        <Checkbox
                                            name="sector"
                                            value="Government"
                                            checked={
                                                selectedSector === "Government"
                                            }
                                            onChange={() =>
                                                handleSectorChange("Government")
                                            }
                                            className="form-checkbox scale-150"
                                        />
                                        <span className="ml-2">Government</span>
                                    </label>
                                    <label className="inline-flex items-center gap-2">
                                        <Checkbox
                                            name="sector"
                                            value="Private"
                                            checked={
                                                selectedSector === "Private"
                                            }
                                            onChange={() =>
                                                handleSectorChange("Private")
                                            }
                                            className="form-checkbox scale-150"
                                        />
                                        <span className="ml-2">Private</span>
                                    </label>
                                    <label className="inline-flex items-center gap-2">
                                        <Checkbox
                                            name="sector"
                                            value="NGO"
                                            checked={selectedSector === "NGO"}
                                            onChange={() =>
                                                handleSectorChange("NGO")
                                            }
                                            className="form-checkbox scale-150"
                                        />
                                        <span className="ml-2">NGO</span>
                                    </label>
                                    <label className="inline-flex items-center gap-2">
                                        <Checkbox
                                            name="sector"
                                            value="Other"
                                            checked={selectedSector === "Other"}
                                            onChange={() =>
                                                handleSectorChange("Other")
                                            }
                                            className="form-checkbox scale-150"
                                        />
                                        <span className="ml-2">Other</span>
                                    </label>
                                </div>
                                <InputError
                                    message={errors.sector}
                                    className="mt-2"
                                />
                            </div>

                            {/* Company Name */}
                            <div className="mt-4">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-red-600">
                                        *
                                    </span>
                                    <InputLabel
                                        htmlFor="company"
                                        value="Company Name"
                                    />
                                </div>

                                <TextInput
                                    id="company"
                                    type="text"
                                    name="company"
                                    value={data.company}
                                    className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("company", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.company}
                                    className="mt-2"
                                />
                            </div>

                            {/* Address */}
                            <div className="mt-4">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-red-600">
                                        *
                                    </span>
                                    <InputLabel
                                        htmlFor="address"
                                        value="Address"
                                    />
                                </div>

                                <TextInput
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={data.address}
                                    className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.address}
                                    className="mt-2"
                                />
                            </div>

                            {/* Contact Number */}
                            <div className="mt-4">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-red-600">
                                        *
                                    </span>
                                    <InputLabel
                                        htmlFor="contactNo"
                                        value="Contact Number"
                                    />
                                </div>

                                <TextInput
                                    id="contactNo"
                                    type="text"
                                    name="contactNo"
                                    value={data.contactNo}
                                    className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("contactNo", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.contactNo}
                                    className="mt-2"
                                />
                            </div>

                            {/* Email */}
                            <div className="mt-4">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-red-600">
                                        *
                                    </span>
                                    <InputLabel htmlFor="email" value="Email" />
                                </div>

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            {/* Remarks */}
                            <div className="mt-4">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-red-600">
                                        *
                                    </span>
                                    <InputLabel
                                        htmlFor="remarks"
                                        value="Remarks"
                                    />
                                </div>

                                <TextAreaInput
                                    id="remarks"
                                    type="text"
                                    name="remarks"
                                    value={data.remarks}
                                    rows="4"
                                    className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("remarks", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.remarks}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 flex justify-center">
                                <div className="flex items-center gap-2">
                                    <input
                                        id="termsandcondition"
                                        type="checkbox"
                                        name="termsandcondition"
                                        checked={data.termsandcondition === 1}
                                        onChange={(e) =>
                                            setData(
                                                "termsandcondition",
                                                e.target.checked ? 1 : 0
                                            )
                                        }
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="termsandcondition"
                                        className="text-lg text-gray-700"
                                    >
                                        I agree with terms and conditions
                                        <span className="text-red-600 ml-1">
                                            *
                                        </span>
                                    </label>
                                </div>

                                <InputError
                                    message={errors.termsandcondition}
                                    className="mt-2"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="mt-4 flex justify-center">
                                <button
                                    type="submit"
                                    className="w-1/2 bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
};
