export default function TableHeading({ name, sortable = true, sortField, sortOrder }) {
    return (
        <>
            <th onClick={(e) => sortChanged('id')} className="px-3 py-3">
                <div className="flex items-center justify-between">
                    ID
                    <div>
                        <ChevronUpIcon className="w-4" />
                        <ChevronDownIcon className="w-4" />
                    </div>
                </div>
            </th>
        </>
    )
}
