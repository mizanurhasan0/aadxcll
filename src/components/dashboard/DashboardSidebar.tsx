"use client";
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
    FileText,
    Users,
    Settings,
    LogOut,
    Home
} from 'lucide-react';

interface DashboardSidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeTab, onTabChange }) => {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const menuItems = [
        {
            id: 'blogs',
            label: 'Blog Management',
            icon: FileText,
            description: 'Create, edit, and delete blog posts'
        },
        {
            id: 'team',
            label: 'Team Management',
            icon: Users,
            description: 'Manage team members'
        },
        {
            id: 'settings',
            label: 'Website Settings',
            icon: Settings,
            description: 'Update website configuration'
        }
    ];

    return (
        <div className="w-64 bg-gray-800 min-h-screen p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
                <p className="text-gray-400 text-sm">Content Management System</p>
            </div>

            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`w-full text-left p-4 rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                                <div>
                                    <div className="font-medium">{item.label}</div>
                                    <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                        {item.description}
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-700">
                <button
                    onClick={() => router.push('/')}
                    className="w-full text-left p-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 group"
                >
                    <div className="flex items-center space-x-3">
                        <Home className="w-5 h-5 text-gray-400 group-hover:text-white" />
                        <span>Back to Website</span>
                    </div>
                </button>

                <button
                    onClick={handleLogout}
                    className="w-full text-left p-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 group mt-2"
                >
                    <div className="flex items-center space-x-3">
                        <LogOut className="w-5 h-5 text-gray-400 group-hover:text-white" />
                        <span>Logout</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default DashboardSidebar;
