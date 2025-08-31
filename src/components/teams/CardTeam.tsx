"use client";
import React from 'react';
import { TeamMember } from '@/services/teamService';
import Image from 'next/image';

interface CardTeamProps {
    member: TeamMember;
}

const CardTeam: React.FC<CardTeamProps> = ({ member }) => {
    return (
        <div className="text-center group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative overflow-hidden rounded-t-xl">
                <Image
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-profile.svg';
                        target.alt = 'Placeholder Profile';
                    }}
                    width={500}
                    height={500}
                />
                <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <p className="text-white text-sm leading-relaxed">{member.bio}</p>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-3">{member.position}</p>
                {(member.email || member.linkedin || member.twitter || member.github) && (
                    <div className="flex justify-center space-x-3">
                        {member.email && (
                            <a
                                href={`mailto:${member.email}`}
                                className="text-gray-400 hover:text-green-500 transition-colors p-2 hover:bg-gray-100 rounded-full"
                                title="Email"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </a>
                        )}
                        {member.linkedin && (
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                                title="LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.34 8.59v8.59h-2.669V8.59h2.669z" clipRule="evenodd" />
                                </svg>
                            </a>
                        )}
                        {member.twitter && (
                            <a
                                href={member.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 transition-colors p-2 hover:bg-gray-100 rounded-full"
                                title="Twitter"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6.29 18.251c7.547 0 11.675-6.251 11.675-6.251-2.316.053-4.51-.317-6.364-1.01a8.125 8.125 0 01-1.311 4.124 8.125 8.125 0 01-4.124 1.311 8.125 8.125 0 01-1.01-6.364c.053-2.316.317-4.51 1.01-6.364a8.125 8.125 0 014.124-1.311 8.125 8.125 0 011.311-4.124 8.125 8.125 0 01-1.01 6.364c-.053 2.316-.317 4.51-1.01 6.364z" />
                                </svg>
                            </a>
                        )}
                        {member.github && (
                            <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full"
                                title="GitHub"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardTeam;


