"use client";
import React from 'react';
import CardPortfolio from './components/CardPortfolio';
import ShowMoreCard from './components/ShowMoreCard';
import HeaderPortfolio from './components/HeaderPortfolio';
import NotFound from '../shared/NotFound';
import EmptyData from '../shared/EmptyData';
import { usePortfolio } from '../../hooks/usePortfolio';
import { useRouter } from 'next/navigation';

interface PortfolioProps {
  limit?: number;
  isFullPage?: boolean;
  className?: string;
}

const Portfolio = ({ limit, isFullPage = false, className }: PortfolioProps) => {
  const {
    projects,
    visibleProjects,
    isLoading,
    error,
    activeCategory,
    hasMoreProjects,
    filterByCategory,
  } = usePortfolio({ limit });

  const categories = ['All Work', ...Array.from(new Set(projects.map(project => project.category)))];
  const navigate = useRouter();

  const onLoadMoreProjects = () => navigate.push('/portfolio');

  if (isLoading) {
    return (
      <HeaderPortfolio className={className}>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <span className="ml-3 text-textmuted">Loading projects...</span>
        </div>
      </HeaderPortfolio>
    );
  }

  if (error) {
    return (
      <HeaderPortfolio className={className}>
        <NotFound error={error} onRetry={() => window.location.reload()} message="Failed to load projects" />
      </HeaderPortfolio>
    );
  }

  if (projects.length === 0) {
    return (
      <HeaderPortfolio className={className}>
        <EmptyData message="No projects found" />
      </HeaderPortfolio>
    );
  }

  return (
    <HeaderPortfolio className={className}>
      <div className={`text-center mb-12`}>
        <p className="text-textmuted mb-6">
          {projects.length === 0
            ? 'Creating amazing projects...'
            : `${projects.length} incredible project${projects.length !== 1 ? 's' : ''} to explore`
          }
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => filterByCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors cursor-pointer capitalize ${activeCategory === category
                ? 'bg-primary text-textinverse'
                : 'bg-gray-100 text-textmuted hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {visibleProjects.map((project) => (
          <CardPortfolio key={project._id} project={project} />
        ))}
        {!isFullPage && hasMoreProjects && (
          <div onClick={onLoadMoreProjects}>
            <ShowMoreCard
              totalProjects={projects.length}
              visibleProjects={limit || 5}
            />
          </div>
        )}
      </div>
    </HeaderPortfolio>
  );
};

export default Portfolio;
