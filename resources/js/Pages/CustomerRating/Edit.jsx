import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectInput from "@/Components/SelectInput";
import { IoArrowBack } from "react-icons/io5";

export default function Edit({
    ratingInfo,
    sections,
    employees,
    transactiontypes,
    todayOfficer,
}) {
    console.log(ratingInfo);
    const { data, setData, put, reset, errors } = useForm({
        odName: todayOfficer?.odName || "No Officer Scheduled Today",
        date: ratingInfo.date || new Date().toISOString().split("T")[0], //set default date the form
        clientName: ratingInfo.clientName || "",
        sex: ratingInfo.sex || "",
        sector: ratingInfo.sector || "",
        companyName: ratingInfo.companyName || "",
        address: ratingInfo.address || "",
        contactNumber: ratingInfo.contactNumber || "",
        email: ratingInfo.email || "",
        timeIn: ratingInfo.timeIn || "",
        transactionType: ratingInfo.transactionType || "",
        unitVisited: ratingInfo.unitVisited || "",
        personnel: ratingInfo.personnel || "",
        rating: ratingInfo.rating || "",
        timeOut: ratingInfo.timeOut || "",
        comments: ratingInfo.comments || "",
    });

    const selectedSex = data.sex;
    const selectedSector = data.sector;
    const [showRatings, setShowRatings] = useState(false);
    const [officerName, setOfficerName] = useState("");
    const selectedRating = data.rating;

    //checkbox gender handler
    const handleSexChange = (value) => {
        setData("sex", selectedSex === value ? "" : value);
    };

    //checkbox sector handler
    const handleSectorChange = (value) => {
        setData("sector", selectedSector === value ? "" : value);
    };

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
    //filter section based its transaction type
    const selectedTransaction = transactiontypes.find(
        (t) => t.id === data.transactionType
    );

    // Filter sections under that division
    const filteredSections = selectedTransaction
        ? sections.filter(
              (s) => s.division_id === selectedTransaction.division_id
          )
        : [];

    // 3. Filter employees by selected section (unitVisited = section_id)
    const filteredEmployees = data.unitVisited
        ? employees.filter((emp) => emp.section_id === data.unitVisited)
        : [];

    //function submitting the form

    const onSubmit = async (e) => {
        e.preventDefault();
        put(route("ratingdata.update", ratingInfo.id));
    };

    return (
        <>
            <Head title="Client" />
            <ToastContainer />
            <div className="py-2">
                <div className="flex justify-center">
                    <div className="w-full max-w-6xl sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <main className="mt-10">
                                <h1 className="text-2xl font-semibold text-center mb-4">
                                    Customer Satisfaction Questionnaire
                                </h1>
                                <Link
                                    href={route("ratingdata.index")}
                                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                >
                                    <IoArrowBack className="mr-2" size={18} />
                                    Back
                                </Link>
                                <form
                                    onSubmit={onSubmit}
                                    className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                                >
                                    {/* Name of OD */}
                                    <div className="mt-4">
                                        <div className="flex items-center 1">
                                            <span className="text-sm text-red-600">
                                                *
                                            </span>
                                            <InputLabel
                                                htmlFor="odName"
                                                value="Name of OD (Officer of the Day)"
                                            />
                                        </div>
                                        <TextInput
                                            id="odName"
                                            type="text"
                                            name="odName"
                                            value={data.odName}
                                            disabled
                                            className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full bg-gray-200"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "odName",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.odName}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Date */}
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
                                        <TextInput
                                            id="date"
                                            type="date"
                                            name="date"
                                            value={data.date}
                                            disabled
                                            className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full bg-gray-200"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("date", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.date}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Client's Name */}
                                    <div className="mt-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm text-red-600">
                                                *
                                            </span>
                                            <InputLabel
                                                htmlFor="clientName"
                                                value="Client Name"
                                            />
                                        </div>

                                        <TextInput
                                            id="clientName"
                                            type="text"
                                            name="clientName"
                                            value={data.clientName}
                                            className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "clientName",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.clientName}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Sex (Checkboxes) */}
                                    <div className="mt-4">
                                        <div className="flex items-center">
                                            <span className="text-sm text-red-600">
                                                *
                                            </span>
                                            <InputLabel
                                                htmlFor="sex"
                                                value="Sex"
                                            />
                                        </div>

                                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mt-2 items-start md:items-center gap-4">
                                            <label className="inline-flex items-center gap-2">
                                                <Checkbox
                                                    name="sex"
                                                    value="Male"
                                                    checked={
                                                        selectedSex === "Male"
                                                    }
                                                    onChange={() =>
                                                        handleSexChange("Male")
                                                    }
                                                    className="form-checkbox scale-150"
                                                />
                                                <span className="ml-2">
                                                    Male
                                                </span>
                                            </label>
                                            <label className="inline-flex items-center gap-2">
                                                <Checkbox
                                                    name="sex"
                                                    value="Female"
                                                    checked={
                                                        selectedSex === "Female"
                                                    }
                                                    onChange={() =>
                                                        handleSexChange(
                                                            "Female"
                                                        )
                                                    }
                                                    className="form-checkbox scale-150"
                                                />
                                                <span className="ml-2">
                                                    Female
                                                </span>
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
                                                        selectedSector ===
                                                        "Private"
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
                                                        handleSectorChange(
                                                            "NGO"
                                                        )
                                                    }
                                                    className="form-checkbox scale-150"
                                                />
                                                <span className="ml-2">
                                                    NGO
                                                </span>
                                            </label>
                                            <label className="inline-flex items-center gap-2">
                                                <Checkbox
                                                    name="sector"
                                                    value="Other"
                                                    checked={
                                                        selectedSector ===
                                                        "Other"
                                                    }
                                                    onChange={() =>
                                                        handleSectorChange(
                                                            "Other"
                                                        )
                                                    }
                                                    className="form-checkbox scale-150"
                                                />
                                                <span className="ml-2">
                                                    Other
                                                </span>
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
                                                htmlFor="companyName"
                                                value="Company Name"
                                            />
                                        </div>

                                        <TextInput
                                            id="companyName"
                                            type="text"
                                            name="companyName"
                                            value={data.companyName}
                                            className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "companyName",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.companyName}
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
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
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
                                                htmlFor="contactNumber"
                                                value="Contact Number"
                                            />
                                        </div>

                                        <TextInput
                                            id="contactNumber"
                                            type="text"
                                            name="contactNumber"
                                            value={data.contactNumber}
                                            className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "contactNumber",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.contactNumber}
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
                                    {/* Time In */}
                                    <div className="mt-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm text-red-600">
                                                *
                                            </span>
                                            <InputLabel
                                                htmlFor="timeIn"
                                                value="Time In"
                                            />
                                        </div>

                                        <TextInput
                                            id="timeIn"
                                            type="time"
                                            name="timeIn"
                                            value={data.timeIn}
                                            className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "timeIn",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.timeIn}
                                            className="mt-2"
                                        />
                                    </div>
                                    {/* Time Out */}
                                    <div className="mt-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm text-red-600">
                                                *
                                            </span>
                                            <InputLabel
                                                htmlFor="timeOut"
                                                value="Time Out"
                                            />
                                        </div>

                                        <TextInput
                                            id="timeOut"
                                            type="time"
                                            name="timeOut"
                                            value={data.timeOut}
                                            className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "timeOut",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.timeOut}
                                            className="mt-2"
                                        />
                                    </div>

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
                                                <option
                                                    key={type.id}
                                                    value={type.id}
                                                >
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
                                                htmlFor="unitVisited"
                                                value="Unit/Section Visited"
                                            />
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                (Select first the Transaction
                                                type)
                                            </span>
                                        </div>

                                        <SelectInput
                                            id="unitVisited"
                                            name="unitVisited"
                                            value={data.unitVisited}
                                            onChange={(e) =>
                                                setData(
                                                    "unitVisited",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                                        >
                                            <option value="">
                                                Select Section
                                            </option>
                                            {filteredSections.map((section) => (
                                                <option
                                                    key={section.id}
                                                    value={section.id}
                                                >
                                                    {section.section_name}
                                                </option>
                                            ))}
                                        </SelectInput>

                                        <InputError
                                            message={errors.unitVisited}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Personnel Handling Transaction */}
                                    <div className="mt-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm text-red-600">
                                                *
                                            </span>
                                            <InputLabel
                                                htmlFor="personnel"
                                                value="Personnel"
                                            />
                                        </div>
                                        <SelectInput
                                            id="personnel"
                                            name="personnel"
                                            value={data.personnel}
                                            onChange={(e) =>
                                                setData(
                                                    "personnel",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                                        >
                                            <option value="">
                                                Select Employee
                                            </option>
                                            {filteredEmployees.map(
                                                (employee) => (
                                                    <option
                                                        key={employee.id}
                                                        value={employee.id}
                                                    >
                                                        {employee.fullName +
                                                            " - " +
                                                            employee.designation}
                                                    </option>
                                                )
                                            )}
                                        </SelectInput>
                                        <InputError
                                            message={errors.personnel}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Customer Rating (Radio Buttons with Emojis) */}
                                    <div className="mt-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm text-red-600">
                                                *
                                            </span>
                                            <InputLabel
                                                htmlFor="rating"
                                                value="Customer Rating"
                                            />
                                        </div>

                                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mt-2 items-start md:items-center">
                                            <label className="inline-flex items-center">
                                                <Checkbox
                                                    name="rating"
                                                    value="Excellent"
                                                    checked={
                                                        selectedRating ===
                                                        "Excellent"
                                                    }
                                                    onChange={() =>
                                                        handleRatingChange(
                                                            "Excellent"
                                                        )
                                                    }
                                                    className="form-checkbox scale-150"
                                                />
                                                <span className="ml-2">
                                                    😊 Excellent
                                                </span>
                                            </label>

                                            <label className="inline-flex items-center">
                                                <Checkbox
                                                    name="rating"
                                                    value="Good"
                                                    checked={
                                                        selectedRating ===
                                                        "Good"
                                                    }
                                                    onChange={() =>
                                                        handleRatingChange(
                                                            "Good"
                                                        )
                                                    }
                                                    className="form-checkbox scale-150"
                                                />
                                                <span className="ml-2">
                                                    🙂 Good
                                                </span>
                                            </label>

                                            <label className="inline-flex items-center">
                                                <Checkbox
                                                    name="rating"
                                                    value="Bad"
                                                    checked={
                                                        selectedRating === "Bad"
                                                    }
                                                    onChange={() =>
                                                        handleRatingChange(
                                                            "Bad"
                                                        )
                                                    }
                                                    className="form-checkbox scale-150"
                                                />
                                                <span className="ml-2">
                                                    😟 Bad
                                                </span>
                                            </label>

                                            <label className="inline-flex items-center">
                                                <Checkbox
                                                    name="rating"
                                                    value="Very Bad"
                                                    checked={
                                                        selectedRating ===
                                                        "Very Bad"
                                                    }
                                                    onChange={() =>
                                                        handleRatingChange(
                                                            "Very Bad"
                                                        )
                                                    }
                                                    className="form-checkbox scale-150"
                                                />
                                                <span className="ml-2">
                                                    😠 Very Bad
                                                </span>
                                            </label>
                                        </div>

                                        <InputError
                                            message={errors.rating}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Comments and Suggestions */}
                                    <div className="mt-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm text-red-600">
                                                *
                                            </span>
                                            <InputLabel
                                                htmlFor="comments"
                                                value="Comments/Suggestions"
                                            />
                                        </div>
                                        <TextAreaInput
                                            id="comments"
                                            value={data.comments}
                                            className="mt-1 block w-full sm:w-3/4 md:w-1/2 lg:w-full"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "comments",
                                                    e.target.value
                                                )
                                            }
                                            rows="4"
                                        />
                                        <InputError
                                            message={errors.comments}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </main>

                            {/* <Footer /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
