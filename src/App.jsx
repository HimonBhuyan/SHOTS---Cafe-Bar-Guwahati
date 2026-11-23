import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import TastingTrayDrawer from './components/TastingTrayDrawer';
import StoryViewerModal from './components/StoryViewerModal';
import LoungeDock from './components/LoungeDock';
import FrontLoader from './components/FrontLoader';
import { ScrollProgressBar } from './components/ScrollMotion';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import About from './pages/About';
import { soundEngine } from './utils/soundEngine';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const [reserveOpen, setReserveOpen] = useState(false);
  const [reserveContext, setReserveContext] = useState('');
  const [trayOpen, setTrayOpen] = useState(false);
  const [tray, setTray] = useState([]);
  const [storyId, setStoryId] = useState(null);
  const [audioOn, setAudioOn] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const openReserve = (context = '') => {
    setReserveContext(context);
    setReserveOpen(true);
  };

  const toggleAudio = () => {
    const next = soundEngine.setEnabled(!audioOn);
    setAudioOn(next);
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? '' : prev));
    }, 2400);
  };

  const handleAddToTray = (item) => {
    soundEngine.playClink();
    setTray((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    showToast(`Added ${item.name} to your Table Tray`);
  };

  const handleUpdateQty = (id, delta) => {
    setTray((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const trayCount = tray.reduce((sum, i) => sum + i.qty, 0);

  return (
    <BrowserRouter>
      <ScrollProgressBar />
      <FrontLoader />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#110f0d] text-[#f6efe6]">
        <Navbar
          onOpenReserve={openReserve}
          trayCount={trayCount}
          onOpenTray={() => setTrayOpen(true)}
        />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onOpenReserve={openReserve}
                  onAddToTray={handleAddToTray}
                  onOpenStory={(id) => setStoryId(id)}
                  audioOn={audioOn}
                />
              }
            />
            <Route path="/menu" element={<Menu tray={tray} onAddToTray={handleAddToTray} />} />
            <Route path="/events" element={<Events onOpenReserve={openReserve} />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About onOpenReserve={openReserve} />} />
          </Routes>
        </main>

        <Footer />

        <LoungeDock
          audioOn={audioOn}
          onToggleAudio={toggleAudio}
          onOpenReserve={openReserve}
        />

        <AnimatePresence>
          {toastMsg && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12 }}
              className="fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#f2b441] text-[#16120e] font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{toastMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <ReservationModal
          isOpen={reserveOpen}
          onClose={() => setReserveOpen(false)}
          initialContext={reserveContext}
        />

        <TastingTrayDrawer
          isOpen={trayOpen}
          onClose={() => setTrayOpen(false)}
          tray={tray}
          onUpdateQty={handleUpdateQty}
          onClear={() => setTray([])}
          onReserveWithTray={(summary) => openReserve(summary)}
        />

        <StoryViewerModal
          highlightId={storyId}
          onClose={() => setStoryId(null)}
        />
      </div>
    </BrowserRouter>
  );
}
