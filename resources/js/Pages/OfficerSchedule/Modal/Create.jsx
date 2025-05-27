import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";

export default function Create({ auth, closeModal }) {
    const { data, setData, post, errors } = useForm({
        odName: "",
        date: "",
        timeStart: "",
        timeEnd: "",
        email: "",
        remarks: "",
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        post(route("officerschedule.store"), {
            onSuccess: () => {
                closeModal(); // Close the modal on successful form submission
            },
        });
    };

    return (
        <form
            onSubmit={onSubmit}
            className="p-6 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
        >
            <div className="mb-6">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                    Create Officer Schedule
                </h2>
            </div>

            {/* Officer Name */}
            <div className="mb-4">
                <InputLabel htmlFor="odName" value="Officer Name" />
                <TextInput
                    id="odName"
                    name="odName"
                    value={data.odName}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("odName", e.target.value)}
                />
                <InputError message={errors.odName} className="mt-2" />
            </div>

            {/* Date Fields */}
            <div className="mb-4">
                <div>
                    <InputLabel htmlFor="date" value="Date" />
                    <TextInput
                        id="date"
                        type="date"
                        name="date"
                        value={data.date}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("date", e.target.value)}
                    />
                    <InputError message={errors.date} className="mt-2" />
                </div>
            </div>

            {/* Time Fields */}
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <InputLabel htmlFor="timeStart" value="Time In" />
                    <TextInput
                        id="timeStart"
                        type="time"
                        name="timeStart"
                        value={data.timeStart}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("timeStart", e.target.value)}
                    />
                    <InputError message={errors.timeStart} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="timeEnd" value="Time Out" />
                    <TextInput
                        id="timeEnd"
                        type="time"
                        name="timeEnd"
                        value={data.timeEnd}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("timeEnd", e.target.value)}
                    />
                    <InputError message={errors.timeEnd} className="mt-2" />
                </div>
            </div>

            {/* Email */}
            <div className="mb-4">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
            </div>

            {/* Remarks */}
            <div className="mb-6">
                <InputLabel htmlFor="remarks" value="Remarks" />
                <TextAreaInput
                    id="remarks"
                    value={data.remarks}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("remarks", e.target.value)}
                    rows="4"
                />
                <InputError message={errors.remarks} className="mt-2" />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
                <Link
                    href={route("officerschedule.index")}
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="bg-emerald-500 text-white px-4 py-2 rounded shadow hover:bg-emerald-600"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
