import { BreadCrumb } from '@/Components/BreadCrumb';
import PageHeading from '@/Components/PageHeading';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Mail, Briefcase, User, CalendarCheck } from 'lucide-react';

export default function Create({ user }) {
    return (
        <AuthenticatedLayout
            header={
                <PageHeading title={'User Details'} backBtn={true} backRoute={'users.index'} />
            }
        >
            <Head title="User Details" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <BreadCrumb>
                        <li>
                            <Link href={route('users.index')} className="text-blue-600 hover:underline dark:text-blue-400">
                                Users
                            </Link>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="text-gray-500 dark:text-gray-400">User Details</li>
                    </BreadCrumb>

                    <div className="overflow-hidden shadow-xl rounded-2xl bg-gradient-to-tr from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                        <div className="max-w-5xl p-10 mx-auto space-y-12 text-gray-900 dark:text-gray-100">

                            {/* Profile Card */}
                            <div className="relative flex items-center justify-between p-6 shadow-md bg-white/80 dark:bg-gray-800/70 rounded-2xl ring-1 ring-gray-200 dark:ring-gray-700">
                                <div className="flex items-center gap-6">
                                    <img
                                        src={user.picture}
                                        alt={user.name}
                                        className="object-cover border-4 border-white rounded-full shadow-lg w-28 h-28 dark:border-gray-700"
                                    />
                                    <div>
                                        <h2 className="text-3xl font-bold tracking-tight">{user.name}</h2>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{user.role?.role_name}</p>
                                        <span className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${user.status ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'}`}>
                                            {user.status ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <CalendarCheck className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="grid grid-cols-1 gap-8 p-8 shadow-inner md:grid-cols-2 bg-white/80 dark:bg-gray-800/70 rounded-2xl ring-1 ring-gray-200 dark:ring-gray-700">
                                <div className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 mt-1 text-blue-500" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                        <p className="text-base font-medium">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Briefcase className="w-6 h-6 mt-1 text-purple-500" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Designation</p>
                                        <p className="text-base font-medium">{user.designation?.designation_name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <User className="w-6 h-6 mt-1 text-teal-500" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                                        <p className="text-base font-medium">{user.role?.role_name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <CalendarCheck className="w-6 h-6 mt-1 text-orange-500" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Created At</p>
                                        <p className="text-base font-medium">{user.created_at}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
