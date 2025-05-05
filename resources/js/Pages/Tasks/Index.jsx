import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/Constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TaskTable from "./TaskTable";


export default function Index({ tasks, queryParams = null }) {

    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        console.log(name, value);
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        console.log(queryParams);
        router.get(route('tasks.index'), queryParams);
    }

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value);
    }


    const sortChanged = (name) => {
        if (name === queryParams.sortField) {
            if (queryParams.sortOrder === 'asc') {
                queryParams.sortOrder = 'desc';
            } else {
                queryParams.sortOrder = 'asc';
            }
        } else {
            queryParams.sortField = name;
            queryParams.sortOrder = 'asc';
        }
        console.log(queryParams);
        router.get(route('tasks.index'), queryParams);

    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Tasks
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TaskTable tasks={tasks} queryParams={queryParams} sortChanged={sortChanged}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
