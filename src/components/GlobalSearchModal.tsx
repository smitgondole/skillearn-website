import React, { useState, useEffect, useRef } from 'react';
import { Search, X, User, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { MOCK_USERS, POPULAR_SKILLS, MOCK_VENUES } from '../data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string, itemId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  const filteredSkills = cleanQ
    ? POPULAR_SKILLS.filter(s => s.name.toLowerCase().includes(cleanQ) || s.category.toLowerCase().includes(cleanQ))
    : POPULAR_SKILLS.slice(0, 4);

  const filteredUsers = cleanQ
    ? MOCK_USERS.filter(u => u.name.toLowerCase().includes(cleanQ) || u.primarySkill.toLowerCase().includes(cleanQ) || u.location.toLowerCase().includes(cleanQ))
    : MOCK_USERS.slice(0, 3);

  const filteredVenues = cleanQ
    ? MOCK_VENUES.filter(v => v.name.toLowerCase().includes(cleanQ) || v.sport.toLowerCase().includes(cleanQ) || v.location.toLowerCase().includes(cleanQ))
    : MOCK_VENUES.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md">
      <div 
        className="w-full max-w-2xl bg-[#0F121C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search skills, coaches, or sports venues in Pune..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          {query ? (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[11px] font-mono text-slate-400 border border-white/10 px-1.5 py-0.5 rounded">
              ESC
            </span>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {/* Skills Section */}
          {filteredSkills.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2 px-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Skills
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredSkills.map(skill => (
                  <button
                    key={skill.id}
                    onClick={() => {
                      onNavigate('skills', skill.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] hover:border-cyan-500/30 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{skill.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {skill.teachersCount} teachers in Pune · ₹{skill.avgPrice}/session
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* People & Coaches */}
          {filteredUsers.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2 px-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" /> Coaches & Players
              </div>
              <div className="space-y-1.5">
                {filteredUsers.map(user => (
                  <button
                    key={user.id}
                    onClick={() => {
                      onNavigate('profile', user.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] hover:border-blue-500/30 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white group-hover:text-cyan-300">
                            {user.name}
                          </span>
                          <span className="text-xs text-cyan-400 font-mono">★ {user.rating}</span>
                        </div>
                        <div className="text-xs text-slate-400">
                          {user.primarySkill} · {user.location} · ₹{user.pricePerSession}/session
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 group-hover:text-white flex items-center gap-1">
                      View profile <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Venues */}
          {filteredVenues.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2 px-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Sports Venues
              </div>
              <div className="space-y-1.5">
                {filteredVenues.map(venue => (
                  <button
                    key={venue.id}
                    onClick={() => {
                      onNavigate('venues', venue.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] hover:border-emerald-500/30 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold font-mono">
                        {venue.sport.slice(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white group-hover:text-emerald-300">
                          {venue.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {venue.sport} · {venue.location} · ₹{venue.pricePerHour}/hr
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-emerald-400 font-medium">
                      Available Today
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredSkills.length === 0 && filteredUsers.length === 0 && filteredVenues.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-sm">
              No results found for &ldquo;{query}&rdquo;. Try &ldquo;Badminton&rdquo;, &ldquo;Aditya&rdquo;, or &ldquo;Smash Arena&rdquo;.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Search across skills, coaches & courts in Pune</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
