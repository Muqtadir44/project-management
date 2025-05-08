import { BreadCrumb } from "@/Components/BreadCrumb";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PageHeading from "@/Components/PageHeading";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create() {

    const {data,setData,post,processing,errors,reset} = useForm({
        'name': '',
        'image': '',
        'description': '',
        'status': '',
        'due_date': '',
    })


    const onSubmit = (e)=>{
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

                            <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                <div>
                                    <InputLabel htmlFor="project_image_path" value="Project Image" />
                                    <TextInput
                                        type="file"
                                        name="image"
                                        id="project_image_path"
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                        value={data.image}
                                        />
                                        <InputError className="mt-2" message={errors.image} />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="project_name" value="Project Name" />
                                    <TextInput
                                        type="text"
                                        name="name"
                                        id="project_name"
                                        isFocused={true}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white"
                                        onChange={(e) => setData('name', e.target.value)}
                                        value={data.name}
                                        />
                                        <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="project_description" value="Project Description" />
                                    <TextAreaInput
                                        name="description"
                                        id="project_description"
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white"
                                        onChange={(e) => setData('description', e.target.value)}
                                        value={data.description}
                                        />
                                        <InputError className="mt-2" message={errors.description} />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="project_status" value="Project Status" />
                                    <SelectInput name="status" id="project_status" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white" onChange={(e) => setData('status', e.target.value)} value={data.status}>
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError className="mt-2" message={errors.status} />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="project_due_date" value="Project Deadline" />
                                    <TextInput
                                        type="date"
                                        name="due_date"
                                        id="project_due_date"
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white"
                                        onChange={(e) => setData('due_date', e.target.value)}
                                        value={data.due_date}
                                        />
                                        <InputError className="mt-2" message={errors.due_date} />
                                </div>

                                <div className="mt-4 text-right">
                                    <Link href={route('projects.index')} className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">Cancel</Link>
                                    <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Submit</button>
                                </div>

                            </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
