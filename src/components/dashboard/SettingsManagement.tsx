"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Save, Image, Globe, Mail } from 'lucide-react';
import { getCookie } from '@/lib/cookies';

interface WebsiteSettings {
    logoLight: string;
    logoDark: string;
    favicon: string;
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    socialLinks: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
        github?: string;
    };
}

const SettingsManagement: React.FC = () => {
    const { token } = useAuth();

    // Get token from cookies if not in context
    const getAuthToken = () => {
        if (token) return token;
        return getCookie('token');
    };
    const [settings, setSettings] = useState<WebsiteSettings>({
        logoLight: '',
        logoDark: '',
        favicon: '',
        siteName: '',
        siteDescription: '',
        contactEmail: '',
        contactPhone: '',
        address: '',
        socialLinks: {}
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/settings');
            if (response.ok) {
                const data = await response.json();
                setSettings(data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');

        try {
            const response = await fetch('/api/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuthToken()}`
                },
                body: JSON.stringify(settings)
            });

            if (response.ok) {
                setMessage('Settings updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                const error = await response.json();
                setMessage(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            setMessage('An error occurred while saving settings');
        } finally {
            setIsSaving(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setSettings(prev => ({
                ...prev,
                [parent]: typeof prev[parent as keyof WebsiteSettings] === 'object' && prev[parent as keyof WebsiteSettings] !== null ? prev[parent as keyof WebsiteSettings] : {
                    [child]: value
                }
            }));
        } else {
            setSettings(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleSocialLinkChange = (platform: string, value: string) => {
        setSettings(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [platform]: value
            }
        }));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-white">Loading settings...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Website Settings</h2>
                <button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
                >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-lg ${message.includes('Error')
                    ? 'bg-red-600 text-white'
                    : 'bg-green-600 text-white'
                    }`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Logo Settings */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Image className="w-5 h-5 mr-2" />
                        Logo & Branding
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Light Logo URL
                            </label>
                            <input
                                type="url"
                                value={settings.logoLight}
                                onChange={(e) => handleInputChange('logoLight', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://example.com/logo-light.png"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Dark Logo URL
                            </label>
                            <input
                                type="url"
                                value={settings.logoDark}
                                onChange={(e) => handleInputChange('logoDark', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://example.com/logo-dark.png"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Favicon URL
                            </label>
                            <input
                                type="url"
                                value={settings.favicon}
                                onChange={(e) => handleInputChange('favicon', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://example.com/favicon.ico"
                            />
                        </div>
                    </div>
                </div>

                {/* Site Information */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Globe className="w-5 h-5 mr-2" />
                        Site Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Site Name
                            </label>
                            <input
                                type="text"
                                value={settings.siteName}
                                onChange={(e) => handleInputChange('siteName', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Company Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Site Description
                            </label>
                            <input
                                type="text"
                                value={settings.siteDescription}
                                onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Brief description of your company"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Mail className="w-5 h-5 mr-2" />
                        Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                value={settings.contactEmail}
                                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="info@company.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Contact Phone
                            </label>
                            <input
                                type="tel"
                                value={settings.contactPhone}
                                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Address
                            </label>
                            <input
                                type="text"
                                value={settings.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="123 Business Street, City, Country"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Facebook
                            </label>
                            <input
                                type="url"
                                value={settings?.socialLinks?.facebook || ''}
                                onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://facebook.com/company"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Twitter
                            </label>
                            <input
                                type="url"
                                value={settings?.socialLinks?.twitter || ''}
                                onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://twitter.com/company"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                LinkedIn
                            </label>
                            <input
                                type="url"
                                value={settings?.socialLinks?.linkedin || ''}
                                onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://linkedin.com/company"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Instagram
                            </label>
                            <input
                                type="url"
                                value={settings?.socialLinks?.instagram || ''}
                                onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://instagram.com/company"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                GitHub
                            </label>
                            <input
                                type="url"
                                value={settings?.socialLinks?.github || ''}
                                onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://github.com/company"
                            />
                        </div>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
                    <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center space-x-4 mb-4">
                            {settings.logoLight && (
                                <img
                                    src={settings.logoLight}
                                    alt="Light Logo"
                                    className="h-8 object-contain"
                                />
                            )}
                            {settings.logoDark && (
                                <img
                                    src={settings.logoDark}
                                    alt="Dark Logo"
                                    className="h-8 object-contain"
                                />
                            )}
                        </div>
                        <h4 className="text-white font-medium">{settings.siteName || 'Site Name'}</h4>
                        <p className="text-gray-300 text-sm">{settings.siteDescription || 'Site description will appear here'}</p>
                        <div className="mt-2 text-gray-400 text-xs">
                            <p>Email: {settings.contactEmail || 'Not set'}</p>
                            <p>Phone: {settings.contactPhone || 'Not set'}</p>
                            <p>Address: {settings.address || 'Not set'}</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SettingsManagement;
