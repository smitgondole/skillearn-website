import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { POPULAR_SKILLS } from '../data/mockData';
import { SkillCard } from '../components/SkillCard';
import { SkillCategory } from '../types';

interface SkillsCatalogViewProps {
  onSelectSkill: (skillId: string) => void;
  onNavigate: (route: string) => void;
}

export const SkillsCatalogView: React.FC<SkillsCatalogViewProps> = ({ onSelectSkill, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [query, setQuery] = useState('');

  const categories = ['ALL', 'SPORTS', 'CREATIVE', 'DIGITAL', 'FITNESS'];

  const filtered = POPULAR_SKILLS.filter(s => {
    const matchesCat = activeCategory === 'ALL' || s.category === activeCategory;
    const matchesQuery = !query || s.name.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
          Curated Catalog
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mt-1">
          SKILLS DIRECTORY
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl">
          Browse sports, arts, digital media and fitness skills taught by real practitioners in Pune.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0F121C] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skills..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.04] text-white text-xs border border-white/10 focus:outline-none focus:border-cyan-400 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(skill => (
          <SkillCard
            key={skill.id}
            skill={skill}
            onSelect={() => {
              onSelectSkill(skill.id);
              onNavigate('explore');
            }}
          />
        ))}
      </div>
    </div>
  );
};
