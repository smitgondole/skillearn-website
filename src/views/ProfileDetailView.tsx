import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ArrowLeft,
  Share2,
  ThumbsUp,
  Video,
} from 'lucide-react';
import { UserProfile, ReviewItem } from '../types';

interface ProfileDetailViewProps {
  user: UserProfile;
  reviews: ReviewItem[];
  onBack: () => void;
  onBookSession: (coach: UserProfile) => void;
  onOpenMessage: (userId: string) => void;
  onOpenReviewModal: (coach: UserProfile) => void;
}

export const ProfileDetailView: React.FC<ProfileDetailViewProps> = ({
  user,
  reviews,
  onBack,
  onBookSession,
  onOpenMessage,
  onOpenReviewModal,
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'reviews' | 'availability'>('about');

  const userReviews = reviews.filter(r => r.coachId === user.id);

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to listings</span>
      </button>

      {/* Main Profile Header Banner */}
      <div className="arena-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-2 ring-cyan-500/40 shadow-2xl"
              />
              {user.verified.skill && (
                <div
                  className="absolute -bottom-2 -right-2 bg-cyan-500 text-black p-1 rounded-full ring-4 ring-[#0F121C]"
                  title="Skill Verified"
                >
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                  {user.name}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-white/[0.06] text-cyan-300 border border-white/10">
                  {user.role}
                </span>
              </div>

              <div className="text-sm font-semibold text-cyan-400">
                {user.primarySkill}
              </div>

              {/* Trust metadata */}
              <div className="flex items-center gap-2 text-xs text-slate-300 font-mono flex-wrap">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold">{user.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({user.reviewCount} reviews)</span>
                </div>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-white font-bold">{user.sessionsCompleted} sessions</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <MapPin className="w-3 h-3" />
                  {user.location}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing and Action CTAs */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
            <div className="text-left md:text-right mr-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Session Fee
              </span>
              <span className="text-2xl font-bold font-mono text-white">
                ₹{user.pricePerSession}
                <span className="text-xs font-normal text-slate-400">/session</span>
              </span>
            </div>

            <button
              onClick={() => onBookSession(user)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/25 cursor-pointer text-center"
            >
              Book Session
            </button>

            <button
              onClick={() => onOpenMessage(user.id)}
              className="px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold text-xs border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Message</span>
            </button>
          </div>
        </div>

        {/* Verification & Trust Metrics Bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-slate-400 block text-[10px]">RESPONSE TIME</span>
            <span className="text-white font-bold mt-0.5 block">{user.responseTime}</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-slate-400 block text-[10px]">SESSION COMPLETION</span>
            <span className="text-cyan-400 font-bold mt-0.5 block">{user.completionRate}%</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-slate-400 block text-[10px]">POSITIVE REVIEWS</span>
            <span className="text-emerald-400 font-bold mt-0.5 block">{user.positiveRatingPercent}%</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-slate-400 block text-[10px]">VERIFIED CREDENTIALS</span>
            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-cyan-300">
              <span>✓ Email</span>
              <span>✓ Phone</span>
              <span>✓ Skill</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 p-1.5 bg-[#0F121C] rounded-2xl border border-white/10 mb-8 max-w-md">
        {[
          { id: 'about', label: 'About & Bio' },
          { id: 'skills', label: 'Skills & Drills' },
          { id: 'reviews', label: `Reviews (${userReviews.length})` },
          { id: 'availability', label: 'Availability' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {activeTab === 'about' && (
            <div className="arena-card rounded-2xl p-6 border border-white/10 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">About the Mentor</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {user.bio}
                </p>
              </div>

              {user.achievements.length > 0 && (
                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400" /> Key Achievements
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {user.achievements.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {user.certifications.length > 0 && (
                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Certifications & Badges
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {user.certifications.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="arena-card rounded-2xl p-6 border border-white/10 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Curriculum & Focus Areas</h3>
                <p className="text-xs text-slate-400">
                  Technique drills practiced during 1-on-1 sessions.
                </p>
              </div>

              <div className="space-y-4">
                {user.skills.map(s => (
                  <div key={s.name} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-white font-bold">{s.name}</span>
                      <span className="text-cyan-400 font-bold">{s.level} · {s.progressPercent}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        style={{ width: `${s.progressPercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Student & Peer Reviews</h3>
                <button
                  onClick={() => onOpenReviewModal(user)}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30 transition-colors"
                >
                  + Leave a Review
                </button>
              </div>

              {userReviews.length > 0 ? (
                userReviews.map(rev => (
                  <div
                    key={rev.id}
                    className="arena-card rounded-2xl p-5 border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.authorAvatar}
                          alt={rev.authorName}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{rev.authorName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{rev.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>

                    <div className="pt-2 border-t border-white/5 flex items-center gap-4 text-[10px] font-mono text-slate-400">
                      <span>Teaching: {rev.breakdown.teaching}★</span>
                      <span>Comm: {rev.breakdown.communication}★</span>
                      <span>Punctuality: {rev.breakdown.punctuality}★</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs border border-white/5 rounded-2xl">
                  No reviews yet for this mentor. Be the first to book and share feedback!
                </div>
              )}
            </div>
          )}

          {activeTab === 'availability' && (
            <div className="arena-card rounded-2xl p-6 border border-white/10 space-y-4">
              <h3 className="text-lg font-bold text-white mb-2">Available Booking Windows</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-mono uppercase text-slate-400 block mb-2">
                    Active Days
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {user.availability.days.map(d => (
                      <span key={d} className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 text-xs font-mono">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-mono uppercase text-slate-400 block mb-2">
                    Daily Time Slots
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {user.availability.timeSlots.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-300 text-xs font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Quick Booking summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="arena-card rounded-2xl p-6 border border-white/10 space-y-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Session Reservation
            </h4>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Coaching Format</span>
                <span className="text-white font-medium">{user.teachingMode} (1-on-1)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Primary Location</span>
                <span className="text-white font-medium">{user.location}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Equipment</span>
                <span className="text-white font-medium">Provided at Partner Venue</span>
              </div>
              <div className="flex justify-between py-2 font-mono text-sm">
                <span className="text-white font-bold">Standard Rate</span>
                <span className="text-cyan-400 font-bold">₹{user.pricePerSession}/hr</span>
              </div>
            </div>

            <button
              onClick={() => onBookSession(user)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/20 cursor-pointer"
            >
              Book {user.name} Now
            </button>

            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              Backed by SKILLEARN 100% Satisfaction Guarantee. Reschedule up to 2 hours before start.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
