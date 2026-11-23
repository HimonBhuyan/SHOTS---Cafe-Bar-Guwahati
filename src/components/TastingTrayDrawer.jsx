import React from 'react';
import { X, Plus, Minus, Trash2, Calendar } from 'lucide-react';

export default function TastingTrayDrawer({ isOpen, onClose, tray, onUpdateQty, onClear, onReserveWithTray }) {
  if (!isOpen) return null;

  const total = tray.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#181410] border-l border-[#f2b441]/25 h-full flex flex-col shadow-2xl">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="font-script text-3xl text-[#f2b441]">Your Table Order Tray</h2>
            <p className="text-xs text-[#b8aa99]">Pre-select coffee, shots, cocktails &amp; plates</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close tray"
            className="p-2 rounded-full bg-[#241e18] text-[#f6efe6] hover:bg-[#f2b441] hover:text-[#16120e] transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {tray.length === 0 ? (
            <div className="text-center py-16 text-[#9e8f7e] space-y-2">
              <p className="font-script text-2xl text-[#f6efe6]">Your tray is empty</p>
              <p className="text-sm">Explore our menu to shortlist coffee, shots, pizza, or bar bites.</p>
            </div>
          ) : (
            tray.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#221c15] border border-white/10"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#f6efe6] truncate">{item.name}</h4>
                  <p className="text-xs text-[#f2b441] font-semibold">₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="w-6 h-6 rounded-md bg-[#2f271e] flex items-center justify-center text-[#f6efe6] hover:bg-[#f2b441] hover:text-[#16120e] cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-5 text-center">{item.qty}</span>
                    <button
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-6 h-6 rounded-md bg-[#2f271e] flex items-center justify-center text-[#f6efe6] hover:bg-[#f2b441] hover:text-[#16120e] cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onUpdateQty(item.id, -item.qty)}
                  aria-label={`Remove ${item.name}`}
                  className="p-1.5 text-[#9e8f7e] hover:text-red-400 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {tray.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#14110d] space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#b8aa99]">Estimated Table Total</span>
              <span className="text-xl font-bold text-[#f2b441]">₹{total}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClear}
                className="px-4 py-2.5 rounded-full border border-white/15 text-xs text-[#cbbba8] hover:border-red-400 hover:text-red-300 transition cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  const summary = tray.map((i) => `${i.qty}x ${i.name}`).join(', ');
                  onClose();
                  onReserveWithTray(`Pre-order: ${summary}`);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#f2b441] text-[#16120e] font-bold text-sm hover:bg-[#ffd06b] transition cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Table with Tray</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
