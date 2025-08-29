import { useState, useEffect, useCallback } from 'react';
import { TeamMember, TeamService, TeamServiceResponse } from '@/services/teamService';

interface UseTeamProps {
    limit?: number;
    activeOnly?: boolean;
}

export const useTeam = ({ limit, activeOnly = true }: UseTeamProps = {}) => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);

    const fetchMembers = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response: TeamServiceResponse<TeamMember[]> = activeOnly
                ? await TeamService.getActive()
                : await TeamService.getAll();

            if (response.success && response.data) {
                // sort by order ascending if present
                const sorted = [...response.data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
                setMembers(sorted);
            } else {
                setError(response.error || 'Failed to fetch team members');
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch team members';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, [activeOnly]);

    const getVisibleMembers = useCallback(() => {
        if (!limit || showAll) return members;
        return members.slice(0, limit);
    }, [members, limit, showAll]);

    const hasMore = useCallback(() => {
        if (!limit) return false;
        return members.length > limit;
    }, [members, limit]);

    const loadMore = useCallback(() => setShowAll(true), []);
    const resetToLimited = useCallback(() => setShowAll(false), []);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    return {
        members,
        visibleMembers: getVisibleMembers(),
        isLoading,
        error,
        hasMore: hasMore(),
        showAll,
        fetchMembers,
        loadMore,
        resetToLimited
    };
};


