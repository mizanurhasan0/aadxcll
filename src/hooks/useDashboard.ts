import { useState, useCallback } from 'react';

export const useDashboard = () => {
    const [activeTab, setActiveTab] = useState('blogs');

    const switchTab = useCallback((tab: string) => {
        setActiveTab(tab);
    }, []);

    return {
        activeTab,
        switchTab
    };
};
