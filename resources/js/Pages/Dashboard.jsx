import TableHeading from "@/Components/TableHeading";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
    auth,
    totalPendingTasks,
    myPendingTasks,
    totalProgressTasks,
    myProgressTasks,
    totalCompletedTasks,
    myCompletedTasks,
    activeTasks,
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">

                <div className="grid grid-cols-3 gap-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-2xl font-semibold text-amber-500">
                                Pending Tasks
                            </h3>
                            <p className="mt-4 text-xl">
                                <span className="mr-2">{myPendingTasks}</span>/
                                <span className="ml-2">{totalPendingTasks}</span>
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-2xl font-semibold text-blue-500">
                                In Progress Tasks
                            </h3>
                            <p className="mt-4 text-xl">
                                <span className="mr-2">{myProgressTasks}</span>/
                                <span className="ml-2">{totalProgressTasks}</span>
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-2xl font-semibold text-green-500">
                                Completed Tasks
                            </h3>
                            <p className="mt-4 text-xl">
                                <span className="mr-2">{myCompletedTasks}</span>/
                                <span className="ml-2">{totalCompletedTasks}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-4 max-w-7xl sm:px-6 lg:px-8">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                        My Active Tasks
                    </h3>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="pb-6 text-gray-900 dark:text-gray-100">
                            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                {/* Table Header */}
                                <thead className="text-xs text-gray-700 uppercase border-b bg-gray-50 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                                    <tr className="whitespace-nowrap">
                                        <TableHeading name="id" sortable={false} >ID</TableHeading>
                                        <TableHeading name="Image_path" sortable={false}>Image</TableHeading>
                                        <TableHeading name="project_id" sortable={false}>Project</TableHeading>
                                        <TableHeading name="name" sortable={false} >Name</TableHeading>
                                        <TableHeading name="status" sortable={false}>Status</TableHeading>
                                        <TableHeading name="priority" sortable={false}>Priority</TableHeading>
                                        <TableHeading name="created_at" sortable={false} >Create Date</TableHeading>
                                        <TableHeading name="due_date" sortable={false} >Due Date</TableHeading>
                                        <TableHeading name="created_by" sortable={false}>Created By</TableHeading>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    {activeTasks.data.map((task) => (
                                        <tr key={task.id} className="transition hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-4 py-4">{task.id}</td>
                                            <td className="px-4 py-4">
                                                <img src={task.image_path} alt={task.name} className="object-cover w-12 h-12 rounded" />
                                            </td>
                                            <td className="px-4 py-4">{task.project?.name}</td>
                                            <td className="px-4 py-4 font-medium text-gray-900 dark:text-white hover:underline">
                                                <Link href={route('tasks.show', task.id)}>
                                                    {task.name}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`px-2 py-1 rounded text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}>
                                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`px-2 py-1 rounded text-white ${TASK_PRIORITY_CLASS_MAP[task.priority]}`}>
                                                    {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-nowrap">{task.created_at}</td>
                                            <td className="px-4 py-4 text-nowrap">{task.due_date}</td>
                                            <td className="px-4 py-4">{task.created_by.name}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
