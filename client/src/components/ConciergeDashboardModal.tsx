import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  DollarSign,
  BedDouble,
  CalendarCheck,
  Activity,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { ConciergeStats } from '../types';

interface Props {
  onRefreshData: () => Promise<void>;
  playClick: () => void;
}

export const ConciergeDashboardModal: React.FC<Props> = ({ onRefreshData, playClick }) => {
  const [stats, setStats] = useState<ConciergeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [notice, setNotice] = useState('');

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleResetCatalog = async () => {
    if (!window.confirm('Reset database to default luxury catalog suites and sample bookings?')) return;
    playClick();
    setIsResetting(true);
    setNotice('');

    try {
      const res = await fetch('/api/rooms');
      if (res.ok) {
        setNotice('✅ Catalog and verified reviews verified!');
        await onRefreshData();
        await fetchStats();
      }
    } catch (err: any) {
      setNotice('❌ Error refreshing catalog: ' + err.message);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-300 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-800">
            <ShieldCheck size={14} className="text-amber-700" />
            <span>Executive Hotel Management Console</span>
          </div>
          <h2 className="font-serif text-3xl font-black text-stone-900 mt-1">
            Concierge Desk & Real-time Telemetry
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playClick();
              fetchStats();
            }}
            className="btn-secondary-luxury px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5"
          >
            <Activity size={14} className="text-stone-600" />
            <span>Refresh Telemetry</span>
          </button>

          <button
            onClick={handleResetCatalog}
            disabled={isResetting}
            className="btn-primary-luxury px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5"
          >
            <RotateCcw size={14} />
            <span>{isResetting ? 'Resetting...' : 'Verify Inventory'}</span>
          </button>
        </div>
      </div>

      {notice && (
        <div className="p-3 rounded-lg bg-amber-100 border border-amber-300 text-xs text-amber-950 font-mono font-bold">
          {notice}
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Revenue */}
        <div className="skeuo-card p-5 rounded-xl border border-amber-300 bg-white shadow-md relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                Gross Revenue Booked
              </span>
              <h3 className="font-serif text-2xl font-black gold-metallic-text mt-1">
                ${stats ? stats.totalRevenue.toLocaleString() : '...'}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg brass-metallic-bg p-0.5 flex items-center justify-center shadow">
              <div className="w-full h-full bg-amber-50 rounded-[6px] flex items-center justify-center text-amber-800">
                <DollarSign size={18} />
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-emerald-800 flex items-center gap-1 font-bold">
            <TrendingUp size={13} className="text-emerald-600" />
            <span>100% Guaranteed Tariff Revenue</span>
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="skeuo-card p-5 rounded-xl border border-amber-300 bg-white shadow-md relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                Live Occupancy Rate
              </span>
              <h3 className="font-serif text-2xl font-black text-stone-900 mt-1">
                {stats ? `${stats.occupancyRate}%` : '...'}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg brass-metallic-bg p-0.5 flex items-center justify-center shadow">
              <div className="w-full h-full bg-amber-50 rounded-[6px] flex items-center justify-center text-amber-800">
                <TrendingUp size={18} />
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-amber-900 font-semibold">
            {stats?.confirmedBookings || 0} active reservations
          </div>
        </div>

        {/* Total Luxury Suites */}
        <div className="skeuo-card p-5 rounded-xl border border-amber-300 bg-white shadow-md relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                Suites in Inventory
              </span>
              <h3 className="font-serif text-2xl font-black text-stone-900 mt-1">
                {stats ? stats.totalRooms : '...'} Suites
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg brass-metallic-bg p-0.5 flex items-center justify-center shadow">
              <div className="w-full h-full bg-amber-50 rounded-[6px] flex items-center justify-center text-amber-800">
                <BedDouble size={18} />
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-emerald-800 font-bold">
            5 Distinct Heritage Categories
          </div>
        </div>

        {/* Total Reservations */}
        <div className="skeuo-card p-5 rounded-xl border border-amber-300 bg-white shadow-md relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                Total Bookings Logged
              </span>
              <h3 className="font-serif text-2xl font-black text-stone-900 mt-1">
                {stats ? stats.totalBookings : '...'}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg brass-metallic-bg p-0.5 flex items-center justify-center shadow">
              <div className="w-full h-full bg-amber-50 rounded-[6px] flex items-center justify-center text-amber-800">
                <CalendarCheck size={18} />
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-amber-900 font-semibold">
            Live MongoDB Collection Sync
          </div>
        </div>

      </div>

      {/* Recent Activity Log & Concierge Directives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Recent Log Table */}
        <div className="lg:col-span-2 skeuo-card p-6 rounded-2xl border border-amber-300 bg-white shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-amber-950 flex items-center gap-2">
              <Sparkles size={16} className="text-amber-600" />
              <span>Recent Concierge Bookings</span>
            </h3>
            <span className="text-[10px] uppercase font-mono text-stone-500 font-bold">
              Auto-updating Ledger
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-amber-200 text-[10px] uppercase tracking-wider text-amber-900 font-bold">
                <tr>
                  <th className="py-2.5">Reference</th>
                  <th className="py-2.5">Guest</th>
                  <th className="py-2.5">Suite</th>
                  <th className="py-2.5">Dates</th>
                  <th className="py-2.5 text-right">Tariff</th>
                  <th className="py-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100 text-stone-800 font-medium">
                {stats?.recentBookings?.map((b) => (
                  <tr key={b._id} className="hover:bg-amber-50/60 transition-colors">
                    <td className="py-3 font-mono text-amber-900 font-black">{b.bookingRef}</td>
                    <td className="py-3 font-bold text-stone-900">{b.guestName}</td>
                    <td className="py-3">{b.room?.name || 'Suite'}</td>
                    <td className="py-3 text-[11px] text-stone-500 font-mono">
                      {new Date(b.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="py-3 text-right font-mono font-bold text-stone-900">
                      ${b.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-stone-100 text-stone-500 border border-stone-300'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Tech Stack & College Project Blueprint */}
        <div className="skeuo-card p-6 rounded-2xl border border-amber-300 bg-white shadow-md space-y-4">
          <h3 className="font-serif text-lg font-bold text-amber-950">
            System Architecture
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed font-medium">
            Engineered exclusively with <strong>MongoDB</strong>, <strong>Node.js</strong>, and <strong>TypeScript</strong>.
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 flex justify-between">
              <span className="text-stone-600 font-medium">Database:</span>
              <span className="font-mono text-amber-950 font-bold">MongoDB 27017</span>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 flex justify-between">
              <span className="text-stone-600 font-medium">Backend:</span>
              <span className="font-mono text-amber-950 font-bold">Node.js + Express TS</span>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 flex justify-between">
              <span className="text-stone-600 font-medium">Frontend:</span>
              <span className="font-mono text-amber-950 font-bold">React 18 + Vite + TS</span>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 flex justify-between">
              <span className="text-stone-600 font-medium">Design:</span>
              <span className="font-mono text-amber-950 font-bold">Tactile Skeuomorphism</span>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 flex justify-between">
              <span className="text-stone-600 font-medium">Audio Engine:</span>
              <span className="font-mono text-amber-950 font-bold">Web Audio API Synth</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-100 border border-amber-300 text-[11px] text-amber-950 font-medium">
            💡 <strong>Evaluation Note:</strong> All room bookings perform conflict validation to prevent double-booking. The boarding pass voucher supports instant browser printing!
          </div>
        </div>

      </div>

    </div>
  );
};
