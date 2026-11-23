import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Instagram, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { GALLERY_ITEMS, VENUE } from '../data/shotsData';
import { HandUnderline } from '../components/Doodles';

const GALLERY_CATS = ['All', 'Lounge & Pool', 'Food & Drinks', 'Live Nights', 'Caffeine'];

export default function Gallery() {
  const [searchParams] = useSearchParams();
  const [activeCat, setActiveCat] = useState(searchParams.get('filter') || 'All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const f = searchParams.get('filter');
    if (f) setActiveCat(f);
  }, [searchParams]);

  const items =
    activeCat === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((g) => g.category === activeCat);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  const nextPhoto = () => setLightboxIndex((i) => (i === items.length - 1 ? 0 : i + 1));

  return (
    <div className="bg-chalkboard min-h-screen pt-24 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f2b441]">
              <Camera className="w-4 h-4" />
              Where Caffeine Meets Chaos
            </span>
            <h1 className="font-script text-5xl sm:text-7xl font-bold text-[#f6efe6] mt-2 leading-none">
              The Scrapbook Gallery
            </h1>
            <HandUnderline className="w-48 h-3 mt-1" />
            <p className="text-sm sm:text-base text-[#b8aa99] mt-3 max-w-xl">
              Snapshots from SHOTS Cafe &amp; Bar — daylight espressos, signature cocktails, pool games, and Friday Fiesta stage lights.
            </p>
          </div>

          <a
            href={VENUE.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#1e1913] border border-[#f2b441]/40 text-sm font-semibold text-[#f2b441] hover:bg-[#f2b441] hover:text-[#16120e] transition self-start md:self-auto"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow {VENUE.instagramHandle}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {GALLERY_CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer border ${
                activeCat === cat
                  ? 'bg-[#f2b441] text-[#16120e] border-[#f2b441]'
                  : 'bg-[#1c1712] text-[#dfd3c3] border-white/10 hover:border-[#f2b441]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          {items.map((item, idx) => (
            <motion.button
              key={item.id}
              onClick={() => openLightbox(idx)}
              initial={{ opacity: 0, y: 38, rotate: idx % 2 === 0 ? -4 : 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: parseFloat(item.rotation) || 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16, delay: (idx % 4) * 0.08 }}
              whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
              className="group relative polaroid-card p-3.5 pb-5 rounded-[4px] text-left cursor-pointer"
            >
              <div className="masking-tape w-20 h-5 absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-[2px] z-10" />
              <div className="aspect-[4/3] overflow-hidden bg-[#1e1812] mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9c5206]">
                {item.category}
              </span>
              <h3 className="font-script text-2xl font-bold text-[#1c1610] leading-tight mt-0.5">
                {item.title}
              </h3>
              <p className="text-xs text-[#5a4836] mt-1 leading-snug">{item.caption}</p>
            </motion.button>
          ))}
        </div>
      </section>

      {lightboxIndex !== null && items[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={closeLightbox}
            aria-label="Close lightbox"
            className="absolute top-5 right-5 p-2.5 rounded-full bg-[#241e18] text-[#f6efe6] hover:bg-[#f2b441] hover:text-[#16120e] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={prevPhoto}
            aria-label="Previous photo"
            className="hidden sm:flex p-3 rounded-full bg-[#241e18] text-[#f6efe6] hover:bg-[#f2b441] hover:text-[#16120e] mr-4 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-3xl w-full polaroid-card p-4 sm:p-5 rounded-[6px]">
            <img
              src={items[lightboxIndex].image}
              alt={items[lightboxIndex].title}
              className="w-full max-h-[68vh] object-cover rounded-[2px]"
            />
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-script text-3xl font-bold text-[#1c1610]">
                  {items[lightboxIndex].title}
                </h3>
                <p className="text-sm text-[#5a4836]">{items[lightboxIndex].caption}</p>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#f2b441] text-[#16120e] self-start">
                {items[lightboxIndex].category}
              </span>
            </div>
          </div>

          <button
            onClick={nextPhoto}
            aria-label="Next photo"
            className="hidden sm:flex p-3 rounded-full bg-[#241e18] text-[#f6efe6] hover:bg-[#f2b441] hover:text-[#16120e] ml-4 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
