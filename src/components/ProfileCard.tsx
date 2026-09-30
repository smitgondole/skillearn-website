import React from 'react';
import { Star, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileCardProps {
  user: UserProfile;
  onViewProfile: (userId: string) => void;
  onBookSession: (user: UserProfile) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  onViewProfile,
  onBookSession,
}) => {
  return (
    <div className="group arena-card rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
      {/* Top subtle glow edge */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent group-hover:via-cyan-400/50 transition-all" />

      <div>
        {/* User Identity Header */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={user.avatar}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-xl object-cover ring-1 ring-white/10 group-hover:ring-cyan-400/40 transition-all"
            />
            {user.verified.skill && (
              <span className="absolute -bottom-1 -right-1 bg-cyan-500 text-black p-0.5 rounded-full ring-2 ring-[#0F121C]" title="Skill Verified">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                {user.name}
              </h3>
              <div className="flex items-center gap-1 font-mono text-xs text-amber-400 shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{user.rating.toFixed(1)}</span>
                <span className="text-slate-500 text-[10px]">({user.reviewCount})</span>
              </div>
            </div>

            <div className="text-xs font-semibold text-cyan-400 mt-0.5">
              {user.primarySkill}
            </div>

            {/* Unboxed metadata line with typographic separator */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                {user.location}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{user.sessionsCompleted} sessions</span>
            </div>
          </div>
        </div>

        {/* Short bio / highlight */}
        <p className="text-xs text-slate-300 mt-3.5 line-clamp-2 leading-relaxed">
          {user.bio}
        </p>

        {/* Skill tags as clean quiet text */}
        <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center gap-2 text-[11px] text-slate-400 flex-wrap">
          {user.skills.slice(0, 2).map(s => (
            <span key={s.name} className="text-slate-300 font-mono text-[10px]">
              {s.name} ({s.level})
            </span>
          ))}
          {user.teachingMode && (
            <>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-cyan-400/90 text-[10px]">{user.teachingMode}</span>
            </>
          )}
        </div>
      </div>

      {/* Pricing and Actions */}
      <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Rate</span>
          <span className="text-base font-bold font-mono text-white">
            ₹{user.pricePerSession}
            <span className="text-xs font-normal text-slate-400">/session</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewProfile(user.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
          >
            Profile
          </button>
          <button
            onClick={() => onBookSession(user)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white transition-all shadow-md shadow-cyan-500/15 flex items-center gap-1 group/btn"
          >
            <span>Book</span>
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
