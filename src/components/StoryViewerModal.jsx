import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ArrowRight, Instagram } from 'lucide-react';
import { INSTAGRAM_HIGHLIGHTS, VENUE } from '../data/shotsData';

export default function StoryViewerModal({ highlightId, onClose }) {
  const navigate = useNavigate();
  const highlightIndex = INSTAGRAM_HIGHLIGHTS.findIndex((h) => h.id === highlightId);
  const [activeHighlightIdx, setActiveHighlightIdx] = useState(
    highlightIndex >= 0 ? highlightIndex : 0
  );
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const idx = INSTAGRAM_HIGHLIGHTS.findIndex((h) => h.id === highlightId);
    if (idx >= 0) {
      setActiveHighlightIdx(idx);
      setSlideIdx(0);
    }
  }, [highlightId]);

  const highlight = INSTAGRAM_HIGHLIGHTS[activeHighlightIdx];
  const slides = highlight?.slides || [];
  const currentSlide = slides[slideIdx] || slides[0];

  const handleNext = () => {
    if (slideIdx < slides.length - 1) {
      setSlideIdx((s) => s + 1);
    } else if (activeHighlightIdx < INSTAGRAM_HIGHLIGHTS.length - 1) {
      setActiveHighlightIdx((h) => h + 1);
      setSlideIdx(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (slideIdx > 0) {
      setSlideIdx((s) => s - 1);
    } else if (activeHighlightIdx > 0) {
      const prevH = INSTAGRAM_HIGHLIGHTS[activeHighlightIdx - 1];
      setActiveHighlightIdx((h) => h - 1);
      setSlideIdx((prevH?.slides?.length || 1) - 1);
    }
  };

  useEffect(() => {
    if (!highlightId) return;
    const timer = setTimeout(handleNext, 5200);
    return () => clearTimeout(timer);
  }, [highlightId, activeHighlightIdx, slideIdx]);

  if (!highlightId || !highlight || !currentSlide) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${highlight.label} Instagram Story`}
    >
      <button
        onClick={onClose}
        aria-label="Close story"
        className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/10 text-white hover:bg-[#f2b441] hover:text-[#16120e] transition cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>

      <button
        onClick={handlePrev}
        aria-label="Previous story"
        className="hidden sm:flex p-3 rounded-full bg-white/10 text-white hover:bg-[#f2b441] hover:text-[#16120e] mr-4 transition cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="relative w-full max-w-sm h-[80vh] max-h-[680px] rounded-3xl overflow-hidden bg-[#110f0d] border border-[#f2b441]/35 shadow-2xl flex flex-col justify-between">
        <img
          key={`${highlight.id}-${slideIdx}`}
          src={currentSlide.image}
          alt={currentSlide.headline}
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-[pulse_12s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/15 to-black/90" />

        <div className="absolute inset-0 grid grid-cols-2 z-10">
          <div onClick={handlePrev} className="cursor-pointer" />
          <div onClick={handleNext} className="cursor-pointer" />
        </div>

        <div className="relative z-20 p-4 space-y-3 pointer-events-none">
          <div className="flex gap-1.5">
            {slides.map((_, idx) => (
              <div key={idx} className="h-1 flex-1 rounded-full bg-white/30 overflow-hidden">
                <div
                  className={`h-full bg-[#f2b441] transition-all duration-300 ${
                    idx <= slideIdx ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-[#f2b441]">
                <img
                  src="/images/shots-logo.jpg"
                  alt="shotsguwahati"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1">
                  <span>shotsguwahati</span>
                  <span className="text-[#f2b441]">• {highlight.label}</span>
                </p>
                <p className="text-[10px] text-white/75">Guwahati · Opp. City Center Mall</p>
              </div>
            </div>
            <Instagram className="w-4 h-4 text-white/80" />
          </div>
        </div>

        <div className="relative z-20 p-5 space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-[#f2b441] text-[#16120e] font-bold text-[11px] uppercase tracking-wider shadow">
            {currentSlide.sticker}
          </span>
          <h3 className="font-script text-4xl font-bold text-white leading-none">
            {currentSlide.headline}
          </h3>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            {currentSlide.caption}
          </p>

          <div className="pt-1 flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                navigate(highlight.linkTo);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#f2b441] text-[#16120e] font-bold text-xs hover:bg-[#ffd06b] transition cursor-pointer"
            >
              <span>{highlight.ctaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={VENUE.instagram}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3 rounded-full bg-white/15 text-white text-xs font-semibold hover:bg-white/25 transition"
            >
              IG
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        aria-label="Next story"
        className="hidden sm:flex p-3 rounded-full bg-white/10 text-white hover:bg-[#f2b441] hover:text-[#16120e] ml-4 transition cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
