"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCookie, setCookie, deleteCookie } from '@/lib/cookies';

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (username: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing token on app load
        const storedToken = getCookie('token');
        const storedUser = getCookie('user');

        console.log('AuthContext useEffect - storedToken:', !!storedToken, 'storedUser:', !!storedUser);

        if (storedToken && storedUser) {
            try {
                const userData = JSON.parse(decodeURIComponent(storedUser));
                console.log('Setting user from cookies:', userData);
                setToken(storedToken);
                setUser(userData);
            } catch (error) {
                console.error('Error parsing stored user:', error);
                deleteCookie('token');
                deleteCookie('user');
            }
        }

        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            console.log('Attempting login for email:', email);
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log('Login response status:', response.status);
            console.log('Login response ok:', response.ok);

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                setUser(data.user);
                setToken(data.token);

                // Save token and user in cookies
                setCookie('token', data.token, 7);
                setCookie('user', encodeURIComponent(JSON.stringify(data.user)), 7);

                return true;
            } else {
                const error = await response.json();
                console.error('Login error:', error);
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const register = async (username: string, email: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                // Note: Registration doesn't automatically log in the user
                return true;
            } else {
                const error = await response.json();
                console.error('Registration error:', error);
                return false;
            }
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        // Clear cookies
        deleteCookie('token');
        deleteCookie('user');
    };

    // Debug log when user state changes
    useEffect(() => {
        console.log('AuthContext user state changed:', user);
    }, [user]);

    const value: AuthContextType = {
        user,
        token,
        login,
        register,
        logout,
        isLoading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
