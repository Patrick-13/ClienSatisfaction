import React, { useState } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "../TextAreaInput";
import ReCAPTCHA from "react-google-recaptcha";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MultiSelectDropdown from "../MultiSelectDropdown";

export const Form = ({ transactiontypes, units }) => {
    const { data, setData, post, reset, errors } = useForm({
        transactionType: "",
        unitSection: [],
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
        captcha: "",
    });

    const selectedSex = data.sex;
    const selectedSector = data.sector;
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
        setData("captcha", value);
    };

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

        if (!captchaValue) {
            alert("Please verify that you are not a robot.");
            return;
        }

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
                    <div className="flex">
                        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm opacity-90 ml-auto">
                            <strong className="font-semibold">Reminder:</strong>{" "}
                            All fields marked with a{" "}
                            <span className="text-red-600">*</span> are
                            required.
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Date */}
                        <div className="mt-4 h-[750px]">
                            <h2 className="text-3xl font-extrabold mb-2 text-gray-800 dark:text-white">
                                Advisory
                            </h2>
                            <a
                                href="ADVISORY-SIGNED-USE-OF-ONLINE-SYSTEM-IN-ALL-TRANSACTIONS.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block border border-gray-300 hover:border-blue-500 rounded-md overflow-hidden shadow-md transition duration-300 h-full"
                            >
                                <img
                                    src="advisory.jpg"
                                    alt="Click to open PDF"
                                    className="w-full h-full object-contain"
                                    title="Sample PDF"
                                />
                            </a>
                        </div>

                        <div className="mt-2">
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
                            <fieldset
                                disabled={!data.transactionType}
                                className="opacity-100 disabled:opacity-50 transition-opacity"
                            >
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

                                    <MultiSelectDropdown
                                        id="unitSection"
                                        name="unitSection"
                                        value={data.unitSection}
                                        onChange={(vals) =>
                                            setData("unitSection", vals)
                                        }
                                        className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                                    >
                                        <option value="">Select Section</option>
                                        {filteredUnits.map((unit) => (
                                            <option
                                                key={unit.id}
                                                value={unit.id}
                                            >
                                                {unit.unit_name}
                                            </option>
                                        ))}
                                    </MultiSelectDropdown>

                                    <InputError
                                        message={errors.unitVisited}
                                        className="mt-2"
                                    />
                                </div>
                            </fieldset>
                            <fieldset
                                disabled={!data.unitSection}
                                className="opacity-100 disabled:opacity-50 transition-opacity"
                            >
                                <div className="mt-4">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-red-600">
                                            *
                                        </span>
                                        <InputLabel
                                            htmlFor="date"
                                            value="Date"
                                        />
                                    </div>

                                    <DatePicker
                                        id="date"
                                        name="date"
                                        selected={
                                            data.date
                                                ? new Date(data.date)
                                                : null
                                        }
                                        onChange={(date) =>
                                            setData(
                                                "date",
                                                date.toISOString().split("T")[0]
                                            )
                                        }
                                        // minDate={new Date()}
                                        dateFormat="yyyy-MM-dd"
                                        inline
                                        className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full border border-gray-300 rounded px-3 py-2"
                                    />

                                    <InputError
                                        message={errors.date}
                                        className="mt-2"
                                    />
                                </div>
                            </fieldset>
                            {/* Time Dropdown - only shows if date is selected */}
                            <fieldset
                                disabled={!data.date}
                                className="opacity-100 disabled:opacity-50 transition-opacity"
                            >
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
                                        className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">
                                            -- Select Time --
                                        </option>
                                        {[
                                            "09:00",
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
                            </fieldset>
                            <div className="mt-10">
                                <ReCAPTCHA
                                    sitekey="6LeJl2MrAAAAAIGoZmahvUhfEzfew-5TzgB2q4zw" // <-- replace with your actual Site Key
                                    onChange={handleCaptchaChange}
                                />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
                                Personal Information
                            </h1>
                            <fieldset
                                disabled={!data.time}
                                className="opacity-100 disabled:opacity-50 transition-opacity"
                            >
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
                                                checked={
                                                    selectedSex === "Female"
                                                }
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
                                                    selectedSector ===
                                                    "Government"
                                                }
                                                onChange={() =>
                                                    handleSectorChange(
                                                        "Government"
                                                    )
                                                }
                                                className="form-checkbox scale-150"
                                            />
                                            <span className="ml-2">
                                                Government
                                            </span>
                                        </label>
                                        <label className="inline-flex items-center gap-2">
                                            <Checkbox
                                                name="sector"
                                                value="Private"
                                                checked={
                                                    selectedSector === "Private"
                                                }
                                                onChange={() =>
                                                    handleSectorChange(
                                                        "Private"
                                                    )
                                                }
                                                className="form-checkbox scale-150"
                                            />
                                            <span className="ml-2">
                                                Private
                                            </span>
                                        </label>
                                        <label className="inline-flex items-center gap-2">
                                            <Checkbox
                                                name="sector"
                                                value="NGO"
                                                checked={
                                                    selectedSector === "NGO"
                                                }
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
                                                checked={
                                                    selectedSector === "Other"
                                                }
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
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />
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
                                        <label
                                            htmlFor="termsandcondition"
                                            className="text-lg text-gray-700 inline-flex items-start space-x-2"
                                        >
                                            <input
                                                id="termsandcondition"
                                                type="checkbox"
                                                name="termsandcondition"
                                                checked={
                                                    data.termsandcondition === 1
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "termsandcondition",
                                                        e.target.checked ? 1 : 0
                                                    )
                                                }
                                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                            />
                                            <span className="text-sm text-gray-700">
                                                I agree with the terms,
                                                conditions and confirm that all
                                                the information provided above
                                                is{" "}
                                                <strong>
                                                    true and correct
                                                </strong>{" "}
                                                to the best of my knowledge.
                                            </span>
                                        </label>
                                    </div>

                                    <InputError
                                        message={errors.termsandcondition}
                                        className="mt-2"
                                    />
                                </div>
                            </fieldset>
                            {/* Submit Button */}
                            {data.time && (
                                <div className="mt-4 flex justify-center">
                                    <button
                                        type="submit"
                                        className="w-1/2 bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
};
