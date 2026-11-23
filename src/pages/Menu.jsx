import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, Check, Sparkles, Coffee } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/shotsData';
import {
  TornEdgeTop,
  TornEdgeBottom,
  CategorySketchIcon,
  HandUnderline,
  CrownDoodle,
} from '../components/Doodles';

export default function Menu({ tray, onAddToTray }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'all';
  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [dietFilter, setDietFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const paramCat = searchParams.get('category') || 'all';
    setSelectedCat(paramCat);
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setSelectedCat(catId);
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (selectedCat !== 'all' && item.category !== selectedCat) return false;
      if (dietFilter === 'veg' && !item.isVeg) return false;
      if (dietFilter === 'non-veg' && item.isVeg) return false;
      if (dietFilter === 'chef' && !item.isChefPick) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCat, dietFilter, query]);

  const getQtyInTray = (id) => tray.find((t) => t.id === id)?.qty || 0;

  return (
    <div className="bg-chalkboard min-h-screen pt-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#f2b441]">
              <Coffee className="w-4 h-4" />
              Espresso Bar · Cocktail Lounge · Multi-Cuisine Kitchen
            </span>
            <h1 className="font-script text-5xl sm:text-7xl font-bold text-[#f6efe6] mt-2 leading-none">
              Our Menu
            </h1>
            <HandUnderline className="w-40 h-3 mt-1" />
            <p className="text-sm sm:text-base text-[#b8aa99] mt-3 max-w-xl">
              From 11 AM specialty coffee &amp; crispy starters to signature shots, wood-fired pizzas, Hakka noodles &amp; late-night desserts.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#9e8f7e] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search coffee, shots, pizza, hakka..."
              className="w-full pl-10 pr-4 py-3 rounded-full bg-[#1d1813] border border-[#f2b441]/25 text-sm text-[#f6efe6] placeholder:text-[#7e7060] focus:outline-none focus:border-[#f2b441]"
            />
          </div>
        </div>
      </section>

      <section className="relative">
        <TornEdgeTop fill="#ede0cb" />
        <div className="bg-kraft-paper py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-5">
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
              {MENU_CATEGORIES.map((cat) => {
                const active = selectedCat === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold shrink-0 transition cursor-pointer border ${
                      active
                        ? 'bg-[#1c1610] text-[#f2b441] border-[#1c1610] shadow-md'
                        : 'bg-[#f8f1e5]/80 text-[#3c2d1f] border-[#c6ac88] hover:border-[#1c1610]'
                    }`}
                  >
                    {cat.id !== 'all' && (
                      <CategorySketchIcon
                        category={cat.id}
                        className="w-5 h-5"
                        color={active ? '#f2b441' : '#1c1610'}
                      />
                    )}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#8c7051]/25">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'All Plates' },
                  { id: 'veg', label: '● Veg Only' },
                  { id: 'non-veg', label: '▲ Non-Veg' },
                  { id: 'chef', label: "★ House Picks" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setDietFilter(f.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                      dietFilter === f.id
                        ? 'bg-[#f2b441] text-[#16120e]'
                        : 'bg-[#e3d0b3] text-[#4a3929] hover:bg-[#d8be98]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <span className="text-xs font-medium text-[#5a4836]">
                Showing {filteredItems.length} item{filteredItems.length === 1 ? '' : 's'}
              </span>
            </div>
          </div>
        </div>
        <TornEdgeBottom fill="#ede0cb" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <p className="font-script text-4xl text-[#f2b441]">No items matched your filter</p>
            <p className="text-sm text-[#b8aa99]">Try clearing your search or switching back to All Items.</p>
            <button
              onClick={() => {
                setSelectedCat('all');
                setDietFilter('all');
                setQuery('');
                setSearchParams({});
              }}
              className="mt-2 px-5 py-2.5 rounded-full bg-[#f2b441] text-[#16120e] font-bold text-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredItems.map((item, idx) => {
              const qty = getQtyInTray(item.id);
              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 36, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 18,
                    delay: (idx % 3) * 0.06,
                  }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-[#1a1612] border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-[#f2b441]/45 transition-colors duration-300 shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#110f0d]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1612] via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className={`w-5 h-5 rounded-sm bg-[#110f0d]/90 border flex items-center justify-center text-[10px] font-bold ${
                          item.isVeg
                            ? 'border-emerald-500 text-emerald-400'
                            : 'border-rose-500 text-rose-400'
                        }`}
                      >
                        {item.isVeg ? '●' : '▲'}
                      </span>
                      {item.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#f2b441] text-[#16120e] text-[11px] font-bold shadow">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {item.isChefPick && (
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#110f0d]/85 border border-[#f2b441]/50 text-[#f2b441] text-[11px] font-semibold">
                        <CrownDoodle className="w-3.5 h-3.5" />
                        <span>House Pick</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-script text-3xl font-bold text-[#f6efe6] leading-tight">
                          {item.name}
                        </h3>
                        <span className="shrink-0 font-bold text-lg text-[#f2b441]">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#b8aa99] mt-2.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-[#8e7f6f] font-semibold">
                        {MENU_CATEGORIES.find((c) => c.id === item.category)?.label}
                      </span>

                      <button
                        onClick={() => onAddToTray(item)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                          qty > 0
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-[#262019] text-[#f2b441] border border-[#f2b441]/35 hover:bg-[#f2b441] hover:text-[#16120e]'
                        }`}
                      >
                        {qty > 0 ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>In Tray ({qty}) · +1</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Tray</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        <div className="mt-14 p-6 rounded-2xl bg-[#1b1611] border border-[#f2b441]/20 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-[#f2b441] shrink-0" />
          <p className="text-xs sm:text-sm text-[#cbbba8]">
            Average cost for two ~₹800–₹1,000. Ask our bartender for today&apos;s off-menu signature shot flights!
          </p>
        </div>
      </section>
    </div>
  );
}
