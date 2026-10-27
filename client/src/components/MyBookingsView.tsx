import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Key,
  Ban,
  Clock,
  Printer,
  Search,
} from 'lucide-react';
import { Booking } from '../types';

interface Props {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => Promise<void>;
  onViewBookingTicket: (booking: Booking) => void;
  onExploreSuites: () => void;
  playClick: () => void;
}

export const MyBookingsView: React.FC<Props> = ({
  bookings,
  onCancelBooking,
  onViewBookingTicket,
  onExploreSuites,
  playClick,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const filtered = bookings.filter((b) => {
    if (filterStatus === 'confirmed' && b.status === 'cancelled') return false;
    if (filterStatus === 'cancelled' && b.status !== 'cancelled') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        b.bookingRef.toLowerCase().includes(q) ||
        b.guestName.toLowerCase().includes(q) ||
        b.room.name.toLowerCase().includes(q) ||
        b.room.roomNumber.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCancel = async (id: string) => {
    if (window.confirm('Are you sure you wish to cancel this suite reservation? There is no cancellation penalty.')) {
      playClick();
      setCancellingId(id);
      try {
        await onCancelBooking(id);
      } finally {
        setCancellingId(null);
      }
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      
      {/* Top Header & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-300/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-900">
            <Key size={14} className="text-amber-700" />
            <span>Grand Aurelia Concierge Registry</span>
          </div>
          <h2 className="font-serif text-3xl font-black text-stone-900 mt-1">
            My Suite Reservations
          </h2>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClick();
              setFilterStatus('all');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium ${
              filterStatus === 'all'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            All ({bookings.length})
          </button>
          <button
            onClick={() => {
              playClick();
              setFilterStatus('confirmed');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium ${
              filterStatus === 'confirmed'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => {
              playClick();
              setFilterStatus('cancelled');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium ${
              filterStatus === 'cancelled'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-700" />
        <input
          type="text"
          placeholder="Filter by ref, guest, or suite..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="skeuo-input w-full pl-9 pr-3 py-2 rounded-lg text-xs font-medium text-stone-900 shadow-sm"
        />
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="skeuo-card p-12 text-center rounded-2xl border border-amber-300 max-w-xl mx-auto space-y-4 bg-white/95">
          <div className="w-16 h-16 mx-auto rounded-full brass-metallic-bg p-0.5 flex items-center justify-center shadow-md">
            <div className="w-full h-full bg-amber-50 rounded-full flex items-center justify-center text-amber-700">
              <Calendar size={28} />
            </div>
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900">
            No Reservations Found
          </h3>
          <p className="text-xs text-stone-600 max-w-sm mx-auto">
            You do not currently have any active or past reservations under this filter. Explore our signature luxury suites.
          </p>
          <button
            onClick={() => {
              playClick();
              onExploreSuites();
            }}
            className="btn-brass-3d px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-md"
          >
            Browse Luxury Suites
          </button>
        </div>
      )}

      {/* Bookings List (Luggage Tag / Heritage Ledger Style) */}
      <div className="grid grid-cols-1 gap-5">
        {filtered.map((b) => {
          const isCancelled = b.status === 'cancelled';
          return (
            <div
              key={b._id}
              className={`skeuo-card p-5 sm:p-6 rounded-xl border transition-all bg-white shadow-md ${
                isCancelled ? 'opacity-65 border-stone-200' : 'border-amber-300/90 hover:border-amber-400 hover:shadow-xl'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Suite Visual & Basic Info */}
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-amber-50 border border-amber-200 flex-shrink-0 relative shadow-sm">
                    <img
                      src={b.room.images?.[0] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'}
                      alt={b.room.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-amber-950/90 text-[9px] font-mono font-bold text-amber-200">
                      {b.room.roomNumber}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-amber-950 px-2.5 py-0.5 rounded bg-amber-100 border border-amber-300 shadow-sm">
                        {b.bookingRef}
                      </span>
                      {isCancelled ? (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-500 border border-stone-300">
                          Cancelled
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Confirmed
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                      {b.room.name}
                    </h4>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-700">
                      <span className="flex items-center gap-1 font-medium">
                        <Users size={13} className="text-amber-700" />
                        {b.guestName} ({b.guests.adults} Adults)
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar size={13} className="text-amber-700" />
                        {formatDate(b.checkIn)} → {formatDate(b.checkOut)}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock size={13} className="text-amber-700" />
                        {b.totalNights} {b.totalNights === 1 ? 'Night' : 'Nights'}
                      </span>
                    </div>

                    {b.specialRequests && (
                      <p className="text-[11px] text-stone-500 italic">
                        "{b.specialRequests}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Tariff & Actions */}
                <div className="flex sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 border-t lg:border-t-0 border-amber-200 pt-4 lg:pt-0">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">
                      Total Guaranteed Cost
                    </span>
                    <span className="font-serif text-xl sm:text-2xl font-black gold-metallic-text">
                      ${b.totalAmount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-stone-500 block font-medium">
                      {b.paymentMethod === 'credit_card'
                        ? `Paid via Card ending in ${b.cardLastFour || '8842'}`
                        : 'Settle at Concierge Desk'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        playClick();
                        onViewBookingTicket(b);
                      }}
                      className="btn-secondary-luxury px-3 py-2 rounded-lg text-xs flex items-center gap-1.5"
                    >
                      <Printer size={13} className="text-stone-500" />
                      <span>Voucher</span>
                    </button>

                    {!isCancelled && (
                      <button
                        onClick={() => handleCancel(b._id)}
                        disabled={cancellingId === b._id}
                        className="px-3 py-2 rounded-lg text-xs font-bold text-red-700 hover:text-red-900 hover:bg-red-50 border border-red-300 flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Ban size={13} />
                        <span>{cancellingId === b._id ? 'Cancelling...' : 'Cancel'}</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
