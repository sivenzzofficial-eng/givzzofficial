import React, { useState, useEffect } from 'react';
import { 
  Clock, ShieldCheck, CheckCircle2, Lock, ArrowRight, 
  X, AlertTriangle, MessageCircle, Loader2, Sparkles, Receipt, Home
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PaymentGatewayScreen: React.FC = () => {
  const { 
    activePaymentOrder, 
    cancelWhatsAppPayment, 
    completeWhatsAppPayment,
    completedPaymentResult,
    clearCompletedPaymentResult,
    hasDiscount20,
  } = useApp();

  // 10 minutes countdown = 600 seconds
  const [timeLeft, setTimeLeft] = useState<number>(600);
  
  // Input fields
  const [inputTrxId, setInputTrxId] = useState<string>('');
  const [inputVerifCode, setInputVerifCode] = useState<string>('');

  // Column 1 verification state
  const [isVerifyingTrx, setIsVerifyingTrx] = useState<boolean>(false);
  const [isTrxValid, setIsTrxValid] = useState<boolean>(false);

  // Column 2 error feedback
  const [verifError, setVerifError] = useState<string>('');

  // Valid secret codes provided by Givzz WhatsApp Admin (strictly hidden!)
  const validSecretCodes = ['882453', 'GIVZZ-88', 'GVZ-PAID', 'GVZ-VERIF-99', 'PAYMENT-GIVZZ'];

  // Timer countdown: 10 minutes -> 00:00
  useEffect(() => {
    if (!activePaymentOrder) return;
    setTimeLeft(600);
    setIsTrxValid(false);
    setIsVerifyingTrx(false);
    setInputTrxId('');
    setInputVerifCode('');
    setVerifError('');

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          alert('Waktu pembayaran 10 menit telah habis! Transaksi otomatis dibatalkan.');
          cancelWhatsAppPayment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activePaymentOrder]);

  // ID TRX validation logic: Must contain 'TRX-GIVZZ-'
  // When detected, spin loader for 2 seconds, then turn to green checkmark
  useEffect(() => {
    if (!inputTrxId) {
      setIsVerifyingTrx(false);
      setIsTrxValid(false);
      return;
    }

    if (inputTrxId.includes('TRX-GIVZZ-')) {
      setIsVerifyingTrx(true);
      setIsTrxValid(false);

      const timer = setTimeout(() => {
        setIsVerifyingTrx(false);
        setIsTrxValid(true);
      }, 2000); // 2 detik muter-muter lalu ceklis

      return () => clearTimeout(timer);
    } else {
      setIsVerifyingTrx(false);
      setIsTrxValid(false);
    }
  }, [inputTrxId]);

  // Column 2 validation
  const isVerifCodeValid = validSecretCodes.includes(inputVerifCode.trim().toUpperCase());

  // Tombol lanjutkan hanya terbuka jika kedua kolom valid dan sesuai
  const canContinue = isTrxValid && !isVerifyingTrx && isVerifCodeValid;

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOpenWhatsApp = () => {
    // URL WhatsApp Givzz sesuai permintaan
    const waUrl = 'https://wa.me/6288245340881?text=PAYMENT';
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canContinue) {
      if (!isTrxValid) {
        alert('Kolom ID TRX harus mengandung format "TRX-GIVZZ-" dan lolos verifikasi sistem.');
        return;
      }
      if (!isVerifCodeValid) {
        setVerifError('Kode Verifikasi salah! Dapatkan kode resmi dari Admin Givzz via WhatsApp.');
        return;
      }
      return;
    }

    // Berhasil!
    completeWhatsAppPayment(inputTrxId.trim());
  };

  // 1. POP UP / SCREEN SUKSES SETELAH LANJUTKAN
  if (completedPaymentResult) {
    const { order, trxId } = completedPaymentResult;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
        <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-slate-800 dark:text-slate-100 text-center">
          
          {/* Animated Success Badge */}
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>

          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Pembayaran Berhasil Diverifikasi!
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Transaksi Sukses
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pesanan Anda telah disetujui oleh sistem dan tercatat otomatis ke riwayat transaksi.
          </p>

          {/* DETAIL PRODUK YANG DIBELI: NAMA, HARGA, STATUS */}
          <div className="my-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-left space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Nama Produk:</span>
              <span className="font-extrabold text-slate-900 dark:text-white text-right max-w-[230px] truncate">
                {order.productName}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Total Harga:</span>
              <span className="font-black text-base text-emerald-600 dark:text-emerald-400">
                Rp {order.amount.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Status Pembayaran:</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-white">
                <CheckCircle2 className="w-3.5 h-3.5" /> Berhasil
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">ID Transaksi:</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                {trxId}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Metode:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                WhatsApp Gateway ({order.method})
              </span>
            </div>
          </div>

          {/* TOMBOL KEMBALI KE DASHBOARD */}
          <button
            onClick={clearCompletedPaymentResult}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </button>
        </div>
      </div>
    );
  }

  if (!activePaymentOrder) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 antialiased">
      {/* Container Kotak Bayar */}
      <div className="relative w-full max-w-xl my-auto rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
        
        {/* Top Cancel button */}
        <button
          onClick={cancelWhatsAppPayment}
          title="Batalkan Pembayaran"
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Order Info */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> GIVZZ SECURE PAYMENT GATEWAY
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Konfirmasi Pembayaran
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
            {activePaymentOrder.productName} • <span className="font-extrabold text-emerald-400">Rp {activePaymentOrder.amount.toLocaleString('id-ID')}</span>
          </p>
        </div>

        {/* 1. WAKTU HITUNG MUNDUR (10 MENIT) */}
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/30 text-center space-y-1 mb-6">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Clock className="w-4 h-4 animate-spin" />
            <span>Sisa Waktu Pembayaran</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-wider text-amber-400">
            {formatTime(timeLeft)}
          </div>
          <p className="text-[11px] text-slate-400">
            Harap selesaikan pembayaran sebelum waktu habis. Jika gagal otomatis dicancel.
          </p>
        </div>

        {/* 2. IKON WA & TEKS LANJUTKAN PEMBAYARAN VIA WA */}
        <div className="text-center my-6 flex flex-col items-center">
          {/* Ikon WA yang bisa diklik */}
          <button
            onClick={handleOpenWhatsApp}
            title="Klik untuk membuka WhatsApp Givzz"
            className="group relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 via-emerald-600 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:scale-108 active:scale-95 transition-all cursor-pointer border-2 border-emerald-400/40"
          >
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-3xl bg-emerald-500 animate-ping opacity-25 group-hover:opacity-40" />
            
            {/* WhatsApp SVG Icon */}
            <svg
              className="w-12 h-12 sm:w-14 sm:h-14 fill-current relative z-10 transition-transform group-hover:rotate-6"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </button>

          {/* Teks persis yang diminta: "lanjutkan pembayara via wa klik ikon dibawah" */}
          <div className="mt-3.5 space-y-1">
            <p className="text-sm font-bold text-white tracking-wide">
              lanjutkan pembayara via wa klik ikon dibawah
            </p>
            <p className="text-xs text-slate-400">
              Kirim bukti transfer ke WhatsApp Givzz untuk mendapatkan ID TRX dan Kode Verifikasi.
            </p>
          </div>
        </div>

        {/* 3. DUA KOLOM INPUT: ID TRX & KODE VERIFIKASI */}
        <form onSubmit={handleContinue} className="space-y-4 pt-2">
          
          {/* KOLOM KE-1: ID TRX */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Kolom 1: ID TRX (Harus mengandung "TRX-GIVZZ-")</span>
              <span className="text-[10px] text-slate-400 font-mono">Format Terproteksi</span>
            </label>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Ketik ID TRX: TRX-GIVZZ-..."
                value={inputTrxId}
                onChange={(e) => setInputTrxId(e.target.value)}
                className={`w-full pl-4 pr-12 py-3 rounded-xl bg-slate-950 border text-xs sm:text-sm font-mono tracking-wider focus:outline-none transition-all ${
                  isTrxValid
                    ? 'border-emerald-500 ring-1 ring-emerald-500 text-emerald-400'
                    : isVerifyingTrx
                    ? 'border-amber-500 ring-1 ring-amber-500 text-amber-300'
                    : 'border-slate-800 text-slate-200 focus:border-blue-500'
                }`}
              />

              {/* Ujung kolom: Awalnya muter-muter (spinner), lalu ceklis hijau setelah 2 detik */}
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                {isVerifyingTrx ? (
                  <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
                ) : isTrxValid ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-in zoom-in-75 duration-200" />
                ) : inputTrxId ? (
                  <span className="text-[10px] text-rose-400 font-sans font-bold">Harus TRX-GIVZZ-</span>
                ) : null}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-1">
              Contoh yang valid: <code className="text-slate-400">TRX-GIVZZ-88291</code> (setelah strip bebas).
            </p>
          </div>

          {/* KOLOM KE-2: KODE VERIFIKASI */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Kolom 2: Kode Verifikasi</span>
              <span className="text-[10px] text-slate-400 font-mono">Secret WA Code</span>
            </label>

            <div className="relative">
              <input
                type="password"
                placeholder="Masukkan Kode Verifikasi dari WA Givzz..."
                value={inputVerifCode}
                onChange={(e) => {
                  setInputVerifCode(e.target.value);
                  setVerifError('');
                }}
                className={`w-full pl-4 pr-12 py-3 rounded-xl bg-slate-950 border text-xs sm:text-sm font-mono tracking-wider focus:outline-none transition-all ${
                  isVerifCodeValid
                    ? 'border-emerald-500 ring-1 ring-emerald-500 text-emerald-400'
                    : 'border-slate-800 text-slate-200 focus:border-blue-500'
                }`}
              />

              <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                {isVerifCodeValid && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-in zoom-in-75 duration-200" />
                )}
              </div>
            </div>

            {verifError ? (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{verifError}</span>
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1">
                Kode rahasia ini hanya diberikan oleh Admin Givzz setelah Anda chat dan transfer di WA.
              </p>
            )}
          </div>

          {/* 4. TOMBOL LANJUTKAN (DIKUNCI JIKA BELUM BENAR / SESUAI) */}
          <div className="pt-3">
            {canContinue ? (
              /* TOMBOL TERBUKA */
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
              >
                <span>Lanjutkan Pembayaran</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              /* TOMBOL DIKUNCI */
              <button
                type="button"
                disabled
                className="w-full py-3.5 px-6 rounded-2xl bg-slate-800 text-slate-500 font-extrabold text-sm border border-slate-700/60 flex items-center justify-center gap-2 cursor-not-allowed opacity-60"
              >
                <Lock className="w-4 h-4" />
                <span>Tombol Dikunci (Isi 2 Kolom Sesuai & Benar)</span>
              </button>
            )}
          </div>

        </form>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center flex items-center justify-between text-xs text-slate-500">
          <span>Givzz Auto-Verification System</span>
          <button
            onClick={cancelWhatsAppPayment}
            className="text-rose-400 hover:underline cursor-pointer"
          >
            Batalkan Transaksi
          </button>
        </div>

      </div>
    </div>
  );
};
