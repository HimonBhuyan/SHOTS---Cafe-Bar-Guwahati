import React, { useState } from 'react';
import { RotateCw, Plus, Check } from 'lucide-react';
import { CrownDoodle } from './Doodles';
import { soundEngine } from '../utils/soundEngine';

export default function FlipPolaroid({ item, rotation = '0deg', isChefHighlight = false, onAddToTray }) {
  const [flipped, setFlipped] = useState(false);
  const [added, setAdded] = useState(false);

  const handleFlip = () => {
    soundEngine.playPaperFlip();
    setFlipped((f) => !f);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToTray?.(item);
    soundEngine.playClink();
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      style={{ perspective: '1100px', transform: `rotate(${rotation})` }}
      className="relative group h-[360px] transition-transform duration-300 hover:rotate-0 hover:-translate-y-2"
    >
      <div className="masking-tape w-20 h-5 absolute -top-2.5 left-1/2 -translate-x-1/2 -rotate-1 rounded-[2px] z-30 pointer-events-none" />

      {isChefHighlight && (
        <div className="absolute -top-6 -left-3 z-30 flex items-center gap-1 bg-[#110f0d] text-[#f2b441] px-2.5 py-1 rounded-full border border-[#f2b441]/60 shadow-lg -rotate-6 pointer-events-none">
          <CrownDoodle className="w-4 h-4" />
          <span className="font-script text-base font-bold leading-none">House Pick!</span>
        </div>
      )}

      <div
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleFlip();
          }
        }}
        aria-label={`Flip ${item.name} Polaroid for Bar & Kitchen Note`}
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        className="relative w-full h-full transition-transform duration-500 cursor-pointer"
      >
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 polaroid-card p-3.5 pb-4 rounded-[4px] flex flex-col justify-between"
        >
          <div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#1e1812] mb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#110f0d]/75 text-[#f6efe6] text-[10px] font-medium opacity-85 group-hover:opacity-100">
                <RotateCw className="w-2.5 h-2.5" />
                Flip note
              </span>
            </div>

            <div className="flex items-start justify-between gap-2">
              <h3 className="font-script text-2xl font-bold text-[#1c1610] leading-tight">
                {item.name}
              </h3>
              <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-[#f2b441] text-[#16120e] font-hand font-bold text-sm shadow-sm">
                ₹{item.price}
              </span>
            </div>
            <p className="text-xs text-[#5a4836] mt-1.5 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 bg-kraft-note p-5 rounded-[4px] flex flex-col justify-between border border-[#c6ac88]"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#8c7051]/30 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9c5206]">
                Bar &amp; Kitchen Note
              </span>
              <RotateCw className="w-3.5 h-3.5 text-[#6d5944]" />
            </div>

            <h3 className="font-script text-3xl font-bold text-[#1c1610] leading-none">
              {item.name}
            </h3>

            <p className="font-hand text-sm text-[#3c2d1f] leading-relaxed">
              {item.pairingTip || item.description}
            </p>

            <div className="p-2.5 rounded-lg bg-[#f8f1e5]/70 border border-[#c6ac88]/60 text-xs text-[#4a3929]">
              <strong>Portion Price:</strong> ₹{item.price}{' '}
              <span className="ml-1.5">· {item.isVeg ? '● Vegetarian' : '▲ Non-Veg'}</span>
            </div>
          </div>

          {onAddToTray && (
            <button
              onClick={handleAdd}
              className={`w-full py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#1c1610] text-[#f2b441] hover:bg-[#32271d]'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added to Tray!</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Table Tray · ₹{item.price}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
