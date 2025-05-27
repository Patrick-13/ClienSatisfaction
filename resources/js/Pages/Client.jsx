import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ratings from "@/Components/Customerrating/Ratings";

export default function Client({
    flash,
    todayOfficer,
    divisions,
    sections,
    employees,
    transactiontypes,
    units,
}) {
    console.log("Officer:", employees);

    const { data, setData, post, reset, errors } = useForm({
        odName: todayOfficer?.odName || "No Officer Scheduled Today",
        date: new Date().toISOString().split("T")[0], //set default date the form
        clientName: "",
        sex: "",
        sector: "",
        companyName: "",
        address: "",
        contactNumber: "",
        email: "",
        timeIn: "",
        transactionType: "",
        unitVisited: "",
        personnel: "",
        rating: "",
        timeOut: "",
        comments: "",
        ratings: [],
    });

    const selectedSex = data.sex;
    const selectedSector = data.sector;

    const addRatingSection = () => {
        setData("ratings", [
            ...data.ratings,
            {
                timeIn: "",
                timeOut: "",
                transactionType: "",
                unitVisited: "",
                personnel: "",
                rating: "",
            },
        ]);
    };

    // Function to remove a rating
    const removeRatingSection = (index) => {
        const updatedRatings = data.ratings.filter((_, i) => i !== index);
        setData("ratings", updatedRatings);
    };

    //checkbox gender handler
    const handleSexChange = (value) => {
        setData("sex", selectedSex === value ? "" : value);
    };

    //checkbox sector handler
    const handleSectorChange = (value) => {
        setData("sector", selectedSector === value ? "" : value);
    };

    //function submitting the form
    const onSubmit = async (e) => {
        e.preventDefault();

        post(route("customer.store"), {
            onSuccess: () => {
                reset(); // This clears the form fields
            },
        });
    };

    //function toast success message
    useEffect(() => {
        if (flash.message.success) {
            toast.success(flash.message.success);
        }

        if (flash.message.error) {
            toast.error(flash.message.error);
        }
    }, [flash]);

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

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            onClick={addRatingSection}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        >
                                            Add Rating
                                        </button>
                                    </div>

                                    {data.ratings.map((ratingData, index) => (
                                        <div
                                            key={index}
                                            className="border p-4 my-4 rounded shadow"
                                        >
                                            <h2 className="font-semibold text-lg mb-2">
                                                Rating #{index + 1}
                                            </h2>

                                            <Ratings
                                                data={ratingData}
                                                divisions={divisions}
                                                sections={sections}
                                                employees={employees}
                                                transactiontypes={
                                                    transactiontypes
                                                }
                                                units={units}
                                                errors={
                                                    errors.ratings?.[index] ||
                                                    {}
                                                }
                                                setData={(field, value) => {
                                                    const updatedRatings = [
                                                        ...data.ratings,
                                                    ];
                                                    updatedRatings[index] = {
                                                        ...updatedRatings[
                                                            index
                                                        ],
                                                        [field]: value,
                                                    };
                                                    setData(
                                                        "ratings",
                                                        updatedRatings
                                                    );
                                                }}
                                            />
                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeRatingSection(
                                                            index
                                                        )
                                                    }
                                                    className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600"
                                                >
                                                    Remove Rating
                                                </button>
                                            </div>
                                        </div>
                                    ))}

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
