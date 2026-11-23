import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FrontLoader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1550;
    let rafId;

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (elapsed < duration) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 220);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete]);

  const handleSkip = () => {
    setVisible(false);
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="shots-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
          onClick={handleSkip}
          className="fixed inset-0 z-[100] bg-[#110f0d] bg-chalkboard flex flex-col items-center justify-center p-6 select-none cursor-pointer overflow-hidden"
          role="status"
          aria-label="Loading SHOTS Cafe and Bar Guwahati"
        >
          <div className="absolute w-[420px] h-[420px] rounded-full bg-[#f2b441]/14 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full space-y-6">
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-dashed border-[#f2b441]/50 flex items-center justify-center"
              />
              <motion.div
                initial={{ scale: 0.72, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 16 }}
                className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#d4891c] via-[#ffe08a] to-[#b56712] shadow-2xl shadow-[#f2b441]/25"
              >
                <img
                  src="/images/shots-logo.jpg"
                  alt="SHOTS Cafe & Bar Guwahati"
                  className="w-full h-full rounded-full object-cover"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45 }}
              className="space-y-1.5"
            >
              <p className="font-brand font-extrabold text-sm tracking-[0.28em] uppercase text-[#f6efe6]">
                SHOTS · CAFE &amp; BAR
              </p>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f2b441]">
                Nirvana Tower · Opp. City Center Mall
              </p>
              <h2 className="font-script text-4xl sm:text-5xl font-bold text-[#f6efe6] leading-none">
                Where Caffeine Meets Chaos
              </h2>
              <p className="font-hand text-sm text-[#b8aa99]">
                Your new favourite habit in Guwahati
              </p>
            </motion.div>

            <div className="w-56 space-y-2">
              <div className="h-1.5 w-full rounded-full bg-[#262019] overflow-hidden border border-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#d4891c] via-[#f2b441] to-[#ffe08a] transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-[#8f8171]">
                <span>Pouring Shots</span>
                <span className="text-[#f2b441]">{progress}%</span>
              </div>
            </div>

            <span className="text-[10px] tracking-widest uppercase text-[#6f6254]">
              Tap anywhere to enter
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
