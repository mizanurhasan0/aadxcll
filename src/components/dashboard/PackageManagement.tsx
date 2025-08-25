"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import { getCookie } from '@/lib/cookies';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormField from '@/components/shared/FormField';

interface Package {
    _id: string;
    name: string;
    subtitle: string;
    price: number;
    currency: string;
    popular: boolean;
    features: string[];
    description: string;
    order: number;
    active: boolean;
    createdAt: string;
}
type TPackageFormData = {
    name: string;
    subtitle: string;
    price: number;
    currency: string;
    features: string;
}
const PackageManagement: React.FC = () => {
    const { token } = useAuth();

    // Get token from cookies if not in context
    const getAuthToken = () => {
        if (token) return token;
        return getCookie('token');
    };

    // Validation schema
    const schema = yup.object({
        name: yup.string().required('Name is required'),
        subtitle: yup.string().required('Subtitle is required'),
        price: yup.number().min(0, 'Price must be 0 or greater').required('Price is required'),
        currency: yup.string().required('Currency is required'),
        features: yup.string().required('Features are required'),
        description: yup.string().optional(),
        order: yup.number().min(0, 'Order must be 0 or greater').required('Order is required'),
        popular: yup.boolean(),
        active: yup.boolean()
    });

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            subtitle: '',
            price: 0,
            currency: 'USD',
            features: '',
            description: '',
            order: 0,
            popular: false,
            active: true
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    const [packages, setPackages] = useState<Package[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState<Package | null>(null);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const response = await fetch('/api/packages');
            if (response.ok) {
                const data = await response.json();
                setPackages(data);
            }
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    const onSubmit = async (data: TPackageFormData) => {
        try {
            const packageData = {
                ...data,
                price: parseFloat(data.price.toString()),
                features: data.features.split('\n').map((feature: string) => feature.trim()).filter((feature: string) => feature)
            };

            const url = editingPackage ? `/api/packages/${editingPackage._id}` : '/api/packages';
            const method = editingPackage ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuthToken()}`
                },
                body: JSON.stringify(packageData)
            });

            if (response.ok) {
                setIsModalOpen(false);
                setEditingPackage(null);
                reset();
                fetchPackages();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error('Error saving package:', error);
            alert('An error occurred while saving the package');
        }
    };

    const handleEdit = (packageData: Package) => {
        setEditingPackage(packageData);
        setValue('name', packageData.name);
        setValue('subtitle', packageData.subtitle);
        setValue('price', packageData.price);
        setValue('currency', packageData.currency);
        setValue('features', packageData.features.join('\n'));
        setValue('description', packageData.description || '');
        setValue('order', packageData.order);
        setValue('popular', packageData.popular);
        setValue('active', packageData.active);
        setIsModalOpen(true);
    };

    const handleDelete = async (packageId: string) => {
        if (!confirm('Are you sure you want to delete this package?')) return;

        try {
            const response = await fetch(`/api/packages/${packageId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            });

            if (response.ok) {
                fetchPackages();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error('Error deleting package:', error);
            alert('An error occurred while deleting the package');
        }
    };

    const openCreateModal = () => {
        setEditingPackage(null);
        reset();
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Package Management</h2>
                <button
                    onClick={openCreateModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Package</span>
                </button>
            </div>

            {/* Packages List */}
            <div className="bg-gray-800 rounded-lg p-6">
                <div className="grid gap-4">
                    {packages.map((packageData) => (
                        <div key={packageData._id} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="text-center">
                                    <div className="flex items-center justify-center mb-2">
                                        {packageData.popular && (
                                            <Star className="w-5 h-5 text-yellow-400 mr-2" />
                                        )}
                                        <h3 className="text-white font-medium">{packageData.name}</h3>
                                    </div>
                                    <p className="text-blue-400 text-sm">{packageData.subtitle}</p>
                                    <div className="text-2xl font-bold text-green-400 mt-1">
                                        ${packageData.price}
                                    </div>
                                </div>
                                <div className="ml-6">
                                    <p className="text-gray-300 text-sm mb-2">{packageData.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {packageData.features.slice(0, 3).map((feature, index) => (
                                            <span key={index} className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                                                {feature}
                                            </span>
                                        ))}
                                        {packageData.features.length > 3 && (
                                            <span className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                                                +{packageData.features.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${packageData.active
                                            ? 'bg-green-600 text-white'
                                            : 'bg-red-600 text-white'
                                            }`}>
                                            {packageData.active ? 'Active' : 'Inactive'}
                                        </span>
                                        <span className="text-gray-400 text-xs">
                                            Order: {packageData.order}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(packageData)}
                                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(packageData._id)}
                                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {packages.length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                            No packages found. Add your first pricing package!
                        </div>
                    )}
                </div>
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold text-white mb-4">
                            {editingPackage ? 'Edit Package' : 'Add New Package'}
                        </h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            label="Package Name"
                                            name="name"
                                            value={field.value}
                                            onChange={field.onChange}
                                            required
                                            error={errors.name?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    name="subtitle"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            label="Subtitle"
                                            name="subtitle"
                                            value={field.value}
                                            onChange={field.onChange}
                                            required
                                            error={errors.subtitle?.message}
                                        />
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <Controller
                                    name="price"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            label="Price"
                                            name="price"
                                            type="number"
                                            value={field.value}
                                            onChange={field.onChange}
                                            required
                                            error={errors.price?.message}
                                            min={0}
                                        />
                                    )}
                                />

                                <Controller
                                    name="currency"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            label="Currency"
                                            name="currency"
                                            value={field.value}
                                            onChange={field.onChange}
                                            required
                                            error={errors.currency?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    name="order"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            label="Display Order"
                                            name="order"
                                            type="number"
                                            value={field.value}
                                            onChange={field.onChange}
                                            error={errors.order?.message}
                                            min={0}
                                        />
                                    )}
                                />
                            </div>

                            <Controller
                                name="features"
                                control={control}
                                render={({ field }) => (
                                    <FormField
                                        label="Features (one per line)"
                                        name="features"
                                        type="textarea"
                                        value={field.value}
                                        onChange={field.onChange}
                                        required
                                        error={errors.features?.message}
                                        rows={4}
                                        placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                                    />
                                )}
                            />

                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <FormField
                                        label="Description"
                                        name="description"
                                        type="textarea"
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                        error={errors.description?.message}
                                        rows={3}
                                    />
                                )}
                            />

                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                    <Controller
                                        name="popular"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type="checkbox"
                                                id="popular"
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    <label htmlFor="popular" className="text-sm text-gray-300">
                                        Popular package
                                    </label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Controller
                                        name="active"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type="checkbox"
                                                id="active"
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    <label htmlFor="active" className="text-sm text-gray-300">
                                        Active package
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingPackage(null);
                                        reset();
                                    }}
                                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-colors"
                                >
                                    {isSubmitting ? 'Saving...' : (editingPackage ? 'Update Package' : 'Add Package')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PackageManagement;
