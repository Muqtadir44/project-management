import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ users, queryParams = null }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        console.log(name, value);
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        console.log(queryParams);
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
        console.log(queryParams);
        router.get(route('users.index'), queryParams);

    }

    const emps = [
        {
            id: 1,
            name: 'Lindsay Walton',
            email: 'lindsay.walton@example.com',
            title: 'Front-end Developer',
            department: 'Optimization',
            status: 'Active',
            role: 'Member',
            imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        {
            id: 2,
            name: 'Courtney Henry',
            email: 'courtney.henry@example.com',
            title: 'Designer',
            department: 'Intranet',
            status: 'Active',
            role: 'Admin',
            imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Users
                    </h2>
                    <Link className="flex items-center justify-between px-3 py-1 font-bold text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600" href={route('users.create')}>
                        New User &nbsp; <PlusCircleIcon className="w-4" />
                    </Link>
                </div>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="pb-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto border border-gray-200 shadow-sm dark:border-gray-700">
                                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase border-b bg-gray-50 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                                        <tr className="whitespace-nowrap">
                                            <TableHeading name="id" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>ID</TableHeading>
                                            <TableHeading name="name" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>Name</TableHeading>
                                            <TableHeading name="email" sortable={false}>Email</TableHeading>
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
                                            <th className="px-4 py-2"></th>
                                            <th className="px-4 py-2"></th>
                                            <th className="px-4 py-2"></th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {users.data.map((user) => (
                                            <tr key={user.id} className="transition hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-4 py-4 text-sm">{user.id}</td>
                                                <td className="px-4 py-4 font-medium text-gray-900 dark:text-white hover:underline">
                                                    <Link href={route('users.show', user.id)}>
                                                        {user.name}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-nowrap">{user.email}</td>
                                                <td className="px-4 py-4 text-sm">{user.created_at}</td>
                                                <td className="px-4 py-4 space-x-2 text-sm">
                                                    <Link href={route('users.edit', user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                                    <Link href={route('users.destroy', user.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</Link>
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
            </div>
        </AuthenticatedLayout>
    )
}
