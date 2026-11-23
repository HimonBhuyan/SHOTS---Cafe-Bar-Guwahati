import React from 'react';
import { motion } from 'framer-motion';

export function ShotsCrest({ className = 'w-11 h-11', color = '#f2b441' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="29" fill="#0d0b09" stroke={color} strokeWidth="2.4" />
      <circle cx="32" cy="32" r="23" stroke={color} strokeWidth="1.2" opacity="0.65" />
      <text
        x="32"
        y="37"
        textAnchor="middle"
        fill={color}
        fontSize="18"
        fontWeight="800"
        fontFamily="Georgia, serif"
        letterSpacing="1"
      >
        SH
      </text>
    </svg>
  );
}

export function TornEdgeTop({ fill = '#ede0cb', className = '' }) {
  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1440 54"
        preserveAspectRatio="none"
        className="w-full h-7 sm:h-10 md:h-12 block"
      >
        <path
          d="M0,36 L34,26 L71,39 L118,18 L156,34 L204,22 L248,38 L295,14 L344,32 L391,20 L438,37 L489,16 L536,34 L584,21 L632,38 L682,17 L729,33 L776,19 L824,35 L876,15 L922,34 L972,22 L1018,39 L1068,18 L1116,33 L1164,21 L1212,37 L1264,16 L1312,32 L1358,20 L1404,36 L1440,24 L1440,54 L0,54 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

export function TornEdgeBottom({ fill = '#ede0cb', className = '' }) {
  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1440 54"
        preserveAspectRatio="none"
        className="w-full h-7 sm:h-10 md:h-12 block"
      >
        <path
          d="M0,0 L1440,0 L1440,26 L1398,38 L1352,18 L1304,35 L1254,19 L1206,36 L1158,15 L1108,33 L1062,21 L1012,38 L964,17 L916,35 L868,20 L818,37 L770,16 L722,34 L672,22 L624,39 L576,18 L528,35 L480,19 L430,36 L382,15 L334,33 L286,21 L238,38 L190,17 L142,35 L92,20 L44,37 L0,22 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

export function HandUnderline({ className = 'w-24 h-3', color = '#f2b441' }) {
  return (
    <svg viewBox="0 0 140 16" fill="none" className={className} aria-hidden="true">
      <motion.path
        d="M4 10.5C38 4.5 92 3.5 136 8.5"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
      />
      <motion.path
        d="M22 13.5C58 9.5 95 9 124 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.7 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.75, delay: 0.25, ease: 'easeOut' }}
      />
    </svg>
  );
}

export function CrownDoodle({ className = 'w-8 h-8', color = '#f2b441' }) {
  return (
    <svg viewBox="0 0 48 36" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 28L4 10L16 19L24 6L32 19L44 10L42 28H6Z"
        stroke={color}
        strokeWidth="2.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M9 32H39" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function SparksDoodle({ className = 'w-7 h-7', color = '#f2b441' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path d="M8 22L18 10" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M14 26L30 18" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M18 32L32 30" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function CurvedArrowDoodle({ className = 'w-12 h-8', color = '#1c1610' }) {
  return (
    <svg viewBox="0 0 80 44" fill="none" className={className} aria-hidden="true">
      <path d="M6 12C22 32 48 34 70 24" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M60 17L72 24L63 34"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CocktailDoodle({ className = 'w-20 h-24', color = '#b8aa99' }) {
  return (
    <svg viewBox="0 0 90 110" fill="none" className={className} aria-hidden="true">
      <path d="M18 24H72L45 58L18 24Z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M45 58V92M28 92H62" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M27 34H63" stroke={color} strokeWidth="1.6" strokeDasharray="4 4" />
      <path d="M58 24L70 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="52" cy="30" r="3" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

export function VinylDoodle({ className = 'w-32 h-32', color = '#d6c7b4' }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="54" stroke={color} strokeWidth="2" opacity="0.7" />
      <circle cx="60" cy="60" r="44" stroke={color} strokeWidth="1.3" strokeDasharray="16 8" opacity="0.55" />
      <circle cx="60" cy="60" r="34" stroke={color} strokeWidth="1.2" strokeDasharray="24 6" opacity="0.5" />
      <circle cx="60" cy="60" r="24" stroke={color} strokeWidth="1.2" opacity="0.45" />
      <circle cx="60" cy="60" r="16" fill="#d4891c" opacity="0.9" />
      <circle cx="60" cy="60" r="4" fill="#110f0d" />
    </svg>
  );
}

export function BistroTableDoodle({ className = 'w-44 h-36', color = '#2a2017' }) {
  return (
    <svg viewBox="0 0 200 150" fill="none" className={className} aria-hidden="true">
      <ellipse cx="100" cy="84" rx="44" ry="10" stroke={color} strokeWidth="2.4" />
      <path d="M100 94V136" stroke={color} strokeWidth="2.6" />
      <path d="M78 136H122" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M95 81L97 68H103L105 81Z" stroke={color} strokeWidth="1.8" />
      <path d="M100 68V52M100 62L92 54M100 60L108 53" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="92" cy="52" r="2.5" stroke={color} strokeWidth="1.5" />
      <circle cx="100" cy="49" r="2.5" stroke={color} strokeWidth="1.5" />
      <circle cx="109" cy="51" r="2.5" stroke={color} strokeWidth="1.5" />
      <path d="M28 54C28 38 56 38 56 54V98" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M28 54V136M34 98H64L62 136M34 104H64" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M172 54C172 38 144 38 144 54V98" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M172 54V136M166 98H136L138 136M166 104H136" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function CategorySketchIcon({ category, className = 'w-12 h-12', color = '#1c1610' }) {
  switch (category) {
    case 'coffee':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M16 26H42V38C42 45 36 49 29 49C22 49 16 45 16 38V26Z" stroke={color} strokeWidth="2.4" />
          <path d="M42 29H47C50 29 52 31 52 34C52 37 50 39 47 39H42" stroke={color} strokeWidth="2.4" />
          <path d="M12 52H46" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M24 19C24 16 26 15 26 12M31 19C31 16 33 15 33 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'shots-cocktails':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M16 16H48L32 36L16 16Z" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M32 36V52M22 52H42" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M40 16L48 9" stroke={color} strokeWidth="2.1" strokeLinecap="round" />
          <circle cx="32" cy="24" r="2.2" fill={color} />
        </svg>
      );
    case 'starters':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M16 34H48L43 52H21L16 34Z" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M20 34L17 16H23L25 34M28 34L27 12H33L33 34M36 34L38 15H44L41 34" stroke={color} strokeWidth="2.1" strokeLinejoin="round" />
        </svg>
      );
    case 'pizza':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M12 18L52 24L22 52L12 18Z" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M10 18C24 12 40 14 54 22" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="25" cy="28" r="3" stroke={color} strokeWidth="2" />
          <circle cx="34" cy="30" r="2.6" stroke={color} strokeWidth="2" />
          <circle cx="24" cy="39" r="2.6" stroke={color} strokeWidth="2" />
        </svg>
      );
    case 'asian-bowls':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M12 34H52C50 47 42 52 32 52C22 52 14 47 12 34Z" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M22 30L46 14M28 33L50 18" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M18 34C22 26 42 26 46 34" stroke={color} strokeWidth="2" />
        </svg>
      );
    case 'north-indian':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M14 32H50C49 44 42 50 32 50C22 50 15 44 14 32Z" stroke={color} strokeWidth="2.4" />
          <path d="M12 32C16 24 48 24 52 32" stroke={color} strokeWidth="2.2" />
          <path d="M25 18C25 14 27 13 27 10M35 18C35 14 37 13 37 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'desserts':
    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M14 30L48 20L50 48H14V30Z" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M14 39H50" stroke={color} strokeWidth="2" />
          <circle cx="32" cy="18" r="4.5" stroke={color} strokeWidth="2.2" />
        </svg>
      );
  }
}
