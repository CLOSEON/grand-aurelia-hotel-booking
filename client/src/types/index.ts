export interface Room {
  _id: string;
  name: string;
  slug: string;
  category: 'Penthouse' | 'Presidential Suite' | 'Royal Heritage' | 'Executive Brass' | 'Garden Villa' | string;
  description: string;
  shortDescription: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  floor: number;
  roomNumber: string;
  images: string[];
  amenities: string[];
  highlights: string[];
  bedType: string;
  view: string;
  featured: boolean;
  isAvailable: boolean;
  badge?: string;
  reviews?: Review[];
  bookedDates?: { start: string; end: string }[];
}

export interface Booking {
  _id: string;
  bookingRef: string;
  room: Room;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  totalNights: number;
  nightlyRate: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  totalAmount: number;
  status: 'confirmed' | 'checked-in' | 'completed' | 'cancelled';
  specialRequests?: string;
  paymentMethod: 'credit_card' | 'concierge_cash' | 'crypto_vault';
  cardLastFour?: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  room: string;
  guestName: string;
  guestLocation: string;
  avatar: string;
  rating: number;
  comment: string;
  stayDate: string;
  verifiedStay: boolean;
  createdAt: string;
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  guests: number;
  search: string;
  sortBy: 'popular' | 'price_asc' | 'price_desc' | 'rating';
}

export interface ConciergeStats {
  totalRooms: number;
  totalBookings: number;
  confirmedBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  recentBookings: Booking[];
}

