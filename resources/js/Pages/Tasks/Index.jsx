import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TaskTable from "./TaskTable";
import { BreadCrumb } from "@/Components/BreadCrumb";
import PageHeading from "@/Components/PageHeading";

export default function Index({ tasks, queryParams = null }) {

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
                            <TaskTable tasks={tasks} queryParams={queryParams} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
