import React from 'react';
import { Volume2, VolumeX, Calendar, Phone, MapPin } from 'lucide-react';
import { VENUE } from '../data/shotsData';

export default function LoungeDock({ audioOn, onToggleAudio, onOpenReserve }) {
  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 z-40 flex items-center justify-between sm:justify-end gap-2.5 pointer-events-none">
      <button
        onClick={onToggleAudio}
        className={`pointer-events-auto inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full backdrop-blur-md border text-xs font-semibold shadow-xl transition cursor-pointer ${
          audioOn
            ? 'bg-[#f2b441] text-[#16120e] border-[#f2b441]'
            : 'bg-[#181410]/90 text-[#e9dfd2] border-[#f2b441]/30 hover:border-[#f2b441]'
        }`}
        title="Toggle subtle lounge ambience & tactile UI clinks"
      >
        {audioOn ? (
          <>
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span>Lounge Audio: On</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#f2b441]" />
            <span>Lounge Vibe</span>
          </>
        )}
      </button>

      <div className="pointer-events-auto flex sm:hidden items-center gap-2">
        <a
          href={`tel:${VENUE.phone.replace(/\s+/g, '')}`}
          aria-label="Call SHOTS"
          className="p-2.5 rounded-full bg-[#181410]/90 border border-white/15 text-[#f6efe6] shadow-xl"
        >
          <Phone className="w-4 h-4 text-[#f2b441]" />
        </a>
        <a
          href={VENUE.mapsUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Maps"
          className="p-2.5 rounded-full bg-[#181410]/90 border border-white/15 text-[#f6efe6] shadow-xl"
        >
          <MapPin className="w-4 h-4 text-[#f2b441]" />
        </a>
        <button
          onClick={() => onOpenReserve()}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#f2b441] text-[#16120e] font-bold text-xs shadow-xl cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book</span>
        </button>
      </div>
    </div>
  );
}
