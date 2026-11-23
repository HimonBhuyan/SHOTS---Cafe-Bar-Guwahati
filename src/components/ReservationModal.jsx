import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { VENUE } from '../data/shotsData';

const TIME_SLOTS = [
  '11:30 AM',
  '1:00 PM',
  '3:30 PM',
  '5:30 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
];

const SEATING_ZONES = [
  'Bar Front Lounge',
  'Cafe Daytime Booth',
  'Pool Table Zone',
  'Live Stage View',
];

export default function ReservationModal({ isOpen, onClose, initialContext = '' }) {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: today,
    time: '7:00 PM',
    guests: '4',
    seating: SEATING_ZONES[0],
    occasion: initialContext || 'Casual Hangout',
    notes: '',
  });
  const [bookingRef, setBookingRef] = useState(null);

  useEffect(() => {
    if (initialContext) {
      setForm((prev) => ({ ...prev, occasion: initialContext }));
    }
  }, [initialContext]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setBookingRef(`SH-GHY-${randomCode}`);
  };

  const resetAndClose = () => {
    setBookingRef(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Reserve a Table at SHOTS Cafe and Bar Guwahati"
    >
      <div className="relative w-full max-w-xl bg-[#181410] border border-[#f2b441]/30 rounded-2xl shadow-2xl overflow-hidden max-h-[88dvh] flex flex-col">
        {bookingRef ? (
          <div className="p-6 sm:p-8 text-center space-y-4 overflow-y-auto">
            <button
              onClick={resetAndClose}
              aria-label="Close reservation modal"
              className="absolute top-3.5 right-3.5 p-2 rounded-full bg-[#262019] text-[#e9dfd2] hover:bg-[#f2b441] hover:text-[#16120e] transition cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 mx-auto rounded-full bg-[#f2b441]/15 border border-[#f2b441] flex items-center justify-center text-[#f2b441]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <p className="font-script text-3xl text-[#f2b441]">See you at SHOTS!</p>
              <h3 className="font-brand font-extrabold text-xl sm:text-2xl text-[#f6efe6] mt-1">
                Table Request Confirmed
              </h3>
              <p className="text-xs uppercase tracking-widest text-[#b8aa99] mt-1.5">
                Booking Ref: <span className="text-[#f2b441] font-bold">{bookingRef}</span>
              </p>
            </div>

            <div className="bg-[#221c15] border border-white/10 rounded-xl p-3.5 text-left text-xs sm:text-sm space-y-1.5 text-[#dfd3c3]">
              <div className="flex justify-between gap-2">
                <span className="text-[#9e8f7e]">Guest:</span>
                <span className="font-semibold text-right truncate">{form.name} ({form.phone})</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#9e8f7e]">Date &amp; Time:</span>
                <span className="font-semibold">{form.date} · {form.time}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#9e8f7e]">Party Size:</span>
                <span className="font-semibold">{form.guests} Guests</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#9e8f7e]">Zone:</span>
                <span className="font-semibold">{form.seating}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#9e8f7e]">Occasion:</span>
                <span className="font-semibold text-right truncate">{form.occasion}</span>
              </div>
            </div>

            <p className="text-xs text-[#b8aa99] flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#f2b441] shrink-0" />
              <span>{VENUE.shortAddress}</span>
            </p>

            <button
              onClick={resetAndClose}
              className="px-7 py-2.5 rounded-full bg-[#f2b441] text-[#16120e] font-semibold text-sm hover:bg-[#ffd06b] transition cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col max-h-[88dvh]">
            {/* Sticky Header */}
            <div className="px-4 sm:px-7 pt-4 pb-3 border-b border-white/10 flex items-start justify-between gap-3 shrink-0 bg-[#181410]">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#f2b441]">
                  <Sparkles className="w-3 h-3 shrink-0" />
                  <span className="truncate">2nd Fl, Nirvana Tower · Opp. City Center Mall</span>
                </span>
                <h2 className="font-script text-3xl sm:text-4xl text-[#f6efe6] leading-tight mt-0.5">
                  Reserve Your Table
                </h2>
              </div>
              <button
                type="button"
                onClick={resetAndClose}
                aria-label="Close reservation modal"
                className="p-2 rounded-full bg-[#262019] text-[#e9dfd2] hover:bg-[#f2b441] hover:text-[#16120e] transition cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="px-4 sm:px-7 py-3.5 sm:py-5 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                <div className="min-w-0">
                  <label className="block text-[11px] sm:text-xs font-medium text-[#cbbba8] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Rohan Kalita"
                    className="w-full min-w-0 px-3 py-2 sm:py-2.5 rounded-xl bg-[#231d17] border border-white/10 text-sm text-[#f6efe6] focus:outline-none focus:border-[#f2b441]"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block text-[11px] sm:text-xs font-medium text-[#cbbba8] mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 92XXX XXXXX"
                    className="w-full min-w-0 px-3 py-2 sm:py-2.5 rounded-xl bg-[#231d17] border border-white/10 text-sm text-[#f6efe6] focus:outline-none focus:border-[#f2b441]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
                <div className="col-span-2 sm:col-span-1 min-w-0">
                  <label className="flex items-center gap-1 text-[11px] sm:text-xs font-medium text-[#cbbba8] mb-1">
                    <Calendar className="w-3 h-3 text-[#f2b441]" /> Date
                  </label>
                  <input
                    type="date"
                    required
                    min={today}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full min-w-0 px-3 py-2 sm:py-2.5 rounded-xl bg-[#231d17] border border-white/10 text-sm text-[#f6efe6] focus:outline-none focus:border-[#f2b441]"
                  />
                </div>
                <div className="min-w-0">
                  <label className="flex items-center gap-1 text-[11px] sm:text-xs font-medium text-[#cbbba8] mb-1">
                    <Clock className="w-3 h-3 text-[#f2b441]" /> Time
                  </label>
                  <select
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full min-w-0 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-[#231d17] border border-white/10 text-sm text-[#f6efe6] focus:outline-none focus:border-[#f2b441]"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                <div className="min-w-0">
                  <label className="flex items-center gap-1 text-[11px] sm:text-xs font-medium text-[#cbbba8] mb-1">
                    <Users className="w-3 h-3 text-[#f2b441]" /> Guests
                  </label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className="w-full min-w-0 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-[#231d17] border border-white/10 text-sm text-[#f6efe6] focus:outline-none focus:border-[#f2b441]"
                  >
                    {['2', '3', '4', '6', '8', '10-15 (Party)', '16-30 (Bash)', '40+ (Buyout)'].map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                <div className="min-w-0">
                  <label className="block text-[11px] sm:text-xs font-medium text-[#cbbba8] mb-1">Seating Zone</label>
                  <select
                    value={form.seating}
                    onChange={(e) => setForm({ ...form, seating: e.target.value })}
                    className="w-full min-w-0 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-[#231d17] border border-white/10 text-xs sm:text-sm text-[#f6efe6] focus:outline-none focus:border-[#f2b441]"
                  >
                    {SEATING_ZONES.map((z) => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </div>
                <div className="min-w-0">
                  <label className="block text-[11px] sm:text-xs font-medium text-[#cbbba8] mb-1">Occasion</label>
                  <input
                    type="text"
                    value={form.occasion}
                    onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                    className="w-full min-w-0 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-[#231d17] border border-white/10 text-xs sm:text-sm text-[#f6efe6] focus:outline-none focus:border-[#f2b441]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-medium text-[#cbbba8] mb-1">Special Requests (optional)</label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Near pool table, Friday Fiesta stage view, birthday shots..."
                  className="w-full px-3 py-2 rounded-xl bg-[#231d17] border border-white/10 text-xs sm:text-sm text-[#f6efe6] focus:outline-none focus:border-[#f2b441]"
                />
              </div>
            </div>

            {/* Sticky Submit Footer */}
            <div className="px-4 sm:px-7 py-3 sm:py-4 border-t border-white/10 bg-[#14110d] flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2.5 shrink-0">
              <span className="text-[11px] sm:text-xs text-[#9e8f7e] text-center sm:text-left">
                RSVP Desk: <a href="tel:+919282050511" className="text-[#f2b441] underline">{VENUE.phone}</a>
              </span>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-full bg-[#f2b441] text-[#16120e] font-bold text-sm hover:bg-[#ffd06b] transition shadow-lg shadow-[#f2b441]/20 cursor-pointer"
              >
                Confirm Table Request →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
