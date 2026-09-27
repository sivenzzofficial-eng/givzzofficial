import React from 'react';
import { 
  Search, ExternalLink, Globe, Sparkles, Filter, Lock, 
  ArrowUpRight, Shield, Layers, HelpCircle, ShoppingBag, Wallet, CheckCircle2,
  Target, Gift, Tag, ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Dashboard: React.FC = () => {
  const {
    websites,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setIsAdminModalOpen,
    setIsGpayModalOpen,
    setIsGstoreModalOpen,
    setIsDailyMissionModalOpen,
    unclaimedMissionsCount,
    hasDiscount20,
    dailyMissions,
    saldoGpay,
  } = useApp();

  const categories = ['Semua', 'AI & Tools', 'Game & Fun', 'E-Commerce', 'Portfolio', 'Utilities'];

  // Filter based on search query (matching name, description, link/url, category)
  const filteredWebsites = websites.filter((web) => {
    const matchesSearch =
      web.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      web.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      web.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      web.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Semua' ? true : web.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-10 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-blue-50/70 via-transparent to-transparent dark:from-blue-950/20 dark:via-slate-950">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin" />
            <span>Koleksi Eksklusif Web & Ekosistem Karya Givzz</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Jelajahi Berbagai Website Modern <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
              Buatan Givzz
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Temukan aplikasi web, arena game, perkakas cerdas, dan toko digital. Selesaikan misi harian untuk mendapatkan bonus saldo & kupon diskon 20%!
          </p>

          {/* Daily Mission Promo Banner in Dashboard */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div 
              onClick={() => setIsDailyMissionModalOpen(true)}
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-indigo-500/10 border border-rose-500/30 hover:border-rose-500/60 transition-all flex items-center justify-between gap-3 text-left cursor-pointer group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shrink-0 shadow-md shadow-rose-500/30">
                  <Target className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  {/* Tanda Merah Bulet Kecil */}
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-600 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                      Daily Mission Aktif
                    </span>
                    {unclaimedMissionsCount > 0 ? (
                      <span className="px-2 py-0.2 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white animate-bounce">
                        {unclaimedMissionsCount} Hadiah Siap Klaim!
                      </span>
                    ) : (
                      <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300">
                        Bonus Saldo & Diskon 20%
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 truncate mt-0.5">
                    {hasDiscount20 
                      ? 'Kupon Diskon 20% kamu sudah aktif untuk semua platform & transaksi!'
                      : 'Kerjakan misi top up atau daftar akun untuk klaim hadiahmu sekarang.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:translate-x-1 transition-transform shrink-0">
                <span>Buka</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Kolom Pencarian Website Otomatis Real-time */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 absolute left-4 top-1/2 -translate-y-1/2 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik nama web, link URL, atau kata kunci pencarian..."
                className="w-full pl-12 pr-28 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-sm sm:text-base placeholder:text-slate-400 text-slate-900 dark:text-white shadow-xl shadow-blue-500/5 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 px-1">
              <span>⚡ Pencarian instan dan responsif secara real-time</span>
              <span>Ditemukan: <strong className="text-blue-600 dark:text-blue-400">{filteredWebsites.length}</strong> website</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Main Content: Big Website Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span>Daftar Kotak Website Givzz</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Klik kartu kotak website mana pun untuk langsung mengunjungi web tersebut
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Semua link aktif & terverifikasi</span>
          </div>
        </div>

        {/* Empty State if No Result */}
        {filteredWebsites.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <Search className="w-12 h-12 mx-auto text-slate-400 mb-3" />
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">
              Tidak Ada Website Ditemukan
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Tidak ada website yang cocok dengan kata kunci "{searchQuery}". Coba kata kunci lain atau pilih kategori "Semua".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Tampilkan Semua Website
            </button>
          </div>
        ) : (
          /* Kotak Gede Nama Web, Gambar, beserta Deskripsinya */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredWebsites.map((web) => (
              <div
                key={web.id}
                onClick={() => handleCardClick(web.url)}
                className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-400/60 shadow-xs hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
                role="button"
                tabIndex={0}
              >
                <div>
                  {/* Kotak Gede Gambar Preview */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={web.image}
                      alt={web.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Badge Top Left */}
                    {web.badge && (
                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-600/90 text-white backdrop-blur-md shadow-md">
                        {web.badge}
                      </span>
                    )}

                    {/* Category Top Right */}
                    <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white/90 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-blue-400" />
                      {web.category}
                    </span>

                    {/* Quick URL on Bottom of Image */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-mono">
                      <span className="truncate max-w-[200px] text-white/80">
                        {web.url.replace(/^https?:\/\//, '')}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-sans font-semibold text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded backdrop-blur-xs">
                        Buka Web <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Body: Nama Web & Deskripsi Lengkap */}
                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {web.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {web.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Bar */}
                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/60 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Karya Givzz Ecosystem
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(web.url);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                  >
                    <span>Kunjungi Web</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Feature Spotlight: Gstore & Gpay integration banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white relative overflow-hidden shadow-2xl border border-indigo-700/40">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                <ShoppingBag className="w-3.5 h-3.5" /> Gstore & Gpay Ecosystem
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Beli Voucher & Top Up Game Pakai Saldo Gpay
              </h3>
              <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
                Gunakan saldo Gpay kamu untuk berbelanja item digital di Gstore. {hasDiscount20 && <strong className="text-amber-300">Kupon Diskon 20% kamu aktif!</strong>}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsGpayModalOpen(true)}
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span>Isi Saldo Gpay</span>
              </button>

              <button
                onClick={() => setIsGstoreModalOpen(true)}
                className="px-6 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-bold text-xs shadow-lg shadow-indigo-500/40 transition-all cursor-pointer flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buka Gstore Sekarang</span>
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER AREA DENGAN TOMBOL KOTAK BERTULISKAN PANEL ADMIN */}
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-black text-xl text-slate-900 dark:text-white">
                  Givzz<span className="text-blue-600">Hub</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                Platform terpusat untuk mengakses semua proyek website karya Givzz dengan sistem pembayaran terintegrasi Gpay dan otentikasi admin rahasia.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Layanan & Fitur
              </h4>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li>• Koleksi Website Givzz</li>
                <li>• Dompet Digital Gpay</li>
                <li>• Gstore Digital Marketplace</li>
                <li>• Daily Mission & Hadiah Saldo</li>
              </ul>
            </div>

            {/* Bagian Tombol Kotak Panel Admin Sesuai Permintaan */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Akses Administrator
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Khusus pemilik dan pengelola web Givzz untuk memantau data pengguna & memblokir fraud.
              </p>

              {/* TOMBOL KOTAK BERTULISKAN PANEL ADMIN DI PALING BAWAH SETELAH SCROLL */}
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 hover:from-rose-900 hover:to-slate-900 text-white font-extrabold text-xs border border-rose-500/40 shadow-xl shadow-rose-950/40 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <div className="p-1 rounded-md bg-rose-500/30 text-rose-400 group-hover:scale-110 transition-transform">
                  <Lock className="w-4 h-4" />
                </div>
                <span className="tracking-wide">Panel Admin</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div>
              © 2026 Givzz Hub Ecosystem. Semua Hak Cipta Dilindungi.
            </div>
            <div className="flex items-center gap-4">
              <span>Keamanan Privat Givzz</span>
              <span>•</span>
              <span>Daily Mission Active</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
