import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { RoomFilterBar } from './components/RoomFilterBar';
import { RoomCard } from './components/RoomCard';
import { RoomDetailModal } from './components/RoomDetailModal';
import { BookingModal } from './components/BookingModal';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { MyBookingsView } from './components/MyBookingsView';
import { ConciergeDashboardModal } from './components/ConciergeDashboardModal';
import { Footer } from './components/Footer';
import { useSoundEffects } from './hooks/useSoundEffects';
import { Room, Booking, FilterState } from './types';
import { Sparkles, BedDouble } from 'lucide-react';

export const App: React.FC = () => {
  const { muted, toggleSound, playBell, playClick, playSuccessChime } = useSoundEffects();

  const [activeTab, setActiveTab] = useState<'suites' | 'reservations' | 'concierge'>('suites');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [selectedRoomForDetail, setSelectedRoomForDetail] = useState<Room | null>(null);
  const [bookingRoom, setBookingRoom] = useState<Room | null>(null);
  const [bookingDates, setBookingDates] = useState<{ checkIn: string; checkOut: string; guests: number } | undefined>();
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    category: 'All Suites',
    minPrice: 0,
    maxPrice: 3000,
    guests: 1,
    search: '',
    sortBy: 'popular',
  });

  // Fetch Rooms
  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category && filters.category !== 'All Suites') {
        params.append('category', filters.category);
      }
      if (filters.maxPrice) {
        params.append('maxPrice', filters.maxPrice.toString());
      }
      if (filters.guests > 1) {
        params.append('guests', filters.guests.toString());
      }
      if (filters.search) {
        params.append('search', filters.search);
      }
      if (filters.sortBy) {
        params.append('sortBy', filters.sortBy);
      }

      const res = await fetch(`/api/rooms?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setRooms(data.data);
      } else {
        setError(data.message || 'Failed to fetch suites');
      }
    } catch (err: any) {
      console.error('Fetch rooms error:', err);
      setError('Could not connect to Grand Aurelia Hotel API. Please check server.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch Bookings
  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (err) {
      console.error('Fetch bookings error:', err);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Reset Filters
  const handleResetFilters = () => {
    setFilters({
      category: 'All Suites',
      minPrice: 0,
      maxPrice: 3000,
      guests: 1,
      search: '',
      sortBy: 'popular',
    });
  };

  // Quick Hero Search handler
  const handleHeroSearch = (criteria: { checkIn: string; checkOut: string; guests: number; category: string }) => {
    setFilters((prev) => ({
      ...prev,
      guests: criteria.guests,
      category: criteria.category,
    }));
    const el = document.getElementById('suites-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Open Room Detail
  const handleSelectRoom = async (room: Room) => {
    try {
      const res = await fetch(`/api/rooms/${room._id}`);
      const data = await res.json();
      if (data.success) {
        setSelectedRoomForDetail(data.data);
      } else {
        setSelectedRoomForDetail(room);
      }
    } catch {
      setSelectedRoomForDetail(room);
    }
  };

  // Trigger Booking Flow
  const handleStartBooking = (
    room: Room,
    dates?: { checkIn: string; checkOut: string; guests: number }
  ) => {
    setSelectedRoomForDetail(null);
    setBookingRoom(room);
    setBookingDates(dates);
  };

  // Cancel Booking
  const handleCancelBooking = async (bookingId: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'PATCH',
      });
      const data = await res.json();
      if (data.success) {
        await fetchBookings();
        playBell();
      } else {
        alert(data.message || 'Could not cancel booking');
      }
    } catch (err: any) {
      alert('Error cancelling reservation: ' + err.message);
    }
  };

  // Successful Booking
  const handleBookingSuccess = (newBooking: Booking) => {
    setBookingRoom(null);
    setConfirmedBooking(newBooking);
    fetchBookings();
  };

  const confirmedCount = useMemo(() => {
    return bookings.filter((b) => b.status === 'confirmed').length;
  }, [bookings]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-amber-300 selection:text-amber-950">
      
      {/* Skeuomorphic Concierge Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          playClick();
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookingCount={confirmedCount}
        onRingBell={playBell}
        muted={muted}
        onToggleMute={toggleSound}
        onBookNowClick={() => {
          playClick();
          if (rooms.length > 0) {
            handleStartBooking(rooms[0]);
          }
        }}
      />

      {/* MAIN VIEW CONTROLLER */}
      <main className="flex-1">
        
        {/* VIEW 1: SUITES CATALOG & DISCOVERY */}
        {activeTab === 'suites' && (
          <div className="space-y-12">
            
            {/* Parallax Hero Banner */}
            <HeroBanner
              onSearch={handleHeroSearch}
              onExploreClick={() => {
                playClick();
                const el = document.getElementById('suites-catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              playClick={playClick}
            />

            {/* Catalog Section */}
            <section
              id="suites-catalog"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-2"
            >
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-amber-300 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-800">
                    <Sparkles size={13} className="text-amber-600" />
                    <span>Curated Inventory • Autumn 2026</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-black text-stone-900 mt-1">
                    Signature Sanctuaries & Penthouses
                  </h2>
                </div>

                <div className="text-xs text-amber-900 font-bold font-mono bg-amber-100 px-3 py-1 rounded-full border border-amber-300 shadow-sm">
                  {rooms.length} Suites Available for Instant Reservation
                </div>
              </div>

              {/* Skeuomorphic Filter Strip */}
              <RoomFilterBar
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
                playClick={playClick}
                totalRooms={rooms.length}
              />

              {/* Error Alert */}
              {error && (
                <div className="p-4 rounded-xl bg-red-100 border border-red-300 text-red-900 text-xs font-bold">
                  {error}
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="py-20 text-center space-y-3">
                  <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="font-serif text-sm text-amber-900 uppercase tracking-widest font-bold">
                    Consulting Palace Ledger...
                  </p>
                </div>
              )}

              {/* Room Cards Grid */}
              {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                  {rooms.map((room) => (
                    <RoomCard
                      key={room._id}
                      room={room}
                      onSelect={handleSelectRoom}
                      onBookNow={handleStartBooking}
                      playClick={playClick}
                    />
                  ))}
                </div>
              )}

              {/* Zero Results State */}
              {!loading && rooms.length === 0 && (
                <div className="skeuo-card p-12 text-center rounded-2xl border border-amber-300 max-w-md mx-auto space-y-4 bg-white">
                  <BedDouble className="w-12 h-12 text-amber-600 mx-auto" />
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    No Matching Suites Found
                  </h3>
                  <p className="text-xs text-stone-600 font-medium">
                    Try adjusting your maximum price or choosing another category.
                  </p>
                  <button
                    onClick={() => {
                      playClick();
                      handleResetFilters();
                    }}
                    className="btn-primary-luxury px-5 py-2.5 text-xs font-semibold uppercase tracking-wider"
                  >
                    Reset Search Criteria
                  </button>
                </div>
              )}

            </section>

          </div>
        )}

        {/* VIEW 2: MY RESERVATIONS */}
        {activeTab === 'reservations' && (
          <MyBookingsView
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onViewBookingTicket={(booking) => {
              playClick();
              setConfirmedBooking(booking);
            }}
            onExploreSuites={() => {
              playClick();
              setActiveTab('suites');
            }}
            playClick={playClick}
          />
        )}

        {/* VIEW 3: CONCIERGE DESK & TELEMETRY */}
        {activeTab === 'concierge' && (
          <ConciergeDashboardModal
            onRefreshData={async () => {
              await fetchRooms();
              await fetchBookings();
            }}
            playClick={playClick}
          />
        )}

      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveTab('suites');
          setFilters((prev) => ({ ...prev, category: cat }));
          const el = document.getElementById('suites-catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        playClick={playClick}
      />

      {/* POPUP MODAL 1: SUITE DETAILS & SPECIFICATIONS */}
      {selectedRoomForDetail && (
        <RoomDetailModal
          room={selectedRoomForDetail}
          onClose={() => setSelectedRoomForDetail(null)}
          onBookNow={(room, dates) => handleStartBooking(room, dates)}
          playClick={playClick}
        />
      )}

      {/* POPUP MODAL 2: SKEUOMORPHIC BOOKING & CREDIT CARD */}
      {bookingRoom && (
        <BookingModal
          room={bookingRoom}
          initialDates={bookingDates}
          onClose={() => setBookingRoom(null)}
          onSuccess={handleBookingSuccess}
          playClick={playClick}
        />
      )}

      {/* POPUP MODAL 3: BOARDING PASS TICKET & GOLDEN ROOM KEY */}
      {confirmedBooking && (
        <BookingSuccessModal
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
          onViewReservations={() => {
            setConfirmedBooking(null);
            setActiveTab('reservations');
          }}
          playSuccessChime={playSuccessChime}
          playClick={playClick}
        />
      )}

    </div>
  );
};

export default App;
