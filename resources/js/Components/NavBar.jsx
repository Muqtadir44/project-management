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

        </>
    )
}
