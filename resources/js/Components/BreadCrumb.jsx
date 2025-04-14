export function BreadCrumb({children})
{
    return (
        <>
            <nav className="mb-4 text-sm text-gray-600 dark:text-gray-300" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                    {children}
                </ol>
            </nav>
        </>
    )
}
