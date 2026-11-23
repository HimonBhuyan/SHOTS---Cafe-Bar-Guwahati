import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Music, Sparkles, Users, Check, ArrowRight } from 'lucide-react';
import { EVENTS, PARTY_PACKAGES } from '../data/shotsData';
import { TornEdgeTop, TornEdgeBottom, HandUnderline, CrownDoodle } from '../components/Doodles';
import { StaggerContainer, StaggerItem } from '../components/ScrollMotion';

const EVENT_FILTERS = ['All', 'Live Music', 'Party & DJ', 'Specials'];

export default function Events({ onOpenReserve }) {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('filter') || 'All');

  useEffect(() => {
    const f = searchParams.get('filter');
    if (f) setFilter(f);
  }, [searchParams]);

  const filteredEvents =
    filter === 'All' ? EVENTS : EVENTS.filter((e) => e.category === filter);

  return (
    <div className="bg-chalkboard min-h-screen pt-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f2b441]">
              <Music className="w-4 h-4" />
              Friday Fiesta · Saturday Sundowner · Soulful Sundays
            </span>
            <h1 className="font-script text-5xl sm:text-7xl font-bold text-[#f6efe6] mt-2 leading-none">
              Events &amp; Vibes
            </h1>
            <HandUnderline className="w-48 h-3 mt-1" />
            <p className="text-sm sm:text-base text-[#b8aa99] mt-3 max-w-xl">
              Live acoustic nights, pool table hangouts, creator mixers &amp; custom party packages at Nirvana Tower opposite City Center Mall.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {EVENT_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer border ${
                  filter === cat
                    ? 'bg-[#f2b441] text-[#16120e] border-[#f2b441]'
                    : 'bg-[#1c1712] text-[#dfd3c3] border-white/10 hover:border-[#f2b441]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((ev, idx) => (
            <motion.article
              key={ev.id}
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: (idx % 2) * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#1a1612] border border-white/10 rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:border-[#f2b441]/45 transition-colors shadow-xl"
            >
              <div className="sm:w-52 shrink-0 relative overflow-hidden bg-[#110f0d]">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-48 sm:h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-[#f2b441] text-[#16120e] text-center leading-tight shadow-md">
                  <span className="block font-extrabold text-lg">{ev.dateDay}</span>
                  <span className="block text-[10px] font-bold uppercase">{ev.dateMonth}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#f2b441]">
                      {ev.category}
                    </span>
                    <Sparkles className="w-4 h-4 text-[#f2b441]" />
                  </div>
                  <h2 className="font-script text-3xl font-bold text-[#f6efe6] mt-1">
                    {ev.title}
                  </h2>
                  <p className="text-xs text-[#d2c3b0] mt-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#f2b441]" />
                    <span>{ev.dayTime}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-[#b8aa99] mt-3 leading-relaxed">
                    {ev.fullDesc}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenReserve(`RSVP: ${ev.title} (${ev.dateDay} ${ev.dateMonth})`)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f2b441] text-[#16120e] font-bold text-xs hover:bg-[#ffd06b] transition cursor-pointer"
                  >
                    <span>Book Guestlist Spot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="party-packages" className="relative">
        <TornEdgeTop fill="#ede0cb" />
        <div className="bg-kraft-paper py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#9c5206]">
                  <Users className="w-4 h-4" />
                  <span>Squad Parties · Birthdays · Mixers</span>
                </div>
                <h2 className="font-script text-5xl sm:text-6xl font-bold text-[#1c1610] mt-1 leading-none">
                  Celebrate at SHOTS
                </h2>
                <HandUnderline className="w-44 h-3 mt-1" color="#c76f0c" />
              </div>
              <p className="text-sm text-[#4a3929] max-w-md">
                Birthdays, college farewells, or weekend chaos with your crew right opposite City Center Mall.
              </p>
            </div>

            <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PARTY_PACKAGES.map((pkg, idx) => (
                <StaggerItem key={pkg.id} y={36} className="h-full">
                  <div
                    className={`h-full relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between border transition hover:-translate-y-1.5 ${
                      idx === 1
                        ? 'bg-[#1a1612] text-[#f6efe6] border-[#f2b441] shadow-2xl'
                        : 'bg-[#f8f1e5] text-[#1c1610] border-[#c6ac88] shadow-lg'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#f2b441] text-[#16120e] text-[11px] font-bold">
                          {pkg.badge}
                        </span>
                        {idx === 1 && <CrownDoodle className="w-6 h-6" />}
                      </div>

                      <h3 className="font-script text-3xl font-bold mt-4">{pkg.name}</h3>
                      <p
                        className={`text-xs font-semibold uppercase tracking-wider mt-1 ${
                          idx === 1 ? 'text-[#f2b441]' : 'text-[#8c5210]'
                        }`}
                      >
                        {pkg.guests}
                      </p>
                      <p className="text-2xl font-extrabold mt-3">{pkg.price}</p>

                      <ul className="mt-5 space-y-2.5 text-xs sm:text-sm">
                        {pkg.perks.map((perk) => (
                          <li key={perk} className="flex items-start gap-2">
                            <Check
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                idx === 1 ? 'text-[#f2b441]' : 'text-[#b56712]'
                              }`}
                            />
                            <span className={idx === 1 ? 'text-[#d8cbba]' : 'text-[#4a3929]'}>
                              {perk}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => onOpenReserve(`Party Package: ${pkg.name} (${pkg.guests})`)}
                      className={`mt-7 w-full py-3 rounded-full font-bold text-sm transition cursor-pointer ${
                        idx === 1
                          ? 'bg-[#f2b441] text-[#16120e] hover:bg-[#ffd06b]'
                          : 'bg-[#1c1610] text-[#f2b441] hover:bg-[#32271d]'
                      }`}
                    >
                      Enquire / Reserve Package →
                    </button>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
        <TornEdgeBottom fill="#ede0cb" />
      </section>
    </div>
  );
}
