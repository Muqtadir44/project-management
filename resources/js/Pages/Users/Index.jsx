import { BreadCrumb } from "@/Components/BreadCrumb";
import { DeleteModal } from "@/Components/DeleteModal";
import PageHeading from "@/Components/PageHeading";
import Pagination from "@/Components/Pagination";
import StatusBadge from "@/Components/StatusBadge";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

export default function Index({ users, queryParams = null }) {

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

        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('users.index'), queryParams);
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
        router.get(route('users.index'), queryParams);
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
                <PageHeading title={'Users'} btnTitle={'New User'} addBtn={true} addRoute={'users.create'} />
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <BreadCrumb>
                        <li className="text-gray-500 dark:text-gray-400">
                            Users
                        </li>
                    </BreadCrumb>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="pb-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto border border-gray-200 shadow-sm dark:border-gray-700">
                                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase border-b bg-gray-50 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                                        <tr className="whitespace-nowrap">
                                            <TableHeading name="id" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>ID</TableHeading>
                                            <TableHeading name="name" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>Name</TableHeading>
                                            <TableHeading name="email" sortable={false}>Email</TableHeading>
                                            <TableHeading name="status" sortable={false}>Status</TableHeading>
                                            <TableHeading name="role" sortable={false}>Role</TableHeading>
                                            <TableHeading name="designation" sortable={false}>Designation</TableHeading>
                                            <TableHeading name="created_at" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>Create Date</TableHeading>
                                            <TableHeading name="action" sortable={false}>Actions</TableHeading>
                                        </tr>
                                    </thead>

                                    {/* Filter Row */}
                                    <thead className="text-xs border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                        <tr className="whitespace-nowrap">
                                            <th className="px-4 py-2"></th>
                                            <th className="px-4 py-2">
                                                <TextInput
                                                    defaultValue={queryParams.name || ''}
                                                    className="w-full"
                                                    placeholder="Name"
                                                    onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="px-4 py-2">
                                                <TextInput
                                                    defaultValue={queryParams.email || ''}
                                                    className="w-full"
                                                    placeholder="Email"
                                                    onBlur={(e) => searchFieldChanged('email', e.target.value)}
                                                    onKeyPress={e => onKeyPress('email', e)}
                                                />
                                            </th>
                                            <th className="px-4 py-2"></th>
                                            <th className="px-4 py-2"></th>
                                            <th className="px-4 py-2"></th>
                                            <th className="px-4 py-2"></th>
                                            <th className="px-4 py-2"></th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {users.data.map((user) => (
                                            <tr key={user.id} className="transition hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-4 py-4 text-sm">{user.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            className="object-cover w-10 h-10 rounded-full"
                                                            src={user.picture}
                                                            alt={user.name}
                                                        />
                                                        <div>
                                                            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-nowrap">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <StatusBadge status={user.status} />
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    {user.role.role_name}
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {user.title || user.designation?.designation_name || '—'}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm">{user.created_at}</td>
                                                <td className="px-4 py-4 space-x-2 text-sm">
                                                    <Link href={route('users.edit', user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                                    <p onClick={(e) => deleteProject(user.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>

                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
                <DeleteModal
                    show={showDeleteModal}
                    deleteId={deleteId}
                    deleteRoute={'users.destroy'}
                    onClose={() => setShowDeleteModal(false)}
                />
            </div>
        </AuthenticatedLayout>
    )
}
