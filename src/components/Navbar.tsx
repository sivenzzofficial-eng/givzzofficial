import React, { useState } from 'react';
import { 
  Sun, Moon, Wallet, User, Bell, ShoppingBag, 
  History, Sparkles, Target, Tag, Gift, CheckCircle2, AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    saldoGpay,
    setIsGpayModalOpen,
    setIsGstoreModalOpen,
    setIsProfileModalOpen,
    setIsTransactionsModalOpen,
    setIsWelcomeOpen,
    setIsDailyMissionModalOpen,
    unclaimedMissionsCount,
    hasDiscount20,
    notifications,
    currentUser,
    clearNotifications,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-2 sm:gap-3">
        
        {/* Brand & Welcome Modal Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsWelcomeOpen(true)}
            className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer text-left focus:outline-none"
            title="Buka kembali Pop-up Sambutan & List Web"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                  Givzz<span className="text-blue-600 dark:text-blue-400">Hub</span>
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5 hidden sm:block">
                Ecosystem & Digital Portal
              </p>
            </div>
          </button>

          {/* Quick Welcome popup re-open button */}
          <button
            onClick={() => setIsWelcomeOpen(true)}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/60 dark:border-blue-800/60 transition-colors cursor-pointer"
          >
            <span>📜 List Pop-up Web</span>
          </button>
        </div>

        {/* Right Action Icons & Badges */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* DAILY MISSION BUTTON DENGAN TANDA MERAH BULET KECIL SESUAI PERMINTAAN */}
          <button
            onClick={() => setIsDailyMissionModalOpen(true)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 hover:border-rose-400 dark:hover:border-rose-700 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            title="Buka Daily Mission Givzz (Ada Misi Berhadiah Saldo & Diskon 20%!)"
          >
            <div className="relative">
              <Target className="w-4 h-4 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform" />
              {/* Tanda Merah Bulet Kecil yang Diminta */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
            </div>
            
            <div className="text-left hidden xs:block">
              <div className="text-[10px] font-bold text-rose-600 dark:text-rose-400 leading-none flex items-center gap-1">
                <span>Daily Mission</span>
                {unclaimedMissionsCount > 0 && (
                  <span className="px-1 py-0.2 rounded-full bg-rose-600 text-white text-[9px] font-bold leading-none">
                    {unclaimedMissionsCount}
                  </span>
                )}
              </div>
              <div className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 leading-tight">
                {hasDiscount20 ? 'Kupon 20% Aktif' : 'Klaim Hadiah'}
              </div>
            </div>
          </button>

          {/* 1. Saldo Gpay Pill Button */}
          <button
            onClick={() => setIsGpayModalOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-200 dark:border-slate-700 hover:border-blue-500/60 dark:hover:border-blue-400/60 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            title="Klik untuk Top Up Saldo Gpay & Kelola Dompet"
          >
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs shadow-blue-600/40">
              <Wallet className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 leading-none">
                Gpay
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-blue-700 dark:text-blue-300 group-hover:text-blue-600 transition-colors leading-tight">
                Rp {saldoGpay.toLocaleString('id-ID')}
              </div>
            </div>
          </button>

          {/* 2. Gstore Button */}
          <button
            onClick={() => setIsGstoreModalOpen(true)}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/70 transition-colors cursor-pointer"
            title="Belanja Item & Voucher di Gstore pakai Gpay"
          >
            <ShoppingBag className="w-4 h-4 text-indigo-500" />
            <span>Gstore</span>
            {hasDiscount20 && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-600 text-white">
                -20%
              </span>
            )}
          </button>

          {/* 3. Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* 4. Real-time Push Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              title="Notifikasi Push Real-time"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {notifications.length > 9 ? '9+' : notifications.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Notifikasi Real-time
                    </span>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      Bersihkan
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2.5 py-2.5 scrollbar-thin">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      Belum ada notifikasi baru
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 text-xs"
                      >
                        <div className="flex items-center gap-1.5 mb-1 font-semibold text-slate-800 dark:text-slate-100">
                          {n.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                          {n.type === 'warning' && <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                          {n.type === 'info' && <Bell className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
                          <span>{n.title}</span>
                          <span className="ml-auto text-[10px] text-slate-400 font-normal">
                            {n.timestamp}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {n.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                  <button
                    onClick={() => {
                      setIsNotifOpen(false);
                      setIsTransactionsModalOpen(true);
                    }}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Lihat Seluruh Riwayat Transaksi →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 5. Ikon Profil & Pengaturan Akun */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-slate-600"
              title="Profil & Pengaturan Akun"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-xl object-cover border border-blue-500/40"
              />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden lg:inline max-w-[100px] truncate">
                {currentUser.name}
              </span>
            </button>

            {/* Profile Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in duration-150">
                <div className="p-2 mb-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60">
                  <div className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {currentUser.email}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold uppercase text-[10px]">
                      {currentUser.role}
                    </span>
                    {hasDiscount20 && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px]">
                        Diskon 20%
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsDailyMissionModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-colors text-left cursor-pointer font-semibold"
                  >
                    <Target className="w-4 h-4 text-rose-500" />
                    <span>Daily Mission ({unclaimedMissionsCount} Siap Klaim)</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsProfileModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors text-left cursor-pointer"
                  >
                    <User className="w-4 h-4 text-blue-500" />
                    <span>Pengaturan Akun & Preferensi</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsGpayModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors text-left cursor-pointer"
                  >
                    <Wallet className="w-4 h-4 text-emerald-500" />
                    <span>Top Up Saldo Gpay</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsTransactionsModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors text-left cursor-pointer"
                  >
                    <History className="w-4 h-4 text-purple-500" />
                    <span>Riwayat Transaksi Detail</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsGstoreModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors text-left cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-500" />
                    <span>Buka Gstore Marketplace</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
