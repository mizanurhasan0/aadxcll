"use client";
import React from 'react';
import Link from 'next/link';
import { useTeam } from '@/hooks/useTeam';
import CardTeam from '@/components/teams/CardTeam';

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
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Our Team</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
            <span className="ml-3 text-gray-600">Loading team members...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Our Team</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
          </div>
          <div className="text-center py-20">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">Failed to load team members</p>
            <p className="text-gray-500 text-sm mb-6">{error}</p>
            <button onClick={fetchMembers} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">Try Again</button>
          </div>
        </div>
      </section>
    );
  }

  if (members.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Our Team</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
          </div>
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-2">No team members found</p>
            <p className="text-gray-500 text-sm">Check back later to meet our amazing team!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Our Team</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-gray-600 mb-6">
            {members.length === 0
              ? 'Building an amazing team...'
              : `${members.length} talented professional${members.length !== 1 ? 's' : ''} working together`
            }
          </p>
        </div>

        {/* Loading overlay when refreshing */}
        {isLoading && members.length > 0 && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
              <p className="text-gray-600">Updating team members...</p>
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
            <Link href="/teams" className="inline-block px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">See more</Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
