import React from 'react';

const blogPosts = [
  {
    title: 'Suspendisse Pretium Magna Qu Nisl Egestas Porttitor.',
    category: 'Develop',
    author: 'The CodeGrammer',
    date: 'June 23, 2025',
    image: '/projects/blog-1.jpeg'
  },
  {
    title: 'Quisque Malesuada Sapien And Donec Sed Nunc.',
    category: 'Business',
    author: 'The CodeGrammer',
    date: 'June 23, 2025',
    image: '/projects/blog-2.jpeg'
  },
  {
    title: 'In A Augue Sit Amet Erat Suspel Eleifend Suscipit Issen.',
    category: 'Software',
    author: 'The CodeGrammer',
    date: 'June 23, 2025',
    image: '/projects/blog-3.jpeg'
  }
];

const Blog = () => (
  <section id="blogs" className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">All Blog</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Latest Post</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post, idx) => (
          <div key={idx} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
                  {post.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">By, {post.author} {post.date}</p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{post.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Blog;
