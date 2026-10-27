import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Room } from '../models/Room';
import { Booking } from '../models/Booking';
import { Review } from '../models/Review';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/grand_aurelia_hotel';

const seedRooms = [
  {
    name: 'The Crown Jewel Presidential Suite',
    slug: 'crown-jewel-presidential-suite',
    category: 'Presidential Suite',
    description:
      'Perched on the 50th floor of The Grand Aurelia, the Crown Jewel Presidential Suite is the pinnacle of timeless European luxury. Featuring a 360-degree glass rotunda overlooking the coast and metropolis, an authentic Steinway & Sons baby grand piano, private gold-leaf bar, and dedicated private butler service.',
    shortDescription: 'The pinnacle of luxury: 360° views, Steinway grand piano, and 24/7 dedicated butler.',
    pricePerNight: 2450,
    rating: 4.98,
    reviewCount: 38,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 3,
    sqft: 3400,
    floor: 50,
    roomNumber: 'PH-5001',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
    ],
    amenities: [
      '24/7 Royal Butler',
      'Steinway Grand Piano',
      'Helipad Access',
      'Private Heated Infinity Jacuzzi',
      'Bang & Olufsen Sound System',
      'Carrara Marble Bathrooms',
      'Walk-in Dressing Salon',
      'Complimentary Dom Pérignon',
    ],
    highlights: ['Highest suite in city', 'Panoramic sunset views', 'Private elevator key access'],
    bedType: 'Royal Emperor King',
    view: 'Panoramic Skyline & Ocean',
    featured: true,
    isAvailable: true,
    badge: 'Hotel Crown Jewel',
  },
  {
    name: 'The Obsidian Skyline Penthouse',
    slug: 'obsidian-skyline-penthouse',
    category: 'Penthouse',
    description:
      'Sculpted with charcoal fluted marble, brushed brass trims, and dark walnut millwork, the Obsidian Penthouse embodies sultry contemporary grandeur. Enjoy a private wrap-around terrace, gas-flame hearth, and an outdoor heated soaking tub suspended above the city lights.',
    shortDescription: 'Ultra-modern dark luxury with wrap-around terrace and outdoor sky jacuzzi.',
    pricePerNight: 1850,
    rating: 4.96,
    reviewCount: 44,
    maxGuests: 3,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 2600,
    floor: 48,
    roomNumber: 'PH-4802',
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85',
    ],
    amenities: [
      'Wrap-around Terrace',
      'Outdoor Heated Sky Soaker',
      'Dyson Supersonic Station',
      'Sommelier Reserve Wine Bar',
      'Heated Italian Terrazzo Floors',
      'Smart Mood Lighting',
    ],
    highlights: ['Wrap-around balcony', 'Nightly astronomy telescope', 'Private cocktail masterclass'],
    bedType: 'California King Silk',
    view: 'Metropolitan Nightscape',
    featured: true,
    isAvailable: true,
    badge: 'Most Popular Penthouse',
  },
  {
    name: 'The Royal Heritage Venetian Suite',
    slug: 'royal-heritage-venetian-suite',
    category: 'Royal Heritage',
    description:
      'Step into old-world Venetian grandeur with handcrafted brass sconces, damask wall upholstery, gilded moldings, and antique crystal chandeliers. The master bath is wrapped in hand-quarried Calacatta gold marble with a freestanding brass soaking tub.',
    shortDescription: 'Classic old-world Italian elegance with hand-carved mahogany and brass tub.',
    pricePerNight: 1250,
    rating: 4.95,
    reviewCount: 52,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 2,
    sqft: 1850,
    floor: 28,
    roomNumber: 'RH-2804',
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=85',
    ],
    amenities: [
      'Handmade Brass Soaking Tub',
      'French Press & Rare Darjeeling Bar',
      'Antique Crystal Chandeliers',
      'Cashmere Robes & Slippers',
      'Daily Afternoon High Tea',
      'Valet Luggage Unpacking',
    ],
    highlights: ['Antique Venetian mirror', 'Turndown lavender mist', 'Private study salon'],
    bedType: 'Custom Hand-Carved King',
    view: 'Palace Gardens & Fountains',
    featured: true,
    isAvailable: true,
    badge: 'Historic Masterpiece',
  },
  {
    name: 'Sovereign Executive Brass Suite',
    slug: 'sovereign-executive-brass-suite',
    category: 'Executive Brass',
    description:
      'Tailored for discerning travelers, featuring rich cognac leather armchairs, an executive English oak writing desk, brass desk hardware, high-fidelity acoustic isolation, and high-speed satellite Wi-Fi. Unwind with an artisanal espresso or single malt whiskey at your private dry bar.',
    shortDescription: 'Executive sophistication with cognac leather, brass details, and private bar.',
    pricePerNight: 780,
    rating: 4.91,
    reviewCount: 61,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 1200,
    floor: 18,
    roomNumber: 'EX-1808',
    images: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1507038772120-7ffe76778f01?auto=format&fit=crop&w=1600&q=85',
    ],
    amenities: [
      'English Oak Executive Desk',
      'Nespresso Vertuo Barista',
      'Herman Miller Ergonomic Chair',
      'Acoustic Triple-Glazed Glass',
      'Rainfall Shower with Aromatherapy',
      'Complimentary Pressing Service',
    ],
    highlights: ['Flawless acoustics', 'High-speed encrypted fiber', 'Private meeting lounge'],
    bedType: 'Plush King Pillow-top',
    view: 'Metropolitan Financial District',
    featured: false,
    isAvailable: true,
    badge: 'Executive Top Pick',
  },
  {
    name: 'Laguna Royale Private Garden Villa',
    slug: 'laguna-royale-private-garden-villa',
    category: 'Garden Villa',
    description:
      'A secluded sanctuary enveloped by botanical flora and jasmine vines. Features a private heated plunge pool, teak solarium, open-air stone rain shower, and outdoor candlelit dining pavilion. The quintessential romantic retreat.',
    shortDescription: 'Secluded botanical sanctuary with private plunge pool and open-air rain shower.',
    pricePerNight: 1650,
    rating: 4.99,
    reviewCount: 29,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 2,
    sqft: 2200,
    floor: 1,
    roomNumber: 'GV-0103',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85',
    ],
    amenities: [
      'Private Heated Plunge Pool',
      'Outdoor Dining Pavilion',
      'Open-Air Stone Rainfall Shower',
      'Bespoke Fire Pit with Reclining Daybeds',
      'Gourmet Floating Breakfast',
      'Organic Herb Garden Access',
    ],
    highlights: ['Total botanical privacy', 'Direct garden entrance', 'Private night security'],
    bedType: 'Four-Poster Canopy King',
    view: 'Private Botanical Sanctuary',
    featured: true,
    isAvailable: true,
    badge: 'Romantic Retreat',
  },
  {
    name: 'Sapphire Grand Harbor Suite',
    slug: 'sapphire-grand-harbor-suite',
    category: 'Royal Heritage',
    description:
      'Gazing over yachts and azure harbor waters, the Sapphire Suite showcases nautical brass accents, sapphire velvet upholstery, and custom marine mahogany. Watch the sun dip beneath the waves from your deep-seated teak loggia.',
    shortDescription: 'Maritime luxury with direct harbor views, teak loggia, and deep sapphire velvets.',
    pricePerNight: 950,
    rating: 4.89,
    reviewCount: 35,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 1450,
    floor: 12,
    roomNumber: 'SH-1205',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1600&q=85',
    ],
    amenities: [
      'Private Teak Loggia',
      'Binoculars for Yacht Spotting',
      'Molton Brown Coastal Bath Amenities',
      'Dual Vanity Backlit Mirrors',
      'Pillow Menu (Silk, Goose Down, Memory)',
      'Evening Turn-Down Macarons',
    ],
    highlights: ['Golden hour sunset panorama', 'Direct sea breeze', 'Whispering waves acoustics'],
    bedType: 'California King',
    view: 'Marina & Coastal Waves',
    featured: false,
    isAvailable: true,
    badge: 'Harbor Horizon',
  },
];

async function seed() {
  try {
    await mongoose.connect(mongoURI);
    console.log('🛎️ [Seed] Connected to database.');

    // Clear existing
    await Room.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});
    console.log('🧹 [Seed] Cleared existing records.');

    // Insert rooms
    const createdRooms = await Room.insertMany(seedRooms);
    console.log(`✨ [Seed] Inserted ${createdRooms.length} luxury suites.`);

    // Insert rich reviews for each suite
    const reviewData = [
      {
        room: createdRooms[0]._id,
        guestName: 'Lord Alistair Sterling',
        guestLocation: 'London, UK',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        comment:
          'Unrivalled perfection. The Steinway grand piano was tuned flawlessly before our arrival, and Arthur our butler anticipated every request with regal precision.',
        stayDate: 'October 2026',
        verifiedStay: true,
      },
      {
        room: createdRooms[0]._id,
        guestName: 'Madame Hélène de Montmirail',
        guestLocation: 'Paris, France',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        comment:
          'The 360-degree sunset over the ocean is etched in my soul. There is no other hotel suite on earth that matches this grandeur.',
        stayDate: 'September 2026',
        verifiedStay: true,
      },
      {
        room: createdRooms[1]._id,
        guestName: 'Kaito Takahashi',
        guestLocation: 'Tokyo, Japan',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        comment:
          'The tactile materials, brass finishes, and outdoor sky jacuzzi overlooking the nocturnal skyline made this stay truly transcendent.',
        stayDate: 'October 2026',
        verifiedStay: true,
      },
      {
        room: createdRooms[2]._id,
        guestName: 'Countess Sophia Valenti',
        guestLocation: 'Florence, Italy',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        comment:
          'Authentic Italian craftsmanship. The brass bathtub and lavender turn-down mist offered absolute tranquility.',
        stayDate: 'October 2026',
        verifiedStay: true,
      },
      {
        room: createdRooms[4]._id,
        guestName: 'Elena Rostova',
        guestLocation: 'Zurich, Switzerland',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        comment:
          'The private plunge pool surrounded by fragrant jasmine made us forget the world outside existed. Pure heaven.',
        stayDate: 'October 2026',
        verifiedStay: true,
      },
    ];

    await Review.insertMany(reviewData);
    console.log(`💎 [Seed] Inserted ${reviewData.length} verified reviews.`);

    // Insert 2 initial sample bookings so the guest dashboard & concierge desk display live data immediately
    const checkIn1 = new Date();
    checkIn1.setDate(checkIn1.getDate() + 3);
    const checkOut1 = new Date();
    checkOut1.setDate(checkOut1.getDate() + 6);

    const booking1 = await Booking.create({
      bookingRef: 'GA-2026-7841',
      room: createdRooms[1]._id,
      guestName: 'Christian Vance',
      guestEmail: 'christian.vance@aurum.io',
      guestPhone: '+1 (415) 890-2194',
      checkIn: checkIn1,
      checkOut: checkOut1,
      guests: { adults: 2, children: 0 },
      totalNights: 3,
      nightlyRate: createdRooms[1].pricePerNight,
      cleaningFee: 150,
      serviceFee: 95,
      taxes: Math.round((createdRooms[1].pricePerNight * 3 + 245) * 0.12),
      totalAmount: Math.round(createdRooms[1].pricePerNight * 3 + 245 + (createdRooms[1].pricePerNight * 3 + 245) * 0.12),
      status: 'confirmed',
      specialRequests: 'Chilled bottle of vintage Champagne upon evening arrival.',
      paymentMethod: 'credit_card',
      cardLastFour: '4242',
    });

    const checkIn2 = new Date();
    checkIn2.setDate(checkIn2.getDate() + 8);
    const checkOut2 = new Date();
    checkOut2.setDate(checkOut2.getDate() + 12);

    const booking2 = await Booking.create({
      bookingRef: 'GA-2026-9214',
      room: createdRooms[2]._id,
      guestName: 'Aria Montgomery',
      guestEmail: 'aria.montgomery@prescott.org',
      guestPhone: '+44 20 7946 0192',
      checkIn: checkIn2,
      checkOut: checkOut2,
      guests: { adults: 2, children: 1 },
      totalNights: 4,
      nightlyRate: createdRooms[2].pricePerNight,
      cleaningFee: 150,
      serviceFee: 95,
      taxes: Math.round((createdRooms[2].pricePerNight * 4 + 245) * 0.12),
      totalAmount: Math.round(createdRooms[2].pricePerNight * 4 + 245 + (createdRooms[2].pricePerNight * 4 + 245) * 0.12),
      status: 'confirmed',
      specialRequests: 'Allergenic goose-feather pillows replaced with organic silk.',
      paymentMethod: 'credit_card',
      cardLastFour: '9182',
    });

    console.log(`🛎️ [Seed] Created sample bookings: ${booking1.bookingRef}, ${booking2.bookingRef}`);
    console.log('✅ [Seed] Database seeding completed successfully.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ [Seed] Seeding failed:', error);
    process.exit(1);
  }
}

seed();

