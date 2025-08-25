"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { getCookie } from '@/lib/cookies';
import { Control, UseFormReset, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import BlogFrom from './blogManagement/BlogFrom';

interface Blog {
    _id: string;
    title: string;
    content: string;
    excerpt: string;
    image: string;
    tags: string[];
    published: boolean;
    createdAt: string;
}
const schema = yup.object({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
    excerpt: yup.string().required('Excerpt is required'),
    image: yup.string().optional(),
    tags: yup.string().required('Tags are required'),
    published: yup.boolean()
});
export type TBlogFormData = {
    title: string;
    content: string;
    excerpt: string;
    image?: string;
    tags: string;
    published?: boolean;
}
const BlogManagement: React.FC = () => {
    const { token } = useAuth();


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
    // Get token from cookies if not in context


    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const getAuthToken = () => {
        if (token) return token;
        return getCookie('token');
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleEdit = (blog: Blog) => {
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
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        try {
            const response = await fetch(`/api/blogs/${blogId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            });

            if (response.ok) {
                fetchBlogs();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('An error occurred while deleting the blog');
        }
    };
    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/blogs');
            if (response.ok) {
                const data = await response.json();
                setBlogs(data);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const openCreateModal = () => {
        setEditingBlog(null);
        reset();
        setIsModalOpen(true);
    };
    const onSubmit = async (data: TBlogFormData) => {
        // Manual validation for image field
        if (!data.image || data.image.trim() === '') {
            alert('Blog image is required. Please upload an image or enter an image URL.');
            return;
        }

        try {
            const blogData = {
                ...data,
                tags: data.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag)
            };

            const url = editingBlog ? `/api/blogs/${editingBlog._id}` : '/api/blogs';
            const method = editingBlog ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuthToken()}`
                },
                body: JSON.stringify(blogData)
            });

            if (response.ok) {
                setIsModalOpen(false);
                setEditingBlog(null);
                reset();
                fetchBlogs();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error('Error saving blog:', error);
            alert('An error occurred while saving the blog');
        }
    };
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Blog Management</h2>
                <button
                    onClick={openCreateModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>Create New Blog</span>
                </button>
            </div>

            {/* Blog List */}
            <div className="bg-gray-800 rounded-lg p-6">
                <div className="grid gap-4">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-16 h-16 object-cover rounded-lg"
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
                                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(blog._id)}
                                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
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
