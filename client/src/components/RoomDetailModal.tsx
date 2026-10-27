import React, { useState } from 'react';
import {
  X,
  Star,
  Users,
  Maximize2,
  Bed,
  Bath,
  CheckCircle2,
  Sparkles,
  Calendar,
  Lock,
} from 'lucide-react';
import { Room } from '../types';

interface Props {
  room: Room;
  onClose: () => void;
  onBookNow: (room: Room, dates?: { checkIn: string; checkOut: string; guests: number }) => void;
  playClick: () => void;
}

export const RoomDetailModal: React.FC<Props> = ({ room, onClose, onBookNow, playClick }) => {
  const [activeImage, setActiveImage] = useState(0);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultCheckIn = tomorrow.toISOString().split('T')[0];

  const inFourDays = new Date();
  inFourDays.setDate(inFourDays.getDate() + 4);
  const defaultCheckOut = inFourDays.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guestCount, setGuestCount] = useState(2);

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const basePrice = room.pricePerNight * nights;
  const cleaningFee = 150;
  const serviceFee = 95;
  const taxes = Math.round((basePrice + cleaningFee + serviceFee) * 0.12);
  const totalPrice = basePrice + cleaningFee + serviceFee + taxes;

  const handleReserve = () => {
    playClick();
    onBookNow(room, { checkIn, checkOut, guests: guestCount });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="skeuo-card max-w-5xl w-full max-h-[92vh] overflow-y-auto bg-white border border-amber-400 shadow-2xl relative rounded-2xl flex flex-col text-stone-900">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-amber-200">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-950 shadow-sm">
              Suite {room.roomNumber}
            </span>
            <span className="text-xs uppercase tracking-widest text-amber-800 font-bold hidden sm:inline">
              {room.category} • {room.view}
            </span>
          </div>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full btn-secondary-luxury flex items-center justify-center text-stone-600 hover:text-stone-900"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-8">
          
          {/* Main Gallery */}
          <div className="space-y-3">
            <div className="h-72 sm:h-96 w-full rounded-xl overflow-hidden relative border border-amber-300 bg-amber-50 shadow-lg">
              <img
                src={room.images[activeImage]}
                alt={room.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {room.badge && (
                <div className="absolute top-4 left-4 px-3.5 py-1 rounded-md bg-white/95 border border-amber-400 backdrop-blur-md flex items-center gap-2 shadow-lg">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                    {room.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {room.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playClick();
                    setActiveImage(idx);
                  }}
                  className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === idx
                      ? 'border-amber-500 shadow-[0_0_12px_#f59e0b]'
                      : 'border-amber-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Suite Title, Rating & Specs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Details & Amenities */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-amber-700 text-sm font-bold mb-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span>{room.rating.toFixed(2)}</span>
                  <span className="text-stone-500 font-normal">
                    ({room.reviewCount} Verified Luxury Stays)
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-black text-stone-900">
                  {room.name}
                </h2>
              </div>

              {/* Spec Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-center shadow-sm">
                  <Bed className="w-5 h-5 text-amber-700 mx-auto mb-1" />
                  <span className="block text-[10px] uppercase text-stone-500 font-bold">Bedding</span>
                  <span className="text-xs font-bold text-stone-900">{room.bedType}</span>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-center shadow-sm">
                  <Users className="w-5 h-5 text-amber-700 mx-auto mb-1" />
                  <span className="block text-[10px] uppercase text-stone-500 font-bold">Occupancy</span>
                  <span className="text-xs font-bold text-stone-900">{room.maxGuests} Guests</span>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-center shadow-sm">
                  <Maximize2 className="w-5 h-5 text-amber-700 mx-auto mb-1" />
                  <span className="block text-[10px] uppercase text-stone-500 font-bold">Living Space</span>
                  <span className="text-xs font-bold text-stone-900">{room.sqft.toLocaleString()} Sq Ft</span>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-center shadow-sm">
                  <Bath className="w-5 h-5 text-amber-700 mx-auto mb-1" />
                  <span className="block text-[10px] uppercase text-stone-500 font-bold">Bathrooms</span>
                  <span className="text-xs font-bold text-stone-900">{room.bathrooms} Marble Baths</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-amber-950">
                  The Suite Experience
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed font-normal">
                  {room.description}
                </p>
              </div>

              {/* Amenities List */}
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-bold text-amber-950">
                  Curated Suite Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {room.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs text-stone-800 p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/80 font-medium"
                    >
                      <CheckCircle2 size={16} className="text-amber-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Guest Reviews */}
              {room.reviews && room.reviews.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-amber-200">
                  <h3 className="font-serif text-lg font-bold text-amber-950">
                    Aristocratic Guest Testimonials
                  </h3>
                  <div className="space-y-3">
                    {room.reviews.map((rev) => (
                      <div
                        key={rev._id}
                        className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-2 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={rev.avatar}
                              alt={rev.guestName}
                              className="w-10 h-10 rounded-full object-cover border-2 border-amber-300 shadow-sm"
                            />
                            <div>
                              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                                <span>{rev.guestName}</span>
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                                  Verified Stay
                                </span>
                              </div>
                              <span className="text-[10px] text-stone-500">
                                {rev.guestLocation} • {rev.stayDate}
                              </span>
                            </div>
                          </div>
                          <div className="flex text-amber-500">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} size={13} className="fill-amber-500 text-amber-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-stone-700 italic">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right 1 Col: Live Price Calculator & Reserve Card */}
            <div className="space-y-4">
              <div className="skeuo-card p-5 border border-amber-400 rounded-xl space-y-5 sticky top-24 bg-gradient-to-b from-white to-amber-50/60 shadow-xl">
                
                {/* Nightly Rate */}
                <div className="border-b border-amber-200 pb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800">
                    Heritage Nightly Tariff
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-serif text-3xl font-black gold-metallic-text">
                      ${room.pricePerNight}
                    </span>
                    <span className="text-xs uppercase text-stone-500 font-bold">/ night</span>
                  </div>
                </div>

                {/* Dates Configuration */}
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-stone-800 flex items-center gap-1 mb-1">
                      <Calendar size={13} className="text-amber-700" /> Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="skeuo-input w-full px-3 py-2 rounded-lg text-xs font-mono font-bold text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-stone-800 flex items-center gap-1 mb-1">
                      <Calendar size={13} className="text-amber-700" /> Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="skeuo-input w-full px-3 py-2 rounded-lg text-xs font-mono font-bold text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-stone-800 flex items-center gap-1 mb-1">
                      <Users size={13} className="text-amber-700" /> Guests
                    </label>
                    <div className="skeuo-input flex items-center justify-between px-3 py-1.5 rounded-lg">
                      <span className="text-xs text-stone-900 font-bold">
                        {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            playClick();
                            setGuestCount(Math.max(1, guestCount - 1));
                          }}
                          className="w-5 h-5 rounded bg-amber-100 text-amber-900 text-xs flex items-center justify-center font-black shadow-sm"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            playClick();
                            setGuestCount(Math.min(room.maxGuests, guestCount + 1));
                          }}
                          className="w-5 h-5 rounded bg-amber-100 text-amber-900 text-xs flex items-center justify-center font-black shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-amber-200 pt-4 space-y-2 text-xs text-stone-700">
                  <div className="flex justify-between">
                    <span>${room.pricePerNight} × {nights} nights</span>
                    <span className="font-mono font-bold text-stone-900">${basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Private Butler & Valet</span>
                    <span className="font-mono font-bold text-emerald-700">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Housekeeping Fee</span>
                    <span className="font-mono font-bold text-stone-900">${cleaningFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Concierge Service Fee</span>
                    <span className="font-mono font-bold text-stone-900">${serviceFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hospitality Tax (12%)</span>
                    <span className="font-mono font-bold text-stone-900">${taxes}</span>
                  </div>

                  <div className="border-t border-amber-300 pt-3 flex justify-between items-baseline">
                    <span className="font-serif font-black text-stone-900 text-sm">
                      Total Guaranteed Tariff
                    </span>
                    <span className="font-serif text-xl font-black gold-metallic-text">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Reserve Action Button */}
                <button
                  onClick={handleReserve}
                  className="btn-primary-luxury w-full py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Lock size={14} />
                  <span>Proceed to Reservation</span>
                </button>

                <div className="text-[10px] text-center text-stone-500 leading-tight font-medium">
                  🔒 256-Bit Encrypted Concierge Vault. Settle upon arrival or card guarantee.
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
