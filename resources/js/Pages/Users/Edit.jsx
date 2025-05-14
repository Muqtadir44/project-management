import { BreadCrumb } from '@/Components/BreadCrumb';
import PageHeading from '@/Components/PageHeading';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ user, roles, designations }) {
    // console.log(roles);
    // console.log(designations);


    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
        status: String(user.status ?? ''),
        role: user.role_id || '',
        designation: user.designation_id || '',
        picture: ''
    });
    // console.log(data);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('after submit',data);

        put(route('users.update',user.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <PageHeading title={'Edit User'} backBtn={true} backRoute={'users.index'} />
            }
        >
            <Head title="Edit User" />

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
                            Edit
                        </li>
                    </BreadCrumb>


                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="max-w-5xl p-8 mx-auto text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">

                                {/* Name */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Name</label>
                                    <input
                                        type="text"
                                        value={user.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.name && <div className="mt-1 text-sm text-red-500">{errors.name}</div>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Email</label>
                                    <TextInput
                                        type="email"
                                        value={user.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.email && <div className="mt-1 text-sm text-red-500">{errors.email}</div>}
                                </div>


                                {/* Status */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Status</label>
                                    <SelectInput
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full px-3 py-2"
                                    >
                                        <option value="">Select Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </SelectInput>
                                    {errors.status && <div className="mt-1 text-sm text-red-500">{errors.status}</div>}
                                </div>

                                {/* Role */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Role</label>
                                    <SelectInput
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                        className="w-full px-3 py-2"
                                    >
                                        <option value="">Select Role</option>
                                        {roles.map(role => (
                                            <option key={role.id} value={role.id}>
                                                {role.role_name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    {errors.role && <div className="mt-1 text-sm text-red-500">{errors.role}</div>}
                                </div>

                                {/* Designation */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Designation</label>
                                    <SelectInput
                                        value={data.designation}
                                        onChange={(e) => setData('designation', e.target.value)}
                                        className="w-full px-3 py-2"
                                    >
                                        <option value="">Select Designation</option>
                                        {designations.map(designation => (
                                            <option key={designation.id} value={designation.id}>
                                                {designation.designation_name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    {errors.designation && <div className="mt-1 text-sm text-red-500">{errors.designation}</div>}
                                </div>


                                {/* Profile Picture Upload */}
                                   <div className="md:col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Profile Picture</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setData('picture', e.target.files[0])}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300 dark:hover:file:bg-blue-800"
                                    />
                                    {errors.picture && <div className="mt-1 text-sm text-red-500">{errors.picture}</div>}
                                </div>

                                {/* Current Profile Picture */}
                                {user.picture && (
                                    <div className="md:col-span-2">
                                        <label className="block mb-1 text-sm font-medium">Current Picture</label>
                                        <img
                                            src={`/storage/${user.picture}`}
                                            alt="Profile"
                                            className="object-cover w-32 h-32 border border-gray-300 rounded dark:border-gray-700"
                                        />
                                    </div>
                                )}


                                {/* Password Section */}
                                <div className="pt-6 border-t border-gray-300 md:col-span-2 dark:border-gray-700">
                                    <h2 className="mb-2 text-lg font-semibold">Change Password</h2>

                                    {/* New Password */}
                                    <div className="mb-4">
                                        <label className="block mb-1 text-sm font-medium">New Password</label>
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors.password && <div className="mt-1 text-sm text-red-500">{errors.password}</div>}
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label className="block mb-1 text-sm font-medium">Confirm Password</label>
                                        <input
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors.password_confirmation && (
                                            <div className="mt-1 text-sm text-red-500">{errors.password_confirmation}</div>
                                        )}
                                    </div>
                                </div>


                                {/* Submit Button */}
                                <div className="pt-4 md:col-span-2">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full px-4 py-2 text-white bg-blue-600 rounded shadow-md hover:bg-blue-700 disabled:opacity-50"
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
