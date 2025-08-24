"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import BlogManagement from '@/components/dashboard/BlogManagement';
import TeamManagement from '@/components/dashboard/TeamManagement';
import PackageManagement from '@/components/dashboard/PackageManagement';
import ProjectManagement from '@/components/dashboard/ProjectManagement';
import SettingsManagement from '@/components/dashboard/SettingsManagement';

const DashboardPage = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('blogs');

    console.log('Dashboard render - user:', user, 'isLoading:', isLoading);

    useEffect(() => {
        console.log('Dashboard useEffect - isLoading:', isLoading, 'user:', user);
        if (!isLoading && !user) {
            console.log('Redirecting to auth page');
            router.replace('/auth');
        } else if (!isLoading && user) {
            console.log('User authenticated, showing dashboard');
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
        console.log('No user found, redirecting...');
        router.replace('/auth');
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Redirecting to login...</div>
            </div>
        );
    }

    if (user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Access Denied. Admin privileges required.</div>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'blogs':
                return <BlogManagement />;
            case 'team':
                return <TeamManagement />;
            case 'packages':
                return <PackageManagement />;
            case 'projects':
                return <ProjectManagement />;
            case 'settings':
                return <SettingsManagement />;
            default:
                return <BlogManagement />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex">
            <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <main className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white">
                            Welcome back, {user.username}!
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Manage your website content and settings
                        </p>
                    </div>
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
