import { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { MoreVertical } from 'lucide-react';

export default function ActionDropDown({children}) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    const toggleDropdown = () => setOpen(!open);
    const closeDropdown = () => setOpen(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="inline-flex justify-center p-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
                <MoreVertical size={16} />
            </button>

            {open && (
                <div className="absolute right-0 z-10 w-32 mt-2 bg-white rounded shadow-lg dark:bg-gray-700">
                    {children}
                </div>
            )}
        </div>
    );
}
