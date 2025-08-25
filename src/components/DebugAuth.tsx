"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getAllCookies } from '@/lib/cookies';

const DebugAuth: React.FC = () => {
    const { user, token, isLoading } = useAuth();
    const [cookies, setCookies] = useState<Record<string, string>>({});
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setCookies(getAllCookies());
    }, []);

    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    // Don't render until client-side hydration is complete
    if (!isClient) {
        return (
            <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-xs z-50">
                <h3 className="font-bold mb-2">Auth Debug</h3>
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-xs z-50">
            <h3 className="font-bold mb-2">Auth Debug</h3>
            <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
            <div>User: {user ? 'Yes' : 'No'}</div>
            <div>Token: {token ? 'Yes' : 'No'}</div>
            <div>Cookie Token: {cookies.token ? 'Yes' : 'No'}</div>
            <div>Cookie User: {cookies.user ? 'Yes' : 'No'}</div>
            {user && (
                <div className="mt-2">
                    <div>Username: {user.username}</div>
                    <div>Role: {user.role}</div>
                </div>
            )}
        </div>
    );
};

export default DebugAuth;
