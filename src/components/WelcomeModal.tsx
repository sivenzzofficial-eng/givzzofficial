import React, { useRef } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight, Bell, Sparkles, Globe, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WelcomeModal: React.FC = () => {
  const { isWelcomeOpen, setIsWelcomeOpen, websites, announcement, markMissionCompleted } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!isWelcomeOpen) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleOpenUrl = (url: string) => {
    markMissionCompleted('explore');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-all text-slate-800 dark:text-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header bar with Red 'X' Button on top-right */}
        <div className="relative px-6 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800/80 bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-purple-50/30 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900">
          {/* Tombol X Merah di Atas Sesuai Permintaan */}
          <button
            onClick={() => setIsWelcomeOpen(false)}
            aria-label="Tutup Pop-up"
            title="Tutup (Esc)"
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white shadow-lg shadow-rose-500/30 transition-all cursor-pointer z-20 group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          </button>

          {/* Badge & Big Welcome Title */}
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Official Hub by Givzz
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
              Vite 8.3 & React 19 Engine
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Welcome beberapa web yang dibuat <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">givzz:</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Jelajahi karya inovatif, aplikasi web praktis, toko digital, dan ekosistem terpadu Givzz dalam satu portal.
          </p>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* 1. Pengumuman di Atas List Web */}
          <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-500/30 dark:border-amber-400/20 backdrop-blur-sm">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/30 shrink-0">
                <Bell className="w-5 h-5 animate-bounce" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                  <h3 className="font-bold text-base text-amber-900 dark:text-amber-300">
                    {announcement.title}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                    Update: {announcement.date}
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {announcement.content}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Kotak yang Bisa Digeser (Horizontal Scroll / Swipeable List) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Koleksi Web Givzz Pilihan (Geser ke Kanan/Kiri)
                </h3>
              </div>
              {/* Carousel controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scroll('left')}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                  aria-label="Geser ke kiri"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                  aria-label="Geser ke kanan"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Kotak Geser Container */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-3 pt-1 scroll-smooth snap-x snap-mandatory focus:outline-none scrollbar-thin"
              style={{ scrollbarWidth: 'thin' }}
            >
              {websites.map((web) => (
                <div
                  key={web.id}
                  className="snap-start shrink-0 w-[290px] sm:w-[320px] rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-blue-500/50 p-4 flex flex-col justify-between transition-all duration-200 hover:shadow-xl group"
                >
                  <div>
                    {/* Image Preview & Badge */}
                    <div className="relative h-36 rounded-xl overflow-hidden mb-3 bg-slate-200 dark:bg-slate-700">
                      <img
                        src={web.image}
                        alt={web.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {web.badge && (
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-600/90 text-white backdrop-blur-md shadow-sm">
                          {web.badge}
                        </span>
                      )}

                      <span className="absolute bottom-2 left-2.5 text-xs text-white/90 font-medium px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs flex items-center gap-1">
                        <Globe className="w-3 h-3 text-blue-300" /> {web.category}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <h4 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-500 transition-colors">
                      {web.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1.5 leading-relaxed">
                      {web.description}
                    </p>
                  </div>

                  {/* Bottom Row with TOMBOL GO di paling kanan */}
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-600 dark:text-slate-300 truncate max-w-[150px]">
                      {web.url.replace(/^https?:\/\//, '')}
                    </span>

                    {/* Tombol Go Sesuai Permintaan */}
                    <button
                      onClick={() => handleOpenUrl(web.url)}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all cursor-pointer group/btn"
                    >
                      <span>Go</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-1.5 pt-1">
              <span className="text-xs text-slate-600 dark:text-slate-300">
                💡 Geser horizontal untuk melihat semua website karya Givzz
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer with TOMBOL TUTUP BIRU KOTAK */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80 flex items-center justify-between gap-4 flex-wrap">
          <div className="text-xs text-slate-600 dark:text-slate-300">
            Tekan <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-mono">Tutup</kbd> untuk masuk ke Dashboard penuh & dompet Gpay
          </div>

          {/* Tombol Tutup Biru Kotak Sesuai Permintaan */}
          <button
            onClick={() => setIsWelcomeOpen(false)}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Tutup & Masuk Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
