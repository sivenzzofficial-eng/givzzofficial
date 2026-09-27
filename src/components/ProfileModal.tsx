import React, { useState } from 'react';
import { X, User, Bell, Volume2, VolumeX, Shield, Moon, Sun, Check, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileModal: React.FC = () => {
  const {
    isProfileModalOpen,
    setIsProfileModalOpen,
    currentUser,
    updateCurrentUser,
    isDarkMode,
    toggleDarkMode,
    soundEnabled,
    setSoundEnabled,
    addPushNotification,
  } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [username, setUsername] = useState(currentUser.username);
  const [isSaved, setIsSaved] = useState(false);

  if (!isProfileModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      email,
      username,
    });
    setIsSaved(true);
    addPushNotification('Profil Disimpan', 'Informasi akun dan preferensi berhasil diperbarui.', 'success');
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleRequestPushPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        addPushNotification('Notifikasi Browser Aktif', 'Browser Anda sekarang akan menerima pembaruan saldo Gpay.', 'success');
      } else {
        alert('Izin notifikasi tidak diberikan oleh browser.');
      }
    } else {
      alert('Browser ini tidak mendukung Web Push Notifications.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-800 dark:text-slate-100">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md">
              <User className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="font-extrabold text-xl">Pengaturan Akun & Preferensi</h2>
              <p className="text-xs text-slate-300">Kustomisasi profil dan pengaturan aplikasi Givzz</p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Avatar and Info Header */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-md"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-white truncate">
                  {currentUser.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                  {currentUser.role.toUpperCase()}
                </span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                IP: {currentUser.ipAddress}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-1">
                <Shield className="w-3.5 h-3.5" /> Akun Terverifikasi
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Email Terdaftar
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Username Akun
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Customization Preferences */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Kustomisasi Preferensi
              </h4>

              {/* Mode Gelap Switch */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2.5">
                  {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Tampilan Mode Gelap</div>
                    <div className="text-[11px] text-slate-500">Meringankan mata saat malam hari</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    isDarkMode ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                      isDarkMode ? 'translate-x-6.5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Suara Efek Notifikasi */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2.5">
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Efek Suara Real-time</div>
                    <div className="text-[11px] text-slate-500">Bunyi 'ping' saat ada mutasi saldo Gpay</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    soundEnabled ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                      soundEnabled ? 'translate-x-6.5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Push Notifikasi Izin Browser */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-blue-500" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Push Notification Browser</div>
                    <div className="text-[11px] text-slate-500">Notifikasi langsung ke desktop/ponsel</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRequestPushPermission}
                  className="px-3 py-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold cursor-pointer"
                >
                  Izinkan
                </button>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 cursor-pointer"
              >
                {isSaved ? <Check className="w-4 h-4" /> : null}
                <span>{isSaved ? 'Tersimpan!' : 'Simpan Perubahan'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
