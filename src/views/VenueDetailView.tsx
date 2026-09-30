import React, { useState } from 'react';
import { Star, MapPin, CheckCircle2, Clock, ArrowLeft, Shield, Calendar as CalendarIcon, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Venue } from '../types';

interface VenueDetailViewProps {
  venue: Venue;
  onBack: () => void;
  onCourtBooked?: (details: { venueName: string; courtName: string; time: string; price: number }) => void;
}

export const VenueDetailView: React.FC<VenueDetailViewProps> = ({
  venue,
  onBack,
  onCourtBooked,
}) => {
  const [selectedCourtId, setSelectedCourtId] = useState<string>(venue.courts[0]?.id || '');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(venue.timeSlots[0] || '6:00 PM');
  const [selectedDate, setSelectedDate] = useState<string>('Today, 29 Sep');
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const selectedCourt = venue.courts.find(c => c.id === selectedCourtId) || venue.courts[0];

  const handleBookCourt = () => {
    setConfirmed(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#ffffff']
      });
    } catch {}

    if (onCourtBooked) {
      onCourtBooked({
        venueName: venue.name,
        courtName: selectedCourt.name,
        time: `${selectedDate} at ${selectedTimeSlot}`,
        price: venue.pricePerHour,
      });
    }
  };

  const dates = ['Today, 29 Sep', 'Tomorrow, 30 Sep', 'Wed, 1 Oct', 'Thu, 2 Oct'];

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to venues</span>
      </button>

      {/* Main Header & Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-8 space-y-4">
          <div className="relative h-[340px] sm:h-[420px] rounded-3xl overflow-hidden bg-[#121622] border border-white/10">
            <img
              src={venue.images[0]}
              alt={venue.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-black/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono mb-2 inline-block">
                {venue.sport}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
                {venue.name}
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-mono mt-2">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold">{venue.rating.toFixed(1)}</span>
                  <span className="text-slate-400">({venue.reviewCount} verified reviews)</span>
                </div>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3 h-3" />
                  {venue.location}
                </span>
              </div>
            </div>
          </div>

          {/* Amenities & Description */}
          <div className="arena-card rounded-2xl p-6 border border-white/10 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white mb-2">Facility & Court Specifications</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Located at {venue.address}. Premium venue equipped for high-performance training, matchplay sparring, and recreational games. Fully floodlit and maintained to international sports surface guidelines.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Key Amenities
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {venue.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Court Booking Panel */}
        <div className="lg:col-span-4">
          <div className="arena-card rounded-2xl p-6 border border-white/10 space-y-5 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Hourly Court Hire</span>
              <span className="text-2xl font-bold font-mono text-emerald-400">₹{venue.pricePerHour}<span className="text-xs text-slate-400 font-normal">/hr</span></span>
            </div>

            {confirmed ? (
              <div className="p-6 text-center space-y-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">COURT RESERVED!</h4>
                <p className="text-xs text-slate-300">
                  {selectedCourt.name} at {venue.name} has been confirmed for {selectedDate} at {selectedTimeSlot}.
                </p>
                <button
                  onClick={() => setConfirmed(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 text-xs text-white hover:bg-white/20 transition-colors"
                >
                  Book Another Slot
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Court Selection */}
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                    Available Courts ({venue.courts.length})
                  </label>
                  <div className="space-y-2">
                    {venue.courts.map(court => (
                      <button
                        key={court.id}
                        onClick={() => setSelectedCourtId(court.id)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                          selectedCourtId === court.id
                            ? 'bg-emerald-500/15 border-emerald-400 text-white font-medium'
                            : 'bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <div>
                          <div>{court.name}</div>
                          <div className="text-[10px] text-slate-400">{court.surface}</div>
                        </div>
                        {selectedCourtId === court.id && <Check className="w-4 h-4 text-emerald-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date selection */}
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                    Select Date
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {dates.map(date => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`py-2 px-2.5 rounded-lg border text-center transition-all ${
                          selectedDate === date
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                            : 'bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                    Select 1-Hour Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {venue.timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTimeSlot(time)}
                        className={`py-2 px-2 rounded-lg border text-center transition-all ${
                          selectedTimeSlot === time
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                            : 'bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Confirm Action */}
                <button
                  onClick={handleBookCourt}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-500/25 cursor-pointer mt-4"
                >
                  Book Court (₹{venue.pricePerHour})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
