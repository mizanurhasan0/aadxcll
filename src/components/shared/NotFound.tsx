import React from 'react'

export default function NotFound({ error, onRetry, message = "Failed to load data" }: { error: string, onRetry: () => void, message?: string }) {
    return (
        <div className="text-center py-20">
            <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            </div>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-gray-500 text-sm mb-6">{error}</p>
            <button onClick={onRetry} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">Try Again</button>
        </div>
    )
}
