import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Check, Calendar as CalendarIcon, Clock, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { UserProfile, Venue, Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  coach: UserProfile | null;
  venues: Venue[];
  onConfirmBooking: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  coach,
  venues,
  onConfirmBooking,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 30 Sep');
  const [selectedTime, setSelectedTime] = useState<string>('6:00 PM');
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [locationType, setLocationType] = useState<'venue' | 'coach_location' | 'my_location'>('venue');
  const [selectedVenueId, setSelectedVenueId] = useState<string>(venues[0]?.id || 'smash-arena');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Initialize selected skill when coach changes
  React.useEffect(() => {
    if (coach) {
      setSelectedSkill(coach.primarySkill);
      setStep(1);
      setIsSuccess(false);
    }
  }, [coach]);

  if (!isOpen || !coach) return null;

  const currentVenue = venues.find(v => v.id === selectedVenueId) || venues[0];

  // Pricing math
  const sessionBase = coach.pricePerSession;
  const durationMultiplier = durationMinutes === 30 ? 0.6 : durationMinutes === 90 ? 1.4 : 1.0;
  const sessionPrice = Math.round(sessionBase * durationMultiplier);
  const venuePrice = locationType === 'venue' ? (currentVenue ? Math.round(currentVenue.pricePerHour * (durationMinutes / 60) * 0.5) : 200) : 0;
  const platformFee = 20;
  const totalPrice = sessionPrice + venuePrice + platformFee;

  const handleConfirm = () => {
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      coachId: coach.id,
      coachName: coach.name,
      skillName: selectedSkill || coach.primarySkill,
      date: selectedDate,
      timeSlot: selectedTime,
      durationMinutes,
      locationType,
      venueName: locationType === 'venue' ? `${currentVenue.name} (${currentVenue.location})` : locationType === 'coach_location' ? `${coach.name}'s Studio (${coach.location})` : 'My Location (Pune)',
      status: 'confirmed',
      sessionPrice,
      venuePrice,
      platformFee,
      totalPrice,
      createdAt: new Date().toISOString()
    };

    onConfirmBooking(newBooking);
    setIsSuccess(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#3b82f6', '#10b981', '#ffffff']
      });
    } catch {
      // safe fallback if canvas not available
    }
  };

  const dates = [
    'Today, 29 Sep',
    'Tomorrow, 30 Sep',
    'Thu, 1 Oct',
    'Fri, 2 Oct',
    'Sat, 3 Oct',
    'Sun, 4 Oct'
  ];

  const timeSlots = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-xl bg-[#0F121C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={coach.avatar}
              alt={coach.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-500/30"
            />
            <div>
              <div className="text-base font-bold text-white flex items-center gap-1.5">
                <span>Book Session with {coach.name}</span>
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-xs text-slate-400">
                {coach.primarySkill} · {coach.location}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Screen */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-6 my-auto">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Confirmation Success</span>
              <h3 className="text-2xl font-bold text-white mt-1">BOOKING CONFIRMED</h3>
              <p className="text-sm text-slate-300 mt-2">
                Your 1-on-1 session with <strong className="text-white">{coach.name}</strong> is locked in!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Skill:</span>
                <span className="text-white font-medium">{selectedSkill}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Time:</span>
                <span className="text-cyan-300 font-medium">{selectedDate} at {selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Duration:</span>
                <span className="text-white font-medium">{durationMinutes} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="text-white font-medium">
                  {locationType === 'venue' ? currentVenue.name : `${coach.name}'s Studio`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 font-mono text-sm">
                <span className="text-slate-300">Total Paid:</span>
                <span className="text-cyan-400 font-bold">₹{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full max-w-xs py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20"
            >
              Done & Return to App
            </button>
          </div>
        ) : (
          <>
            {/* Step Indicators */}
            <div className="px-5 py-2.5 bg-black/40 border-b border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className={step >= 1 ? 'text-cyan-400 font-semibold' : ''}>1. Skill</span>
              <span>→</span>
              <span className={step >= 2 ? 'text-cyan-400 font-semibold' : ''}>2. Date</span>
              <span>→</span>
              <span className={step >= 3 ? 'text-cyan-400 font-semibold' : ''}>3. Time</span>
              <span>→</span>
              <span className={step >= 4 ? 'text-cyan-400 font-semibold' : ''}>4. Duration</span>
              <span>→</span>
              <span className={step >= 5 ? 'text-cyan-400 font-semibold' : ''}>5. Venue</span>
            </div>

            {/* Scrollable Content */}
            <div className="p-5 overflow-y-auto space-y-6">
              {/* Step 1: Choose Skill */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Step 1: Choose Focus Skill
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {coach.skills.map(s => (
                    <button
                      key={s.name}
                      onClick={() => setSelectedSkill(s.name)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        selectedSkill === s.name
                          ? 'bg-cyan-500/10 border-cyan-400/80 text-white'
                          : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-medium">{s.name}</div>
                        <div className="text-xs text-slate-400">{s.level} · Mastery level</div>
                      </div>
                      {selectedSkill === s.name && <Check className="w-4 h-4 text-cyan-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Choose Date */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-cyan-400" /> Step 2: Choose Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {dates.map(date => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedDate === date
                          ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 font-semibold shadow-sm shadow-cyan-500/20'
                          : 'bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20 text-xs'
                      }`}
                    >
                      <span className="text-xs">{date}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Choose Time */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> Step 3: Choose Time Slot
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-xl border text-center font-mono text-xs transition-all ${
                        selectedTime === time
                          ? 'bg-blue-500/20 border-blue-400 text-white font-bold'
                          : 'bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Duration */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Step 4: Session Duration
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[30, 60, 90].map(mins => (
                    <button
                      key={mins}
                      onClick={() => setDurationMinutes(mins)}
                      className={`py-2 px-3 rounded-xl border text-center text-xs transition-all ${
                        durationMinutes === mins
                          ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                          : 'bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {mins} Minutes
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 5: Location */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Step 5: Location Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'venue', label: 'Sports Arena / Venue' },
                    { id: 'coach_location', label: "Coach's Studio" },
                    { id: 'my_location', label: 'My Location' }
                  ].map(loc => (
                    <button
                      key={loc.id}
                      onClick={() => setLocationType(loc.id as any)}
                      className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                        locationType === loc.id
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-semibold'
                          : 'bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>

                {locationType === 'venue' && (
                  <div className="mt-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-[11px] text-slate-400 block mb-1.5">Select Partner Arena:</span>
                    <select
                      value={selectedVenueId}
                      onChange={e => setSelectedVenueId(e.target.value)}
                      className="w-full bg-[#161B26] text-white text-xs rounded-lg px-3 py-2 border border-white/10 focus:outline-none focus:border-cyan-400"
                    >
                      {venues.map(v => (
                        <option key={v.id} value={v.id}>
                          {v.name} ({v.sport}) — {v.location} (+₹{Math.round(v.pricePerHour * (durationMinutes / 60) * 0.5)})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Price Summary Breakdown (Explicitly as requested in section 24) */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Price Breakdown
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Session ({durationMinutes} min with {coach.name})</span>
                  <span className="font-mono">₹{sessionPrice}</span>
                </div>
                {locationType === 'venue' && (
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Venue Court Fee ({currentVenue.name})</span>
                    <span className="font-mono">₹{venuePrice}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Platform Fee & Guarantee</span>
                  <span className="font-mono">₹{platformFee}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white font-mono">
                  <span>TOTAL</span>
                  <span className="text-cyan-400">₹{totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-4 bg-black/60 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total Due</span>
                <span className="text-lg font-bold font-mono text-cyan-400">₹{totalPrice}</span>
              </div>
              <button
                onClick={handleConfirm}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25"
              >
                Confirm Booking
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
