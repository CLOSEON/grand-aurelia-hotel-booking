import React, { useState } from 'react';
import { Volume2, VolumeX, Bell } from 'lucide-react';

interface Props {
  onRing: () => void;
  muted: boolean;
  onToggleMute: () => void;
}

export const SkeuomorphicBell: React.FC<Props> = ({ onRing, muted, onToggleMute }) => {
  const [isRinging, setIsRinging] = useState(false);
  const [showRipple, setShowRipple] = useState(false);

  const handleRing = () => {
    setIsRinging(true);
    setShowRipple(true);
    onRing();

    setTimeout(() => setIsRinging(false), 200);
    setTimeout(() => setShowRipple(false), 1000);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Sound Mute/Unmute Toggle Button */}
      <button
        onClick={onToggleMute}
        title={muted ? 'Unmute Concierge Bell' : 'Mute Concierge Bell'}
        className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors"
      >
        {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </button>

      {/* Sleek Minimalist Concierge Service Bell */}
      <div className="relative group">
        {/* Subtle ripple on ring */}
        {showRipple && (
          <div className="absolute -inset-2 rounded-full border border-amber-500/60 animate-ping pointer-events-none" />
        )}

        <button
          onClick={handleRing}
          title="Ring Concierge Bell"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 text-xs font-medium transition-all ${
            isRinging ? 'scale-95 bg-amber-50 border-amber-300' : ''
          }`}
        >
          <Bell size={15} className={`text-amber-700 ${isRinging ? 'animate-bounce' : ''}`} />
          <span className="hidden sm:inline font-sans">Ring Desk</span>
        </button>
      </div>
    </div>
  );
};
