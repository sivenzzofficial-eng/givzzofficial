import React, { useState } from 'react';
import { X, Wallet, ArrowUpRight, QrCode, CreditCard, Building2, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GpayModal: React.FC = () => {
  const { 
    isGpayModalOpen, 
    setIsGpayModalOpen, 
    saldoGpay, 
    startWhatsAppPayment, 
    setIsTransactionsModalOpen 
  } = useApp();
  
  const [selectedAmount, setSelectedAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<string>('QRIS All Payment');

  if (!isGpayModalOpen) return null;

  const presetAmounts = [20000, 50000, 100000, 200000, 500000, 1000000];

  const paymentMethods = [
    { id: 'QRIS All Payment', name: 'QRIS All Payment', icon: QrCode, desc: 'BCA, Mandiri, GoPay, OVO, Dana, ShopeePay' },
    { id: 'DANA E-Wallet', name: 'DANA E-Wallet', icon: Smartphone, desc: 'Transfer sesama DANA & QRIS instan' },
    { id: 'BCA Virtual Account', name: 'BCA Virtual Account', icon: Building2, desc: 'Verifikasi instan via WA Givzz' },
    { id: 'Mandiri Livin', name: 'Mandiri Livin / Transfer', icon: CreditCard, desc: 'Transfer bank & konfirmasi via WA' },
  ];

  const handleProceedToPayment = () => {
    const amountToTopUp = customAmount ? parseInt(customAmount, 10) : selectedAmount;
    if (!amountToTopUp || amountToTopUp < 10000) {
      alert('Minimal top up adalah Rp 10.000');
      return;
    }

    // Alihkan langsung ke Screen Switch Pembayaran WhatsApp Givzz
    setIsGpayModalOpen(false);
    startWhatsAppPayment({
      type: 'topup',
      productName: `Top Up Saldo Gpay Rp ${amountToTopUp.toLocaleString('id-ID')}`,
      amount: amountToTopUp,
      method: selectedMethod,
      category: 'Top Up Gpay',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-xl">Dompet Digital Gpay</h2>
              <p className="text-xs text-blue-100">Top Up Saldo Terintegrasi WhatsApp Gateway</p>
            </div>
          </div>
          <button
            onClick={() => setIsGpayModalOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Current Balance Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-700/80 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Saldo Tersedia
                </span>
                <div className="text-2xl sm:text-3xl font-black mt-1 text-white tracking-tight">
                  Rp {saldoGpay.toLocaleString('id-ID')}
                </div>
              </div>
              <button
                onClick={() => {
                  setIsGpayModalOpen(false);
                  setIsTransactionsModalOpen(true);
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Riwayat</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> WhatsApp Gateway 10 Menit
              </span>
              <span>Givzz Pay v2</span>
            </div>
          </div>

          {/* Quick Amounts */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
              Pilih Nominal Top Up
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedAmount === amt && !customAmount
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                  }`}
                >
                  Rp {(amt / 1000).toLocaleString('id-ID')}k
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="mt-3">
              <input
                type="number"
                placeholder="Atau ketik nominal manual (contoh: 75000)"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
              Pilih Metode Pembayaran (Semua via WhatsApp Givzz)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {paymentMethods.map((m) => {
                const IconComponent = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMethod(m.id)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      selectedMethod === m.id
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-1 ring-blue-500'
                        : 'border-slate-200 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs">{m.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{m.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Total Pembayaran</div>
            <div className="text-base font-extrabold text-blue-600 dark:text-blue-400">
              Rp {(customAmount ? parseInt(customAmount || '0', 10) : selectedAmount).toLocaleString('id-ID')}
            </div>
          </div>

          <button
            onClick={handleProceedToPayment}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Lanjut ke Pembayaran WA</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
