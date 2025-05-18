import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/Constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import { BreadCrumb } from "@/Components/BreadCrumb";
import PageHeading from "@/Components/PageHeading";
import { DeleteModal } from "@/Components/DeleteModal";
import { useState,useEffect } from 'react';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';



export default function Index({ projects, queryParams = null }) {

    const flash = usePage().props.flash || {};

    useEffect(() => {
        if (flash.success) {
            toastr.success(flash.success);
        }

        if (flash.err) {
            toastr.error(flash.err);
        }
    }, [flash]);
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

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const deleteProject = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    }

    return (
        <AuthenticatedLayout
            header={
                <PageHeading title={'Projects'} btnTitle={'New Project'} addBtn={true} addRoute={'projects.create'} />
            }
        >
            <Head title="Projects" />


            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <BreadCrumb>
                        <li className="text-gray-500 dark:text-gray-400">
                            Projects
                        </li>
                    </BreadCrumb>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="pb-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto border border-gray-200 shadow-sm dark:border-gray-700">
                                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    {/* Table Header */}
                                    <thead className="text-xs text-gray-700 uppercase border-b bg-gray-50 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                                        <tr className="whitespace-nowrap">
                                            <TableHeading name="id" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>ID</TableHeading>
                                            <TableHeading name="Image_path" sortable={false}>Image</TableHeading>
                                            <TableHeading name="name" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>Name</TableHeading>
                                            <TableHeading name="status" sortable={false}>Status</TableHeading>
                                            <TableHeading name="created_at" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>Create Date</TableHeading>
                                            <TableHeading name="due_date" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>Due Date</TableHeading>
                                            <TableHeading name="created_by" sortable={false}>Created By</TableHeading>
                                            <TableHeading name="action" sortable={false}>Actions</TableHeading>
                                        </tr>
                                    </thead>

                                    {/* Filter Row */}
                                    <thead className="text-xs border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                        <tr className="whitespace-nowrap">
                                            <th className="px-4 py-2"></th>
                                            <th className="px-4 py-2"></th>
                                            <th className="px-4 py-2">
                                                <TextInput
                                                    defaultValue={queryParams.name || ''}
                                                    className="w-full"
                                                    placeholder="Project Name"
                                                    onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="px-4 py-2">
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
                                            <th className="px-4 py-2"></th>
                                            <th className="px-4 py-2"></th>
                                            <th className="px-4 py-2"></th>
                                            <th className="px-4 py-2"></th>
                                        </tr>
                                    </thead>

                                    {/* Table Body */}
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {projects.data.map((project) => (
                                            <tr key={project.id} className="transition hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-4 py-4">{project.id}</td>
                                                <td className="px-4 py-4">
                                                    <img src={project.image_path} alt={project.name} className="object-cover w-12 h-12 rounded" />
                                                </td>
                                                <td className="px-4 py-4 font-medium text-gray-900 dark:text-white hover:underline">
                                                    <Link href={route('projects.show', project.id)}>
                                                        {project.name}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className={`px-2 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-nowrap">{project.created_at}</td>
                                                <td className="px-4 py-4 text-nowrap">{project.due_date}</td>
                                                <td className="px-4 py-4">{project.created_by.name}</td>
                                                <td className="px-4 py-4 space-x-2">
                                                    <Link href={route('projects.edit', project.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                                    <p onClick={(e) => deleteProject(project.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination links={projects.meta.links} />
                        </div>

                    </div>
                </div>
                <DeleteModal
                    show={showDeleteModal}
                    deleteId={deleteId}
                    deleteRoute={'projects.destroy'}
                    onClose={() => setShowDeleteModal(false)}
                />
            </div>

        </AuthenticatedLayout>
    )
}
