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
            <Head title="Add Projects" />

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
                            Add
                        </li>
                    </BreadCrumb>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">

                        <form onSubmit={onSubmit} className="p-6 space-y-8 bg-white shadow sm:p-10 dark:bg-gray-800 sm:rounded-lg">

                            {/* Top row: Image and Deadline */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Project Image Upload */}
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
                                                className="object-cover w-24 h-24 transition-all duration-300 border rounded shadow"
                                            />
                                        )}
                                    </div>
                                    <InputError className="mt-2" message={errors.image} />
                                </div>

                                {/* Project Deadline */}
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

                            {/* Project Description */}
                            <div>
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

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                                <Link
                                    href={route('projects.index')}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="px-6 py-2 text-sm font-medium text-white rounded-md shadow-sm bg-emerald-500 hover:bg-emerald-600"
                                    disabled={processing}
                                >
                                    {processing ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>




                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
