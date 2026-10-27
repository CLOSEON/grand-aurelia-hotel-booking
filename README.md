# 🛎️ The Grand Aurelia — Luxury Heritage Hotel Booking Web Application

An aristocratic, production-ready luxury hotel room booking web application built with **MongoDB**, **Node.js**, and **TypeScript**, showcasing **Neo-Skeuomorphic design**, tactile 3D micro-interactions, real-time date conflict validation, and Web Audio API sensory effects.

Designed specifically for college submissions, viva presentations, and real-world production deployment.

---

## 🌟 Key Highlights & Skeuomorphic Features

1. **Tactile Neo-Skeuomorphism Aesthetic**:
   - Polished brushed brass and gold metallic gradients.
   - Hand-stitched cognac and velvet leather cards with realistic ambient drop shadows.
   - Physical **3D Tactile Buttons** with specular highlights, realistic bottom extrusions, and physical depression on `:active` clicks.
   - Authentic **Interactive Brass Concierge Bell** that rings with real acoustic harmonics synthesized via the browser's Web Audio API.

2. **3D Interactive Flipping Credit Card**:
   - Realistic embossed gold typography, metallic EMV microchip, and contactless payment wave.
   - Smooth **3D flip animation (180° rotation)** upon focusing on or editing the CVV security code to reveal the magnetic black strip and signature panel.

3. **Perforated Boarding Pass Voucher & 3D Golden Key**:
   - Perforated receipt edge and crimson **Wax Seal Stamp** ("GA 1894").
   - Realistic **3D Golden Room Key** with swinging emerald silk tassel physics.
   - Printable concierge boarding pass with printable CSS layout and QR pass code.
   - Celebratory golden confetti burst upon confirmed reservation.

4. **Robust End-to-End Hotel Logic**:
   - **Date Conflict Prevention**: Prevents double-booking if another reservation overlaps the selected dates.
   - **Live Nightly & Tax Tariff Calculator**: Automatically computes nights, base rate, housekeeping fee, concierge fee, and 12% hospitality tax.
   - **Full Inventory Filtering**: Filter by suite category (*Presidential Suite*, *Penthouse*, *Royal Heritage*, *Executive Brass*, *Garden Villa*), max price slider, search keyword, and sorting.
   - **Guest Management & Self-Cancellation**: Guests can view all active and previous reservations and cancel with instant ledger updates and free cancellation guarantees.
   - **Concierge Desk & Real-Time Telemetry**: Real-time KPI metrics showing gross revenue, occupancy rate percentage, total rooms, and recent bookings.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend** | Node.js, Express, TypeScript, Mongoose ODM, Morgan, CORS |
| **Database** | MongoDB (Native indexing, date overlapping query validation) |
| **Frontend** | React 18, TypeScript, Vite, TailwindCSS |
| **Audio** | Native Web Audio API (zero audio asset latency or CORS issues) |
| **Effects & Icons** | Lucide React, Canvas-Confetti, Custom 3D CSS Perspectives |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18+ (tested on Node v20/v26)
- **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017`) or MongoDB Atlas URI in `.env`

### 1. Installation
In the project root:
```bash
npm install
npm install --prefix server
npm install --prefix client
```
*(Or simply run `npm run install:all`)*

### 2. Seed Database
Populate 6 luxury suites, verified guest reviews, and initial bookings:
```bash
npm run seed
```

### 3. Run Development Mode
Launches both the Express TypeScript API (port 5001) and Vite React Frontend (port 5173) concurrently:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 4. Production Build & Run
To compile TypeScript and test the production server serving the static React build:
```bash
npm run build
npm start
```
Open **[http://localhost:5001](http://localhost:5001)** in your browser.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check & server status |
| `GET` | `/api/rooms` | Query suites with filters (`category`, `maxPrice`, `search`, `sortBy`) |
| `GET` | `/api/rooms/:id` | Get suite details, high-res gallery, amenities, and verified reviews |
| `POST` | `/api/rooms` | Add a new room to hotel inventory |
| `GET` | `/api/bookings` | List all reservations (supports `?email=` filter) |
| `POST` | `/api/bookings` | Reserve a suite (with overlap conflict validation) |
| `GET` | `/api/bookings/ref/:ref` | Retrieve boarding pass voucher by booking reference code |
| `PATCH`| `/api/bookings/:id/cancel` | Cancel an existing reservation |
| `GET` | `/api/stats` | Concierge telemetry (gross revenue, occupancy, bookings) |

---

## 🎓 College Viva & Evaluation Notes

1. **Why MongoDB?**: Hotel rooms have flexible, rich nested schemas (multiple high-res photo arrays, nested amenities, dynamic pricing, and reviews). MongoDB's document model represents suites, bookings, and customer profiles with zero relational impedance.
2. **Double-Booking Prevention**: Date checks are executed server-side using MongoDB's `$or` date-range overlap condition (`checkIn < newCheckOut` and `checkOut > newCheckIn`), ensuring 100% booking integrity.
3. **Audio Synthesis**: Instead of fragile external MP3 links that fail offline, audio is generated mathematically via the browser's `AudioContext` oscillator nodes with natural harmonic decay.
4. **Clean Code & Type Safety**: Both frontend and backend are written in strict TypeScript with comprehensive type definitions.

---
*Created for Academic Excellence & Production-Grade Demonstration.*

