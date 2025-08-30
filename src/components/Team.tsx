"use client";
import React from 'react';
import Link from 'next/link';
import { useTeam } from '@/hooks/useTeam';
import CardTeam from '@/components/teams/CardTeam';
import HeaderTeamHome from '@/components/teams/HeaderTeamHome';
import NotFound from '@/components/shared/NotFound';
import EmptyData from '@/components/shared/EmptyData';

const Team = () => {
  const {
    visibleMembers,
    members,
    isLoading,
    error,
    fetchMembers,
    hasMore
  } = useTeam({ limit: 3, activeOnly: true });

  if (isLoading) {
    return (
      <HeaderTeamHome>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <span className="ml-3 text-textmuted">Loading team members...</span>
        </div>
      </HeaderTeamHome>
    );
  }

  if (error) {
    return (
      <HeaderTeamHome>
        <NotFound error={error} onRetry={fetchMembers} message="Failed to load team members" />
      </HeaderTeamHome>
    );
  }

  if (members.length === 0) {
    return (
      <HeaderTeamHome>
        <EmptyData message="No team members found" />
      </HeaderTeamHome>
    );
  }

  return (
    <HeaderTeamHome>
      <div className="text-center mb-12">
        <p className="text-textmuted mb-6">
          {members.length === 0
            ? 'Building an amazing team...'
            : `${members.length} talented professional${members.length !== 1 ? 's' : ''} working together`
          }
        </p>
      </div>

      {/* Loading overlay when refreshing */}
      {isLoading && members.length > 0 && (
        <div className="absolute inset-0 bg-bg bg-opacity-75 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-textmuted">Updating team members...</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleMembers.map((member) => (
          <CardTeam key={member._id} member={member} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 text-center">
          <Link href="/teams" className="inline-block px-6 py-3 bg-gray-100 hover:bg-gray-200 text-textmuted rounded-lg transition-colors">See more</Link>
        </div>
      )}
    </HeaderTeamHome>
  );
};

export default Team;
