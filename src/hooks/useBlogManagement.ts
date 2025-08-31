import { useState, useEffect, useCallback } from 'react';
import { TBlog, TBlogFormData } from '@/components/dashboard/blogManagement/TypeBlogManagement';
import { BlogService } from '@/services/blogService';
import { useToaster } from '@/components/shared/useToaster';

interface UseBlogManagementProps {
    token: string;
}

export const useBlogManagement = ({ token }: UseBlogManagementProps) => {
    const [blogs, setBlogs] = useState<TBlog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { showSuccess, showError, showWarning } = useToaster();

    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await BlogService.getAllBlogs();

            if (response.success && response.data) {
                setBlogs(response.data);
            } else {
                setError(response.error || 'Failed to fetch blogs');
                showError(response.error || 'Failed to fetch blogs');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching blogs';
            setError(errorMessage);
            showError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [showError]);

    const createBlog = useCallback(async (blogData: TBlogFormData): Promise<boolean> => {
        if (!blogData.image || blogData.image.trim() === '') {
            showWarning('Blog image is required. Please upload an image or enter an image URL.');
            return false;
        }

        setLoading(true);

        try {
            const response = await BlogService.createBlog(blogData, token);

            if (response.success && response.data) {
                showSuccess('Blog created successfully');
                await fetchBlogs();
                return true;
            } else {
                showError(response.error || 'Failed to create blog');
                return false;
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred while creating the blog';
            showError(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    }, [token, fetchBlogs, showSuccess, showError, showWarning]);

    const updateBlog = useCallback(async (id: string, blogData: TBlogFormData): Promise<boolean> => {
        if (!blogData.image || blogData.image.trim() === '') {
            showWarning('Blog image is required. Please upload an image or enter an image URL.');
            return false;
        }

        setLoading(true);

        try {
            const response = await BlogService.updateBlog(id, blogData, token);

            if (response.success && response.data) {
                showSuccess('Blog updated successfully');
                await fetchBlogs();
                return true;
            } else {
                showError(response.error || 'Failed to update blog');
                return false;
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred while updating the blog';
            showError(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    }, [token, fetchBlogs, showSuccess, showError, showWarning]);

    const deleteBlog = useCallback(async (id: string): Promise<boolean> => {
        if (!window.confirm('Are you sure you want to delete this blog post?')) {
            return false;
        }

        setLoading(true);

        try {
            const response = await BlogService.deleteBlog(id, token);

            if (response.success) {
                showSuccess('Blog deleted successfully');
                await fetchBlogs();
                return true;
            } else {
                showError(response.error || 'Failed to delete blog');
                return false;
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred while deleting the blog';
            showError(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    }, [token, fetchBlogs, showSuccess, showError]);

    const publishBlog = useCallback(async (id: string, published: boolean): Promise<boolean> => {
        setLoading(true);

        try {
            const response = await BlogService.publishBlog(id, published, token);

            if (response.success && response.data) {
                showSuccess(`Blog ${published ? 'published' : 'unpublished'} successfully`);
                await fetchBlogs();
                return true;
            } else {
                showError(response.error || `Failed to ${published ? 'publish' : 'unpublish'} blog`);
                return false;
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : `An error occurred while ${published ? 'publishing' : 'unpublishing'} the blog`;
            showError(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    }, [token, fetchBlogs, showSuccess, showError]);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    return {
        blogs,
        loading,
        error,
        fetchBlogs,
        createBlog,
        updateBlog,
        deleteBlog,
        publishBlog
    };
};
