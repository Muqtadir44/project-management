import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function NavBar() {
    return (
        <>
             <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                    href={route('dashboard')}
                    active={route().current('dashboard')}
                >
                    Dashboard
                </NavLink>
            </div>
            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                    href={route('users.index')}
                    active={route().current('users.index') || route().current('users.create') || route().current('users.edit') }
                >
                    Users
                </NavLink>
            </div>
            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                    href={route('projects.index')}
                    active={route().current('projects.index') || route().current('projects.create') || route().current('projects.edit') || route().current('projects.show') }
                >
                    Projects
                </NavLink>
            </div>
            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                    href={route('tasks.index')}
                    active={route().current('tasks.index') || route().current('tasks.create') || route().current('tasks.edit') }
                >
                    Tasks
                </NavLink>
            </div>
        </>
    )
}
