import React from 'react';
import { MapPin, Clock, Phone, Coffee, Music, Sparkles, Calendar, ExternalLink } from 'lucide-react';
import { VENUE } from '../data/shotsData';
import { TornEdgeTop, TornEdgeBottom, HandUnderline, CrownDoodle } from '../components/Doodles';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollMotion';

export default function About({ onOpenReserve }) {
  return (
    <div className="bg-chalkboard min-h-screen pt-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <ScrollReveal direction="right" className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#f2b441]">
              <img
                src="/images/shots-logo.jpg"
                alt="SHOTS Logo"
                className="w-7 h-7 rounded-full object-cover ring-1 ring-[#f2b441]/50"
              />
              <span>Our Story · RG Baruah Road, Guwahati</span>
            </div>
            <h1 className="font-script text-5xl sm:text-7xl font-bold text-[#f6efe6] leading-[0.95]">
              Where Caffeine <br />
              <span className="text-[#f2b441]">Meets Chaos</span>
            </h1>
            <HandUnderline className="w-48 h-3" />
            <p className="text-sm sm:text-base text-[#d2c3b0] leading-relaxed">
              Perched on the 2nd floor of Nirvana Tower directly opposite City Center Mall on RG Baruah Road,{' '}
              <strong className="text-[#f6efe6]">SHOTS — Cafe &amp; Bar</strong> is designed to live through every hour of your day.
            </p>
            <p className="text-sm sm:text-base text-[#b8aa99] leading-relaxed">
              Drop in at 11 AM for artisanal espresso, bruschetta &amp; chill work catch-ups. Stay as the lights dim,
              the pool table warms up, and our bartenders shake signature cocktails &amp; layered shots while Guwahati&apos;s
              indie bands light up the room.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onOpenReserve()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f2b441] text-[#16120e] font-bold text-sm hover:bg-[#ffd06b] transition cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </button>
              <a
                href={VENUE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/25 text-sm font-semibold text-[#f6efe6] hover:border-[#f2b441] hover:text-[#f2b441] transition"
              >
                <MapPin className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.12} className="lg:col-span-6">
            <div className="relative polaroid-card p-3.5 pb-6 rounded-[4px] rotate-[1.5deg] hover:rotate-0 transition-transform duration-300">
              <div className="masking-tape w-24 h-5 -top-2.5 left-1/2 -translate-x-1/2 absolute rounded-[2px]" />
              <img
                src="/images/real/maps-bar-greenery.jpg"
                alt="SHOTS Cafe and Bar Lounge Guwahati"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="mt-3 flex items-center justify-between">
                <p className="font-script text-2xl font-bold text-[#1c1610]">
                  Rated 4.8 ★ across 214+ Guwahati Reviews
                </p>
                <CrownDoodle className="w-6 h-6" color="#c76f0c" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative">
        <TornEdgeTop fill="#ede0cb" />
        <div className="bg-kraft-paper py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-script text-5xl font-bold text-[#1c1610] text-center mb-10">
              Your New Favourite Habit
            </h2>
            <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Coffee,
                  title: '11 AM Café Culture',
                  desc: 'Single-origin espresso, iced tonics, crispy baby corn, bruschetta & wood-fired pizzas in a sunlit modern space.',
                },
                {
                  icon: Sparkles,
                  title: 'Signature Shots & Bar',
                  desc: 'Curated mixology, layered shot trays, craft cocktails, and multi-cuisine North Indian & Asian bar plates.',
                },
                {
                  icon: Music,
                  title: 'Pool & Live Nights',
                  desc: 'Friday Fiesta, Saturday Sundowner, Soulful Sundays & friendly pool games right opposite City Center Mall.',
                },
              ].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <StaggerItem key={pillar.title} y={32} className="h-full">
                    <div className="h-full bg-[#f8f1e5] border border-[#c6ac88] rounded-2xl p-6 shadow-md hover:-translate-y-1.5 transition-transform">
                      <div className="w-12 h-12 rounded-xl bg-[#f2b441] text-[#16120e] flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-script text-3xl font-bold text-[#1c1610]">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-[#4a3929] mt-2 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
        <TornEdgeBottom fill="#ede0cb" />
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#1a1612] border border-[#f2b441]/30 rounded-2xl p-7 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f2b441]">
              Find Us in Guwahati
            </span>
            <h2 className="font-script text-4xl sm:text-5xl font-bold text-[#f6efe6]">
              Visit SHOTS Cafe &amp; Bar
            </h2>
            <div className="space-y-3 text-sm text-[#d2c3b0]">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#f2b441] shrink-0 mt-1" />
                <span>{VENUE.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#f2b441] shrink-0" />
                <span>{VENUE.hours}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#f2b441] shrink-0" />
                <a href="tel:+919282050511" className="hover:text-[#f2b441]">
                  {VENUE.phone}
                </a>
              </p>
            </div>
          </div>

          <div className="bg-kraft-note p-6 rounded-sm rotate-[1deg] space-y-3">
            <h3 className="font-script text-3xl font-bold text-[#1c1610]">Landmark Note</h3>
            <p className="text-xs sm:text-sm text-[#4a3929] leading-relaxed">
              Head to <strong>Nirvana Tower, 2nd Floor</strong> directly opposite <strong>City Center Mall</strong> on RG Baruah Road (Zoo Road / Christian Basti).
            </p>
            <a
              href={VENUE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1c1610] text-[#f2b441] text-xs font-bold hover:bg-[#32271d] transition"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
