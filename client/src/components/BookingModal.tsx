import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CreditCard, Sparkles, Check } from 'lucide-react';
import { Room, Booking } from '../types';

interface Props {
  room: Room;
  initialDates?: { checkIn: string; checkOut: string; guests: number };
  onClose: () => void;
  onSuccess: (booking: Booking) => void;
  playClick: () => void;
}

export const BookingModal: React.FC<Props> = ({
  room,
  initialDates,
  onClose,
  onSuccess,
  playClick,
}) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultCheckIn = initialDates?.checkIn || tomorrow.toISOString().split('T')[0];

  const inFourDays = new Date();
  inFourDays.setDate(inFourDays.getDate() + 4);
  const defaultCheckOut = initialDates?.checkOut || inFourDays.toISOString().split('T')[0];

  const [guestName, setGuestName] = useState('Lord Alistair Sterling');
  const [guestEmail, setGuestEmail] = useState('alistair.sterling@heritage.co.uk');
  const [guestPhone, setGuestPhone] = useState('+44 20 7946 0912');
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [adults, setAdults] = useState(initialDates?.guests || 2);
  const [children, setChildren] = useState(0);
  const [specialRequests, setSpecialRequests] = useState(
    'Chilled bottle of vintage Champagne and late turndown service.'
  );

  // Skeuomorphic Credit Card state
  const [cardNumber, setCardNumber] = useState('5412 8842 9012 3456');
  const [cardHolder, setCardHolder] = useState('ALISTAIR STERLING');
  const [cardExpiry, setCardExpiry] = useState('11/29');
  const [cardCvv, setCardCvv] = useState('782');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'concierge_cash' | 'crypto_vault'>('credit_card');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Calculations
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const basePrice = room.pricePerNight * nights;
  const cleaningFee = 150;
  const serviceFee = 95;
  const taxes = Math.round((basePrice + cleaningFee + serviceFee) * 0.12);
  const totalPrice = basePrice + cleaningFee + serviceFee + taxes;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: room._id,
          guestName,
          guestEmail,
          guestPhone,
          checkIn,
          checkOut,
          guests: { adults, children },
          specialRequests,
          paymentMethod,
          cardLastFour: cardNumber.slice(-4) || '8842',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to complete reservation');
      }

      onSuccess(data.data);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected reservation error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="skeuo-card max-w-4xl w-full max-h-[94vh] overflow-y-auto bg-white border border-amber-400 shadow-2xl relative rounded-2xl flex flex-col text-stone-900">
        
        {/* Top Plaque Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl brass-metallic-bg p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-amber-50 rounded-[8px] flex items-center justify-center text-amber-800">
                <Lock size={16} />
              </div>
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Guaranteed Suite Reservation
              </h2>
              <p className="text-[11px] text-amber-800 font-bold">
                {room.name} • Suite {room.roomNumber}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full btn-ivory-3d flex items-center justify-center text-stone-700 hover:text-amber-900 shadow-sm"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-300 text-red-800 text-xs font-bold">
              ⚠️ {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Col: Guest Identity & Dates */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-950">
                  1. Guest Dossier
                </h3>
                <span className="text-[10px] text-stone-500 font-semibold">Confidential Concierge File</span>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-stone-700 block mb-1">
                  Primary Guest Full Name
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    setCardHolder(e.target.value.toUpperCase());
                  }}
                  className="skeuo-input w-full px-3 py-2 rounded-lg text-xs font-bold text-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-700 block mb-1">
                    Email for Confirmation
                  </label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="skeuo-input w-full px-3 py-2 rounded-lg text-xs font-medium text-stone-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-700 block mb-1">
                    Direct Contact Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="skeuo-input w-full px-3 py-2 rounded-lg text-xs font-medium text-stone-900"
                  />
                </div>
              </div>

              {/* Stay Dates */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-700 block mb-1">
                    Arrival
                  </label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="skeuo-input w-full px-3 py-2 rounded-lg text-xs font-mono font-bold text-stone-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-700 block mb-1">
                    Departure
                  </label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="skeuo-input w-full px-3 py-2 rounded-lg text-xs font-mono font-bold text-stone-900"
                  />
                </div>
              </div>

              {/* Special Concierge Requests */}
              <div>
                <label className="text-[11px] font-bold uppercase text-stone-700 block mb-1">
                  Bespoke Concierge & Arrival Requests
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Diet preferences, champagne brand, allergen notes, private car arrival time..."
                  className="skeuo-input w-full px-3 py-2 rounded-lg text-xs font-medium text-stone-900"
                />
              </div>

            </div>

            {/* Right Col: 3D Skeuomorphic Credit Card & Payment */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-950">
                  2. Payment Guarantee
                </h3>
                <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck size={12} /> 256-Bit SSL Encrypted
                </span>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setPaymentMethod('credit_card');
                  }}
                  className={`py-2 px-1 text-[11px] font-medium rounded-lg border flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <CreditCard size={14} />
                  <span>Black Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setPaymentMethod('concierge_cash');
                  }}
                  className={`py-2 px-1 text-[11px] font-medium rounded-lg border flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'concierge_cash'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <Sparkles size={14} />
                  <span>Pay at Desk</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setPaymentMethod('crypto_vault');
                  }}
                  className={`py-2 px-1 text-[11px] font-medium rounded-lg border flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'crypto_vault'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <Lock size={14} />
                  <span>Crypto Vault</span>
                </button>
              </div>

              {/* 3D Skeuomorphic Credit Card Display */}
              <div className="credit-card-container w-full h-44 relative my-2">
                <div
                  className={`credit-card-inner ${
                    isCardFlipped ? 'credit-card-flipped' : ''
                  }`}
                >
                  {/* FRONT OF CARD (Deep Royal Obsidian-Navy with 24K Gold Lettering) */}
                  <div className="credit-card-front p-5 bg-gradient-to-tr from-slate-950 via-slate-900 to-amber-950 border-2 border-amber-400 shadow-2xl flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {/* Metallic Gold EMV Chip */}
                        <div
                          className="w-10 h-7 rounded-md border border-amber-300 relative overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, #fef08a 0%, #ca8a04 50%, #fef08a 100%)',
                            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.6)',
                          }}
                        >
                          <div className="absolute inset-0 border border-amber-900/30 grid grid-cols-2 grid-rows-2" />
                        </div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300 font-bold">
                          Aurelia Centurion
                        </span>
                      </div>
                      <span className="font-serif text-sm font-bold text-amber-300 italic">
                        WORLD ELITE
                      </span>
                    </div>

                    <div className="font-mono text-base tracking-[0.2em] text-amber-100 font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>

                    <div className="flex justify-between items-end text-[10px]">
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-slate-400">
                          Cardholder
                        </span>
                        <span className="font-mono uppercase font-bold text-amber-200 tracking-wider">
                          {cardHolder || 'GUEST NAME'}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-slate-400">
                          Expires
                        </span>
                        <span className="font-mono font-bold text-amber-200">
                          {cardExpiry || '12/28'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BACK OF CARD */}
                  <div className="credit-card-back py-4 bg-gradient-to-tr from-slate-950 via-neutral-900 to-amber-950 border-2 border-amber-400 shadow-2xl flex flex-col justify-between">
                    {/* Magnetic Stripe */}
                    <div className="w-full h-8 bg-black mt-2 border-y border-neutral-700 shadow-inner" />

                    <div className="px-6 flex items-center justify-end gap-3">
                      <div className="w-3/5 h-6 bg-amber-50 rounded flex items-center justify-end px-2 border border-amber-200">
                        <span className="font-mono text-xs font-bold text-stone-900 italic">
                          {cardCvv || '•••'}
                        </span>
                      </div>
                      <span className="text-[9px] uppercase font-mono text-amber-200 font-bold">
                        CVV
                      </span>
                    </div>

                    <div className="px-6 text-[8px] text-amber-200/70 font-mono text-center">
                      Authorized Signature • The Grand Aurelia Concierge Reserve Card
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'credit_card' && (
                <div className="space-y-2.5">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-stone-700 block mb-0.5">
                      Card Number
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onFocus={() => setIsCardFlipped(false)}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="skeuo-input w-full px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-stone-700 block mb-0.5">
                        Expiration
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onFocus={() => setIsCardFlipped(false)}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="skeuo-input w-full px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-stone-700 block mb-0.5">
                        Security CVV (Flips Card)
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="782"
                        value={cardCvv}
                        onFocus={() => setIsCardFlipped(true)}
                        onBlur={() => setIsCardFlipped(false)}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="skeuo-input w-full px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-stone-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'concierge_cash' && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-300 text-xs text-stone-800">
                  🛎️ <strong className="text-amber-900">Pay Upon Arrival:</strong> Your suite will be reserved immediately. 
                  You may settle via Cash, Swiss Francs, or Corporate Wire at our Private Concierge Desk upon arrival.
                </div>
              )}

              {paymentMethod === 'crypto_vault' && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-300 text-xs text-stone-800">
                  🔐 <strong className="text-amber-900">Crypto Vault:</strong> Instant settlement in USDC, USDT, or ETH. A private QR invoice will be generated alongside your room key pass.
                </div>
              )}

              {/* Total Calculation Strip */}
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-300 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-600 block font-bold">
                    {nights} Nights Reservation
                  </span>
                  <span className="font-serif font-black text-xl gold-metallic-text">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-800 font-bold flex items-center gap-1">
                  <Check size={14} className="text-emerald-600" /> Zero Advance Deposit
                </span>
              </div>

            </div>

          </div>

          {/* Submit Plunger Button */}
          <div className="pt-4 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-600 text-center sm:text-left font-medium">
              By reserving, you agree to The Grand Aurelia's Guest Code of Honor.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary-luxury w-full sm:w-auto px-8 py-3 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
                  <span>Engraving Golden Key...</span>
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  <span>Confirm Suite Reservation</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
