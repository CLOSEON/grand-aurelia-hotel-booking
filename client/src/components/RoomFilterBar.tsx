import React from 'react';
import { Filter, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';
import { FilterState } from '../types';

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  playClick: () => void;
  totalRooms: number;
}

const CATEGORIES = [
  'All Suites',
  'Presidential Suite',
  'Penthouse',
  'Royal Heritage',
  'Executive Brass',
  'Garden Villa',
];

export const RoomFilterBar: React.FC<Props> = ({
  filters,
  onChange,
  onReset,
  playClick,
  totalRooms,
}) => {
  return (
    <div className="space-y-4">
      {/* Category Tabs Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = filters.category === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                playClick();
                onChange({ ...filters, category: cat });
              }}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                isActive
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Control Strip: Search, Price Slider, Sort, Reset */}
      <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search suite, amenity, or view..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="minimal-input w-full pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400"
          />
        </div>

        {/* Max Price Slider */}
        <div className="w-full md:w-64 flex items-center gap-3">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-600 whitespace-nowrap flex items-center gap-1">
            <SlidersHorizontal size={13} className="text-stone-500" />
            <span>Max Rate:</span>
          </div>
          <input
            type="range"
            min="600"
            max="3000"
            step="50"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-200 rounded-lg appearance-none"
          />
          <span className="text-xs font-mono font-bold text-stone-900 whitespace-nowrap px-2.5 py-0.5 rounded bg-stone-100 border border-stone-200">
            ${filters.maxPrice}
          </span>
        </div>

        {/* Sort Dropdown & Reset */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5">
            <Filter size={13} className="text-stone-500 hidden sm:block" />
            <select
              value={filters.sortBy}
              onChange={(e) => {
                playClick();
                onChange({ ...filters, sortBy: e.target.value as any });
              }}
              className="minimal-input px-3 py-2 text-xs font-medium text-stone-800 bg-white cursor-pointer"
            >
              <option value="popular">Most Prestigious</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Guest Rated</option>
            </select>
          </div>

          <button
            onClick={() => {
              playClick();
              onReset();
            }}
            title="Reset Filters"
            className="btn-secondary-luxury p-2 rounded-lg text-stone-600 hover:text-stone-900"
          >
            <RotateCcw size={15} />
          </button>

          <span className="text-xs font-mono font-medium text-stone-500 ml-1">
            ({totalRooms} {totalRooms === 1 ? 'Suite' : 'Suites'})
          </span>
        </div>

      </div>
    </div>
  );
};
