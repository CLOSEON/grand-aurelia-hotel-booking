import React from 'react';
import { Crown, CalendarDays, ShieldCheck, KeyRound } from 'lucide-react';
import { SkeuomorphicBell } from './SkeuomorphicBell';

interface Props {
  activeTab: 'suites' | 'reservations' | 'concierge';
  onSelectTab: (tab: 'suites' | 'reservations' | 'concierge') => void;
  bookingCount: number;
  onRingBell: () => void;
  muted: boolean;
  onToggleMute: () => void;
  onBookNowClick: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  bookingCount,
  onRingBell,
  muted,
  onToggleMute,
  onBookNowClick,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 border-b border-stone-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => onSelectTab('suites')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Minimalist Logo Icon */}
          <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center text-white shadow-sm group-hover:bg-stone-800 transition-colors">
            <Crown className="w-5 h-5 text-amber-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold tracking-wider text-stone-900 uppercase">
                The Grand Aurelia
              </span>
              <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-600 font-semibold uppercase tracking-wider">
                5★ Heritage
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-stone-500 font-medium font-sans">
              Palace Suites & Concierge
            </p>
          </div>
        </div>

        {/* Center Nav Navigation */}
        <nav className="hidden md:flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200">
          <button
            onClick={() => onSelectTab('suites')}
            className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'suites'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <KeyRound size={14} />
            Suites & Villas
          </button>

          <button
            onClick={() => onSelectTab('reservations')}
            className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 relative ${
              activeTab === 'reservations'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <CalendarDays size={14} />
            My Bookings
            {bookingCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-rose-600 text-white font-bold">
                {bookingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('concierge')}
            className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'concierge'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck size={14} />
            Concierge Desk
          </button>
        </nav>

        {/* Right Actions: Desk Bell + Minimal Book Button */}
        <div className="flex items-center gap-3">
          <SkeuomorphicBell
            onRing={onRingBell}
            muted={muted}
            onToggleMute={onToggleMute}
          />

          <button
            onClick={onBookNowClick}
            className="btn-primary-luxury px-5 py-2.5 text-xs font-medium uppercase tracking-wider hidden sm:flex items-center gap-1.5"
          >
            <span>Book A Suite</span>
          </button>
        </div>

      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex border-t border-stone-200 bg-white px-2 py-2 justify-around shadow-sm">
        <button
          onClick={() => onSelectTab('suites')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
            activeTab === 'suites' ? 'bg-stone-900 text-white' : 'text-stone-600'
          }`}
        >
          Suites
        </button>
        <button
          onClick={() => onSelectTab('reservations')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg relative ${
            activeTab === 'reservations' ? 'bg-stone-900 text-white' : 'text-stone-600'
          }`}
        >
          My Bookings ({bookingCount})
        </button>
        <button
          onClick={() => onSelectTab('concierge')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
            activeTab === 'concierge' ? 'bg-stone-900 text-white' : 'text-stone-600'
          }`}
        >
          Concierge Desk
        </button>
      </div>
    </header>
  );
};
