import { BreadCrumb } from "@/Components/BreadCrumb";
import PageHeading from "@/Components/PageHeading";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Create() {
    return (
        <AuthenticatedLayout
            header={
                <PageHeading title={'Add Project'} backBtn={true} backRoute={'projects.index'} />
            }
        >
            <Head title="Add Projects" />

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
                            Add
                        </li>
                    </BreadCrumb>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Form goes here
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
