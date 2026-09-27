import React from 'react';
import { 
  X, Target, Gift, CheckCircle2, ArrowRight, Sparkles, 
  Wallet, Tag, Compass, ShoppingBag, AlertCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DailyMission } from '../types';

export const DailyMissionModal: React.FC = () => {
  const {
    isDailyMissionModalOpen,
    setIsDailyMissionModalOpen,
    dailyMissions,
    claimMissionReward,
    executeMissionAction,
    unclaimedMissionsCount,
    hasDiscount20,
    saldoGpay,
  } = useApp();

  if (!isDailyMissionModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-800 dark:text-slate-100">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
              <Target className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-xl">Daily Mission Givzz</h2>
                {unclaimedMissionsCount > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-rose-600 shadow-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                    {unclaimedMissionsCount} Hadiah Siap Klaim!
                  </span>
                )}
              </div>
              <p className="text-xs text-rose-100">
                Selesaikan misi, sistem akan mengecek otomatis, lalu tekan tombol Klaim!
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDailyMissionModalOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current status summary banner */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
              <Wallet className="w-4 h-4 text-emerald-500" />
              <span>Saldo: Rp {saldoGpay.toLocaleString('id-ID')}</span>
            </div>

            {hasDiscount20 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                <Tag className="w-3 h-3" /> Diskon 20% Aktif
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Reset Misi Setiap Hari • Hadiah Instan
          </div>
        </div>

        {/* Missions List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {dailyMissions.map((mission, index) => {
            const isCompleted = mission.isCompleted;
            const isClaimed = mission.isClaimed;

            return (
              <div
                key={mission.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isClaimed
                    ? 'bg-slate-100/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-75'
                    : isCompleted
                    ? 'bg-gradient-to-r from-emerald-50/90 to-teal-50/50 dark:from-emerald-950/30 dark:to-slate-900 border-emerald-400/60 dark:border-emerald-500/50 shadow-md shadow-emerald-500/5 ring-1 ring-emerald-500/30'
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-rose-400/50'
                }`}
              >
                {/* Left: Mission Info & Reward badge */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isClaimed
                        ? 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                        : isCompleted
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                        : 'bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400'
                    }`}
                  >
                    {isClaimed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : isCompleted ? (
                      <Gift className="w-5 h-5 animate-bounce" />
                    ) : mission.actionType === 'topup' ? (
                      <Wallet className="w-5 h-5" />
                    ) : mission.actionType === 'register' ? (
                      <Tag className="w-5 h-5" />
                    ) : mission.actionType === 'explore' ? (
                      <Compass className="w-5 h-5" />
                    ) : (
                      <ShoppingBag className="w-5 h-5" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {mission.title}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          mission.rewardType === 'discount'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                        }`}
                      >
                        🎁 {mission.rewardLabel}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {mission.description}
                    </p>

                    {/* Mission progress status note */}
                    <div className="mt-2 flex items-center gap-1.5 text-[11px]">
                      {isClaimed ? (
                        <span className="text-slate-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Hadiah sudah berhasil diklaim
                        </span>
                      ) : isCompleted ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                          <Sparkles className="w-3.5 h-3.5" /> Selesai & Terverifikasi Sistem! Siap diklaim
                        </span>
                      ) : (
                        <span className="text-rose-500 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> Tekan 'Go' untuk menuju tempat pengerjaan misi
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Tombol Go atau Tombol Klaim */}
                <div className="w-full sm:w-auto shrink-0 flex items-center justify-end">
                  {isClaimed ? (
                    <button
                      disabled
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 text-xs font-bold cursor-not-allowed flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Selesai</span>
                    </button>
                  ) : isCompleted ? (
                    /* TOMBOL KLAIM SESUAI INSTRUKSI SETELAH MISI SELESAI */
                    <button
                      onClick={() => claimMissionReward(mission.id)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 animate-bounce"
                    >
                      <Gift className="w-4 h-4" />
                      <span>KLAIM SEKARANG</span>
                    </button>
                  ) : (
                    /* TOMBOL GO SEBELUM MISI SELESAI UNTUK LANGSUNG KE TEMPAT PENGERJAAN */
                    <button
                      onClick={() => executeMissionAction(mission)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-rose-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 group"
                    >
                      <span>Go</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>💡 Sistem otomatis mengecek mutasi dan aktivitas akun secara real-time.</span>
          <button
            onClick={() => setIsDailyMissionModalOpen(false)}
            className="font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
