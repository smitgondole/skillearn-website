import React, { useState } from 'react';
import { Star, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { Venue } from '../types';

interface VenueCardProps {
  venue: Venue;
  onViewVenue: (venueId: string) => void;
  onBookCourt?: (venue: Venue) => void;
}

export const VenueCard: React.FC<VenueCardProps> = ({
  venue,
  onViewVenue,
  onBookCourt,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group arena-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
      <div>
        {/* Venue Image / Fallback Container */}
        <div className="relative h-48 w-full bg-[#121622] overflow-hidden">
          {!imgError && venue.images[0] ? (
            <img
              src={venue.images[0]}
              alt={venue.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-[#0F1420]">
              <span className="text-4xl mb-2">🏟️</span>
              <span className="text-xs font-mono text-cyan-400">{venue.sport}</span>
            </div>
          )}

          {/* Measured Scrim for high contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F121C] via-black/40 to-transparent" />

          {/* Sport tag & Live Availability */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
            <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-cyan-300 font-mono text-[11px] font-medium">
              {venue.sport}
            </span>
            {venue.availableToday && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Available Today
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-amber-400 text-xs font-mono">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{venue.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[10px]">({venue.reviewCount})</span>
            </div>
            <span className="text-xs font-mono text-slate-300">
              {venue.distanceKm} km away
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
            {venue.name}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{venue.address}</span>
          </div>

          {/* Amenities line */}
          <div className="mt-3.5 pt-3 border-t border-white/[0.06] flex items-center gap-2 text-[11px] text-slate-300 flex-wrap">
            {venue.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="flex items-center gap-1">
                {idx > 0 && <span aria-hidden="true" className="text-slate-600 mr-1">·</span>}
                <span>{amenity}</span>
              </span>
            ))}
          </div>

          {/* Courts list */}
          <div className="mt-3 text-[11px] font-mono text-slate-400">
            {venue.courts.length} courts available · {venue.timeSlots.slice(0, 3).join(', ')}...
          </div>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="p-5 pt-0 border-t border-white/[0.06] mt-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Hourly Slot</span>
          <span className="text-base font-bold font-mono text-white">
            ₹{venue.pricePerHour}
            <span className="text-xs font-normal text-slate-400">/hr</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewVenue(venue.id)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 transition-colors flex items-center gap-1"
          >
            <span>View Venue</span>
          </button>
          {onBookCourt && (
            <button
              onClick={() => onBookCourt(venue)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white transition-all shadow-md shadow-emerald-500/15 flex items-center gap-1"
            >
              <span>Book Court</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
