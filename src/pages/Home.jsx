import React, { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  MapPin,
  Music,
  Star,
  Camera,
  Check,
  Sparkles,
  Instagram,
  Coffee,
  Users,
} from 'lucide-react';
import {
  VENUE,
  MENU_CATEGORIES,
  MENU_ITEMS,
  EVENTS,
  INSTAGRAM_HIGHLIGHTS,
  GALLERY_ITEMS,
} from '../data/shotsData';
import {
  TornEdgeTop,
  TornEdgeBottom,
  CrownDoodle,
  SparksDoodle,
  CurvedArrowDoodle,
  CocktailDoodle,
  VinylDoodle,
  BistroTableDoodle,
  CategorySketchIcon,
  HandUnderline,
} from '../components/Doodles';
import FlipPolaroid from '../components/FlipPolaroid';
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  ScrollParallax,
} from '../components/ScrollMotion';

const EMBER_PARTICLES = [
  { left: '12%', top: '28%', size: 6, delay: 0, dur: 6 },
  { left: '26%', top: '65%', size: 4, delay: 1.2, dur: 7.5 },
  { left: '44%', top: '22%', size: 5, delay: 0.6, dur: 6.5 },
  { left: '63%', top: '55%', size: 7, delay: 2.1, dur: 8 },
  { left: '78%', top: '34%', size: 5, delay: 0.9, dur: 7 },
  { left: '89%', top: '72%', size: 6, delay: 1.7, dur: 6.2 },
];

export default function Home({ onOpenReserve, onAddToTray, onOpenStory, audioOn }) {
  const specials = MENU_ITEMS.filter((item) => item.isSpecial).slice(0, 4);
  const featuredEvent = EVENTS[0];
  const timelineEvents = EVENTS.slice(0, 4);
  const homeMoments = GALLERY_ITEMS.slice(0, 4);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroBgY = useTransform(heroScroll, [0, 1], ['0%', '22%']);
  const heroCopyY = useTransform(heroScroll, [0, 1], [0, -45]);
  const heroNoteY = useTransform(heroScroll, [0, 1], [0, 55]);
  const heroNoteRotate = useTransform(heroScroll, [0, 1], [2.5, -3.5]);
  const heroFade = useTransform(heroScroll, [0, 0.85], [1, 0.25]);

  const isOpenNow = useMemo(() => {
    const now = new Date();
    const utcMins = now.getUTCHours() * 60 + now.getUTCMinutes();
    const istHour = Math.floor(((utcMins + 330) % 1440) / 60);
    return istHour >= 11 && istHour < 23;
  }, []);

  return (
    <div className="bg-chalkboard text-[#f6efe6]">
      {/* ================= 1. HERO SECTION (SCROLL PARALLAX) ================= */}
      <section ref={heroRef} className="relative min-h-0 lg:min-h-[92vh] flex items-center pt-24 pb-16 sm:pb-20 overflow-hidden">
        <motion.div
          style={{ y: heroBgY, backgroundImage: "url('/images/real/maps-shots-neon-lounge.jpg')" }}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#110f0d]/80 via-[#110f0d]/65 to-[#110f0d] lg:bg-gradient-to-r lg:from-[#110f0d] lg:via-[#110f0d]/82 lg:to-[#110f0d]/30" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-[#110f0d] via-transparent to-[#110f0d]/65" />

        {EMBER_PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            animate={{
              y: [0, -28, 0],
              opacity: [0.25, 0.75, 0.25],
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            className="absolute rounded-full bg-[#f2b441] blur-[1px] pointer-events-none"
          />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <motion.div
              style={{ y: heroCopyY, opacity: heroFade }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-4 sm:space-y-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1913]/90 border border-[#f2b441]/35 text-[11px] sm:text-xs font-medium text-[#f2b441]">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>2nd Fl, Nirvana Tower · Opp. City Center Mall</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1a221b]/90 border border-emerald-500/35 text-[11px] font-semibold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{isOpenNow ? 'Open Now · Till 11 PM' : 'Opens 11:00 AM Daily'}</span>
                </div>
              </div>

              <div className="relative inline-block">
                <div className="flex items-start gap-2">
                  <h1 className="font-script text-[2.95rem] sm:text-7xl md:text-[5.25rem] font-bold leading-[0.95] text-[#f6efe6] tracking-tight">
                    Where Caffeine <br />
                    <span className="text-[#f2b441]">Meets Chaos</span>
                  </h1>
                  <motion.div
                    animate={{ rotate: [10, 18, 10], y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <CrownDoodle className="w-8 h-8 sm:w-12 sm:h-12 -mt-1 sm:-mt-2 shrink-0" />
                  </motion.div>
                </div>
                <HandUnderline className="w-40 sm:w-64 h-3.5 sm:h-4 mt-1" />
              </div>

              <p className="font-hand text-lg sm:text-2xl text-[#e2d4c2] max-w-xl leading-snug sm:leading-relaxed">
                Your new favourite habit on RG Baruah Road!
              </p>
              <p className="text-xs sm:text-base text-[#c5b7a6] max-w-lg leading-relaxed">
                A place that lives through every hour of your day — morning espresso &amp; café bites by sunlight,
                signature shots, cocktails, pool games &amp; live acoustic energy by night.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#f2b441] text-[#16120e] font-bold text-xs sm:text-base hover:bg-[#ffd06b] hover:scale-[1.03] active:scale-[0.98] transition shadow-xl shadow-[#f2b441]/25"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>

                <button
                  onClick={() => onOpenReserve()}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-[#f6efe6]/55 bg-[#16120e]/70 backdrop-blur-sm text-[#f6efe6] font-semibold text-xs sm:text-base hover:border-[#f2b441] hover:text-[#f2b441] hover:scale-[1.02] transition cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Reserve a Table</span>
                </button>
              </div>
            </motion.div>

            {/* Right Pinned Kraft Checklist Card */}
            <motion.div
              style={{ y: heroNoteY, rotate: heroNoteRotate }}
              initial={{ opacity: 0, rotate: 7, scale: 0.92 }}
              animate={{ opacity: 1, rotate: 2, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, type: 'spring', stiffness: 120 }}
              className="lg:col-span-5 flex justify-center lg:justify-end pt-2 lg:pt-0 pb-4 lg:pb-0"
            >
              <div className="relative bg-kraft-note rounded-sm px-6 py-5 sm:px-7 sm:py-7 w-full max-w-[280px] sm:w-72 animate-float-note hover:rotate-0 transition-transform duration-300">
                <div className="masking-tape w-20 h-5 absolute -top-2.5 left-1/2 -translate-x-1/2 -rotate-2 rounded-[2px]" />

                <div className="flex items-center justify-between border-b border-[#8c7051]/30 pb-2.5 mb-3">
                  <span className="font-hand font-bold text-sm uppercase tracking-wider text-[#5a422c]">
                    The Shots Habit
                  </span>
                  <Coffee className="w-4 h-4 text-[#b56712]" />
                </div>

                <ul className="space-y-2.5 font-script text-2xl sm:text-[1.7rem] text-[#1f1710] leading-tight">
                  {[
                    'Specialty Coffee',
                    'Signature Shots & Bar',
                    'Pool Games & Vibes',
                    'Live Music Nights ♡',
                  ].map((item, idx) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + idx * 0.12 }}
                      className="flex items-center gap-2.5"
                    >
                      <span className="w-5 h-5 rounded border-2 border-[#3c2d1f] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#c76f0c] stroke-[3]" />
                      </span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-4 pt-2.5 border-t border-[#8c7051]/25 flex items-center justify-between text-xs font-medium text-[#5a422c]">
                  <span>4.8 ★ Google</span>
                  <a
                    href={VENUE.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[#9c5206] hover:underline"
                  >
                    {VENUE.instagramHandle}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 2. EXPLORE OUR MENU (TORN KRAFT PAPER BAND) ================= */}
      <section className="relative -mt-8 z-20">
        <TornEdgeTop fill="#ede0cb" />
        <div className="bg-kraft-paper py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <ScrollReveal direction="right" className="lg:w-56 shrink-0 flex items-center lg:items-start justify-between lg:flex-col gap-3">
                <div>
                  <h2 className="font-script text-4xl sm:text-5xl font-bold text-[#1c1610] leading-[0.95]">
                    Explore <br />
                    Our Menu
                  </h2>
                  <p className="font-hand text-xs sm:text-sm text-[#5a4836] mt-1.5">
                    11 AM Coffee to 11 PM Chaos ♡
                  </p>
                </div>
                <CurvedArrowDoodle className="w-14 h-9 text-[#1c1610] hidden sm:block" />
              </ScrollReveal>

              <StaggerContainer stagger={0.06} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 flex-1">
                {MENU_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                  <StaggerItem key={cat.id} y={24}>
                    <Link
                      to={`/menu?category=${cat.id}`}
                      className="group h-full flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#f7efe2]/65 border border-[#c6ac88]/50 hover:bg-[#f2b441]/25 hover:border-[#c97614] hover:-translate-y-1.5 hover:shadow-md transition-all duration-200 text-center"
                    >
                      <div className="relative">
                        <CategorySketchIcon
                          category={cat.id}
                          className="w-11 h-11 sm:w-12 sm:h-12 transition-transform group-hover:scale-110 group-hover:-rotate-6"
                        />
                        <span className="absolute -top-1 -right-2 text-[#d97714] text-xs font-bold opacity-0 group-hover:opacity-100 transition">
                          ✦
                        </span>
                      </div>
                      <span className="mt-2 font-hand font-bold text-sm text-[#1c1610]">
                        {cat.label}
                      </span>
                      <span className="text-[10px] text-[#6d5944] leading-tight mt-0.5 hidden sm:block">
                        {cat.subtitle}
                      </span>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
        <TornEdgeBottom fill="#ede0cb" />
      </section>

      {/* ================= LIVE VIBE MARQUEE TICKER ================= */}
      <div className="bg-[#181410] border-b border-[#f2b441]/15 py-2.5 overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em] text-[#d9c8b4]">
          {[1, 2].map((dup) => (
            <div key={dup} className="flex items-center gap-10 shrink-0">
              <span className="text-[#f2b441]">☕ 11 AM Espresso &amp; Café</span>
              <span>•</span>
              <span>🍸 Signature Shots &amp; Sunset Cocktails</span>
              <span>•</span>
              <span className="text-[#f2b441]">🎱 Pool Table &amp; Friday Fiesta</span>
              <span>•</span>
              <span>🍕 Pepperoni Perfection &amp; Hakka Bowls</span>
              <span>•</span>
              <span>📍 Opp. City Center Mall, RG Baruah Rd</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 3. TODAY'S SPECIALS (STAGGERED FLIPPABLE POLAROIDS) ================= */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <ScrollParallax yRange={[-30, 45]} rotateRange={[-8, 8]} className="hidden xl:block absolute right-10 top-16 opacity-35 pointer-events-none">
          <CocktailDoodle className="w-24 h-28" />
        </ScrollParallax>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <ScrollReveal direction="right">
              <div className="flex items-center gap-2">
                <h2 className="font-script text-5xl sm:text-6xl font-bold text-[#f6efe6] leading-none">
                  House Favourites
                </h2>
                <SparksDoodle className="w-8 h-8 -mt-3" />
              </div>
              <HandUnderline className="w-40 h-3 mt-1" />
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.1}>
              <p className="font-hand text-base sm:text-lg text-[#cbbba8] max-w-md border-l-2 border-[#f2b441]/50 pl-4">
                Good food, refreshing drinks &amp; your next hangout habit. Tap any Polaroid to flip for mixologist notes!
              </p>
            </ScrollReveal>
          </div>

          <StaggerContainer stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-7">
            {specials.map((item, idx) => {
              const rotations = ['-2deg', '1.5deg', '-1.2deg', '2deg'];
              return (
                <StaggerItem key={item.id} y={48} rotate={idx % 2 === 0 ? -3 : 3}>
                  <FlipPolaroid
                    item={item}
                    rotation={rotations[idx % rotations.length]}
                    isChefHighlight={idx === 1}
                    onAddToTray={onAddToTray}
                  />
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <ScrollReveal direction="up" delay={0.15} className="mt-12 text-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#f2b441] text-[#16120e] font-script text-2xl font-bold hover:bg-[#ffd06b] hover:scale-105 transition shadow-xl shadow-[#f2b441]/20"
            >
              <span>Explore Full Menu</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 4. WHAT'S HAPPENING AT SHOTS ================= */}
      <section className="relative py-16 sm:py-24 border-y border-white/5 overflow-hidden">
        <ScrollParallax
          yRange={[-40, 40]}
          rotateRange={[-35, 95]}
          className="hidden lg:block absolute -right-12 bottom-6 opacity-35 pointer-events-none"
        >
          <VinylDoodle className={`w-52 h-52 ${audioOn ? 'animate-spin-slow' : ''}`} />
        </ScrollParallax>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal direction="right">
                <div className="flex items-center gap-2">
                  <CrownDoodle className="w-7 h-7 -rotate-12" />
                  <span className="text-xs uppercase tracking-[0.22em] text-[#f2b441] font-semibold">
                    Friday Fiesta · Pool Games · Live Music
                  </span>
                </div>
                <h2 className="font-script text-5xl sm:text-6xl font-bold text-[#f6efe6] leading-[0.95] mt-2">
                  What&apos;s Happening <br />
                  <span className="text-[#f2b441]">at SHOTS?</span>
                </h2>
                <p className="text-sm sm:text-base text-[#b8aa99] mt-3 max-w-lg">
                  From Friday Fiesta acoustics and Saturday Sundowners to Soulful Sundays — good food,
                  pool games, and evenings worth remembering on RG Baruah Road.
                </p>
              </ScrollReveal>

              <div className="relative max-w-xl pt-2">
                <ScrollReveal direction="up" rotate={-3}>
                  <div className="polaroid-card p-3 pb-5 rounded-[4px] -rotate-1 max-w-md hover:rotate-0 transition-transform duration-300">
                    <div className="masking-tape w-20 h-5 absolute -top-2.5 left-12 rounded-[2px]" />
                    <img
                      src={featuredEvent.image}
                      alt={featuredEvent.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                </ScrollReveal>

                <ScrollReveal
                  direction="left"
                  delay={0.18}
                  className="sm:absolute sm:right-0 sm:bottom-4 mt-4 sm:mt-0"
                >
                  <div className="bg-kraft-note p-5 rounded-sm w-full sm:w-64 rotate-[1.5deg] border border-[#c6ac88]/50 hover:rotate-0 transition-transform">
                    <div className="masking-tape w-14 h-4 absolute -top-2 left-1/2 -translate-x-1/2 rounded-[2px]" />
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#9c5206]">
                      Featured Night
                    </span>
                    <h3 className="font-script text-3xl font-bold text-[#1c1610] mt-0.5">
                      {featuredEvent.title}
                    </h3>
                    <p className="text-xs font-medium text-[#4a3929] mt-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#c76f0c]" />
                      <span>{featuredEvent.dayTime}</span>
                    </p>
                    <Link
                      to="/events"
                      className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f2b441] text-[#16120e] font-bold text-xs hover:bg-[#ffd06b] transition"
                    >
                      <span>See Event Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            <ScrollReveal direction="left" delay={0.1} className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative bg-kraft-note p-6 sm:p-8 rounded-sm w-full max-w-md rotate-[1deg] hover:rotate-0 transition-transform duration-300">
                <div
                  className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-red-800 shadow-md border border-red-300/60 absolute -top-2.5 left-1/2 -translate-x-1/2"
                  aria-hidden="true"
                />

                <div className="flex items-center justify-between border-b border-[#8c7051]/30 pb-3 mb-5">
                  <h3 className="font-script text-4xl font-bold text-[#1c1610]">
                    Event Timeline
                  </h3>
                  <SparksDoodle className="w-6 h-6" color="#c76f0c" />
                </div>

                <StaggerContainer stagger={0.12} className="relative space-y-5 pl-3 border-l-2 border-dashed border-[#8c7051]/50">
                  {timelineEvents.map((ev) => (
                    <StaggerItem key={ev.id} y={20} className="relative flex items-start gap-3.5">
                      <span className="w-3 h-3 rounded-full bg-[#ede0cb] border-2 border-[#3c2d1f] absolute -left-[19px] top-3" />
                      <div className="shrink-0 w-12 py-1 rounded-lg bg-[#f2b441] text-[#16120e] text-center leading-tight shadow-sm">
                        <span className="block font-extrabold text-sm">{ev.dateDay}</span>
                        <span className="block text-[10px] font-bold uppercase">{ev.dateMonth}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-sm text-[#1c1610]">{ev.title}</h4>
                          {ev.category === 'Live Music' ? (
                            <Music className="w-3.5 h-3.5 text-[#9c5206] shrink-0" />
                          ) : ev.category === 'Party & DJ' ? (
                            <Sparkles className="w-3.5 h-3.5 text-[#9c5206] shrink-0" />
                          ) : (
                            <Star className="w-3.5 h-3.5 text-[#9c5206] shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-[#5a4836] mt-0.5 leading-snug">
                          {ev.shortDesc}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                <div className="mt-6 pt-4 border-t border-[#8c7051]/30 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#5a4836]">Free entry · RSVP open</span>
                  <Link
                    to="/events"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9c5206] hover:underline"
                  >
                    <span>View All Events</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 5. SHOTS MOMENTS & INSTAGRAM HIGHLIGHTS ================= */}
      <section className="py-16 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <ScrollReveal direction="right">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#f2b441]">
                <Instagram className="w-4 h-4" />
                <span>Tap any Highlight Story · {VENUE.instagramHandle}</span>
              </div>
              <h2 className="font-script text-4xl sm:text-5xl font-bold text-[#f6efe6] mt-1">
                SHOTS Highlights
              </h2>
            </ScrollReveal>

            <StaggerContainer stagger={0.07} className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2">
              {INSTAGRAM_HIGHLIGHTS.map((hl) => (
                <StaggerItem key={hl.id} y={20}>
                  <button
                    onClick={() => onOpenStory(hl.id)}
                    className="group flex flex-col items-center shrink-0 w-24 text-center cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#d4891c] via-[#ffe08a] to-[#a85c09] group-hover:scale-110 transition-transform overflow-hidden">
                      <img
                        src="/images/shots-logo.jpg"
                        alt={hl.label}
                        className="w-full h-full rounded-full object-cover border-2 border-[#110f0d]"
                      />
                    </div>
                    <span className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-[#e9dfd2] group-hover:text-[#f2b441] leading-tight">
                      {hl.label}
                    </span>
                  </button>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <ScrollReveal direction="right" className="lg:col-span-3 space-y-3">
              <h3 className="font-script text-4xl sm:text-5xl font-bold text-[#f6efe6] leading-none">
                SHOTS <br />
                Moments ♡
              </h3>
              <p className="text-xs sm:text-sm text-[#b8aa99] leading-relaxed">
                Snapshots from Nirvana Tower — morning lattes, pool games, Friday Fiesta live music &amp; shots with the gang.
              </p>
              <div className="inline-flex items-center gap-2 text-[#f2b441] pt-1">
                <Camera className="w-5 h-5" />
                <span className="font-hand text-sm">Opp. City Center Mall</span>
              </div>
            </ScrollReveal>

            <StaggerContainer stagger={0.1} className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {homeMoments.map((m, idx) => (
                <StaggerItem key={m.id} y={34} rotate={idx % 2 === 0 ? -2 : 2}>
                  <Link
                    to="/gallery"
                    style={{ transform: `rotate(${idx % 2 === 0 ? '-1.5deg' : '1.5deg'})` }}
                    className="block relative polaroid-card p-2 pb-4 rounded-[3px] hover:rotate-0 hover:-translate-y-1.5 transition-all duration-300"
                  >
                    <div className="masking-tape w-12 h-3.5 -top-2 left-1/2 -translate-x-1/2 absolute rounded-[2px]" />
                    <img
                      src={m.image}
                      alt={m.title}
                      className="w-full aspect-square object-cover"
                    />
                    <p className="font-hand text-[11px] font-bold text-[#1c1610] mt-2 truncate">
                      {m.title}
                    </p>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <ScrollReveal direction="left" delay={0.15} className="lg:col-span-2">
              <Link
                to="/gallery"
                className="block relative bg-kraft-note p-5 rounded-sm rotate-[2deg] hover:rotate-0 transition-transform group"
              >
                <div className="masking-tape w-12 h-4 -top-2 left-1/2 -translate-x-1/2 absolute rounded-[2px]" />
                <h4 className="font-script text-3xl font-bold text-[#1c1610]">Gallery</h4>
                <p className="text-xs text-[#5a4836] mt-1 leading-snug">
                  A peek into our everyday at SHOTS Guwahati.
                </p>
                <span className="mt-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1c1610] text-[#f2b441] group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 6. RESERVE YOUR TABLE (TORN KRAFT BAND) ================= */}
      <section className="relative overflow-hidden">
        <TornEdgeTop fill="#ede0cb" />
        <div className="bg-kraft-paper py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <ScrollReveal direction="right">
                <BistroTableDoodle className="w-32 h-24 sm:w-40 sm:h-32 shrink-0 hidden sm:block" />
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.08}>
                <h2 className="font-script text-5xl sm:text-6xl font-bold text-[#1c1610] leading-none">
                  Reserve <br className="sm:hidden" /> Your Table
                </h2>
                <HandUnderline className="w-36 h-3 mt-1" color="#c76f0c" />
                <p className="text-sm sm:text-base text-[#4a3929] mt-2 max-w-md">
                  Afternoon coffee date, pool game hangout, Friday Fiesta or birthday party opposite City Center Mall?
                  Your table. Your people.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="left" delay={0.12} className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenReserve('Party Package / Group Celebration')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#3c2d1f]/40 text-sm font-semibold text-[#1c1610] hover:bg-[#1c1610] hover:text-[#f2b441] transition cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Party Packages</span>
              </button>
              <button
                onClick={() => onOpenReserve()}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#f2b441] text-[#16120e] font-bold text-base hover:bg-[#e5a225] hover:scale-105 active:scale-95 transition shadow-lg shadow-[#b56712]/25 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Table</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
