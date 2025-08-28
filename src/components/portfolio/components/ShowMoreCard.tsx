import React from 'react';
import Button from '../../shared/Button';

interface ShowMoreCardProps {
    totalProjects: number;
    visibleProjects: number;
}

export default function ShowMoreCard({ totalProjects, visibleProjects }: ShowMoreCardProps) {
    const remainingProjects = totalProjects - visibleProjects;

    return (
        <div className="group cursor-pointer relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-dashed border-gray-300 hover:border-green-400">
            <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center flex-col">
                <div className="text-center p-4">
                    <div className="mb-4">
                        <svg className="w-16 h-16 text-gray-400 group-hover:text-green-500 mx-auto transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-600 group-hover:text-gray-800 mb-2 transition-colors duration-300">
                        Show More
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600 mb-6 transition-colors duration-300">
                        {remainingProjects} more project{remainingProjects !== 1 ? 's' : ''} to explore
                    </p>
                    <Button
                        variant="primary"
                        size="md"
                        className="group-hover:scale-105 transition-transform duration-300"
                    >
                        View All Projects
                    </Button>
                </div>
            </div>
        </div>
    );
}
