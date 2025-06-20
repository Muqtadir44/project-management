import { BreadCrumb } from '@/Components/BreadCrumb';
import PageHeading from '@/Components/PageHeading';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import {
    CalendarCheck,
    ClipboardList,
    Flag,
    UserCheck,
    Edit2,
    Trash2,
    MessageSquareText,
} from 'lucide-react';

export default function Show({ task }) {
    const {
        name,
        description,
        image_path,
        status,
        priority,
        due_date,
        assignedUserId,
        created_by,
        updated_by,
        project,
    } = task;

    return (
        <AuthenticatedLayout
            header={<PageHeading title="Task Details" backBtn={true} backRoute="tasks.index" />}
        >
            <Head title="Task Details" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <BreadCrumb>
                        <li>
                            <Link
                                href={route('tasks.index')}
                                className="text-blue-600 hover:underline dark:text-blue-400"
                            >
                                Tasks
                            </Link>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="text-gray-600 dark:text-gray-300">Task Details</li>
                    </BreadCrumb>

                    <div className="grid grid-cols-1 gap-8 mt-10 md:grid-cols-3">
                        {/* Task Overview */}
                        <div className="overflow-hidden bg-white border border-gray-100 shadow-xl md:col-span-2 dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                            <img
                                src={image_path}
                                alt={name}
                                className="object-cover w-full h-72"
                            />
                            <div className="p-8 space-y-5">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{name}</h2>
                                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                                    {description}
                                </p>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <span
                                        className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide shadow-sm ${
                                            status === 'completed'
                                                ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : status === 'in_progress'
                                                ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                        }`}
                                    >
                                        <ClipboardList className="w-4 h-4 mr-2" />
                                        {status.replace('_', ' ')}
                                    </span>
                                    <span
                                        className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide shadow-sm ${
                                            priority === 'high'
                                                ? 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                : priority === 'medium'
                                                ? 'bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                                                : 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                        }`}
                                    >
                                        <Flag className="w-4 h-4 mr-2" />
                                        {priority}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Info Panel */}
                        <div className="space-y-6">
                            <div className="p-6 bg-white border border-gray-100 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                                <div className="flex items-center gap-3 mb-3 text-gray-600 dark:text-gray-300">
                                    <CalendarCheck className="w-5 h-5" />
                                    <h3 className="text-base font-semibold">Due Date</h3>
                                </div>
                                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{due_date}</p>
                            </div>

                            <div className="p-6 bg-white border border-gray-100 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                                <div className="flex items-center gap-3 mb-3 text-gray-600 dark:text-gray-300">
                                    <UserCheck className="w-5 h-5" />
                                    <h3 className="text-base font-semibold">Assigned To</h3>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={assignedUserId.picture}
                                        className="object-cover w-12 h-12 border rounded-full"
                                        alt={assignedUserId.name}
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{assignedUserId.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{assignedUserId.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-white border border-gray-100 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                                <h3 className="mb-3 text-base font-semibold text-gray-700 dark:text-gray-300">Project</h3>
                                <Link
                                    href={route('projects.show', project.id)}
                                    className="block p-4 transition border border-gray-100 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 dark:border-gray-700"
                                >
                                    <h4 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">{project.name}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {project.description.slice(0, 80)}...
                                    </p>
                                    <p className="mt-2 text-xs text-gray-400">Due: {project.due_date}</p>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    {/* <div className="flex flex-wrap items-center justify-between gap-4 mt-12">
                        <div className="flex gap-3">
                            <Link
                                href={route('tasks.edit', task.id)}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700"
                            >
                                <Edit2 className="w-4 h-4 mr-2" /> Edit Task
                            </Link>

                            <button
                                onClick={() => {
                                    if (confirm('Are you sure you want to delete this task?')) {
                                        router.delete(route('tasks.destroy', task.id));
                                    }
                                }}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition bg-red-600 rounded-lg shadow hover:bg-red-700"
                            >
                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </button>
                        </div>
                    </div> */}

                    {/* Activity Info */}
                    <div className="grid gap-6 mt-10 md:grid-cols-2">
                        <div className="p-6 bg-white border border-gray-100 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                            <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Created By</h3>
                            <div className="flex items-center gap-4">
                                <img
                                    src={created_by.picture}
                                    className="object-cover w-12 h-12 border rounded-full"
                                    alt={created_by.name}
                                />
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{created_by.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{created_by.email}</p>
                                    <p className="mt-1 text-xs text-gray-400">on {task.created_at}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white border border-gray-100 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                            <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Last Updated By</h3>
                            <div className="flex items-center gap-4">
                                <img
                                    src={updated_by.picture}
                                    className="object-cover w-12 h-12 border rounded-full"
                                    alt={updated_by.name}
                                />
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{updated_by.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{updated_by.email}</p>
                                    <p className="mt-1 text-xs text-gray-400">on {task.updated_at ?? updated_by.created_at}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comments Placeholder */}
                    <div className="p-6 mt-12 bg-white border border-gray-100 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-4">
                            <MessageSquareText className="w-5 h-5 text-blue-500" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Comments</h3>
                        </div>
                        <p className="text-sm italic text-gray-600 dark:text-gray-400">
                            Comments functionality coming soon...
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
