"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Edit, Trash2, Linkedin, Twitter, Github, Mail } from 'lucide-react';
import { getCookie } from '@/lib/cookies';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ImageUpload from '@/components/shared/ImageUpload';
import FormField from '@/components/shared/FormField';
import { useToaster } from '../shared/useToaster';
import Toaster from '../shared/Toaster';

interface TeamMember {
    _id?: string;
    name: string;
    position: string;
    bio: string;
    image?: string | null;
    email: string;
    linkedin?: string | null;
    twitter?: string | null;
    github?: string | null;
    order: number;
    active?: boolean | null;
    createdAt?: string | null;
}

const TeamManagement: React.FC = () => {
    const { token } = useAuth();
    const { toasts, removeToast, showSuccess, showError, showWarning } = useToaster();

    // Get token from cookies if not in context
    const getAuthToken = () => {
        if (token) return token;
        return getCookie('token');
    };

    // Validation schema
    const schema = yup.object({
        name: yup.string().required('Name is required'),
        position: yup.string().required('Position is required'),
        bio: yup.string().required('Bio is required'),
        image: yup.string().optional(),
        email: yup.string().email('Invalid email').required('Email is required'),
        linkedin: yup.string().url('Invalid LinkedIn URL').optional(),
        twitter: yup.string().url('Invalid Twitter URL').optional(),
        github: yup.string().url('Invalid GitHub URL').optional(),
        order: yup.number().min(0, 'Order must be 0 or greater').required('Order is required'),
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
            position: '',
            bio: '',
            image: '',
            email: '',
            linkedin: '',
            twitter: '',
            github: '',
            order: 0,
            active: true
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const fetchTeamMembers = async () => {
        try {
            const response = await fetch('/api/team');
            if (response.ok) {
                const data = await response.json();
                setTeamMembers(data);
            }
        } catch (error) {
            console.error('Error fetching team members:', error);
        }
    };

    const onSubmit = async (data: TeamMember) => {
        // Manual validation for image field
        if (!data.image || data.image.trim() === '') {
            showWarning('Profile image is required. Please upload an image or enter an image URL.');
            return;
        }

        try {
            const memberData = {
                ...data,
                order: parseInt(data.order.toString())
            };

            const url = editingMember ? `/api/team/${editingMember._id}` : '/api/team';
            const method = editingMember ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuthToken()}`
                },
                body: JSON.stringify(memberData)
            });

            if (response.ok) {
                showSuccess(editingMember ? 'Team member updated successfully' : 'Team member created successfully');
                setIsModalOpen(false);
                setEditingMember(null);
                reset();
                fetchTeamMembers();
            } else {
                const error = await response.json();
                showError(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error('Error saving team member:', error);
            showError('An error occurred while saving the team member');
        }
    };

    const handleEdit = (member: TeamMember) => {
        setEditingMember(member);
        setValue('name', member.name);
        setValue('position', member.position);
        setValue('bio', member.bio);
        setValue('image', member.image || '');
        setValue('email', member.email);
        setValue('linkedin', member.linkedin || '');
        setValue('twitter', member.twitter || '');
        setValue('github', member.github || '');
        setValue('order', member.order);
        setValue('active', member.active || false);
        setIsModalOpen(true);
    };

    const handleDelete = async (memberId: string) => {
        if (!confirm('Are you sure you want to delete this team member?')) return;

        try {
            const response = await fetch(`/api/team/${memberId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            });

            if (response.ok) {
                showSuccess('Team member deleted successfully');
                fetchTeamMembers();
            } else {
                const error = await response.json();
                showError(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error('Error deleting team member:', error);
            showError('An error occurred while deleting the team member');
        }
    };

    const openCreateModal = () => {
        setEditingMember(null);
        reset();
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <Toaster toasts={toasts} removeToast={removeToast} />
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Team Management</h2>
                <button
                    onClick={openCreateModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Team Member</span>
                </button>
            </div>

            {/* Team Members List */}
            <div className="bg-gray-800 rounded-lg p-6">
                <div className="grid gap-4">
                    {teamMembers.map((member) => (
                        <div key={member._id} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={member.image || ''}
                                    alt={member.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="text-white font-medium">{member.name}</h3>
                                    <p className="text-blue-400 text-sm">{member.position}</p>
                                    <p className="text-gray-300 text-sm mt-1">{member.bio}</p>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${member.active
                                            ? 'bg-green-600 text-white'
                                            : 'bg-red-600 text-white'
                                            }`}>
                                            {member.active ? 'Active' : 'Inactive'}
                                        </span>
                                        <span className="text-gray-400 text-xs">
                                            Order: {member.order}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2">
                                        {member.email && (
                                            <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-blue-400">
                                                <Mail className="w-4 h-4" />
                                            </a>
                                        )}
                                        {member.linkedin && (
                                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                                                <Linkedin className="w-4 h-4" />
                                            </a>
                                        )}
                                        {member.twitter && (
                                            <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                                                <Twitter className="w-4 h-4" />
                                            </a>
                                        )}
                                        {member.github && (
                                            <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                                                <Github className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(member)}
                                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(member._id || '')}
                                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {teamMembers.length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                            No team members found. Add your first team member!
                        </div>
                    )}
                </div>
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold text-white mb-4">
                            {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
                        </h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            label="Name"
                                            name="name"
                                            value={field.value}
                                            onChange={field.onChange}
                                            required
                                            error={errors.name?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    name="position"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            label="Position"
                                            name="position"
                                            value={field.value}
                                            onChange={field.onChange}
                                            required
                                            error={errors.position?.message}
                                        />
                                    )}
                                />
                            </div>

                            <Controller
                                name="bio"
                                control={control}
                                render={({ field }) => (
                                    <FormField
                                        label="Bio"
                                        name="bio"
                                        type="textarea"
                                        value={field.value}
                                        onChange={field.onChange}
                                        required
                                        error={errors.bio?.message}
                                        rows={3}
                                    />
                                )}
                            />

                            <Controller
                                name="image"
                                control={control}
                                render={({ field }) => (
                                    <ImageUpload
                                        currentImage={field.value}
                                        onImageChange={field.onChange}
                                        label="Profile Image"
                                        required={editingMember ? false : true} // Make image optional for new members
                                        error={errors.image?.message}
                                        touched={isSubmitting || Object.keys(errors).length > 0}
                                    />
                                )}
                            />

                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <FormField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={field.value}
                                        onChange={field.onChange}
                                        required
                                        error={errors.email?.message}
                                    />
                                )}
                            />

                            <div className="grid grid-cols-3 gap-4">
                                <Controller
                                    name="linkedin"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            label="LinkedIn"
                                            name="linkedin"
                                            type="url"
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            error={errors.linkedin?.message}
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    )}
                                />

                                <Controller
                                    name="twitter"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            label="Twitter"
                                            name="twitter"
                                            type="url"
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            error={errors.twitter?.message}
                                            placeholder="https://twitter.com/..."
                                        />
                                    )}
                                />

                                <Controller
                                    name="github"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            label="GitHub"
                                            name="github"
                                            type="url"
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            error={errors.github?.message}
                                            placeholder="https://github.com/..."
                                        />
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
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

                                <div className="flex items-center space-x-2 pt-6">
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
                                        Active member
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingMember(null);
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
                                    {isSubmitting ? 'Saving...' : (editingMember ? 'Update Member' : 'Add Member')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamManagement;
