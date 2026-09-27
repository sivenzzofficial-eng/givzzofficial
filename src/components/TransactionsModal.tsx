import React, { useState } from 'react';
import { X, History, ArrowDownLeft, ArrowUpRight, Search, Download, CheckCircle2, Receipt, Calendar, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GpayTransaction } from '../types';

export const TransactionsModal: React.FC = () => {
  const { isTransactionsModalOpen, setIsTransactionsModalOpen, transactions, saldoGpay } = useApp();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTx, setSearchTx] = useState<string>('');
  const [selectedReceipt, setSelectedReceipt] = useState<GpayTransaction | null>(null);

  if (!isTransactionsModalOpen) return null;

  const filtered = transactions.filter((tx) => {
    const matchesFilter = filterType === 'all' ? true : tx.type === filterType;
    const matchesSearch =
      tx.title.toLowerCase().includes(searchTx.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTx.toLowerCase()) ||
      tx.referenceId.toLowerCase().includes(searchTx.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-800 dark:text-slate-100">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-xl">Riwayat Transaksi Gpay</h2>
              <p className="text-xs text-purple-100">Lacak seluruh pemasukan dan pengeluaran secara transparan</p>
            </div>
          </div>
          <button
            onClick={() => setIsTransactionsModalOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            {['all', 'topup', 'purchase'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize cursor-pointer transition-colors ${
                  filterType === t
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {t === 'all' ? 'Semua' : t === 'topup' ? 'Top Up (+)' : 'Pembelian (-)'}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari ID transaksi, nama..."
              value={searchTx}
              onChange={(e) => setSearchTx(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Transactions List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <History className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium">Tidak ada data transaksi yang cocok</p>
            </div>
          ) : (
            filtered.map((tx) => {
              const isTopUp = tx.type === 'topup';
              return (
                <div
                  key={tx.id}
                  onClick={() => setSelectedReceipt(tx)}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/90 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isTopUp
                          ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                      }`}
                    >
                      {isTopUp ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                          {tx.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {tx.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span>{tx.date}</span>
                        <span>•</span>
                        <span>{tx.description}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div
                      className={`font-black text-sm sm:text-base ${
                        isTopUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {isTopUp ? '+' : '-'}Rp {tx.amount.toLocaleString('id-ID')}
                    </div>
                    <div className="flex items-center justify-end gap-1 text-[11px] text-emerald-500 font-semibold mt-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{tx.status}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Invoice / Receipt Detail View */}
        {selectedReceipt && (
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-purple-500" />
              <span>
                Faktur: <span className="font-mono font-bold">{selectedReceipt.referenceId}</span> | Saldo Dompet Gpay Sekarang: <span className="font-bold text-blue-500">Rp {saldoGpay.toLocaleString('id-ID')}</span>
              </span>
            </div>
            <button
              onClick={() => setSelectedReceipt(null)}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline cursor-pointer"
            >
              Tutup Rincian
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Menampilkan {filtered.length} riwayat mutasi dompet</span>
          <button
            onClick={() => setIsTransactionsModalOpen(false)}
            className="font-semibold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
