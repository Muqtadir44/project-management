import Pagination from "@/Components/Pagination"
import SelectInput from "@/Components/SelectInput"
import TableHeading from "@/Components/TableHeading"
import TextInput from "@/Components/TextInput"
import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/Constants"
import { Link, router } from "@inertiajs/react";

export default function TaskTable({ tasks, queryParams = null, showProject = true,project = 0 }) {
    console.log(tasks);

    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        console.log(name, value);
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        console.log(queryParams);
        if(showProject){
            router.get(route('tasks.index'), queryParams);
        }else{
            router.get(route('projects.show',project), queryParams);
        }
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
        if(showProject){
            router.get(route('tasks.index'), queryParams);
        }else{
            router.get(route('projects.show',project), queryParams);
        }

    }


    return (
        <>
            <div className="pb-6 text-gray-900 dark:text-gray-100">
                <div className="overflow-auto border border-gray-200 shadow-sm dark:border-gray-700">
                    <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        {/* Table Header */}
                        <thead className="text-xs text-gray-700 uppercase border-b bg-gray-50 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                            <tr className="whitespace-nowrap">
                                <TableHeading name="id" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>ID</TableHeading>
                                <TableHeading name="Image_path" sortable={false}>Image</TableHeading>
                                {showProject && <TableHeading name="project_id" sortable={false}>Project</TableHeading>}
                                <TableHeading name="name" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>Name</TableHeading>
                                <TableHeading name="status" sortable={false}>Status</TableHeading>
                                <TableHeading name="priority" sortable={false}>Priority</TableHeading>
                                <TableHeading name="created_at" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>Create Date</TableHeading>
                                <TableHeading name="due_date" sortField={queryParams.sortField} sortOrder={queryParams.sortOrder} sortChanged={sortChanged}>Due Date</TableHeading>
                                <TableHeading name="created_by" sortable={false}>Created By</TableHeading>
                                <TableHeading name="action" sortable={false}>Actions</TableHeading>
                            </tr>
                        </thead>

                        {/* Filter Row */}
                        <thead className="text-xs border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <tr className="whitespace-nowrap">
                                <th className="px-4 py-2"></th>
                                <th className="px-4 py-2"></th>
                                {showProject && <th className="px-4 py-2"></th>}
                                <th className="px-4 py-2">
                                    <TextInput
                                        defaultValue={queryParams.name || ''}
                                        className="w-full"
                                        placeholder="Task Name"
                                        onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                        onKeyPress={e => onKeyPress('name', e)}
                                    />
                                </th>
                                <th className="px-4 py-2">
                                    <SelectInput
                                        defaultValue={queryParams.status || ''}
                                        className="w-full"
                                        onChange={(e) => searchFieldChanged('status', e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                        <option value="in_progress">In Progress</option>
                                    </SelectInput>
                                </th>
                                <th className="px-4 py-2">
                                    <SelectInput
                                        defaultValue={queryParams.priority || ''}
                                        className="w-full"
                                        onChange={(e) => searchFieldChanged('priority', e.target.value)}
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                </th>
                                <th className="px-4 py-2"></th>
                                <th className="px-4 py-2"></th>
                                <th className="px-4 py-2"></th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {tasks.data.map((task) => (
                                <tr key={task.id} className="transition hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-4 py-4">{task.id}</td>
                                    <td className="px-4 py-4">
                                        <img src={task.image_path} alt={task.name} className="object-cover w-12 h-12 rounded" />
                                    </td>
                                    {showProject && <td className="px-4 py-4">{task.project.name}</td>}
                                    <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">{task.name}</td>
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
                                    <td className="px-4 py-4 space-x-2">
                                        <Link href={route('tasks.edit', task.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                        <Link href={route('tasks.destroy', task.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination links={tasks.meta.links} />
            </div>


        </>
    )
}
