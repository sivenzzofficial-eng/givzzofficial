import React, { useState } from 'react';
import { X, UserPlus, Sparkles, CheckCircle2, ShieldCheck, Mail, User, Lock, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RegisterModal: React.FC = () => {
  const { isRegisterModalOpen, setIsRegisterModalOpen, registerAccount, currentUser } = useApp();
  const [name, setName] = useState(currentUser.name === 'Givzz Guest User' ? '' : currentUser.name);
  const [email, setEmail] = useState(currentUser.email === 'guest@givzz.hub' ? '' : currentUser.email);
  const [username, setUsername] = useState(currentUser.username === '@givzz_guest' ? '' : currentUser.username);
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isRegisterModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !username) {
      alert('Lengkapi semua data pendaftaran!');
      return;
    }

    registerAccount(name, email, username);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsRegisterModalOpen(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-extrabold text-xl">Daftar Akun Member</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Diskon 20%
                </span>
              </div>
              <p className="text-xs text-blue-100">Dapatkan kupon 20% untuk semua platform & web disini!</p>
            </div>
          </div>
          <button
            onClick={() => setIsRegisterModalOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center border-2 border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="font-black text-xl text-slate-900 dark:text-white">
              Pendaftaran Berhasil!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xs mx-auto">
              Sistem telah mendeteksi penyelesaian misi. Buka <strong>Daily Mission</strong> untuk mengeklaim Kupon Diskon 20%!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
              <span>
                <strong>Misi Pendaftaran:</strong> Cukup lengkapi nama dan data akun kamu di bawah ini, sistem otomatis memverifikasi dan memberikan potongan harga 20% di seluruh web & toko kami.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Contoh: Givzz VIP Member"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Email Aktif
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="email@kamu.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Username Pilihan
              </label>
              <div className="relative">
                <span className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-xs">@</span>
                <input
                  type="text"
                  required
                  placeholder="username_kamu"
                  value={username.replace(/^@/, '')}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Password Akun
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Buat password akun..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Daftar Sekarang & Ambil Diskon 20%</span>
              </button>
            </div>
          </form>
        )}

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-center text-xs text-slate-500">
          Sistem Verifikasi Otomatis Givzz Ecosystem
        </div>
      </div>
    </div>
  );
};
