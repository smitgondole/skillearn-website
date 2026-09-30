import React, { useState } from 'react';
import { Check, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { MOCK_PROGRESS_LIST } from '../data/mockData';

interface JourneyViewProps {
  onBack: () => void;
  onNavigate: (route: string) => void;
}

export const JourneyView: React.FC<JourneyViewProps> = ({ onBack, onNavigate }) => {
  const [selectedSkillId, setSelectedSkillId] = useState<string>('sp-badminton');
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    'topic-sp-badminton-0-0': true,
    'topic-sp-badminton-0-1': true,
    'topic-sp-badminton-1-0': true,
    'topic-sp-badminton-1-1': true,
    'topic-sp-badminton-2-0': true,
    'topic-sp-badminton-2-1': true,
    'topic-sp-badminton-3-0': false,
    'topic-sp-badminton-3-1': false,
  });

  const currentSkill = MOCK_PROGRESS_LIST.find(s => s.id === selectedSkillId) || MOCK_PROGRESS_LIST[0];

  const toggleTopic = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Growth</span>
      </button>

      <div>
        <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
          Curriculum Tracker
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mt-1">
          LEARNING JOURNEY
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl">
          Weekly milestone roadmap verified by your coaches. Work through core drills to graduate to the next tier.
        </p>
      </div>

      {/* Skill Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {MOCK_PROGRESS_LIST.map(skill => (
          <button
            key={skill.id}
            onClick={() => setSelectedSkillId(skill.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSkillId === skill.id
                ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            {skill.skillName} ({skill.progressPercent}%)
          </button>
        ))}
      </div>

      {/* Main Roadmap Timeline */}
      <div className="arena-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white uppercase">{currentSkill.skillName} SYLLABUS</h2>
            <p className="text-xs text-slate-400 mt-1">Tier: {currentSkill.level} · {currentSkill.sessionsCompleted} Sessions Completed</p>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold uppercase tracking-wider"
          >
            Book Next Lesson
          </button>
        </div>

        <div className="space-y-8">
          {currentSkill.syllabus.map((week, wIdx) => (
            <div key={week.week} className="flex gap-4 sm:gap-6">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  wIdx < 3 ? 'bg-cyan-500 text-black' : 'border border-cyan-400 text-cyan-300 bg-cyan-950/40'
                }`}>
                  {wIdx < 3 ? <Check className="w-4 h-4" /> : week.week}
                </div>
                {wIdx < currentSkill.syllabus.length - 1 && (
                  <div className="w-[2px] h-full bg-white/10 my-2" />
                )}
              </div>

              <div className="flex-1 pb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 uppercase">WEEK {week.week}</span>
                  <span className="text-sm font-bold text-white">{week.title}</span>
                </div>

                <div className="mt-3 space-y-2">
                  {week.topics.map((topic, tIdx) => {
                    const key = `topic-${currentSkill.id}-${wIdx}-${tIdx}`;
                    const isChecked = checklist[key] !== undefined ? checklist[key] : topic.completed;
                    return (
                      <div
                        key={tIdx}
                        onClick={() => toggleTopic(key)}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isChecked
                            ? 'bg-cyan-500/[0.06] border-cyan-500/30 text-white'
                            : 'bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                            isChecked ? 'bg-cyan-500 text-black' : 'border border-slate-600'
                          }`}>
                            {isChecked && '✓'}
                          </span>
                          <span>{topic.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">
                          {isChecked ? 'Mastered' : 'Pending practice'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
