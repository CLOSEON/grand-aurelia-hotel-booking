import React, { useState } from 'react';
import { Calendar, Users, Compass, ShieldCheck, Crown } from 'lucide-react';

interface Props {
  onSearch: (criteria: { checkIn: string; checkOut: string; guests: number; category: string }) => void;
  onExploreClick: () => void;
  playClick: () => void;
}

export const HeroBanner: React.FC<Props> = ({ onSearch, onExploreClick, playClick }) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultCheckIn = tomorrow.toISOString().split('T')[0];

  const inFourDays = new Date();
  inFourDays.setDate(inFourDays.getDate() + 4);
  const defaultCheckOut = inFourDays.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState(2);
  const [category, setCategory] = useState('All Suites');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    onSearch({ checkIn, checkOut, guests, category });
  };

  return (
    <section className="relative pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Sunlit Architectural Background Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-stone-200 mb-8 bg-stone-900">
        
        {/* Background Resort Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
            alt="The Grand Aurelia Palace"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Subtle Warm Overlay */}
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
        </div>

        {/* Content Inside Hero Frame */}
        <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-20 max-w-4xl mx-auto text-center space-y-4 text-white">
          
          {/* Minimal Luxury Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-white/90">
              5-Star Heritage Palace & Suites
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
            Where European Heritage Meets <br />
            <span className="italic font-light text-amber-200">Modern Luxury</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-200 max-w-2xl mx-auto leading-relaxed font-normal">
            Handcrafted suites framed in brushed brass, antique walnut, and private sky terraces. 
            Enjoy dedicated 24/7 royal butler service, chauffeured arrivals, and Michelin-star dining.
          </p>

        </div>

      </div>

      {/* Minimalist Floating Concierge Search Console */}
      <div className="-mt-14 sm:-mt-16 max-w-5xl mx-auto relative z-20">
        <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl border border-stone-200/90">
          
          {/* Top Registry Status Strip */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                Live Suite Availability & Booking
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-stone-700" />
              <span className="hidden sm:inline">Guaranteed Best Rate & Instant Confirmation</span>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Arrival Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <Calendar size={13} className="text-stone-700" />
                Arrival Date
              </label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="minimal-input w-full px-3 py-2.5 text-xs font-mono font-medium"
              />
            </div>

            {/* Departure Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <Calendar size={13} className="text-stone-700" />
                Departure Date
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                className="minimal-input w-full px-3 py-2.5 text-xs font-mono font-medium"
              />
            </div>

            {/* Guests Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <Users size={13} className="text-stone-700" />
                Guests
              </label>
              <div className="minimal-input flex items-center justify-between px-3 py-1.5">
                <span className="text-xs text-stone-900 font-semibold">
                  {guests} {guests === 1 ? 'Guest' : 'Guests'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setGuests(Math.max(1, guests - 1));
                    }}
                    className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 flex items-center justify-center font-bold text-xs"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setGuests(Math.min(6, guests + 1));
                    }}
                    className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 flex items-center justify-center font-bold text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Submit / Find Suites */}
            <div className="flex flex-col justify-end">
              <button
                type="submit"
                className="btn-primary-luxury w-full py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Compass size={15} />
                <span>Search Suites</span>
              </button>
            </div>

          </form>

          {/* Quick Perks Bar */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 font-medium">
            <span className="flex items-center gap-1.5">
              ✨ <span>All reservations include private butler & airport transfer</span>
            </span>
            <button
              onClick={onExploreClick}
              className="text-stone-900 hover:underline font-semibold ml-auto flex items-center gap-1"
            >
              <span>Explore All Suites ↓</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
