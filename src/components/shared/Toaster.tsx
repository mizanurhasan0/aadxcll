"use client";
import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

interface ToasterProps {
    toasts: Toast[];
    removeToast: (id: string) => void;
}

const Toaster: React.FC<ToasterProps> = ({ toasts, removeToast }) => {
    const getToastIcon = (type: ToastType) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            case 'info':
                return <Info className="w-5 h-5 text-blue-500" />;
            default:
                return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getToastStyles = (type: ToastType) => {
        switch (type) {
            case 'success':
                return 'bg-green-900 border-green-600 text-green-100';
            case 'error':
                return 'bg-red-900 border-red-600 text-red-100';
            case 'warning':
                return 'bg-yellow-900 border-yellow-600 text-yellow-100';
            case 'info':
                return 'bg-blue-900 border-blue-600 text-blue-100';
            default:
                return 'bg-blue-900 border-blue-600 text-blue-100';
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`flex items-center space-x-3 p-4 rounded-lg border shadow-lg max-w-sm transition-all duration-300 ease-in-out ${getToastStyles(
                        toast.type
                    )}`}
                >
                    {getToastIcon(toast.type)}
                    <span className="flex-1 text-sm font-medium">{toast.message}</span>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="text-gray-400 hover:text-gray-200 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Toaster;
