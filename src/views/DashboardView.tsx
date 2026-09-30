import React from 'react';
import {
  Calendar,
  Flame,
  Trophy,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  TrendingUp,
  Star,
} from 'lucide-react';
import { INITIAL_USER, MOCK_PROGRESS_LIST } from '../data/mockData';
import { Booking, UserProfile } from '../types';

interface DashboardViewProps {
  bookings: Booking[];
  onNavigate: (route: string, param?: string) => void;
  onOpenReviewModal: (coach: UserProfile) => void;
  onViewProfile: (userId: string) => void;
  allCoaches: UserProfile[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  bookings,
  onNavigate,
  onOpenReviewModal,
  onViewProfile,
  allCoaches,
}) => {
  const upcomingBooking = bookings.find(b => b.status === 'confirmed');

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Personalized Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            Member Command Center
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mt-1">
            GOOD EVENING, {INITIAL_USER.greetingName.toUpperCase()} 👋
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Ready to level up today? Your next session is coming up in Pune.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('explore')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/20"
          >
            Find Next Session
          </button>
          <button
            onClick={() => onNavigate('progress')}
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-semibold border border-white/10"
          >
            View Growth
          </button>
        </div>
      </div>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="arena-card rounded-2xl p-5 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase">Skill Streak</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono mt-1 flex items-center gap-1.5">
              <Flame className="w-6 h-6 fill-amber-400 text-amber-400" />
              <span>{INITIAL_USER.streakDays} Days</span>
            </div>
            <span className="text-[11px] text-slate-400">Consistent training</span>
          </div>
        </div>

        {/* Total Sessions */}
        <div className="arena-card rounded-2xl p-5 border border-white/10">
          <span className="text-xs font-mono text-slate-400 uppercase">Total Sessions</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
            {INITIAL_USER.totalSessions}
          </div>
          <span className="text-[11px] text-cyan-400 font-mono">18 practice · 6 coaching</span>
        </div>

        {/* Skills Learning */}
        <div className="arena-card rounded-2xl p-5 border border-white/10">
          <span className="text-xs font-mono text-slate-400 uppercase">Skills Learning</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono mt-1">
            {INITIAL_USER.skillsLearningCount}
          </div>
          <span className="text-[11px] text-slate-400">Badminton, Video, Photo, Football</span>
        </div>

        {/* Skills Teaching */}
        <div className="arena-card rounded-2xl p-5 border border-white/10">
          <span className="text-xs font-mono text-slate-400 uppercase">Skills Teaching</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mt-1">
            {INITIAL_USER.skillsTeachingCount}
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">Peer Mentor unlocked</span>
        </div>
      </div>

      {/* Main Grid: Upcoming Session & Progress Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Upcoming Session Card */}
        <div className="lg:col-span-6 arena-card rounded-3xl p-6 sm:p-7 border border-cyan-500/30 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 text-xs font-mono font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                UPCOMING SESSION
              </span>
              <span className="text-xs font-mono text-amber-400">Starts in 2 hours</span>
            </div>

            {upcomingBooking ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white uppercase">
                    {upcomingBooking.skillName}
                  </h3>
                  <div className="text-sm font-semibold text-cyan-400 mt-1">
                    Coach: {upcomingBooking.coachName}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>{upcomingBooking.date} at {upcomingBooking.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>{upcomingBooking.venueName}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs">
                No active bookings right now.
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => onNavigate('messages')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
            >
              <span>Message Coach</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('journey')}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold border border-cyan-500/40"
            >
              View Lesson Drills
            </button>
          </div>
        </div>

        {/* Right: Quick Progress Overview */}
        <div className="lg:col-span-6 arena-card rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                YOUR PROGRESS
              </span>
              <span className="text-xs font-mono text-cyan-400">Level: INTERMEDIATE</span>
            </div>

            <div className="space-y-4">
              {MOCK_PROGRESS_LIST.map(prog => (
                <div key={prog.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white font-semibold">{prog.skillName} ({prog.level})</span>
                    <span className="text-cyan-300 font-bold">{prog.progressPercent}% · {prog.sessionsCompleted} sessions</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      style={{ width: `${prog.progressPercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">
              XP: 420 / 500 XP to Advanced
            </span>
            <button
              onClick={() => onNavigate('progress')}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Full Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bookings History & Review Prompts */}
      <div className="arena-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white uppercase">Session History</h3>
            <p className="text-xs text-slate-400">All reserved 1-on-1 sessions and court bookings.</p>
          </div>
        </div>

        <div className="divide-y divide-white/[0.05]">
          {bookings.map(bk => {
            const coachObj = allCoaches.find(c => c.id === bk.coachId) || allCoaches[0];
            return (
              <div key={bk.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{bk.skillName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                      bk.status === 'confirmed'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {bk.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-2 font-mono flex-wrap">
                    <span>With {bk.coachName}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{bk.date} at {bk.timeSlot}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{bk.venueName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-bold text-white">₹{bk.totalPrice}</span>
                  {bk.status === 'completed' && (
                    <button
                      onClick={() => onOpenReviewModal(coachObj)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-colors flex items-center gap-1"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-300" />
                      <span>Review</span>
                    </button>
                  )}
                  <button
                    onClick={() => onViewProfile(bk.coachId)}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs border border-white/10"
                  >
                    View Coach
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
