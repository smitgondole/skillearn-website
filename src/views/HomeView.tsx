import React, { useState } from 'react';
import { Hero3DScene } from '../components/Hero3DScene';
import { ProfileCard } from '../components/ProfileCard';
import { VenueCard } from '../components/VenueCard';
import { SkillCard } from '../components/SkillCard';
import { POPULAR_SKILLS, MOCK_USERS, MOCK_VENUES, HOW_IT_WORKS_STEPS } from '../data/mockData';
import { UserProfile, Venue, SkillCategory } from '../types';
import {
  ArrowRight,
  Sparkles,
  Users,
  Compass,
  Trophy,
  Flame,
  CheckCircle2,
  Calendar,
  Layers,
  MapPin,
  TrendingUp,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (route: string, param?: string) => void;
  onBookSession: (coach: UserProfile) => void;
  onOpenSearch: () => void;
  onSelectVenue: (venueId: string) => void;
  onSelectProfile: (userId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onBookSession,
  onOpenSearch,
  onSelectVenue,
  onSelectProfile,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'ALL'>('ALL');
  const [journeyChecked, setJourneyChecked] = useState<{ [key: string]: boolean }>({
    'w1-1': true,
    'w1-2': true,
    'w2-1': true,
    'w2-2': true,
    'w3-1': true,
    'w4-1': false,
    'w4-2': false,
  });

  const categories: (SkillCategory | 'ALL')[] = ['ALL', 'SPORTS', 'CREATIVE', 'DIGITAL', 'FITNESS'];

  const filteredSkills = selectedCategory === 'ALL'
    ? POPULAR_SKILLS
    : POPULAR_SKILLS.filter(s => s.category === selectedCategory);

  const coaches = MOCK_USERS.filter(u => u.role === 'coach');

  const toggleJourneyMilestone = (key: string) => {
    setJourneyChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative overflow-hidden">
      {/* ----------------- 08 & 09. HERO SECTION ----------------- */}
      <section className="relative pt-24 sm:pt-32 pb-16 lg:pb-24 overflow-hidden arena-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Typography & Primary CTAs */}
            <div className="lg:col-span-6 z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Peer-to-Peer Skill & Sports Discovery · Pune</span>
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tighter text-white uppercase leading-[0.95] font-display">
                LEARN SKILLS.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                  MEET PEOPLE.
                </span>
                <br />
                GROW TOGETHER.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                SKILLEARN connects you with people who can teach what you want to learn—from badminton and turf sports to studio photography and code. Practice together. Track real progress.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('explore')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide transition-all shadow-xl shadow-cyan-500/25 flex items-center gap-2 group cursor-pointer"
                >
                  <span>FIND A SKILL</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('teach')}
                  className="px-6 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold text-sm border border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer"
                >
                  TEACH A SKILL
                </button>
              </div>

              {/* Trust statement */}
              <div className="flex items-center gap-4 pt-3 text-xs text-slate-400 font-mono">
                <div className="flex -space-x-2 overflow-hidden">
                  {MOCK_USERS.slice(0, 4).map(u => (
                    <img
                      key={u.id}
                      src={u.avatar}
                      alt={u.name}
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-[#08090C] object-cover"
                    />
                  ))}
                </div>
                <span>Built for students, creators & athletes in Pune</span>
              </div>
            </div>

            {/* Right: 3D Interactive Sports Environment + Floating Skill Cards */}
            <div className="lg:col-span-6 relative">
              <Hero3DScene />

              {/* Floating Skill Cards as part of 3D environment */}
              <div className="absolute top-4 left-2 sm:left-6 animate-in fade-in slide-in-from-left-4 duration-700 pointer-events-auto">
                <div
                  onClick={() => onSelectProfile('aditya-sharma')}
                  className="p-3 rounded-2xl bg-[#0F1420]/80 backdrop-blur-xl border border-cyan-500/30 shadow-2xl cursor-pointer hover:border-cyan-400 transition-all hover:scale-105"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🏸</span>
                    <div>
                      <div className="text-xs font-bold text-white">Badminton Match Drills</div>
                      <div className="text-[11px] text-cyan-300 font-mono">Advanced · ₹250/session</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 right-2 sm:right-6 animate-in fade-in slide-in-from-right-4 duration-700 pointer-events-auto">
                <div
                  onClick={() => onSelectProfile('sneha-patil')}
                  className="p-3 rounded-2xl bg-[#0F1420]/80 backdrop-blur-xl border border-sky-500/30 shadow-2xl cursor-pointer hover:border-sky-400 transition-all hover:scale-105"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">📷</span>
                    <div>
                      <div className="text-xs font-bold text-white">Street Photography Walk</div>
                      <div className="text-[11px] text-sky-300 font-mono">Intermediate · ₹400/session</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block absolute top-1/2 -left-4 -translate-y-1/2 pointer-events-auto">
                <div
                  onClick={() => onSelectProfile('meera-shah')}
                  className="p-2.5 rounded-xl bg-[#0F1420]/80 backdrop-blur-xl border border-blue-500/30 shadow-xl cursor-pointer hover:border-blue-400 transition-all hover:scale-105"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🎸</span>
                    <div>
                      <div className="text-xs font-bold text-white">Fingerstyle Guitar</div>
                      <div className="text-[10px] text-blue-300 font-mono">Beginner · ₹350/session</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 11. TRUST / SOCIAL PROOF ----------------- */}
      <section className="relative py-12 border-y border-white/[0.06] bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              Credibility & Community
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              BUILT FOR PEOPLE WHO KEEP LEARNING.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                10K+
              </div>
              <div className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
                Learners
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono tracking-tight">
                2K+
              </div>
              <div className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
                Skill Teachers
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-3xl sm:text-4xl font-extrabold text-sky-400 font-mono tracking-tight">
                25K+
              </div>
              <div className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
                Sessions Completed
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
                500+
              </div>
              <div className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
                Skills Cataloged
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 12. SKILL DISCOVERY ----------------- */}
      <section className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              Skill Directory
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase mt-1">
              WHAT DO YOU WANT TO LEARN?
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-lg">
              Find people who already know what you want to learn. Filter by discipline and jump straight into 1-on-1 sessions.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#121622] rounded-xl border border-white/10 overflow-x-auto max-w-full">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSkills.slice(0, 8).map(skill => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onSelect={() => onNavigate('skills', skill.id)}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('skills')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            <span>View All 500+ Skills</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </section>

      {/* ----------------- 13. "PEOPLE NOT COURSES" SECTION ----------------- */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#0B0E17] to-transparent border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              The Real Difference
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mt-2">
              DON&apos;T JUST TAKE A COURSE.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                LEARN FROM A PERSON.
              </span>
            </h2>
            <p className="text-base text-slate-300 mt-4 leading-relaxed">
              Video courses leave you stranded when you get stuck on a backhand grip, a camera setting, or a code bug. With SKILLEARN, you meet real practitioners who watch you play, give immediate physical feedback, and accelerate your learning curve 10x.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coaches.slice(0, 3).map(coach => (
              <ProfileCard
                key={coach.id}
                user={coach}
                onViewProfile={onSelectProfile}
                onBookSession={onBookSession}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 14. COACH DISCOVERY SECTION ----------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              Hand-picked Mentors
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase mt-1">
              FIND YOUR COACH.
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Vetted coaches across sports and creative disciplines in Pune.
            </p>
          </div>

          <button
            onClick={() => onNavigate('coaches')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
          >
            <span>Explore all coaches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_USERS.slice(0, 6).map(u => (
            <ProfileCard
              key={u.id}
              user={u}
              onViewProfile={onSelectProfile}
              onBookSession={onBookSession}
            />
          ))}
        </div>
      </section>

      {/* ----------------- 15. VENUE SECTION ----------------- */}
      <section className="py-20 bg-black/40 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
                Sports Venues & Courts
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight mt-1">
                YOUR GAME.
                <br />
                YOUR PLACE. YOUR TIME.
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-lg">
                Find courts, turfs and grounds near you in Pune. Reserve slots alongside your coaching session or book open practice courts with friends.
              </p>
            </div>

            <button
              onClick={() => onNavigate('venues')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 self-start sm:self-end"
            >
              <span>View all venues</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_VENUES.slice(0, 3).map(venue => (
              <VenueCard
                key={venue.id}
                venue={venue}
                onViewVenue={onSelectVenue}
                onBookCourt={() => onSelectVenue(venue.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 16. HOW SKILLEARN WORKS ----------------- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            The Product Loop
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase mt-2">
            HOW SKILLEARN WORKS
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Discover → Connect → Book → Practice → Progress → Teach
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {HOW_IT_WORKS_STEPS.map(item => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-extrabold font-mono text-cyan-400/80 block">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-white mt-3 uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-cyan-400/90">
                {item.highlight}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------- 18 & 19. PROGRESS EXPERIENCE & LEARNING JOURNEY ----------------- */}
      <section className="py-20 bg-gradient-to-b from-[#0B0E17] to-transparent border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Progress Visualization */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                  Growth System
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase mt-1">
                  YOUR SKILL.
                  <br />
                  YOUR PROGRESS.
                </h2>
                <p className="text-sm text-slate-300 mt-2">
                  Never guess your level. Follow structured milestones verified by your coach, build streaks, and unlock peer-teaching credentials.
                </p>
              </div>

              {/* Tier ladder */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-slate-500">BEGINNER</span>
                <span>→</span>
                <span className="text-cyan-400 font-bold">INTERMEDIATE</span>
                <span>→</span>
                <span className="text-slate-500">ADVANCED</span>
                <span>→</span>
                <span className="text-slate-500">EXPERT</span>
                <span>→</span>
                <span className="text-blue-400 font-semibold">TEACHER</span>
              </div>

              {/* Skills Progress Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-white font-semibold flex items-center gap-1.5">
                      🏸 BADMINTON
                    </span>
                    <span className="text-cyan-400 font-bold">78% · 8 sessions completed</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-white font-semibold flex items-center gap-1.5">
                      ✂️ VIDEO EDITING
                    </span>
                    <span className="text-sky-400 font-bold">52% · 5 sessions completed</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full" style={{ width: '52%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-white font-semibold flex items-center gap-1.5">
                      📷 PHOTOGRAPHY
                    </span>
                    <span className="text-amber-400 font-bold">64% · 6 sessions completed</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: '64%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-white font-semibold flex items-center gap-1.5">
                      ⚽ FOOTBALL
                    </span>
                    <span className="text-emerald-400 font-bold">31% · 3 sessions completed</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: '31%' }} />
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('progress')}
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
              >
                <span>Open full growth dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Learning Journey Timeline for Badminton */}
            <div className="lg:col-span-7 arena-card rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🏸</span>
                  <div>
                    <h3 className="text-base font-bold text-white">BADMINTON MASTERY ROADMAP</h3>
                    <p className="text-xs text-slate-400">Coached by Aditya Sharma · Click to mark skills completed</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 text-xs font-mono">
                  Week 4 In Progress
                </span>
              </div>

              <div className="mt-6 space-y-6">
                {/* Week 1 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                    <div className="w-[2px] h-full bg-cyan-500/40 my-1" />
                  </div>
                  <div className="pb-4">
                    <span className="text-xs font-mono text-cyan-400 uppercase">WEEK 1</span>
                    <h4 className="text-sm font-semibold text-white">Grip & Basic Stance</h4>
                    <div className="mt-2 space-y-1">
                      <button
                        onClick={() => toggleJourneyMilestone('w1-1')}
                        className="flex items-center gap-2 text-xs text-slate-300 hover:text-white"
                      >
                        <span className={journeyChecked['w1-1'] ? 'text-cyan-400' : 'text-slate-600'}>
                          {journeyChecked['w1-1'] ? '✓' : '○'}
                        </span>
                        <span>V-Grip & Backhand thumb grip transition</span>
                      </button>
                      <button
                        onClick={() => toggleJourneyMilestone('w1-2')}
                        className="flex items-center gap-2 text-xs text-slate-300 hover:text-white"
                      >
                        <span className={journeyChecked['w1-2'] ? 'text-cyan-400' : 'text-slate-600'}>
                          {journeyChecked['w1-2'] ? '✓' : '○'}
                        </span>
                        <span>Basic ready stance & split-step bounce</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Week 2 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                    <div className="w-[2px] h-full bg-cyan-500/40 my-1" />
                  </div>
                  <div className="pb-4">
                    <span className="text-xs font-mono text-cyan-400 uppercase">WEEK 2</span>
                    <h4 className="text-sm font-semibold text-white">Forehand & Backhand Clears</h4>
                    <div className="mt-2 space-y-1">
                      <button
                        onClick={() => toggleJourneyMilestone('w2-1')}
                        className="flex items-center gap-2 text-xs text-slate-300 hover:text-white"
                      >
                        <span className={journeyChecked['w2-1'] ? 'text-cyan-400' : 'text-slate-600'}>
                          {journeyChecked['w2-1'] ? '✓' : '○'}
                        </span>
                        <span>Full shoulder rotation high clear</span>
                      </button>
                      <button
                        onClick={() => toggleJourneyMilestone('w2-2')}
                        className="flex items-center gap-2 text-xs text-slate-300 hover:text-white"
                      >
                        <span className={journeyChecked['w2-2'] ? 'text-cyan-400' : 'text-slate-600'}>
                          {journeyChecked['w2-2'] ? '✓' : '○'}
                        </span>
                        <span>Backhand defensive lift from rear court</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Week 3 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                    <div className="w-[2px] h-full bg-white/20 my-1" />
                  </div>
                  <div className="pb-4">
                    <span className="text-xs font-mono text-cyan-400 uppercase">WEEK 3</span>
                    <h4 className="text-sm font-semibold text-white">Service & Net Kill</h4>
                    <div className="mt-2 space-y-1">
                      <button
                        onClick={() => toggleJourneyMilestone('w3-1')}
                        className="flex items-center gap-2 text-xs text-slate-300 hover:text-white"
                      >
                        <span className={journeyChecked['w3-1'] ? 'text-cyan-400' : 'text-slate-600'}>
                          {journeyChecked['w3-1'] ? '✓' : '○'}
                        </span>
                        <span>Low tumble flick service over tape</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Week 4 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full border border-cyan-400 text-cyan-400 flex items-center justify-center font-bold text-xs">
                      ○
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-cyan-400 uppercase">WEEK 4 (CURRENT)</span>
                    <h4 className="text-sm font-semibold text-white">Jump Smash & Footwork Acceleration</h4>
                    <div className="mt-2 space-y-1">
                      <button
                        onClick={() => toggleJourneyMilestone('w4-1')}
                        className="flex items-center gap-2 text-xs text-slate-300 hover:text-white"
                      >
                        <span className={journeyChecked['w4-1'] ? 'text-cyan-400' : 'text-slate-600'}>
                          {journeyChecked['w4-1'] ? '✓' : '○'}
                        </span>
                        <span>Scissor kick jump smash steep angle</span>
                      </button>
                      <button
                        onClick={() => toggleJourneyMilestone('w4-2')}
                        className="flex items-center gap-2 text-xs text-slate-300 hover:text-white"
                      >
                        <span className={journeyChecked['w4-2'] ? 'text-cyan-400' : 'text-slate-600'}>
                          {journeyChecked['w4-2'] ? '✓' : '○'}
                        </span>
                        <span>Rapid 6-point diagonal corner footwork</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 20. TEACH A SKILL CTA ----------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#0F1422] to-[#121A2B] border border-cyan-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                Peer Teaching Revolution
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
                YOU KNOW SOMETHING.
                <br />
                SOMEONE WANTS TO LEARN IT.
              </h2>
              <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                Turn your skills into someone else&apos;s progress. Whether you play district badminton, shoot indie films, or play fingerstyle guitar, you can mentor eager beginners in your neighborhood.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('teach')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide transition-all shadow-xl shadow-cyan-500/25 cursor-pointer"
                >
                  START TEACHING
                </button>
              </div>
            </div>

            {/* Realistic Teacher Metrics Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 space-y-4">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Average Peer Mentor Snapshot (Pune)
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-2xl font-bold font-mono text-white">32</span>
                  <span className="text-xs text-slate-400 block">Sessions / Month</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-2xl font-bold font-mono text-amber-400">4.9 ★</span>
                  <span className="text-xs text-slate-400 block">Avg Rating</span>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-300 block">Est. Monthly Earnings</span>
                  <span className="text-xl font-bold font-mono text-cyan-300">₹12,500</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">8 hrs/week</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 21 & 54. FINAL DRAMATIC CTA ----------------- */}
      <section className="py-24 relative text-center border-t border-white/[0.06] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            Start Today
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tighter uppercase font-display leading-[0.95]">
            DON&apos;T JUST LEARN A SKILL.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              BECOME SOMEONE WHO CAN TEACH IT.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            CONNECT. LEARN. PRACTICE. GROW.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('explore')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide transition-all shadow-xl shadow-cyan-500/25 cursor-pointer"
            >
              EXPLORE SKILLS
            </button>
            <button
              onClick={() => onNavigate('teach')}
              className="px-8 py-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold text-sm border border-white/10 transition-all cursor-pointer"
            >
              START TEACHING
            </button>
          </div>
        </div>
      </section>

      {/* ----------------- 49. FOOTER ----------------- */}
      <footer className="py-16 border-t border-white/[0.08] bg-[#050608] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 space-y-3">
              <div className="text-xl font-extrabold tracking-tighter text-white font-display">
                <span>SKILL</span>
                <span className="text-cyan-400">EARN</span>
              </div>
              <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
                Learn. Teach. Play. Grow. Peer-to-peer skill learning, sports and social discovery platform.
              </p>
              <div className="text-xs text-cyan-400/80 font-mono pt-2">
                BUILD YOUR SKILL. BUILD YOUR COMMUNITY.
              </div>
            </div>

            <div>
              <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Platform</div>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => onNavigate('explore')} className="hover:text-white">Explore</button></li>
                <li><button onClick={() => onNavigate('skills')} className="hover:text-white">Skills Catalog</button></li>
                <li><button onClick={() => onNavigate('players')} className="hover:text-white">Practice Partners</button></li>
                <li><button onClick={() => onNavigate('coaches')} className="hover:text-white">Coaches</button></li>
                <li><button onClick={() => onNavigate('venues')} className="hover:text-white">Sports Venues</button></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Company</div>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => onNavigate('teach')} className="hover:text-white">Become a Mentor</button></li>
                <li><button onClick={() => onNavigate('dashboard')} className="hover:text-white">User Dashboard</button></li>
                <li><button onClick={() => onNavigate('progress')} className="hover:text-white">Growth Roadmap</button></li>
                <li><span className="hover:text-white cursor-pointer">About Us</span></li>
                <li><span className="hover:text-white cursor-pointer">Safety & Vetting</span></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Locations</div>
              <ul className="space-y-2 text-slate-400 font-mono text-[11px]">
                <li>Pune · Kothrud</li>
                <li>Pune · Baner</li>
                <li>Pune · Koregaon Park</li>
                <li>Pune · Viman Nagar</li>
                <li>Pune · Deccan</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4">
            <div>
              © 2026 SKILLEARN Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <span className="hover:text-slate-400 cursor-pointer">Privacy</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms</span>
              <span className="hover:text-slate-400 cursor-pointer">Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
