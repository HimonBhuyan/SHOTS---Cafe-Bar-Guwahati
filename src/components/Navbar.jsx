import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Menu as MenuIcon, X, ShoppingBag } from 'lucide-react';
import { HandUnderline } from './Doodles';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Events', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
];

export default function Navbar({ onOpenReserve, trayCount = 0, onOpenTray }) {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#110f0d]/92 backdrop-blur-md border-b border-[#f2b441]/15 shadow-lg shadow-black/40'
          : 'bg-gradient-to-b from-[#110f0d]/90 via-[#110f0d]/60 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/images/shots-logo.jpg"
            alt="SHOTS Cafe & Bar Guwahati"
            className="w-11 h-11 rounded-full object-cover ring-2 ring-[#f2b441]/40 shadow-md transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105"
          />
          <div className="leading-tight">
            <span className="font-brand font-extrabold text-lg sm:text-xl tracking-[0.2em] text-[#f6efe6] block whitespace-nowrap">
              SHOTS
            </span>
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#d2c3b0] block">
              Cafe &amp; Bar · Guwahati
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 lg:gap-9" aria-label="Primary Navigation">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  active ? 'text-[#f2b441]' : 'text-[#e9dfd2] hover:text-[#f2b441]'
                }`}
              >
                {link.label}
                {active && (
                  <HandUnderline className="w-full h-2.5 absolute -bottom-1.5 left-0" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {trayCount > 0 && (
            <button
              onClick={onOpenTray}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#241e18] border border-[#f2b441]/40 text-[#f2b441] text-xs font-semibold hover:bg-[#f2b441] hover:text-[#16120e] transition cursor-pointer"
              title="View your Table Order Tray"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Tray</span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#f2b441] text-[#16120e] text-[11px] font-bold">
                {trayCount}
              </span>
            </button>
          )}

          <button
            onClick={() => onOpenReserve()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#f6efe6]/55 bg-[#1a1510]/60 text-sm font-medium text-[#f6efe6] hover:border-[#f2b441] hover:bg-[#f2b441] hover:text-[#16120e] transition-all duration-200 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve a Table</span>
          </button>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-[#f6efe6] hover:bg-[#241e18] transition cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#16130f]/98 border-t border-[#f2b441]/20 px-6 py-5 space-y-3 shadow-2xl">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-2 text-base font-medium border-b border-white/5 ${
                  active ? 'text-[#f2b441]' : 'text-[#e9dfd2]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenReserve();
            }}
            className="w-full mt-3 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#f2b441] text-[#16120e] font-semibold text-sm cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve a Table</span>
          </button>
        </div>
      )}
    </header>
  );
}
