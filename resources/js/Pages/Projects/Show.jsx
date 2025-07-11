import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/Constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TaskTable from "../Tasks/TaskTable";
import { BreadCrumb } from "@/Components/BreadCrumb";
import PageHeading from "@/Components/PageHeading";
import { DeleteModal } from "@/Components/DeleteModal";
import { useState } from "react";

export default function Show({ auth, project, tasks, queryParams }) {
    queryParams = queryParams || {};

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const deleteTask = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <PageHeading title={`Project - ${project.name} `} backBtn={true} backRoute={'projects.index'} />
            }
        >
            <Head title={`Project - ${project.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <BreadCrumb>
                        <li>
                            <Link href={route('projects.index')} className="text-blue-600 hover:underline dark:text-blue-400">
                                Projects
                            </Link>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="text-gray-500 dark:text-gray-400">
                            Show
                        </li>
                    </BreadCrumb>
                    <div className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        {/* Project Image */}
                        <img
                            src={project.image_path}
                            alt="Project Image"
                            className="object-cover w-full rounded-t-lg h-72 sm:h-96"
                        />

                        {/* Project Details */}
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="mb-4 text-2xl font-semibold">{project.name}

                                <span className="float-right text-sm font-normal text-gray-500 dark:text-gray-400">
                                    {` (${project.created_at})`}
                                </span>

                            </h2>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Project ID
                                    </label>
                                    <p className="mt-1 text-lg font-medium">{project.id}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Project Status
                                    </label>
                                    <p className="mt-1">
                                        <span
                                            className={
                                                "inline-block px-3 py-1 text-sm font-semibold rounded-full text-white " +
                                                PROJECT_STATUS_CLASS_MAP[project.status]
                                            }
                                        >
                                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Project Owner
                                    </label>
                                    <p className="mt-1 text-lg font-medium">{project.created_by.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Due Date
                                    </label>
                                    <p className="mt-1 text-lg font-medium">{project.due_date}</p>
                                </div>
                            </div>


                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Project Description
                                </label>
                                <p className="mt-1 text-lg font-medium">{project.description}</p>
                            </div>

                            {/* More fields can be added here */}
                        </div>
                    </div>
                </div>
            </div>


            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="text-gray-900 dark:text-gray-100">
                            <TaskTable tasks={tasks} queryParams={queryParams} showProject={false} project={project.id} deleteTask={deleteTask} />
                        </div>
                    </div>
                </div>
                <DeleteModal
                    show={showDeleteModal}
                    deleteId={deleteId}
                    deleteRoute={'tasks.destroy'}
                    onClose={() => setShowDeleteModal(false)}
                />
            </div>
        </AuthenticatedLayout>
    )
}
