export default function StatusBadge({ status }) {
    const isActive = parseInt(status) === 1;

    const badgeClass = isActive
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';

    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded ${badgeClass}`}>
            {isActive ? 'Active' : 'Inactive'}
        </span>
    );
}
