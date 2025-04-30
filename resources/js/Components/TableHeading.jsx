import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid'

export default function TableHeading({ name, sortable = true, sortField, sortOrder, children,sortChanged = () => {} }) {
    return (
        <>
            <th onClick={(e) => sortChanged(name)} className="px-3 py-3">
                <div className="flex items-center justify-between">
                    {children}
                    {sortable && (
                        <div>
                            <ChevronUpIcon className="w-4" />
                            <ChevronDownIcon className="w-4" />
                        </div>
                    )}
                </div>
            </th>
        </>
    )
}
