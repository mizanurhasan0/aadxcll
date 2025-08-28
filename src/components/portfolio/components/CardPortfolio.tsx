import React from 'react';
import Button from '../../shared/Button';
import { CardPortfolioProps } from '../../../types/portfolio';

export default function CardPortfolio({ project }: CardPortfolioProps) {
    return (
        <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
            <div className="absolute inset-0 bg-blue-900 bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center flex-col text-white">
                <div className="text-center p-4">
                    {project.featured && (
                        <div className="mb-2 absolute top-0 right-0">
                            <svg className="w-6 h-6 text-yellow-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                    )}
                    <span className="text-sm font-semibold mb-2">{project.category}</span>
                    <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                    {project.description && (
                        <p className="text-sm mb-4 opacity-90 line-clamp-3 text-center">{project.description}</p>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                            {project.technologies.slice(0, 3).map((tech, index) => (
                                <span key={index} className="bg-green-900 bg-opacity-20 text-white px-2 py-1 rounded text-xs line-clamp-1">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                    <div className="flex space-x-2 justify-center">
                        {project.projectUrl && (
                            <Button href={project.projectUrl} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" className="rounded-md ">
                                View Live
                            </Button>
                        )}
                        {project.githubUrl && (
                            <Button href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" className="rounded-md ">
                                View Code
                            </Button>
                        )}
                        {!project.projectUrl && !project.githubUrl && (
                            <Button className="rounded-md " variant="outline" size="sm">View Details</Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
