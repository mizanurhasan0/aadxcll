"use client";
import React from 'react';
import Link from 'next/link';
import { usePublicBlogs } from '@/hooks/usePublicBlogs';
import HeaderBlog from './HeaderBlog';
import NotFound from '../shared/NotFound';
import EmptyData from '../shared/EmptyData';
import BlogCard from './BlogCard';

const Blog = () => {
  const { blogs, loading, error, fetchBlogs } = usePublicBlogs();

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

  // Show only first 3 blogs on the main page
  const visibleBlogs = blogs.slice(0, 3);
  const hasMore = blogs.length > 3;

  return (
    <HeaderBlog>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleBlogs.map((post) => (
          <BlogCard key={post._id} data={post} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-10 text-center">
          <Link href="/blogs" className="inline-block px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
            See more
          </Link>
        </div>
      )}
    </HeaderBlog>
  );
};

export default Blog;
