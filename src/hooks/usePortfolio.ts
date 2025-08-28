import { useState, useEffect, useCallback } from 'react';
import { Project } from '@/types/portfolio';
import { PortfolioService, PortfolioServiceResponse } from '@/services/portfolioService';

interface UsePortfolioProps {
    initialCategory?: string;
    limit?: number;
}

export const usePortfolio = ({ initialCategory = 'All Work', limit }: UsePortfolioProps = {}) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [showAllProjects, setShowAllProjects] = useState(false);

    const fetchProjects = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response: PortfolioServiceResponse<Project[]> = await PortfolioService.getAllProjects();

            if (response.success && response.data) {
                setProjects(response.data);
                setFilteredProjects(response.data);
            } else {
                setError(response.error || 'Failed to fetch projects');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const filterByCategory = useCallback((category: string) => {
        setActiveCategory(category);
        if (category === 'All Work') {
            setFilteredProjects(projects);
        } else {
            const filtered = projects.filter(project => project.category === category);
            setFilteredProjects(filtered);
        }
    }, [projects]);

    const getVisibleProjects = useCallback(() => {
        if (!limit || showAllProjects) {
            return filteredProjects;
        }
        return filteredProjects.slice(0, limit);
    }, [filteredProjects, limit, showAllProjects]);

    const hasMoreProjects = useCallback(() => {
        if (!limit) return false;
        return filteredProjects.length > limit;
    }, [filteredProjects, limit]);

    const loadMoreProjects = useCallback(() => {
        setShowAllProjects(true);
    }, []);

    const resetToLimited = useCallback(() => {
        setShowAllProjects(false);
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    useEffect(() => {
        filterByCategory(activeCategory);
    }, [activeCategory, filterByCategory]);

    return {
        projects,
        filteredProjects,
        visibleProjects: getVisibleProjects(),
        isLoading,
        error,
        activeCategory,
        hasMoreProjects: hasMoreProjects(),
        showAllProjects,
        fetchProjects,
        filterByCategory,
        loadMoreProjects,
        resetToLimited
    };
};
