export default function Alert({ success,err }) {
    if(success){
        console.log('testing success msg');

    }
    return (

        <>
            {success && (
                <div
                    id="success-alert"
                    className="flex items-center justify-between p-4 mb-4 text-sm text-green-700 bg-green-100 border border-green-300 rounded-lg dark:text-green-200 dark:bg-green-800 dark:border-green-700"
                    role="alert"
                >
                    <div className="flex items-center gap-2">
                        <svg className="flex-shrink-0 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>{success}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => document.getElementById('success-alert')?.remove()}
                        className="inline-flex items-center justify-center w-5 h-5 text-green-700 transition-colors duration-200 rounded hover:bg-green-200 dark:text-green-200 dark:hover:bg-green-700"
                        aria-label="Close"
                    >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            )}

            {err && (
                <div
                    id="error-alert"
                    className="flex items-center justify-between p-4 mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg dark:text-red-200 dark:bg-red-800 dark:border-red-700"
                    role="alert"
                >
                    <div className="flex items-center gap-2">
                        <svg className="flex-shrink-0 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M18 10A8 8 0 11.293 4.293a1 1 0 011.414 1.414A6 6 0 1010 4a1 1 0 112 0 8 8 0 016 6zM9 8a1 1 0 112 0v4a1 1 0 11-2 0V8zm0 6a1 1 0 112 0 1 1 0 01-2 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>{err}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => document.getElementById('error-alert')?.remove()}
                        className="inline-flex items-center justify-center w-5 h-5 text-red-700 transition-colors duration-200 rounded hover:bg-red-200 dark:text-red-200 dark:hover:bg-red-700"
                        aria-label="Close"
                    >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 11-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 11-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            )}

        </>
    )
}
