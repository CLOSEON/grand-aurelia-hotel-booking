import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Printer, Key, CheckCircle, QrCode } from 'lucide-react';
import { Booking } from '../types';

interface Props {
  booking: Booking;
  onClose: () => void;
  onViewReservations: () => void;
  playSuccessChime: () => void;
  playClick: () => void;
}

export const BookingSuccessModal: React.FC<Props> = ({
  booking,
  onClose,
  onViewReservations,
  playSuccessChime,
  playClick,
}) => {
  useEffect(() => {
    // Play celebratory luxury chime
    playSuccessChime();

    // Trigger golden celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#ffd700', '#fef08a', '#b88d48', '#ffffff'],
    });
  }, [playSuccessChime]);

  const handlePrint = () => {
    playClick();
    window.print();
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-obsidian-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="max-w-2xl w-full flex flex-col items-center space-y-6">
        
        {/* Top Floating Golden Key with Swinging Tassel */}
        <div className="flex flex-col items-center">
          <div className="key-swaying flex flex-col items-center drop-shadow-[0_15px_20px_rgba(212,175,55,0.4)]">
            {/* Brass Key Loop */}
            <div
              className="w-16 h-16 rounded-full border-4 border-yellow-300 relative flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, #fef08a 0%, #ca8a04 50%, #854d0e 100%)',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 10px rgba(0,0,0,0.6)',
              }}
            >
              <div className="w-8 h-8 rounded-full bg-obsidian-950 border border-gold/40 flex items-center justify-center text-gold font-serif font-black text-xs">
                GA
              </div>
            </div>

            {/* Key Shaft & Teeth */}
            <div
              className="w-3.5 h-14 relative -mt-1"
              style={{
                background: 'linear-gradient(90deg, #fef08a 0%, #ca8a04 40%, #854d0e 100%)',
              }}
            >
              {/* Key cut teeth */}
              <div
                className="absolute right-0 bottom-1 w-4 h-3 bg-yellow-500 rounded-r-sm"
                style={{
                  background: 'linear-gradient(90deg, #ca8a04, #fef08a)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
                }}
              />
              <div
                className="absolute right-0 bottom-6 w-3 h-2 bg-yellow-500 rounded-r-sm"
                style={{
                  background: 'linear-gradient(90deg, #ca8a04, #fef08a)',
                }}
              />
            </div>

            {/* Emerald Braided Silk Tassel */}
            <div className="flex flex-col items-center -mt-0.5">
              <div className="w-3 h-3 rounded-full bg-emerald-700 border border-emerald-400" />
              <div className="w-5 h-12 bg-gradient-to-b from-emerald-800 via-emerald-600 to-emerald-950 rounded-b-lg shadow-lg opacity-90" />
            </div>
          </div>

          <div className="text-center mt-3">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-gold bg-obsidian-900/90 px-3 py-1 rounded-full border border-gold/40">
              Room Key Assigned • Suite {booking.room.roomNumber}
            </span>
          </div>
        </div>

        {/* Perforated Heritage Boarding Pass Voucher */}
        <div className="perforated-ticket rounded-2xl w-full p-6 sm:p-8 relative overflow-hidden border border-amber-900/40 shadow-2xl">
          
          {/* Jagged / Perforated Stub Line */}
          <div className="absolute top-0 right-28 bottom-0 w-px border-r-2 border-dashed border-amber-900/30 hidden sm:block" />

          {/* Authentic Crimson Wax Seal Stamp */}
          <div className="absolute top-4 right-4 sm:right-6 wax-seal w-16 h-16 rounded-full flex items-center justify-center text-center rotate-6 shadow-xl">
            <div className="text-[9px] font-serif font-black text-amber-100 uppercase tracking-tighter leading-tight drop-shadow">
              GRAND<br />
              ★<br />
              AURELIA
            </div>
          </div>

          {/* Header Info */}
          <div className="pr-16">
            <div className="flex items-center gap-1.5 text-amber-900 text-xs font-bold uppercase tracking-widest font-sans">
              <CheckCircle size={15} className="text-emerald-700" />
              <span>Official Heritage Reservation Voucher</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-black text-amber-950 mt-1">
              {booking.room.name}
            </h2>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-amber-200/70 border border-amber-400 rounded text-amber-950">
                Ref: {booking.bookingRef}
              </span>
              <span className="text-xs text-amber-900 font-semibold">
                Status: Confirmed & Guaranteed
              </span>
            </div>
          </div>

          {/* Pass Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-amber-900/20 text-xs text-amber-950">
            <div>
              <span className="block text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                Primary Guest
              </span>
              <span className="font-bold text-sm truncate block mt-0.5 font-serif">
                {booking.guestName}
              </span>
            </div>

            <div>
              <span className="block text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                Arrival (Check-in)
              </span>
              <span className="font-semibold block mt-0.5">
                {formatDate(booking.checkIn)}
              </span>
              <span className="text-[10px] text-amber-700">From 3:00 PM</span>
            </div>

            <div>
              <span className="block text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                Departure (Check-out)
              </span>
              <span className="font-semibold block mt-0.5">
                {formatDate(booking.checkOut)}
              </span>
              <span className="text-[10px] text-amber-700">Until 12:00 PM</span>
            </div>

            <div>
              <span className="block text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                Total Tariff Paid
              </span>
              <span className="font-serif font-black text-base text-amber-950 block mt-0.5">
                ${booking.totalAmount.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-800 font-semibold">All Taxes Included</span>
            </div>
          </div>

          {/* Perforated Concierge Stub & QR Section */}
          <div className="mt-6 pt-4 border-t border-amber-900/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-950 text-parchment-light rounded-lg flex items-center justify-center p-1 shadow-inner">
                <QrCode size={36} />
              </div>
              <div className="text-[10px] text-amber-900">
                <span className="font-bold block uppercase font-mono">Mobile Concierge Access</span>
                <span>Present at the front portico for expedited private elevator key assignment.</span>
              </div>
            </div>

            <div className="text-right text-[10px] text-amber-800 font-mono hidden sm:block">
              AUTH: PASS-2026-OK<br />
              ISSUED: 1894 ROYAL CHARTER
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <button
            onClick={handlePrint}
            className="btn-secondary-luxury px-5 py-2.5 rounded-lg text-xs flex items-center gap-2"
          >
            <Printer size={15} />
            <span>Print Boarding Pass</span>
          </button>

          <button
            onClick={() => {
              playClick();
              onViewReservations();
            }}
            className="btn-primary-luxury px-6 py-2.5 text-xs uppercase tracking-wider flex items-center gap-2"
          >
            <Key size={15} />
            <span>View in My Reservations</span>
          </button>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="p-2.5 rounded-lg text-stone-400 hover:text-stone-700"
          >
            <X size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

