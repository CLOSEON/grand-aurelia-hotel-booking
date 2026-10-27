import React from 'react';
import { Crown, Sparkles, MapPin, Phone, Mail, Award, Clock } from 'lucide-react';

interface Props {
  onSelectCategory: (cat: string) => void;
  playClick: () => void;
}

export const Footer: React.FC<Props> = ({ onSelectCategory, playClick }) => {
  return (
    <footer className="mt-20 border-t border-brass-300 bg-white/95 backdrop-blur-md relative overflow-hidden shadow-inner">
      {/* Decorative Top Brass Bar */}
      <div className="h-1.5 w-full brass-metallic-bg" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl brass-metallic-bg p-0.5 flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-amber-50 rounded-[10px] flex items-center justify-center">
                  <Crown className="w-5 h-5 text-amber-700" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-lg font-black gold-metallic-text uppercase tracking-wider">
                  The Grand Aurelia
                </h3>
                <span className="text-[10px] text-amber-800 uppercase tracking-widest font-bold block">
                  Haute Hospitality
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Founded in 1894, The Grand Aurelia stands as the world's standard of skeuomorphic architectural luxury, bespoke royal butler care, and discrete private stays.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-800 font-bold">
              <Award size={15} className="text-amber-600" />
              <span className="font-serif italic">Forbes 5-Star & Heritage Palace Laureate</span>
            </div>
          </div>

          {/* Suites Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-amber-950">
              Signature Sanctuaries
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 font-medium">
              {['Presidential Suite', 'Penthouse', 'Royal Heritage', 'Executive Brass', 'Garden Villa'].map((c) => (
                <li key={c}>
                  <button
                    onClick={() => {
                      playClick();
                      onSelectCategory(c);
                    }}
                    className="hover:text-amber-900 transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles size={12} className="text-amber-600" />
                    <span>{c}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Concierge & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-amber-950">
              Concierge Direct
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 font-medium">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-amber-700 flex-shrink-0 mt-0.5" />
                <span>1894 Aurelia Boulevard, Grand Harbor Peninsula</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-amber-700 flex-shrink-0" />
                <span>+1 (800) 287-3542 (Concierge)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-amber-700 flex-shrink-0" />
                <span>concierge@grandaurelia.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={14} className="text-amber-700 flex-shrink-0" />
                <span>24/7 Private Desk & Helipad Dispatch</span>
              </li>
            </ul>
          </div>

          {/* College Project Submission Note */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-amber-950">
              College Project Details
            </h4>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-stone-800 space-y-1.5 font-mono shadow-sm">
              <div><strong className="text-amber-900">Stack:</strong> MongoDB, Node.js, TS</div>
              <div><strong className="text-amber-900">Port:</strong> Client 5173 / API 5001</div>
              <div><strong className="text-amber-900">Theme:</strong> Tactile Skeuomorphism</div>
              <div><strong className="text-amber-900">Status:</strong> Production Ready</div>
            </div>
            <p className="text-[10px] text-stone-500 font-medium">
              Designed with full CRUD support, responsive layouts, audio-tactile feedback, and real-time MongoDB transaction guarantees.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-medium">
          <div>
            © 2026 The Grand Aurelia Palace & Suites. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-amber-800 font-semibold">
            <span>Privacy Charter</span>
            <span>•</span>
            <span>Guest Protocol</span>
            <span>•</span>
            <span>Concierge Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
