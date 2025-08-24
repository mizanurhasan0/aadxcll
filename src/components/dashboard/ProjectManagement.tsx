"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Edit, Trash2, Star, ExternalLink, Github } from 'lucide-react';
import { getCookie } from '@/lib/cookies';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormField from '@/components/shared/FormField';
import ImageUpload from '@/components/shared/ImageUpload';

interface Project {
    _id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    technologies: string[];
    client: string;
    projectUrl: string;
    githubUrl: string;
    featured: boolean;
    order: number;
    active: boolean;
    completedAt: string;
    createdAt: string;
}

const ProjectManagement: React.FC = () => {
    const { token } = useAuth();

    // Get token from cookies if not in context
    const getAuthToken = () => {
        if (token) return token;
        return getCookie('token');
    };

    // Validation schema
    const schema = yup.object({
        title: yup.string().required('Title is required'),
        category: yup.string().required('Category is required'),
        image: yup.string().required('Image is required'),
        description: yup.string().optional(),
        technologies: yup.string().optional(),
        client: yup.string().optional(),
        projectUrl: yup.string().url('Invalid project URL').optional(),
        githubUrl: yup.string().url('Invalid GitHub URL').optional(),
        order: yup.number().min(0, 'Order must be 0 or greater').required('Order is required'),
        featured: yup.boolean(),
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
            title: '',
            category: '',
            image: '',
            description: '',
            technologies: '',
            client: '',
            projectUrl: '',
            githubUrl: '',
            order: 0,
            featured: false,
            active: true
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const onSubmit = async (data: any) => {
        try {
            const projectData = {
                ...data,
                technologies: data.technologies ? data.technologies.split('\n').map((tech: string) => tech.trim()).filter((tech: string) => tech) : []
            };

            const url = editingProject ? `/api/projects/${editingProject._id}` : '/api/projects';
            const method = editingProject ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuthToken()}`
                },
                body: JSON.stringify(projectData)
            });

            if (response.ok) {
                setIsModalOpen(false);
                setEditingProject(null);
                reset();
                fetchProjects();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error('Error saving project:', error);
            alert('An error occurred while saving the project');
        }
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setValue('title', project.title);
        setValue('category', project.category);
        setValue('image', project.image);
        setValue('description', project.description || '');
        setValue('technologies', project.technologies.join('\n'));
        setValue('client', project.client || '');
        setValue('projectUrl', project.projectUrl || '');
        setValue('githubUrl', project.githubUrl || '');
        setValue('order', project.order);
        setValue('featured', project.featured);
        setValue('active', project.active);
        setIsModalOpen(true);
    };

    const handleDelete = async (projectId: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const response = await fetch(`/api/projects/${projectId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            });

            if (response.ok) {
                fetchProjects();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('An error occurred while deleting the project');
        }
    };

    const openCreateModal = () => {
        setEditingProject(null);
        reset();
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Project Management</h2>
                <button
                    onClick={openCreateModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                </button>
            </div>

            {/* Projects List */}
            <div className="bg-gray-800 rounded-lg p-6">
                <div className="grid gap-4">
                    {projects.map((project) => (
                        <div key={project._id} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        {project.featured && (
                                            <Star className="w-4 h-4 text-yellow-400" />
                                        )}
                                        <h3 className="text-white font-medium">{project.title}</h3>
                                    </div>
                                    <p className="text-blue-400 text-sm mb-2">{project.category}</p>
                                    {project.description && (
                                        <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                                    )}
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {project.technologies.slice(0, 3).map((tech, index) => (
                                                <span key={index} className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                                                    +{project.technologies.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                                        {project.client && <span>Client: {project.client}</span>}
                                        <span>Order: {project.order}</span>
                                        <span className={`px-2 py-1 rounded-full ${project.active
                                            ? 'bg-green-600 text-white'
                                            : 'bg-red-600 text-white'
                                            }`}>
                                            {project.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                {project.projectUrl && (
                                    <a
                                        href={project.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
                                        title="View Project"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition-colors"
                                        title="View GitHub"
                                    >
                                        <Github className="w-4 h-4" />
                                    </a>
                                )}
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {projects.length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                            No projects found. Add your first portfolio project!
                        </div>
                    )}
                </div>
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold text-white mb-4">
                            {editingProject ? 'Edit Project' : 'Add New Project'}
                        </h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="title"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            label="Project Title"
                                            name="title"
                                            value={field.value}
                                            onChange={field.onChange}
                                            required
                                            error={errors.title?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            label="Category"
                                            name="category"
                                            value={field.value}
                                            onChange={field.onChange}
                                            required
                                            error={errors.category?.message}
                                        />
                                    )}
                                />
                            </div>

                            <Controller
                                name="image"
                                control={control}
                                render={({ field }) => (
                                    <ImageUpload
                                        currentImage={field.value}
                                        onImageChange={field.onChange}
                                        label="Project Image"
                                        required
                                        error={errors.image?.message}
                                        touched={isSubmitting || Object.keys(errors).length > 0}
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
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.description?.message}
                                        rows={3}
                                    />
                                )}
                            />

                            <Controller
                                name="technologies"
                                control={control}
                                render={({ field }) => (
                                    <FormField
                                        label="Technologies (one per line)"
                                        name="technologies"
                                        type="textarea"
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.technologies?.message}
                                        rows={3}
                                        placeholder="React&#10;Node.js&#10;MongoDB"
                                    />
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="client"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            label="Client"
                                            name="client"
                                            value={field.value}
                                            onChange={field.onChange}
                                            error={errors.client?.message}
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

                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="projectUrl"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            label="Project URL"
                                            name="projectUrl"
                                            type="url"
                                            value={field.value}
                                            onChange={field.onChange}
                                            error={errors.projectUrl?.message}
                                            placeholder="https://example.com"
                                        />
                                    )}
                                />

                                <Controller
                                    name="githubUrl"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            label="GitHub URL"
                                            name="githubUrl"
                                            type="url"
                                            value={field.value}
                                            onChange={field.onChange}
                                            error={errors.githubUrl?.message}
                                            placeholder="https://github.com/..."
                                        />
                                    )}
                                />
                            </div>

                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                    <Controller
                                        name="featured"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type="checkbox"
                                                id="featured"
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    <label htmlFor="featured" className="text-sm text-gray-300">
                                        Featured project
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
                                        Active project
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingProject(null);
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
                                    {isSubmitting ? 'Saving...' : (editingProject ? 'Update Project' : 'Add Project')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectManagement;
