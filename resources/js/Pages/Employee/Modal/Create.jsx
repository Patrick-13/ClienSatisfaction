import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";

export default function Create({ closeModal, divisions, sections, units }) {
    console.log(divisions);
    const { data, setData, post, errors } = useForm({
        embId: "",
        date_registered: "",
        fullName: "",
        designation: "",
        email: "",
        division_id: "",
        section_id: "",
        unit_id: "",
    });

    const filteredSections = data.division_id
        ? sections.filter((s) => s.division_id == data.division_id)
        : [];

    const onSubmit = async (e) => {
        e.preventDefault();

        post(route("employee.store"), {
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
                    Create New Employee
                </h2>
            </div>

            <div className="mb-4">
                <InputLabel htmlFor="embId" value="Emb Id" />
                <TextInput
                    id="embId"
                    name="embId"
                    value={data.embId}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("embId", e.target.value)}
                />
                <InputError message={errors.embId} className="mt-2" />
            </div>

            <div className="mb-4">
                <InputLabel htmlFor="date_registered" value="Date Registered" />
                <TextInput
                    id="date_registered"
                    type="date"
                    name="date_registered"
                    value={data.date_registered}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("date_registered", e.target.value)}
                />
                <InputError message={errors.date_registered} className="mt-2" />
            </div>

            <div className="mb-4">
                <InputLabel htmlFor="fullName" value="Full Name" />
                <TextInput
                    id="fullName"
                    name="fullName"
                    value={data.fullName}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("fullName", e.target.value)}
                />
                <InputError message={errors.fullName} className="mt-2" />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="designation" value="Designation" />
                <TextInput
                    id="designation"
                    name="designation"
                    value={data.designation}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("designation", e.target.value)}
                />
                <InputError message={errors.designation} className="mt-2" />
            </div>

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

            <div className="mb-4">
                <InputLabel htmlFor="division_id" value="Division" />
                <SelectInput
                    id="division_id"
                    name="division_id"
                    value={data.division_id}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("division_id", e.target.value)}
                >
                    <option value="">Select Division</option>
                    {divisions &&
                        divisions.map((division) => (
                            <option key={division.id} value={division.id}>
                                {division.division_name}
                            </option>
                        ))}
                </SelectInput>

                <InputError message={errors.division_id} className="mt-2" />
            </div>

            <div className="mb-4">
                <InputLabel htmlFor="section_id" value="Section" />
                <SelectInput
                    id="section_id"
                    name="section_id"
                    value={data.section_id}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("section_id", e.target.value)}
                >
                    <option value="">Select Section</option>
                    {filteredSections.map((section) => (
                        <option key={section.id} value={section.id}>
                            {section.section_name}
                        </option>
                    ))}
                </SelectInput>

                <InputError message={errors.section_id} className="mt-2" />
            </div>

            <div className="mb-4">
                <InputLabel htmlFor="unit_id" value="Unit" />
                <SelectInput
                    id="unit_id"
                    name="unit_id"
                    value={data.unit_id}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("unit_id", e.target.value)}
                >
                    <option value="">Select Unit</option>

                    {units &&
                        units.map((unit) => (
                            <option key={unit.id} value={unit.id}>
                                {unit.unit_name}
                            </option>
                        ))}
                </SelectInput>
                <InputError message={errors.section_id} className="mt-2" />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
                <Link
                    href={route("employee.index")}
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
