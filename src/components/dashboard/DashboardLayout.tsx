"use client";
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useDashboard } from '@/hooks/useDashboard';
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const { activeTab, switchTab } = useDashboard();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    // Pass activeTab and switchTab to children
    const childrenWithProps = React.cloneElement(children as React.ReactElement, {
        activeTab,
        setActiveTab: switchTab
    });

    React.useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/auth');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading authentication...</div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect
    }

    if (user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Access Denied. Admin privileges required.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* Fixed Sidebar */}
            <div className="fixed left-0 top-0 h-full z-40 hidden md:block">
                <DashboardSidebar activeTab={activeTab} onTabChange={switchTab} />
            </div>

            {/* Main Content Area with Left Margin for Sidebar */}
            <main className="flex-1 ml-0 md:ml-64 min-h-screen">
                {/* Header */}
                <div className="sticky top-0 z-30 bg-gray-900 border-b border-gray-700 px-4 md:px-8 py-4 md:py-6">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white">
                                Welcome back, {user.username}!
                            </h1>
                            <p className="text-gray-400 mt-2 text-sm md:text-base">
                                Manage your website content and settings
                            </p>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="px-4 md:px-8 py-4 md:py-6">
                    <div className="max-w-7xl mx-auto">
                        {childrenWithProps}
                    </div>
                </div>
            </main>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Mobile Sidebar */}
                    <div className="absolute left-0 top-0 h-full w-64 bg-gray-800 shadow-lg">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <DashboardSidebar
                                activeTab={activeTab}
                                onTabChange={(tab) => {
                                    switchTab(tab);
                                    setIsMobileMenuOpen(false);
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
