"use client";
import React from 'react';
import { useTeam } from '@/hooks/useTeam';
import CardTeam from '@/components/teams/CardTeam';
import HeaderTeam from '@/components/teams/HeaderTeam';
import NotFound from '@/components/shared/NotFound';
import EmptyData from '@/components/shared/EmptyData';

const TeamsPage = () => {
    const { members, isLoading, error, fetchMembers } = useTeam({ activeOnly: true });

    if (isLoading) {
        return (
            <HeaderTeam className="mb-20">
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <span className="ml-3 text-textmuted">Loading team members...</span>
                </div>
            </HeaderTeam>
        );
    }

    if (error) {
        return (
            <HeaderTeam className="mb-20">
                <NotFound error={error} onRetry={fetchMembers} message="Failed to load team members" />
            </HeaderTeam>
        );
    }

    if (members.length === 0) {
        return (
            <HeaderTeam className="mb-20">
                <EmptyData message="No team members found" />
            </HeaderTeam>
        );
    }

    return (
        <HeaderTeam className="mb-20">
            <div className="text-center mb-12">
                <p className="text-textmuted mb-6">
                    {members.length} incredible team member{members.length !== 1 ? 's' : ''} to meet
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map((member) => (
                    <CardTeam key={member._id} member={member} />
                ))}
            </div>
        </HeaderTeam>
    );
};

export default TeamsPage;


