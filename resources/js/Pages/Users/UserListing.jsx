import { BreadCrumb } from '@/Components/BreadCrumb';
import DangerButton from '@/Components/DangerButton';
import { DeleteModal } from '@/Components/DeleteModal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function UserListing({ users }) {

    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);


    const confirmUserDeletion = (userId) => {
        setConfirmingUserDeletion(true);
        setSelectedUserId(userId);
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        setSelectedUserId(null);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        if(selectedUserId){
            router.delete(route('users.destroy', selectedUserId), {
                onSuccess: () => closeModal(),
            });
        }
    };


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <BreadCrumb>
                        <li>
                            <Link href={route('dashboard')} className="text-blue-600 hover:underline dark:text-blue-400">
                                Dashboard
                            </Link>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="text-gray-500 dark:text-gray-400">
                            Users
                        </li>
                    </BreadCrumb>

                    {/* Listing Card */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-lg font-medium">User Listing</span>
                                <Link
                                    href={route('users.create')}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-800"
                                >
                                    Add User
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left">
                                    <thead className="border-b dark:border-gray-700">
                                        <tr>
                                            <th className="px-4 py-2">ID</th>
                                            <th className="px-4 py-2">Name</th>
                                            <th className="px-4 py-2">Email</th>
                                            <th className="px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user.id} className="border-b dark:border-gray-700">
                                                <td className="px-4 py-2">{user.id}</td>
                                                <td className="px-4 py-2">{user.name}</td>
                                                <td className="px-4 py-2">{user.email}</td>
                                                <td className="px-4 py-2">
                                                    <Link
                                                        href={route('users.edit', user.id)}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <p onClick={() =>confirmUserDeletion(user.id)}>
                                                        Delete
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <DeleteModal
                show={confirmingUserDeletion}
                onClose={closeModal}
                onConfirm={deleteUser}
            />
        </AuthenticatedLayout>
    );
}
