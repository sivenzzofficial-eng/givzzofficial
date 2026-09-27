import React, { useState } from 'react';
import { X, Shield, KeyRound, Lock, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminAuthModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    loginAdmin,
  } = useApp();

  const [inputKey1, setInputKey1] = useState('');
  const [inputKey2, setInputKey2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isShake, setIsShake] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAdminModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Validasi 2 kunci rahasia milik Givzz
      const success = loginAdmin(inputKey1, inputKey2);
      if (!success) {
        setIsShake(true);
        setErrorMessage('Akses Ditolak! Kunci Ke-1 atau Kunci Ke-2 salah. Akses ini hanya untuk Givzz.');
        setTimeout(() => setIsShake(false), 500);
      } else {
        setInputKey1('');
        setInputKey2('');
        setErrorMessage('');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100 transition-all ${
          isShake ? 'animate-[shake_0.4s_ease-in-out]' : ''
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg sm:text-xl">Otorisasi Panel Admin</h2>
              <p className="text-xs text-slate-300">Autentikasi Rahasia Givzz</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsAdminModalOpen(false);
              setErrorMessage('');
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span>
              Area privat khusus Givzz. Diperlukan 2 Kunci Pengaman rahasia untuk membuka panel kendali sistem & IP ban.
            </span>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Kunci Ke-1 */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
              <span>KUNCI KE-1</span>
              <span className="text-[10px] text-slate-400 font-mono">Secret Key 1</span>
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={inputKey1}
                onChange={(e) => setInputKey1(e.target.value)}
                placeholder="Masukkan Kunci Rahasia 1..."
                className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-mono tracking-wider focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Kunci Ke-2 */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
              <span>KUNCI KE-2</span>
              <span className="text-[10px] text-slate-400 font-mono">Secret Key 2</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={inputKey2}
                onChange={(e) => setInputKey2(e.target.value)}
                placeholder="Masukkan Kunci Rahasia 2..."
                className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-mono tracking-wider focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-rose-600/30 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Memvalidasi Akses...</span>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Verifikasi & Buka Panel Admin</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
          Sistem Terenkripsi & Anti-Fraud Protection
        </div>
      </div>
    </div>
  );
};
