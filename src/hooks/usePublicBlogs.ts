import { useState, useEffect, useCallback } from 'react';

interface PublicBlogPost {
    _id: string;
    title: string;
    content: string;
    excerpt: string;
    image: string;
    tags: string[];
    published: boolean;
    author: {
        _id: string;
        username: string;
    };
    createdAt: string;
}

export const usePublicBlogs = () => {
    const [blogs, setBlogs] = useState<PublicBlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBlogs = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/blogs');

            if (!response.ok) {
                throw new Error(`Failed to fetch blog posts: ${response.status}`);
            }

            const data = await response.json();
            setBlogs(data);
        } catch (err) {
            console.error('Error fetching blog posts:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    return {
        blogs,
        loading,
        error,
        fetchBlogs
    };
};
