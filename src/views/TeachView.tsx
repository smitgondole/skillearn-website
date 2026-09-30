import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight, DollarSign, Clock, MapPin, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, SkillCategory } from '../types';

interface TeachViewProps {
  onMentorCreated: (mentor: UserProfile) => void;
  onNavigate: (route: string) => void;
}

export const TeachView: React.FC<TeachViewProps> = ({ onMentorCreated, onNavigate }) => {
  const [skillName, setSkillName] = useState('Badminton');
  const [category, setCategory] = useState<SkillCategory>('SPORTS');
  const [hourlyPrice, setHourlyPrice] = useState(300);
  const [hoursPerWeek, setHoursPerWeek] = useState(8);
  const [experienceYears, setExperienceYears] = useState(4);
  const [location, setLocation] = useState('Kothrud, Pune');
  const [bio, setBio] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Realistic monthly earnings calculation:
  // 4.3 weeks * hours/week * hourly rate
  const monthlyEarnings = Math.round(hourlyPrice * hoursPerWeek * 4.3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProfile: UserProfile = {
      id: `mentor-${Date.now()}`,
      name: 'Swetank Kulkarni',
      role: 'coach',
      primarySkill: skillName,
      category,
      title: `${experienceYears}+ Years Practical Mastery · Pune Verified Peer Coach`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=80',
      rating: 5.0,
      reviewCount: 1,
      sessionsCompleted: 1,
      location,
      distanceKm: 1.5,
      pricePerSession: hourlyPrice,
      verified: { email: true, phone: true, identity: true, skill: true },
      bio: bio || `Passionate about teaching ${skillName} fundamentals and tactical mastery through hands-on sparring sessions.`,
      responseTime: 'Usually within 15 minutes',
      completionRate: 100,
      positiveRatingPercent: 100,
      skills: [
        { name: `${skillName} Drills`, level: 'Advanced', progressPercent: 88 },
        { name: 'Sparring Fundamentals', level: 'Intermediate', progressPercent: 82 }
      ],
      achievements: [`Active player in Pune local tournaments`, `Completed SKILLEARN Peer Mentor Certification`],
      certifications: ['SKILLEARN Verified Peer Instructor'],
      availability: {
        days: ['Tue', 'Thu', 'Sat', 'Sun'],
        timeSlots: ['06:00 AM', '05:30 PM', '07:00 PM']
      },
      teachingMode: 'In-person',
      experienceYears
    };

    onMentorCreated(newProfile);
    setSubmitted(true);
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#10b981', '#3b82f6']
      });
    } catch {}
  };

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
          Become a Peer Mentor
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mt-1">
          YOU KNOW SOMETHING.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            SOMEONE WANTS TO LEARN IT.
          </span>
        </h1>
        <p className="text-base text-slate-300 mt-3 leading-relaxed">
          Turn your skills into someone else&apos;s progress. Join hundreds of students, athletes, and creators in Pune earning weekly income while building their own teaching reputation.
        </p>
      </div>

      {submitted ? (
        <div className="arena-card rounded-3xl p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto border border-cyan-500/40">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Profile Published</span>
            <h2 className="text-2xl font-bold text-white mt-1">WELCOME TO THE TEACHER NETWORK!</h2>
            <p className="text-xs text-slate-300 mt-2">
              Your profile for <strong className="text-white">{skillName}</strong> in {location} is now live in the SKILLEARN explore marketplace.
            </p>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25"
          >
            View Your Listing in Explore
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: The Teaching Profile Form */}
          <div className="lg:col-span-7 arena-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
            <h2 className="text-lg font-bold text-white uppercase font-mono">
              Create Your Teaching Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                    Skill You Teach
                  </label>
                  <input
                    type="text"
                    required
                    value={skillName}
                    onChange={e => setSkillName(e.target.value)}
                    placeholder="e.g. Badminton, Guitar, DaVinci Resolve"
                    className="w-full bg-[#161B26] text-white rounded-xl px-3.5 py-2.5 border border-white/10 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                    Discipline Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full bg-[#161B26] text-white rounded-xl px-3.5 py-2.5 border border-white/10 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="SPORTS">Sports & Courts</option>
                    <option value="CREATIVE">Creative & Music</option>
                    <option value="DIGITAL">Digital & Tech</option>
                    <option value="FITNESS">Fitness & Mobility</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                    Your Neighborhood (Pune)
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Kothrud, Baner, KP"
                    className="w-full bg-[#161B26] text-white rounded-xl px-3.5 py-2.5 border border-white/10 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                    Years of Practical Experience
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={experienceYears}
                    onChange={e => setExperienceYears(Number(e.target.value))}
                    className="w-full bg-[#161B26] text-white rounded-xl px-3.5 py-2.5 border border-white/10 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                  About Your Coaching Style
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="What makes your sessions fun and effective? What drills will learners do?"
                  className="w-full bg-[#161B26] text-white rounded-xl p-3 border border-white/10 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/25 cursor-pointer"
                >
                  Publish Mentor Profile
                </button>
              </div>
            </form>
          </div>

          {/* Right: Interactive Monthly Earnings Calculator */}
          <div className="lg:col-span-5 arena-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30 space-y-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                Interactive Calculator
              </span>
              <h3 className="text-xl font-bold text-white uppercase mt-1">
                Estimated Monthly Earnings
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Based on realistic peer mentor rates in Pune.
              </p>
            </div>

            {/* Slider 1: Hourly rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Hourly Session Fee</span>
                <span className="text-white font-bold">₹{hourlyPrice} / session</span>
              </div>
              <input
                type="range"
                min="200"
                max="800"
                step="50"
                value={hourlyPrice}
                onChange={e => setHourlyPrice(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            {/* Slider 2: Hours / week */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Commitment (Hours / Week)</span>
                <span className="text-white font-bold">{hoursPerWeek} hrs / week</span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                step="1"
                value={hoursPerWeek}
                onChange={e => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            {/* Result Box */}
            <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center space-y-1">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                Estimated Monthly Payout
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-300">
                ₹{monthlyEarnings.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-slate-400">
                ~{hoursPerWeek * 4} sessions per month · Direct UPI payout
              </span>
            </div>

            <div className="text-[11px] text-slate-400 font-mono space-y-1 pt-2 border-t border-white/5">
              <div className="flex items-center gap-1.5 text-cyan-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero listing fees · Verified Pune student guarantee</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
