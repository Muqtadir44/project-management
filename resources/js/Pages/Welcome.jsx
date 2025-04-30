import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="ProjectHub - Welcome" />
            <div className="bg-gradient-to-b from-blue-250 text-gray-400 dark:bg-gray-900 dark:text-gray-50 min-h-screen">
                <div className="relative flex flex-col items-center justify-center min-h-screen">
                    <div className="w-full max-w-7xl px-6">
                        <header className="flex items-center justify-between py-8">
                            <div className="flex items-center space-x-2">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/>
                                </svg>
                                <span className="text-2xl font-bold text-blue-600">ProjectHub</span>
                            </div>
                            <nav className="flex items-center space-x-6">
                                {auth.user ? (
                                    <>
                                        <Link href={route('projects.index')} className="hover:text-blue-600 transition-colors">
                                            My Projects
                                        </Link>
                                        <Link
                                            href={route('projects.create')}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            New Project
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="hover:text-blue-600 transition-colors">
                                            Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="py-20">
                            <div className="text-center mb-20">
                                <h1 className="text-5xl font-bold mb-6">
                                    Manage Projects, Teams & Tasks
                                    <br />
                                    <span className="text-blue-700 text-6xl">Effortlessly</span>
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                                    Collaborate, track progress, and deliver projects successfully
                                </p>
                                <Link
                                    href={auth.user ? route('projects.index') : route('register')}
                                    className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg hover:bg-blue-700 transition-colors"
                                >
                                    Start Managing Projects
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">Project Tracking</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Visualize project timelines, track milestones, and monitor progress in real-time
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">Team Collaboration</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Assign tasks, share files, and communicate effectively with your team
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">Analytics & Reporting</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Generate detailed reports and gain insights into team performance
                                    </p>
                                </div>
                            </div>
                        </main>

                        <footer className="py-8 text-center border-t border-gray-200 dark:border-gray-700">
                            <p className="text-gray-600 dark:text-gray-400">
                                © {new Date().getFullYear()} ProjectHub. All rights reserved.
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
