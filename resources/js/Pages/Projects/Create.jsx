import { BreadCrumb } from "@/Components/BreadCrumb";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PageHeading from "@/Components/PageHeading";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create() {
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        'name': '',
        'image': '',
        'description': '',
        'status': '',
        'due_date': '',
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // post(route('projects.store'), {
        //     onSuccess: () => reset(),
        // });
    }


    return (
        <AuthenticatedLayout
            header={
                <PageHeading title={'Create New Project'} backBtn={true} backRoute={'projects.index'} />
            }
        >
            <Head title="Create Project" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <BreadCrumb>
                        <li>
                            <Link href={route('projects.index')} className="text-blue-600 hover:underline dark:text-blue-400">
                                Projects
                            </Link>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="text-gray-500 dark:text-gray-400">
                            Create
                        </li>
                    </BreadCrumb>
                    <form onSubmit={onSubmit} className="space-y-10">

                        {/* Section: Basic Info */}
                        <section className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">Project Details</h2>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Project Name */}
                                <div>
                                    <InputLabel htmlFor="project_name" value="Project Name" />
                                    <TextInput
                                        type="text"
                                        name="name"
                                        id="project_name"
                                        isFocused={true}
                                        className="block w-full mt-1 dark:bg-gray-700 dark:text-white"
                                        onChange={(e) => setData('name', e.target.value)}
                                        value={data.name}
                                    />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                {/* Project Status */}
                                <div>
                                    <InputLabel htmlFor="project_status" value="Project Status" />
                                    <SelectInput
                                        name="status"
                                        id="project_status"
                                        className="block w-full mt-1 dark:bg-gray-700 dark:text-white"
                                        onChange={(e) => setData('status', e.target.value)}
                                        value={data.status}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError className="mt-2" message={errors.status} />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-6">
                                <InputLabel htmlFor="project_description" value="Project Description" />
                                <TextAreaInput
                                    name="description"
                                    id="project_description"
                                    rows={4}
                                    className="block w-full mt-1 dark:bg-gray-700 dark:text-white"
                                    onChange={(e) => setData('description', e.target.value)}
                                    value={data.description}
                                />
                                <InputError className="mt-2" message={errors.description} />
                            </div>
                        </section>

                        {/* Section: Media & Schedule */}
                        <section className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">Media & Deadline</h2>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Project Image */}
                                <div>
                                    <InputLabel htmlFor="project_image_path" value="Project Image" />
                                    <div className="flex flex-col items-start gap-3 mt-1 sm:flex-row sm:items-center">
                                        <label
                                            htmlFor="project_image_path"
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded shadow cursor-pointer hover:bg-blue-700"
                                        >
                                            Upload Image
                                        </label>
                                        <input
                                            id="project_image_path"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                        {imagePreview && (
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="object-cover w-24 h-24 transition-all border rounded shadow-md"
                                            />
                                        )}
                                    </div>
                                    <InputError className="mt-2" message={errors.image} />
                                </div>

                                {/* Due Date */}
                                <div>
                                    <InputLabel htmlFor="project_due_date" value="Project Deadline" />
                                    <TextInput
                                        type="date"
                                        name="due_date"
                                        id="project_due_date"
                                        className="block w-full mt-1 dark:bg-gray-700 dark:text-white"
                                        onChange={(e) => setData('due_date', e.target.value)}
                                        value={data.due_date}
                                    />
                                    <InputError className="mt-2" message={errors.due_date} />
                                </div>

                            </div>
                        </section>

                        {/* Sticky Submit Bar */}
                        <div className="sticky bottom-0 left-0 z-10 flex justify-end w-full gap-4 px-6 py-4 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                            <Link
                                href={route('projects.index')}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 text-sm font-medium text-white rounded-md shadow bg-emerald-500 hover:bg-emerald-600"
                            >
                                {processing ? "Saving..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
