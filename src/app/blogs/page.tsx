"use client";
import React, { useState } from 'react';
import { usePublicBlogs } from '@/hooks/usePublicBlogs';
import HeaderBlog from '@/components/blog/HeaderBlog';
import NotFound from '@/components/shared/NotFound';
import EmptyData from '@/components/shared/EmptyData';
import BlogCard from '@/components/blog/BlogCard';
import Link from 'next/link';

const BlogsPage = () => {
    const { blogs, loading, error, fetchBlogs } = usePublicBlogs();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    if (loading) {
        return (
            <HeaderBlog>
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
                    <span className="ml-3 text-gray-600">Loading blog posts...</span>
                </div>
            </HeaderBlog>
        );
    }

    if (error) {
        return (
            <HeaderBlog>
                <NotFound error={error} onRetry={fetchBlogs} message="Failed to load blog posts" />
            </HeaderBlog>
        );
    }

    if (blogs.length === 0) {
        return (
            <HeaderBlog>
                <EmptyData message="No blog posts found" />
            </HeaderBlog>
        );
    }

    // Get unique categories from tags
    const categories = ['all', ...Array.from(new Set(blogs.flatMap(blog => blog.tags)))];

    // Filter blogs based on search and category
    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || blog.tags.includes(selectedCategory);

        return matchesSearch && matchesCategory;
    });

    return (
        <HeaderBlog>
            {/* Search and Filter Section */}
            <div className="mb-12">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="flex gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-4 text-right">
                    <p className="text-gray-600">
                        Showing {filteredBlogs.length} of {blogs.length} blog posts
                    </p>
                </div>
            </div>

            {/* Blog Grid */}
            {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map((post) => (
                        <BlogCard key={post._id} data={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <p className="text-gray-600 mb-2">No blogs found matching your search</p>
                    <p className="text-gray-500 text-sm">Try adjusting your search terms or category filter</p>
                </div>
            )}

            {/* Back to Home */}
            <div className="mt-16 text-center">
                <Link href="/" className="inline-block px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors">
                    Back to Home
                </Link>
            </div>
        </HeaderBlog>
    );
};

export default BlogsPage;
