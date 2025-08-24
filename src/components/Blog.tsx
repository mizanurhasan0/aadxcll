"use client";
import React, { useState, useEffect } from 'react';

interface BlogPost {
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

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/blogs');

      if (!response.ok) {
        throw new Error(`Failed to fetch blog posts: ${response.status}`);
      }

      const data = await response.json();
      setBlogPosts(data);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryFromTags = (tags: string[]) => {
    if (!tags || tags.length === 0) return 'General';
    return tags[0].charAt(0).toUpperCase() + tags[0].slice(1);
  };

  if (isLoading) {
    return (
      <section id="blogs" className="py-20 bg-white pb-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">All Blog</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Latest Post</h2>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
            <span className="ml-3 text-gray-600">Loading blog posts...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blogs" className="py-20 bg-white pb-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">All Blog</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Latest Post</h2>
          </div>
          <div className="text-center py-20">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">Failed to load blog posts</p>
            <p className="text-gray-500 text-sm mb-6">{error}</p>
            <button
              onClick={fetchBlogPosts}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <section id="blogs" className="py-20 bg-white pb-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">All Blog</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Latest Post</h2>
          </div>
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-2">No blog posts found</p>
            <p className="text-gray-500 text-sm">Check back later for our latest articles!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blogs" className="py-20 bg-white pb-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">All Blog</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Post</h2>
          <p className="text-gray-600 mb-6">
            {blogPosts.length === 0
              ? 'Creating amazing content...'
              : `${blogPosts.length} insightful article${blogPosts.length !== 1 ? 's' : ''} to explore`
            }
          </p>
          <button
            onClick={fetchBlogPosts}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            title="Refresh blog posts"
          >
            <svg
              className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post._id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to a placeholder image if the image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-blog.svg';
                  }}
                />
                {/* Hover overlay with excerpt */}
                <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <p className="text-white text-sm leading-relaxed text-center">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {getCategoryFromTags(post.tags)}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  By {post.author?.username || 'Anonymous'}
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {post.title}
                </h3>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Read More Button */}
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
