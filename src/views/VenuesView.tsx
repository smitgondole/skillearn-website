import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { VenueCard } from '../components/VenueCard';
import { MOCK_VENUES } from '../data/mockData';
import { Venue } from '../types';

interface VenuesViewProps {
  onViewVenue: (venueId: string) => void;
  onBookCourt: (venue: Venue) => void;
}

export const VenuesView: React.FC<VenuesViewProps> = ({
  onViewVenue,
  onBookCourt,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState<string>('ALL');

  const sports = ['ALL', 'Badminton Court', 'Multi-Sport Turf', 'Tennis & Pickleball', 'Basketball Court', 'Movement & Music'];

  const filteredVenues = MOCK_VENUES.filter(v => {
    const matchesSearch =
      !searchQuery ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.sport.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSport = selectedSport === 'ALL' || v.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
          Sports Arena Directory
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mt-1">
          YOUR GAME. YOUR PLACE. YOUR TIME.
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl">
          Find premier badminton courts, FIFA-grade turfs, and hardwood basketball floors across Pune.
        </p>
      </div>

      {/* Search and Sport Filter */}
      <div className="p-4 rounded-2xl bg-[#0F121C] border border-white/10 space-y-4 mb-8">
        <div className="relative">
          <Search className="w-5 h-5 text-emerald-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search venue name (Smash Arena, ACE Turf) or neighborhood (Kothrud, Baner)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.04] text-white text-sm border border-white/10 focus:outline-none focus:border-emerald-400 placeholder-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {sports.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSport(s)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                selectedSport === s
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Venue Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVenues.map(venue => (
          <VenueCard
            key={venue.id}
            venue={venue}
            onViewVenue={onViewVenue}
            onBookCourt={onBookCourt}
          />
        ))}
      </div>
    </div>
  );
};
