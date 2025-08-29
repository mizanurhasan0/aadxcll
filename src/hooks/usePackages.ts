import { useCallback, useEffect, useState } from 'react';
import { PackageItem, PackageService, PackageServiceResponse } from '@/services/packageService';

interface UsePackagesProps {
    limit?: number;
    activeOnly?: boolean;
}

export const usePackages = ({ limit, activeOnly = true }: UsePackagesProps = {}) => {
    const [packages, setPackages] = useState<PackageItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);

    const fetchPackages = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response: PackageServiceResponse<PackageItem[]> = activeOnly
                ? await PackageService.getActive()
                : await PackageService.getAll();

            if (response.success && response.data) {
                const sorted = [...response.data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
                setPackages(sorted);
            } else {
                setError(response.error || 'Failed to fetch packages');
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch packages';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, [activeOnly]);

    const getVisible = useCallback(() => {
        if (!limit || showAll) return packages;
        return packages.slice(0, limit);
    }, [packages, limit, showAll]);

    const hasMore = useCallback(() => {
        if (!limit) return false;
        return packages.length > limit;
    }, [packages, limit]);

    const loadMore = useCallback(() => setShowAll(true), []);
    const resetToLimited = useCallback(() => setShowAll(false), []);

    useEffect(() => {
        fetchPackages();
    }, [fetchPackages]);

    return {
        packages,
        visiblePackages: getVisible(),
        isLoading,
        error,
        hasMore: hasMore(),
        showAll,
        fetchPackages,
        loadMore,
        resetToLimited
    };
};


