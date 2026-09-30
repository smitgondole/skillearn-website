import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  teachersCount: number;
  avgPrice: number;
  rating: number;
  popular?: boolean;
}

interface SkillCardProps {
  skill: SkillItem;
  onSelect: (skillId: string) => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(skill.id)}
      className="group arena-card rounded-2xl p-5 cursor-pointer flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10"
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all">
          {skill.icon}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
            {skill.category}
          </span>
          <div className="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/20 transition-all">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
          {skill.name}
        </h4>
        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1.5 font-mono">
          <span className="text-cyan-400 font-medium">{skill.teachersCount} teachers</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>avg ₹{skill.avgPrice}/session</span>
        </div>
      </div>
    </div>
  );
};
