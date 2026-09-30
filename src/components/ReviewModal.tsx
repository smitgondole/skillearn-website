import React, { useState } from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import { ReviewItem, UserProfile } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  coach: UserProfile | null;
  onSubmitReview: (review: ReviewItem) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  coach,
  onSubmitReview,
}) => {
  const [overallRating, setOverallRating] = useState<number>(5);
  const [teaching, setTeaching] = useState<number>(5);
  const [communication, setCommunication] = useState<number>(5);
  const [punctuality, setPunctuality] = useState<number>(5);
  const [skill, setSkill] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen || !coach) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      authorName: 'Swetank Kulkarni',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80',
      coachId: coach.id,
      coachName: coach.name,
      skill: coach.primarySkill,
      rating: overallRating,
      date: 'Just now',
      comment: comment.trim(),
      breakdown: { teaching, communication, punctuality, skill }
    };

    onSubmitReview(newRev);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setComment('');
      onClose();
    }, 1400);
  };

  const renderStars = (value: number, setValue: (val: number) => void) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          type="button"
          key={star}
          onClick={() => setValue(star)}
          className="p-1 focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            className={`w-5 h-5 ${
              star <= value ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
            }`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-lg bg-[#0F121C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white">HOW WAS YOUR SESSION?</h3>
            <p className="text-xs text-slate-400">Review your coaching session with {coach.name}</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-cyan-400 mx-auto animate-bounce" />
            <div className="text-lg font-bold text-white">Review Submitted!</div>
            <p className="text-xs text-slate-400">Your verified review is now live on {coach.name}&apos;s profile.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            {/* Overall Rating */}
            <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Overall Experience
              </span>
              <div className="flex justify-center">
                {renderStars(overallRating, setOverallRating)}
              </div>
            </div>

            {/* Criteria breakdown */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <span className="text-slate-300">Teaching</span>
                {renderStars(teaching, setTeaching)}
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <span className="text-slate-300">Communication</span>
                {renderStars(communication, setCommunication)}
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <span className="text-slate-300">Punctuality</span>
                {renderStars(punctuality, setPunctuality)}
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <span className="text-slate-300">Skill</span>
                {renderStars(skill, setSkill)}
              </div>
            </div>

            {/* Comment field */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Detailed Feedback
              </label>
              <textarea
                required
                rows={3}
                placeholder="What technique did you work on? How was the coach's feedback?"
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="w-full bg-[#161B26] text-white text-xs rounded-xl p-3 border border-white/10 focus:outline-none focus:border-cyan-400 resize-none placeholder-slate-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
