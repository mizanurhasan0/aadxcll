"use client";
import React from 'react';
import BlogManagement from './BlogManagement';
import TeamManagement from './TeamManagement';
import PackageManagement from './PackageManagement';
import ProjectManagement from './ProjectManagement';
import SettingsManagement from './SettingsManagement';

interface DashboardContentProps {
    activeTab?: string;
    setActiveTab?: (tab: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ activeTab = 'blogs' }) => {
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
        <div className="space-y-6">
            {renderContent()}
        </div>
    );
};

export default DashboardContent;
