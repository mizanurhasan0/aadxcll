'use client';
import React, { useState } from 'react';

const projects = [
  {
    image: '/projects/blog-1.jpeg',
    title: 'E-Shop Ecommerce',
    category: 'Developing'
  },
  {
    image: '/projects/blog-2.jpeg',
    title: 'Desktop Mockup',
    category: 'UI/UX'
  },
  {
    image: '/projects/blog-3.jpeg',
    title: 'Mobile Crypto Wallet',
    category: 'Software'
  },
  {
    image: '/projects/blog-1.jpeg',
    title: 'Art Deco Cocktails',
    category: 'UI/UX'
  },
  {
    image: '/projects/blog-2.jpeg',
    title: 'Creative Agency',
    category: 'Web Design'
  },
  {
    image: '/projects/blog-3.jpeg',
    title: 'Low Poly Base Mesh',
    category: 'Graphic Design'
  }
];

const categories = ['All Work', 'Software', 'UI/UX', 'Web Design', 'Developing', 'Graphic Design'];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All Work');

  const filteredProjects = activeCategory === 'All Work'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Most Popular</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Projects</h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-colors ${activeCategory === category
                  ? 'bg-green-400 text-white'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-blue-600 bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center flex-col text-white">
                <span className="text-sm font-semibold mb-2">{project.category}</span>
                <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                <button className="border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-600 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
