import { HomeIcon } from "@heroicons/react/16/solid";
import { Link } from "@inertiajs/react";

export function BreadCrumb({ children }) {
    return (
        <>
            <nav className="mb-4 text-sm text-gray-600 dark:text-gray-300" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                    <li className="flex items-center space-x-1">
                        <Link href={route('dashboard')} className="flex items-center text-blue-600 hover:underline dark:text-blue-400">
                            <HomeIcon className="w-4 h-4 mr-1" />
                            <span>Dashboard</span>
                        </Link>
                        <span className="mx-2 text-gray-400">/</span>
                    </li>
                    {children}
                </ol>
            </nav>
        </>
    )
}
