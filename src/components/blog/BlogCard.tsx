import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

interface BlogCardProps {
    data: PublicBlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
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

    return (
        <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="relative overflow-hidden">
                <Image src={data.image} alt={data.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" width={500} height={500}
                />
                {/* Hover overlay with excerpt */}
                <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <p className="text-white text-sm leading-relaxed text-center">
                        {data.excerpt || 'Click to read more...'}
                    </p>
                </div>
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {getCategoryFromTags(data.tags)}
                    </span>
                    <span className="text-gray-500 text-xs">
                        {formatDate(data.createdAt)}
                    </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                    By {data.author?.username || 'Anonymous'}
                </p>
                <h3 title={data.title} className="text-xl font-semibold text-gray-900 mb-4 overflow-hidden line-clamp-1" >
                    {data.title}
                </h3>

                {/* Tags */}
                {data?.tags && data?.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4 line-clamp-1">
                        {data?.tags?.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                            >
                                {tag}
                            </span>
                        ))}
                        {data?.tags?.length > 3 && (
                            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                                +{data?.tags?.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                {/* Read More Button */}
                <Link
                    href={`/blogs/${data._id}`}
                    className="w-full bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium inline-block text-center"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
