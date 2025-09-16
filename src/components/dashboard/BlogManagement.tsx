"use client";
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { getCookie } from '@/lib/cookies';
import { Control, UseFormReset, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import BlogFrom from './blogManagement/BlogFrom';
import { TBlog, TBlogFormData } from './blogManagement/TypeBlogManagement';
import { useToaster } from '../shared/useToaster';
import Toaster from '../shared/Toaster';
import { useBlogManagement } from '@/hooks/useBlogManagement';
import Image from 'next/image';


const schema = yup.object({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
    image: yup.string().optional(),
    excerpt: yup.string().optional(),
    tags: yup.string().required('Tags are required'),
    published: yup.boolean()
});

const BlogManagement: React.FC = () => {
    const { token } = useAuth();
    const { toasts, removeToast } = useToaster();

    const getAuthToken = () => {
        if (token) return token;
        return getCookie('token') || '';
    };

    const {
        blogs,
        loading,
        error,
        createBlog,
        updateBlog,
        deleteBlog
    } = useBlogManagement({ token: getAuthToken() });

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
            content: '',
            excerpt: '',
            image: '',
            tags: '',
            published: false
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<TBlog | null>(null);

    const handleEdit = (blog: TBlog) => {
        setEditingBlog(blog);
        setValue('title', blog.title);
        setValue('content', blog.content || '');
        setValue('excerpt', blog.excerpt);
        setValue('image', blog.image);
        setValue('tags', blog.tags.join(', '));
        setValue('published', blog.published);
        setIsModalOpen(true);
    };

    const handleDelete = async (blogId: string) => {
        await deleteBlog(blogId);
    };

    const openCreateModal = () => {
        setEditingBlog(null);
        reset();
        setIsModalOpen(true);
    };

    const onSubmit = async (data: TBlogFormData) => {
        let success = false;

        if (editingBlog) {
            success = await updateBlog(editingBlog._id, data);
        } else {
            success = await createBlog(data);
        }

        if (success) {
            setIsModalOpen(false);
            setEditingBlog(null);
            reset();
        }
    };
    return (
        <div className="space-y-6">
            <Toaster toasts={toasts} removeToast={removeToast} />
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Blog Management</h2>
                <button
                    onClick={openCreateModal}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus className="w-4 h-4" />
                    <span>Create New Blog</span>
                </button>
            </div>

            {/* Blog List */}
            <div className="bg-gray-800 rounded-lg p-6">
                {loading && (
                    <div className="text-center py-8 text-gray-400">
                        Loading blogs...
                    </div>
                )}

                {error && (
                    <div className="text-center py-8 text-red-400 bg-red-400/10 rounded-lg">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid gap-4">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-16 h-16 object-cover rounded-lg"
                                        width={64}
                                        height={64}
                                    />
                                    <div>
                                        <h3 className="text-white font-medium">{blog.title}</h3>
                                        <p className="text-gray-300 text-sm">{blog.excerpt}</p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className={`px-2 py-1 rounded-full text-xs ${blog.published
                                                ? 'bg-green-600 text-white'
                                                : 'bg-yellow-600 text-white'
                                                }`}>
                                                {blog.published ? 'Published' : 'Draft'}
                                            </span>
                                            <span className="text-gray-400 text-xs">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(blog)}
                                        disabled={loading}
                                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(blog._id)}
                                        disabled={loading}
                                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {blogs.length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                No blog posts found. Create your first blog post!
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <BlogFrom
                    editingBlog={editingBlog}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    control={control as Control<TBlogFormData>}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    setIsModalOpen={setIsModalOpen}
                    setEditingBlog={setEditingBlog}
                    reset={reset as UseFormReset<TBlogFormData>}
                />
            )}
        </div>
    );
};

export default BlogManagement;
