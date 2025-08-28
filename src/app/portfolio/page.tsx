"use client";
import React from 'react';
import CardPortfolio from '../../components/portfolio/components/CardPortfolio';
import Button from '../../components/shared/Button';
import { usePortfolio } from '../../hooks/usePortfolio';

export default function PortfolioPage() {
    const {
        projects,
        visibleProjects,
        isLoading,
        error,
        activeCategory,
        filterByCategory
    } = usePortfolio();

    const categories = ['All Work', ...Array.from(new Set(projects.map(project => project.category)))];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-8">Portfolio</h1>
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
                            <span className="ml-3 text-gray-600">Loading projects...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-8">Portfolio</h1>
                        <div className="text-center py-20">
                            <div className="text-red-500 mb-4">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <p className="text-gray-600 mb-4">Failed to load projects</p>
                            <p className="text-gray-500 text-sm mb-6">{error}</p>
                            <Button onClick={() => window.location.reload()} variant="primary">Try Again</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Portfolio</h1>
                    <p className="text-gray-600 mb-8">
                        Explore all {projects.length} incredible project{projects.length !== 1 ? 's' : ''}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => filterByCategory(category)}
                                className={`px-6 py-2 rounded-full transition-colors ${activeCategory === category
                                    ? 'bg-green-400 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visibleProjects.map((project) => (
                        <CardPortfolio key={project._id} project={project} />
                    ))}
                </div>

                {visibleProjects.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <p className="text-gray-600 mb-2">No projects found in this category</p>
                        <p className="text-gray-500 text-sm">Try selecting a different category</p>
                    </div>
                )}
            </div>
        </div>
    );
}
