import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, ArrowRight, Instagram, Music, Star, Check } from 'lucide-react';
import { VENUE } from '../data/shotsData';
import { ScrollReveal } from './ScrollMotion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#0c0a08] text-[#e9dfd2] border-t border-[#f2b441]/15">
      <ScrollReveal direction="up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/images/shots-logo.jpg"
                alt="SHOTS Cafe & Bar Guwahati"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#f2b441]/40 shadow-md"
              />
              <div>
                <span className="font-brand font-extrabold text-xl tracking-[0.2em] text-[#f6efe6] block">
                  SHOTS
                </span>
                <span className="text-xs text-[#b8aa99]">
                  Cafe &amp; Bar · Where Caffeine Meets Chaos
                </span>
              </div>
            </Link>

            <div className="space-y-2.5 text-sm text-[#c7b9a7] pt-1">
              <a
                href={VENUE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2.5 hover:text-[#f2b441] transition"
              >
                <MapPin className="w-4 h-4 text-[#f2b441] shrink-0 mt-0.5" />
                <span>{VENUE.address}</span>
              </a>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#f2b441] shrink-0" />
                <span>{VENUE.hours}</span>
              </div>
              <a
                href={`tel:${VENUE.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2.5 hover:text-[#f2b441] transition"
              >
                <Phone className="w-4 h-4 text-[#f2b441] shrink-0" />
                <span>{VENUE.phone}</span>
              </a>
              <div className="flex items-center gap-2 text-xs text-[#f2b441]">
                <Star className="w-3.5 h-3.5 fill-[#f2b441]" />
                <span>{VENUE.rating}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#f2b441]">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-[#c7b9a7]">
              <li><Link to="/" className="hover:text-[#f2b441] transition">Home</Link></li>
              <li><Link to="/menu" className="hover:text-[#f2b441] transition">Cafe &amp; Bar Menu</Link></li>
              <li><Link to="/events" className="hover:text-[#f2b441] transition">Friday Fiesta &amp; Events</Link></li>
              <li><Link to="/gallery" className="hover:text-[#f2b441] transition">Gallery &amp; Moments</Link></li>
              <li><Link to="/about" className="hover:text-[#f2b441] transition">Our Story &amp; Map</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="font-semibold text-base text-[#f6efe6]">Stay in the Habit</h3>
            <p className="text-xs text-[#b8aa99]">
              Get updates on Friday Fiesta lineups, Sunday Live music &amp; new cocktail drops.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#221c15] border border-[#f2b441]/40 text-sm text-[#f2b441]">
                <Check className="w-4 h-4 shrink-0" />
                <span>You&apos;re on the SHOTS Guwahati guestlist!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  name="newsletter_email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-lg bg-[#1b1713] border border-[#3a3026] text-sm text-[#f6efe6] placeholder:text-[#7e7060] focus:outline-none focus:border-[#f2b441]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3.5 py-2.5 rounded-lg bg-[#f2b441] text-[#16120e] hover:bg-[#ffd06b] transition cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="flex items-center gap-3 pt-2">
              <a
                href={VENUE.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b1713] border border-white/10 text-xs text-[#e9dfd2] hover:border-[#f2b441] hover:text-[#f2b441] transition"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>{VENUE.instagramHandle}</span>
              </a>
              <Link
                to="/events"
                aria-label="Live Music at SHOTS"
                className="p-2 rounded-full bg-[#1b1713] border border-white/10 text-[#e9dfd2] hover:border-[#f2b441] hover:text-[#f2b441] transition"
              >
                <Music className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8f8171]">
          <p>© {new Date().getFullYear()} SHOTS — Cafe &amp; Bar, Guwahati. All rights reserved.</p>
          <p>Drink responsibly · Nirvana Tower, RG Baruah Road, Assam.</p>
        </div>
      </ScrollReveal>
    </footer>
  );
}
