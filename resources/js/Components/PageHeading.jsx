import { BackwardIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import { Link } from "@inertiajs/react";

export default function PageHeading({ title,btnTitle, showBtns = true, addBtn = false, backBtn = false, addRoute = null, backRoute = null }) {
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                {title}
            </h2>

            {showBtns && (
                <>
                    {addBtn &&
                        (<Link className="flex items-center justify-between px-3 py-1 font-bold text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600" href={route(addRoute)}>
                            {btnTitle} &nbsp; <PlusCircleIcon className="w-4" />
                        </Link>)
                    }
                    {backBtn &&
                        (<Link className="flex items-center justify-between px-3 py-1 font-bold text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600" href={route(backRoute)}>
                            <BackwardIcon className="w-4" /> &nbsp; Back
                        </Link>)
                    }
                </>
            )
            }
        </div>
    )
}
