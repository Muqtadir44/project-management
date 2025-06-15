import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import TaskTable from "./TaskTable";
import { BreadCrumb } from "@/Components/BreadCrumb";
import PageHeading from "@/Components/PageHeading";
import { useState, useEffect } from 'react';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';
import { DeleteModal } from "@/Components/DeleteModal";

export default function Index({ tasks, queryParams = null }) {

    const flash = usePage().props.flash || {};

    useEffect(() => {
        if (flash.success) {
            toastr.success(flash.success);
        }

        if (flash.err) {
            toastr.error(flash.err);
        }
    }, [flash]);


    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const deleteTask = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    }

    return (
        <AuthenticatedLayout
            header={
                <PageHeading title={'Tasks'} btnTitle={'New Task'} addBtn={true} addRoute={'tasks.create'} />
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <BreadCrumb>
                        <li className="text-gray-500 dark:text-gray-400">
                            Tasks
                        </li>
                    </BreadCrumb>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="pb-6 text-gray-900 dark:text-gray-100">
                            <TaskTable tasks={tasks} queryParams={queryParams} deleteTask={deleteTask} />
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
