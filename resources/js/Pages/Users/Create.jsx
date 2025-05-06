import { BreadCrumb } from '@/Components/BreadCrumb';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Add User
                </h2>
            }
        >
            <Head title="Add User" />

            <div className="py-12">

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <BreadCrumb>
                        <li>
                            <Link href={route('users.index')} className="text-blue-600 hover:underline dark:text-blue-400">
                                Users
                            </Link>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="text-gray-500 dark:text-gray-400">
                            Add
                        </li>
                    </BreadCrumb>


                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmit} className="space-y-6">
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

                                <div>
                                    <label className="block mb-1 text-sm font-medium">Email</label>
                                    <TextInput type={'email'} value={data.email} onChange={(e) => setData('email', e.target.value)} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"/>
                                    {/* <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                                    /> */}
                                    {errors.email && (
                                        <div className="text-sm text-red-500">{errors.email}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium">Password</label>
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

                                <div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                                        disabled={processing}
                                    >
                                        {processing ? 'Creating...' : 'Create User'}
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
