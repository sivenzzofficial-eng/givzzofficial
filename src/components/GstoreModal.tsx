import React, { useState } from 'react';
import { X, ShoppingBag, Sparkles, CheckCircle2, AlertCircle, Wallet, Tag, ArrowRight, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GSTORE_PRODUCTS } from '../data/products';
import { GstoreProduct } from '../types';

export const GstoreModal: React.FC = () => {
  const { 
    isGstoreModalOpen, 
    setIsGstoreModalOpen, 
    saldoGpay, 
    payWithGpay, 
    startWhatsAppPayment,
    hasDiscount20,
    markMissionCompleted,
  } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const [successItem, setSuccessItem] = useState<string | null>(null);

  // Trigger explore / visit gstore daily mission when open
  React.useEffect(() => {
    if (isGstoreModalOpen) {
      markMissionCompleted('gstore');
    }
  }, [isGstoreModalOpen]);

  if (!isGstoreModalOpen) return null;

  const categories = ['Semua', 'Game', 'Streaming', 'Voucher', 'Pulsa & Data'];

  const filteredProducts = selectedCategory === 'Semua' 
    ? GSTORE_PRODUCTS 
    : GSTORE_PRODUCTS.filter(p => p.category === selectedCategory);

  const handlePurchaseWithGpay = (product: GstoreProduct, finalPrice: number) => {
    setBuyingId(product.id);
    setTimeout(() => {
      const success = payWithGpay(product.price, product.name, product.category);
      setBuyingId(null);
      if (success) {
        setSuccessItem(product.name);
        setTimeout(() => setSuccessItem(null), 2500);
      }
    }, 600);
  };

  const handlePurchaseViaWhatsApp = (product: GstoreProduct, finalPrice: number) => {
    setIsGstoreModalOpen(false);
    startWhatsAppPayment({
      type: 'purchase',
      productName: product.name,
      amount: finalPrice,
      method: 'QRIS / DANA via WhatsApp',
      category: product.category,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-800 dark:text-slate-100">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-xl">Gstore Marketplace</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/25">Gpay & WA Gateway</span>
                {hasDiscount20 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 flex items-center gap-1 animate-pulse">
                    <Tag className="w-3 h-3" /> Diskon 20% Aktif
                  </span>
                )}
              </div>
              <p className="text-xs text-indigo-100">Top-up game, voucher streaming & item digital serba instan</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/30 backdrop-blur-md border border-white/20 text-xs">
              <Wallet className="w-3.5 h-3.5 text-emerald-300" />
              <span>Saldo: Rp {saldoGpay.toLocaleString('id-ID')}</span>
            </div>
            <button
              onClick={() => setIsGstoreModalOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="sm:hidden text-xs font-bold text-indigo-600 dark:text-indigo-400">
            Rp {saldoGpay.toLocaleString('id-ID')}
          </div>
        </div>

        {/* Product Grid */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {hasDiscount20 && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  <strong>Promo Member Aktif:</strong> Kamu mendapatkan <strong>Diskon 20%</strong> untuk semua item di Gstore!
                </span>
              </div>
              <span className="font-extrabold text-[11px] px-2 py-0.5 rounded bg-amber-400 text-slate-900">
                HEMAT 20%
              </span>
            </div>
          )}

          {successItem && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <div className="text-xs">
                <span className="font-bold">Pembelian Sukses!</span> Kamu baru saja membeli <span className="underline font-semibold">{successItem}</span>. Saldo Gpay otomatis terpotong dan notifikasi real-time terkirim!
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map((p) => {
              const discountedPrice = hasDiscount20 ? Math.round(p.price * 0.8) : p.price;
              const canAffordWithGpay = saldoGpay >= discountedPrice;
              const isBuying = buyingId === p.id;

              return (
                <div
                  key={p.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 p-4 flex flex-col justify-between hover:shadow-lg transition-all"
                >
                  <div>
                    <div className="relative h-32 rounded-xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-700">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {p.popular && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                          Populer 🔥
                        </span>
                      )}
                      <span className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                        {p.category}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                      {p.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] text-slate-400">Harga Item</div>
                      <div className="flex items-center gap-1.5">
                        <div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                          Rp {discountedPrice.toLocaleString('id-ID')}
                        </div>
                        {hasDiscount20 && (
                          <div className="text-[11px] line-through text-slate-400 font-semibold">
                            Rp {p.price.toLocaleString('id-ID')}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {canAffordWithGpay ? (
                        <button
                          onClick={() => handlePurchaseWithGpay(p, discountedPrice)}
                          disabled={isBuying}
                          className="flex-1 py-2 px-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50 text-center"
                        >
                          {isBuying ? 'Membeli...' : 'Beli via Saldo'}
                        </button>
                      ) : null}

                      {/* Tombol Bayar via WhatsApp / QRIS / DANA langsung */}
                      <button
                        onClick={() => handlePurchaseViaWhatsApp(p, discountedPrice)}
                        className={`py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          canAffordWithGpay ? '' : 'w-full'
                        }`}
                        title="Bayar via WA (QRIS / DANA / Transfer)"
                      >
                        <span>Bayar via WA (QRIS/DANA)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>⚡ Setiap pembelian via WhatsApp dilindungi timer verifikasi 10 menit</span>
          <button
            onClick={() => setIsGstoreModalOpen(false)}
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
};
