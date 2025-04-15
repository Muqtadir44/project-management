import { BreadCrumb } from '@/Components/BreadCrumb';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function UserEdit({ user }) {


    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit User
                </h2>
            }
        >
            <Head title="Edit User" />

            <div className="py-12">

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <BreadCrumb>
                        <li>
                            <Link href={route('dashboard')} className="text-blue-600 hover:underline dark:text-blue-400">
                                Dashboard
                            </Link>
                            <span className="mx-2">/</span>
                        </li>
                        <li>
                            <Link href={route('users.index')} className="text-blue-600 hover:underline dark:text-blue-400">
                                Users
                            </Link>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="text-gray-500 dark:text-gray-400">
                            Edit
                        </li>
                    </BreadCrumb>


                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.name && (
                                        <div className="text-sm text-red-500">{errors.name}</div>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.email && (
                                        <div className="text-sm text-red-500">{errors.email}</div>
                                    )}
                                </div>

                                {/* Optional Password Change Section */}
                                <div className="pt-6 border-t border-gray-300 dark:border-gray-700">
                                    <h3 className="mb-2 font-semibold text-gray-700 text-md dark:text-gray-200">
                                        Change Password (optional)
                                    </h3>

                                    {/* Current Password */}
                                    <div className="mb-4">
                                        <label className="block mb-1 text-sm font-medium">Current Password</label>
                                        <input
                                            type="password"
                                            value={data.current_password}
                                            onChange={(e) => setData('current_password', e.target.value)}
                                            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.current_password && (
                                            <div className="text-sm text-red-500">{errors.current_password}</div>
                                        )}
                                    </div>

                                    {/* New Password */}
                                    <div className="mb-4">
                                        <label className="block mb-1 text-sm font-medium">New Password</label>
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.password && (
                                            <div className="text-sm text-red-500">{errors.password}</div>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="mb-4">
                                        <label className="block mb-1 text-sm font-medium">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.password_confirmation && (
                                            <div className="text-sm text-red-500">{errors.password_confirmation}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                                        disabled={processing}
                                    >
                                        {processing ? 'Updating...' : 'Update User'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
