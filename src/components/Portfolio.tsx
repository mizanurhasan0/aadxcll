"use client";
import React, { useState, useEffect } from 'react';

interface Project {
  _id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  client: string;
  projectUrl: string;
  githubUrl: string;
  featured: boolean;
  order: number;
  active: boolean;
  completedAt: string;
  createdAt: string;
}

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All Work');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/projects');

      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status}`);
      }

      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique categories from projects
  const categories = ['All Work', ...Array.from(new Set(projects.map(project => project.category)))];

  const filteredProjects = activeCategory === 'All Work'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Most Popular</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Projects</h2>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
            <span className="ml-3 text-gray-600">Loading projects...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Most Popular</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Projects</h2>
          </div>
          <div className="text-center py-20">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">Failed to load projects</p>
            <p className="text-gray-500 text-sm mb-6">{error}</p>
            <button
              onClick={fetchProjects}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Most Popular</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Projects</h2>
          </div>
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-gray-600 mb-2">No projects found</p>
            <p className="text-gray-500 text-sm">Check back later for our amazing projects!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Most Popular</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Projects</h2>
          <p className="text-gray-600 mb-6">
            {projects.length === 0
              ? 'Creating amazing projects...'
              : `${projects.length} incredible project${projects.length !== 1 ? 's' : ''} to explore`
            }
          </p>
          <button
            onClick={fetchProjects}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            title="Refresh projects"
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
          {filteredProjects.map((project) => (
            <div key={project._id} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback to a placeholder image if the image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-project.svg';
                }}
              />
              <div className="absolute inset-0 bg-blue-600 bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center flex-col text-white">
                <div className="text-center p-4">
                  {project.featured && (
                    <div className="mb-2">
                      <svg className="w-6 h-6 text-yellow-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  )}
                  <span className="text-sm font-semibold mb-2">{project.category}</span>
                  <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                  {project.description && (
                    <p className="text-sm mb-4 opacity-90">{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="bg-white bg-opacity-20 text-white px-2 py-1 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex space-x-2">
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-blue-600 transition-colors text-sm"
                      >
                        View Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-blue-600 transition-colors text-sm"
                      >
                        View Code
                      </a>
                    )}
                    {!project.projectUrl && !project.githubUrl && (
                      <button className="border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-600 transition-colors">
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
