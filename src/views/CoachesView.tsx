import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { MOCK_USERS } from '../data/mockData';
import { ProfileCard } from '../components/ProfileCard';
import { UserProfile } from '../types';

interface CoachesViewProps {
  onViewProfile: (userId: string) => void;
  onBookSession: (coach: UserProfile) => void;
}

export const CoachesView: React.FC<CoachesViewProps> = ({
  onViewProfile,
  onBookSession,
}) => {
  const coaches = MOCK_USERS.filter(u => u.role === 'coach');

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
          Certified Coaches & Mentors
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mt-1">
          FIND YOUR COACH
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl">
          Experienced coaches across Pune with verified state credentials, BAI / AIFF certifications, and hundreds of verified reviews.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coaches.map(coach => (
          <ProfileCard
            key={coach.id}
            user={coach}
            onViewProfile={onViewProfile}
            onBookSession={onBookSession}
          />
        ))}
      </div>
    </div>
  );
};
