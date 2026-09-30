import React from 'react';
import { Trophy, Flame, Target, Star, CheckCircle, Shield, Award, ArrowRight } from 'lucide-react';
import { MOCK_PROGRESS_LIST, INITIAL_USER } from '../data/mockData';

interface ProgressViewProps {
  onNavigate: (route: string) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ onNavigate }) => {
  const achievements = [
    { title: 'First Session', desc: 'Completed your first 1-on-1 session', icon: '🎯', unlocked: true },
    { title: '7 Day Streak', desc: 'Practiced 7 days in a row', icon: '🔥', unlocked: true },
    { title: '10 Sessions Club', desc: 'Booked and attended 10 verified training blocks', icon: '🏅', unlocked: true },
    { title: '5-Star Session', desc: 'Received a perfect 5.0 rating from your coach', icon: '⭐', unlocked: true },
    { title: 'Peer Mentor Ready', desc: 'Intermediate mastery in Badminton', icon: '🎓', unlocked: true },
    { title: 'Skill Master', desc: 'Reach Expert tier (90%+) in any skill', icon: '👑', unlocked: false },
  ];

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div>
        <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
          Mastery Matrix
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mt-1">
          YOUR GROWTH
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl">
          Track verified hours, syllabus checklists, and progression from beginner to peer mentor.
        </p>
      </div>

      {/* Main XP & Level Banner */}
      <div className="arena-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Current Rank & Tier
            </span>
            <div className="flex items-center gap-3 mt-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                {INITIAL_USER.level}
              </h2>
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
                Tier 3 of 5
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              80 XP needed to unlock <strong className="text-white">ADVANCED</strong> tier status
            </p>
          </div>

          <div className="w-full md:w-72 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Experience Points</span>
              <span className="text-cyan-400 font-bold">{INITIAL_USER.currentXp} / {INITIAL_USER.maxXp} XP</span>
            </div>
            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                style={{ width: `${(INITIAL_USER.currentXp / INITIAL_USER.maxXp) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Level Progression ladder */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-slate-400">
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            <span>Beginner (0-200 XP)</span>
          </div>
          <span>→</span>
          <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Intermediate (201-500 XP)</span>
          </div>
          <span>→</span>
          <div className="text-slate-500">Advanced (501-800 XP)</div>
          <span>→</span>
          <div className="text-slate-500">Expert (801-1200 XP)</div>
          <span>→</span>
          <div className="text-blue-400 font-semibold">Teacher (1200+ XP)</div>
        </div>
      </div>

      {/* Skills Breakdown Grid */}
      <div>
        <h3 className="text-xl font-bold text-white uppercase mb-4">Active Skills In Training</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_PROGRESS_LIST.map(item => (
            <div key={item.id} className="arena-card rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white">{item.skillName}</h4>
                  <span className="text-xs text-cyan-400 font-mono">{item.level} · {item.sessionsCompleted} of {item.targetSessions} sessions</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  {item.progressPercent}%
                </div>
              </div>

              <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  style={{ width: `${item.progressPercent}%` }}
                />
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{item.syllabus.length} Weeks Structured Roadmap</span>
                <button
                  onClick={() => onNavigate('journey')}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  <span>View Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mature Gamification: Badges & Achievements */}
      <div>
        <h3 className="text-xl font-bold text-white uppercase mb-4">Milestone Badges</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((ach, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between ${
                ach.unlocked
                  ? 'bg-white/[0.03] border-cyan-500/30'
                  : 'bg-white/[0.01] border-white/5 opacity-50'
              }`}
            >
              <div className="text-3xl mb-2">{ach.icon}</div>
              <div className="text-xs font-bold text-white mb-1">{ach.title}</div>
              <p className="text-[10px] text-slate-400 leading-tight">{ach.desc}</p>
              <span className="mt-3 text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">
                {ach.unlocked ? 'Unlocked' : 'Locked'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
