import React, { useState } from 'react';
import { Users, MapPin, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { MOCK_USERS } from '../data/mockData';
import { ProfileCard } from '../components/ProfileCard';
import { UserProfile } from '../types';

interface PlayersViewProps {
  onViewProfile: (userId: string) => void;
  onBookSession: (player: UserProfile) => void;
}

export const PlayersView: React.FC<PlayersViewProps> = ({
  onViewProfile,
  onBookSession,
}) => {
  const players = MOCK_USERS.filter(u => u.role === 'player' || u.role === 'learner');

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
          Sparring & Rally Partners
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mt-1">
          PRACTICE PARTNERS
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl">
          Find badminton doubles partners, cricket net bowlers, football sparring mates, and jam session musicians in Pune. Split court costs and get competitive match time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* If we have dedicated players, show them + all peer players */}
        {MOCK_USERS.map(player => (
          <ProfileCard
            key={player.id}
            user={player}
            onViewProfile={onViewProfile}
            onBookSession={onBookSession}
          />
        ))}
      </div>
    </div>
  );
};
