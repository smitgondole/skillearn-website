import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, MapPin, X, ArrowUpDown } from 'lucide-react';
import { ProfileCard } from '../components/ProfileCard';
import { MOCK_USERS, POPULAR_SKILLS } from '../data/mockData';
import { UserProfile, SkillCategory } from '../types';

interface ExploreViewProps {
  onViewProfile: (userId: string) => void;
  onBookSession: (coach: UserProfile) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onViewProfile,
  onBookSession,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedLocation, setSelectedLocation] = useState<string>('ALL');
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [selectedRole, setSelectedRole] = useState<'all' | 'coach' | 'player'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price_low' | 'sessions'>('rating');

  const puneNeighborhoods = ['ALL', 'Kothrud', 'Baner', 'Koregaon Park', 'Viman Nagar', 'Aundh', 'Shivaji Nagar', 'Kalyani Nagar'];
  const categories = ['ALL', 'SPORTS', 'CREATIVE', 'DIGITAL', 'FITNESS'];

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter(user => {
      // Search
      const matchesSearch =
        !searchQuery ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.primarySkill.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.skills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category
      const matchesCategory =
        selectedCategory === 'ALL' || user.category === selectedCategory;

      // Location
      const matchesLocation =
        selectedLocation === 'ALL' || user.location.toLowerCase().includes(selectedLocation.toLowerCase());

      // Price
      const matchesPrice = user.pricePerSession <= maxPrice;

      // Role
      const matchesRole =
        selectedRole === 'all' || user.role === selectedRole;

      return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesRole;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_low') return a.pricePerSession - b.pricePerSession;
      if (sortBy === 'sessions') return b.sessionsCompleted - a.sessionsCompleted;
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedLocation, maxPrice, selectedRole, sortBy]);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
          Skill Marketplace
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mt-1">
          FIND SOMEONE WHO CAN TEACH YOU.
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl">
          Connect directly with experienced peer teachers and coaches across Pune. Filter by location, budget, and specialty.
        </p>
      </div>

      {/* Search and Filter Control Bar */}
      <div className="p-4 rounded-2xl bg-[#0F121C] border border-white/10 space-y-4 mb-8">
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by skill (Badminton, Guitar, DaVinci Resolve) or mentor name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.04] text-white text-sm border border-white/10 focus:outline-none focus:border-cyan-400 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Category */}
          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full bg-[#161B26] text-white rounded-lg px-3 py-2 border border-white/10 focus:outline-none focus:border-cyan-400"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Neighborhood */}
          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Pune Neighborhood
            </label>
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="w-full bg-[#161B26] text-white rounded-lg px-3 py-2 border border-white/10 focus:outline-none focus:border-cyan-400"
            >
              {puneNeighborhoods.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Role type */}
          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Member Type
            </label>
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value as any)}
              className="w-full bg-[#161B26] text-white rounded-lg px-3 py-2 border border-white/10 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Members</option>
              <option value="coach">Certified Coaches & Mentors</option>
              <option value="player">Sparring & Practice Partners</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full bg-[#161B26] text-white rounded-lg px-3 py-2 border border-white/10 focus:outline-none focus:border-cyan-400"
            >
              <option value="rating">Top Rated (★ 4.9+)</option>
              <option value="sessions">Most Experienced (Sessions)</option>
              <option value="price_low">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Max Price Slider */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">Max Rate:</span>
            <input
              type="range"
              min="150"
              max="600"
              step="50"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-40 accent-cyan-400"
            />
            <span className="text-xs font-mono font-bold text-cyan-300">₹{maxPrice}/session</span>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Showing <strong className="text-white">{filteredUsers.length}</strong> available mentors
          </div>
        </div>
      </div>

      {/* Profiles Grid */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <ProfileCard
              key={user.id}
              user={user}
              onViewProfile={onViewProfile}
              onBookSession={onBookSession}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl border border-white/5 bg-white/[0.01]">
          <p className="text-slate-400 text-sm">
            No mentors matched your current filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
              setSelectedLocation('ALL');
              setMaxPrice(600);
              setSelectedRole('all');
            }}
            className="mt-3 text-xs font-semibold text-cyan-400 hover:underline"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
};
