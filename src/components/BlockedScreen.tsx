import React from 'react';
import { ShieldAlert, Lock, AlertTriangle, RefreshCw, KeyRound } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BlockedScreen: React.FC = () => {
  const { currentUser, setIsAdminModalOpen } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950 text-slate-100 overflow-y-auto">
      <div className="relative w-full max-w-lg p-8 rounded-3xl bg-slate-900/90 border border-rose-600/40 shadow-2xl shadow-rose-950/60 backdrop-blur-xl text-center">
        {/* Glowing Warning Icon */}
        <div className="mx-auto w-20 h-20 mb-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shadow-lg shadow-rose-500/20">
          <ShieldAlert className="w-10 h-10 animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30 mb-4">
          <Lock className="w-3.5 h-3.5" /> SECURITY SYSTEM GIVZZ
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
          AKSES ANDA DIBLOKIR!
        </h1>

        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          Perangkat dan Alamat IP Anda telah ditangguhkan secara otomatis oleh sistem keamanan atau diblokir langsung oleh <span className="font-semibold text-rose-400">Admin Givzz</span> karena indikasi aktivitas mencurigakan / kecurangan transaksi.
        </p>

        {/* IP & Account Details */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-2 mb-6 font-mono text-xs">
          <div className="flex justify-between items-center text-slate-400">
            <span>Alamat IP Terblokir:</span>
            <span className="text-rose-400 font-bold">{currentUser.ipAddress}</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Akun Pengguna:</span>
            <span className="text-white">{currentUser.name} ({currentUser.username})</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Alasan Blokir:</span>
            <span className="text-amber-400">{currentUser.blockedReason || 'Pelanggaran Ketentuan & Fraud'}</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Status:</span>
            <span className="text-rose-500 font-bold">PERMANENT IP BAN</span>
          </div>
        </div>

        {/* Warning Note */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs text-left mb-6">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Jika Anda merasa ini adalah kekeliruan atau ingin mengajukan banding unblock, silakan hubungi kontak resmi Givzz atau buka Panel Admin jika Anda adalah pemilik/administrator.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Muat Ulang Halaman</span>
          </button>

          {/* Emergency Admin Access to unblock self */}
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-900/40 transition-all cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>Masuk Panel Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
};
