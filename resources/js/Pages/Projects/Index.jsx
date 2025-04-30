import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/Constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid'
import TableHeading from "@/Components/TableHeading";

export default function Index({ projects, queryParams = null }) {

    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        console.log(name, value);
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        console.log(queryParams);
        router.get(route('projects.index'), queryParams);
    }

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value);
    }


    const sortChanged = (name) => {
        if (name === queryParams.sortField) {
            if (queryParams.sortOrder === 'asc') {
                queryParams.sortOrder = 'desc';
            } else {
                queryParams.sortOrder = 'asc';
            }
        } else {
            queryParams.sortField = name;
            queryParams.sortOrder = 'asc';
        }
        console.log(queryParams);
        router.get(route('projects.index'), queryParams);

    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase border border-b-2 border-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="text-nowrap">
                                            <TableHeading name="id" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>ID</TableHeading>
                                            <TableHeading name="Image_path" sortable={false}>Image</TableHeading>
                                            <TableHeading name="name" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>Name</TableHeading>
                                            <TableHeading name="status" sortable={false}>status</TableHeading>

                                            <TableHeading name="created_at" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>Create Date</TableHeading>

                                            <TableHeading name="due_date" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>Due Date</TableHeading>

                                            <TableHeading name="created_by" sortable={false}>Created By</TableHeading>
                                            <TableHeading name="action" sortable={false}>Actions</TableHeading>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase border border-b-2 border-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="text-nowrap">
                                            <th className="py-1"></th>
                                            <th className="py-1"></th>
                                            <th className="py-1">
                                                <TextInput
                                                    defaultValue={queryParams.name || ''}
                                                    className="w-full"
                                                    placeholder="Project Name"
                                                    onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="py-1">
                                                <SelectInput
                                                    defaultValue={queryParams.status || ''}
                                                    className="w-full"
                                                    onChange={(e) => searchFieldChanged('status', e.target.value)}
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="in_progress">In Progress</option>
                                                </SelectInput>
                                            </th>
                                            <th className="py-1"></th>
                                            <th className="py-1"></th>
                                            <th className="py-1"></th>
                                            <th className="py-1"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.map((project) => {
                                            return (
                                                <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td className="px-3 py-3">{project.id}</td>
                                                    <td className="px-3 py-3">
                                                        <img src={project.image_path} alt="" style={{ width: 60 }} />
                                                    </td>
                                                    <td className="px-3 py-3">{project.name}</td>
                                                    <td className="px-3 py-3">
                                                        <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-3 text-nowrap">{project.created_at}</td>
                                                    <td className="px-3 py-3 text-nowrap">{project.due_date}</td>
                                                    <td className="px-3 py-3">{project.created_by.name}</td>
                                                    <td className="px-3 py-3">
                                                        <Link href={route('projects.edit', project.id)} className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                                        <Link href={route('projects.destroy', project.id)} className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline">Delete</Link>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
