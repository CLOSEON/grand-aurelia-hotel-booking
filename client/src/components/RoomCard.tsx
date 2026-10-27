import React, { useState } from 'react';
import { Star, Users, Maximize2, Bed, Eye, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Room } from '../types';

interface Props {
  room: Room;
  onSelect: (room: Room) => void;
  onBookNow: (room: Room) => void;
  playClick: () => void;
}

export const RoomCard: React.FC<Props> = ({ room, onSelect, onBookNow, playClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div
      onClick={() => {
        playClick();
        onSelect(room);
      }}
      className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl group cursor-pointer overflow-hidden transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Image Showcase */}
      <div className="relative h-64 w-full overflow-hidden bg-stone-100">
        <img
          src={room.images[currentImageIndex]}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Room Badge */}
        {room.badge && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-stone-900/85 text-white backdrop-blur-md shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              {room.badge}
            </span>
          </div>
        )}

        {/* Suite Number */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md border border-stone-200 text-[10px] font-mono font-bold text-stone-800 shadow-sm">
          Suite {room.roomNumber}
        </div>

        {/* Image Nav Arrows (visible on hover) */}
        {room.images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevImage}
              className="w-8 h-8 rounded-full bg-white/90 border border-stone-200 text-stone-800 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors shadow-md"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextImage}
              className="w-8 h-8 rounded-full bg-white/90 border border-stone-200 text-stone-800 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors shadow-md"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Image Dots Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {room.images.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentImageIndex ? 'w-5 bg-white shadow-sm' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Title & Rating */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold font-sans">
              {room.category} • Floor {room.floor}
            </span>
            <div className="flex items-center gap-1 text-stone-800 text-xs font-bold">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span>{room.rating.toFixed(2)}</span>
              <span className="text-stone-400 text-[11px] font-normal">
                ({room.reviewCount})
              </span>
            </div>
          </div>

          <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
            {room.name}
          </h3>

          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {room.shortDescription}
          </p>
        </div>

        {/* Spec Chips (Bed, Guests, Area, View) */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 border-y border-stone-100 py-2.5">
          <div className="flex items-center gap-1.5">
            <Bed size={13} className="text-stone-400" />
            <span className="truncate">{room.bedType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={13} className="text-stone-400" />
            <span>Up to {room.maxGuests} Guests</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 size={13} className="text-stone-400" />
            <span>{room.sqft.toLocaleString()} Sq Ft</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye size={13} className="text-stone-400" />
            <span className="truncate">{room.view}</span>
          </div>
        </div>

        {/* Highlights / Amenities preview */}
        <div className="flex flex-wrap gap-1.5">
          {room.amenities.slice(0, 3).map((amenity, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded text-[10px] bg-stone-100 text-stone-600 font-medium"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] text-stone-400">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Pricing & Call to Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-stone-100">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl font-black text-stone-900">
                ${room.pricePerNight}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                / night
              </span>
            </div>
            <span className="text-[10px] text-emerald-600 font-medium block">
              Free cancellation up to 48 hrs
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                onSelect(room);
              }}
              className="btn-secondary-luxury px-3.5 py-2 text-xs"
            >
              Details
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                onBookNow(room);
              }}
              className="btn-primary-luxury px-4 py-2 text-xs"
            >
              Reserve
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
