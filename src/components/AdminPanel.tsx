import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, Users, Wallet, Globe, Lock, KeyRound, 
  Trash2, RotateCcw, Ban, CheckCircle2, Search, Plus, ArrowLeft, 
  AlertTriangle, DollarSign, Activity, Eye, ShieldX, Terminal, RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserAccount } from '../types';

export const AdminPanel: React.FC = () => {
  const {
    logoutAdmin,
    allUsers,
    deleteUser,
    resetUserPassword,
    toggleBlockUser,
    updateUserBalance,
    blockedIps,
    blockIpManually,
    unblockIp,
    websites,
    addWebsite,
    deleteWebsite,
    transactions,
    currentUser,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'users' | 'security' | 'transactions' | 'websites'>('users');
  const [searchUser, setSearchUser] = useState('');
  const [selectedUserForBalance, setSelectedUserForBalance] = useState<UserAccount | null>(null);
  const [newBalanceInput, setNewBalanceInput] = useState<string>('');
  
  // IP blocking state
  const [manualIp, setManualIp] = useState('');
  const [manualReason, setManualReason] = useState('Indikasi penipuan dan pelanggaran keamanan');

  // Add website state
  const [showAddWebModal, setShowAddWebModal] = useState(false);
  const [webTitle, setWebTitle] = useState('');
  const [webDesc, setWebDesc] = useState('');
  const [webUrl, setWebUrl] = useState('');
  const [webCategory, setWebCategory] = useState<'AI & Tools' | 'Game & Fun' | 'E-Commerce' | 'Portfolio' | 'Utilities'>('AI & Tools');
  const [webImage, setWebImage] = useState('');
  const [webBadge, setWebBadge] = useState('New ✨');

  // Filter users
  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.email.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.username.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.ipAddress.toLowerCase().includes(searchUser.toLowerCase())
  );

  // Stats calculation
  const totalBalance = allUsers.reduce((sum, u) => sum + u.saldoGpay, 0);
  const activeCount = allUsers.filter((u) => !u.isBlocked).length;
  const blockedCount = allUsers.filter((u) => u.isBlocked).length;

  const handleUpdateBalance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForBalance) return;
    const val = parseInt(newBalanceInput, 10);
    if (isNaN(val) || val < 0) {
      alert('Masukkan nominal saldo yang valid');
      return;
    }
    updateUserBalance(selectedUserForBalance.id, val);
    setSelectedUserForBalance(null);
    setNewBalanceInput('');
  };

  const handleAddWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!webTitle || !webUrl) {
      alert('Nama dan link URL web wajib diisi!');
      return;
    }

    addWebsite({
      title: webTitle,
      description: webDesc || 'Website inovatif buatan Givzz Ecosystem.',
      url: webUrl.startsWith('http') ? webUrl : `https://${webUrl}`,
      category: webCategory,
      image: webImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      badge: webBadge,
      featured: true,
    });

    setWebTitle('');
    setWebDesc('');
    setWebUrl('');
    setWebImage('');
    setShowAddWebModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-500 shadow-md shadow-rose-950">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg text-white">
                Panel Admin Givzz
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                MASTER ROOT ACCESS
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Pemantauan Data Pengguna Real-time & Sistem Pertahanan IP
            </p>
          </div>
        </div>

        {/* Exit Admin Button */}
        <button
          onClick={logoutAdmin}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-bold text-slate-200 border border-slate-700 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard</span>
        </button>
      </header>

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Total Pengguna
                </span>
                <div className="text-2xl font-black text-white mt-1">
                  {allUsers.length} <span className="text-xs font-normal text-slate-500">akun</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 text-xs text-emerald-400 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> {activeCount} Pengguna Berstatus Aktif
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Total Saldo Gpay
                </span>
                <div className="text-2xl font-black text-white mt-1">
                  Rp {totalBalance.toLocaleString('id-ID')}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-400">
              Total saldo beredar di ekosistem
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Akun & IP Terblokir
                </span>
                <div className="text-2xl font-black text-rose-400 mt-1">
                  {blockedCount} Akun / {blockedIps.length} IP
                </div>
              </div>
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
                <Ban className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 text-xs text-rose-400/90 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Anti-Fraud Defense Aktif
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Katalog Website
                </span>
                <div className="text-2xl font-black text-white mt-1">
                  {websites.length} <span className="text-xs font-normal text-slate-500">situs</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                <Globe className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 text-xs text-purple-400">
              Daftar situs buatan Givzz
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'users'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-950'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Manajemen Pengguna ({allUsers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'security'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-950'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldX className="w-4 h-4" />
            <span>IP Blacklist & Keamanan ({blockedIps.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'transactions'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-950'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Audit Transaksi Real-time ({transactions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('websites')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'websites'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-950'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Kelola Web Givzz ({websites.length})</span>
          </button>
        </div>

        {/* TAB 1: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Search & Action bar */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama, email, username, atau IP..."
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="text-xs text-slate-400">
                Admin dapat mendelete akun, mereset password, dan memblokir pengguna (blokir IP)
              </div>
            </div>

            {/* Users Table */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                    <tr>
                      <th className="py-3.5 px-4">Pengguna</th>
                      <th className="py-3.5 px-4">Alamat IP (Real-time)</th>
                      <th className="py-3.5 px-4">Saldo Gpay</th>
                      <th className="py-3.5 px-4">Status Akun</th>
                      <th className="py-3.5 px-4">Terdaftar</th>
                      <th className="py-3.5 px-4 text-right">Tindakan Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500">
                          Tidak ditemukan pengguna yang cocok
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                          {/* User info */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-9 h-9 rounded-xl object-cover border border-slate-700 shrink-0"
                              />
                              <div>
                                <div className="font-bold text-white flex items-center gap-1.5">
                                  <span>{user.name}</span>
                                  {user.id === currentUser.id && (
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                      Anda
                                    </span>
                                  )}
                                </div>
                                <div className="text-slate-400 text-[11px]">{user.email}</div>
                                <div className="text-slate-500 text-[10px] font-mono">{user.username}</div>
                              </div>
                            </div>
                          </td>

                          {/* IP Address */}
                          <td className="py-3 px-4 font-mono text-slate-300">
                            <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800">
                              {user.ipAddress}
                            </span>
                          </td>

                          {/* Saldo Gpay */}
                          <td className="py-3 px-4">
                            <div className="font-bold text-emerald-400">
                              Rp {user.saldoGpay.toLocaleString('id-ID')}
                            </div>
                            <button
                              onClick={() => {
                                setSelectedUserForBalance(user);
                                setNewBalanceInput(user.saldoGpay.toString());
                              }}
                              className="text-[10px] text-blue-400 hover:underline cursor-pointer"
                            >
                              Edit Saldo
                            </button>
                          </td>

                          {/* Status */}
                          <td className="py-3 px-4">
                            {user.isBlocked ? (
                              <div>
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                                  <Ban className="w-3 h-3" /> DIBLOKIR / BAN IP
                                </span>
                                {user.blockedReason && (
                                  <div className="text-[10px] text-rose-400/80 mt-0.5 line-clamp-1">
                                    {user.blockedReason}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                <CheckCircle2 className="w-3 h-3" /> AKTIF
                              </span>
                            )}
                          </td>

                          {/* Date */}
                          <td className="py-3 px-4 text-slate-400 text-[11px]">
                            {user.registeredDate}
                          </td>

                          {/* Actions: Block IP, Reset PW, Delete */}
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* 1. Reset Password */}
                              <button
                                onClick={() => {
                                  const temp = resetUserPassword(user.id);
                                  alert(`Password untuk ${user.name} berhasil direset menjadi: ${temp}`);
                                }}
                                title="Reset Password Pengguna"
                                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-colors cursor-pointer"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>

                              {/* 2. Block/Unblock User & IP */}
                              <button
                                onClick={() => toggleBlockUser(user.id)}
                                title={user.isBlocked ? 'Buka Blokir (Unblock)' : 'Blokir Pengguna & Blokir IP'}
                                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                                  user.isBlocked
                                    ? 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border-emerald-500/30'
                                    : 'bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border-rose-500/30'
                                }`}
                              >
                                <Ban className="w-3.5 h-3.5" />
                              </button>

                              {/* 3. Delete Account */}
                              <button
                                onClick={() => {
                                  if (confirm(`Apakah Anda yakin ingin MENGHAPUS PERMANEN akun "${user.name}"?`)) {
                                    deleteUser(user.id);
                                  }
                                }}
                                title="Hapus Akun Pengguna"
                                className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-800/60 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SECURITY & IP BLACKLIST */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="font-bold text-base text-white flex items-center gap-2 mb-2">
                <ShieldX className="w-5 h-5 text-rose-500" />
                <span>Blokir Alamat IP Manual (Fraud / Scam Prevention)</span>
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Setiap IP yang dimasukkan ke dalam daftar ini akan langsung dilarang mengakses halaman web Givzz.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Contoh: 192.168.1.1 atau 36.88.241.119"
                  value={manualIp}
                  onChange={(e) => setManualIp(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Alasan pemblokiran..."
                  value={manualReason}
                  onChange={(e) => setManualReason(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (!manualIp) {
                      alert('Masukkan alamat IP!');
                      return;
                    }
                    blockIpManually(manualIp, manualReason);
                    setManualIp('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Ban className="w-4 h-4" />
                  <span>Blokir IP Ini</span>
                </button>
              </div>
            </div>

            {/* List of Blocked IPs */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
              <h4 className="font-bold text-sm text-slate-200">
                Daftar IP Terblokir ({blockedIps.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {blockedIps.map((ip) => (
                  <div
                    key={ip}
                    className="p-3.5 rounded-xl bg-slate-950 border border-rose-900/40 flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-mono text-xs font-bold text-rose-400">{ip}</div>
                      <div className="text-[10px] text-slate-500">Status: Forbidden</div>
                    </div>
                    <button
                      onClick={() => unblockIp(ip)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      Buka Blokir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TRANSACTION AUDIT */}
        {activeTab === 'transactions' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">Log Transaksi Sistem Real-time</h3>
              <span className="text-xs text-slate-400">{transactions.length} mutasi tercatat</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">ID Transaksi</th>
                    <th className="py-3 px-4">Deskripsi</th>
                    <th className="py-3 px-4">Nominal</th>
                    <th className="py-3 px-4">Waktu</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-4 font-mono text-purple-400">{tx.id}</td>
                      <td className="py-2.5 px-4 text-slate-200">
                        <div className="font-bold">{tx.title}</div>
                        <div className="text-[10px] text-slate-500">{tx.description}</div>
                      </td>
                      <td className="py-2.5 px-4 font-bold text-slate-200">
                        Rp {tx.amount.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-4 text-slate-400">{tx.date}</td>
                      <td className="py-2.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: WEBSITES MANAGEMENT */}
        {activeTab === 'websites' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="font-bold text-base text-white">Daftar Website Karya Givzz</h3>
                <p className="text-xs text-slate-400">
                  Website yang muncul di Pop-up dan di Dashboard
                </p>
              </div>
              <button
                onClick={() => setShowAddWebModal(true)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Website Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {websites.map((web) => (
                <div
                  key={web.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                      <img src={web.image} alt={web.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">
                        {web.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-white">{web.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{web.description}</p>
                    <a
                      href={web.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-blue-400 hover:underline mt-2 block truncate"
                    >
                      {web.url}
                    </a>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">ID: {web.id}</span>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus website "${web.title}" dari katalog?`)) {
                          deleteWebsite(web.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 text-xs transition-colors cursor-pointer"
                      title="Hapus website"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Edit Balance Modal */}
      {selectedUserForBalance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl">
            <h3 className="font-bold text-base mb-1">Ubah Saldo Gpay Pengguna</h3>
            <p className="text-xs text-slate-400 mb-4">{selectedUserForBalance.name} ({selectedUserForBalance.username})</p>

            <form onSubmit={handleUpdateBalance} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nominal Saldo Baru (Rp)</label>
                <input
                  type="number"
                  value={newBalanceInput}
                  onChange={(e) => setNewBalanceInput(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm font-bold text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedUserForBalance(null)}
                  className="px-3 py-2 rounded-xl bg-slate-800 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                >
                  Simpan Saldo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Website Modal */}
      {showAddWebModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl space-y-4">
            <h3 className="font-bold text-base">Tambah Website Baru ke Katalog Givzz</h3>

            <form onSubmit={handleAddWebsite} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nama Website</label>
                <input
                  type="text"
                  placeholder="Contoh: Givzz AI Writer"
                  value={webTitle}
                  onChange={(e) => setWebTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Link URL Website</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={webUrl}
                  onChange={(e) => setWebUrl(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Deskripsi Singkat</label>
                <textarea
                  placeholder="Deskripsi fungsi website..."
                  value={webDesc}
                  onChange={(e) => setWebDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs h-18 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Kategori</label>
                  <select
                    value={webCategory}
                    onChange={(e) => setWebCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs"
                  >
                    <option value="AI & Tools">AI & Tools</option>
                    <option value="Game & Fun">Game & Fun</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="Utilities">Utilities</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Badge</label>
                  <input
                    type="text"
                    placeholder="Hot 🔥 / New ✨"
                    value={webBadge}
                    onChange={(e) => setWebBadge(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">URL Gambar Preview (Opsional)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={webImage}
                  onChange={(e) => setWebImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddWebModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                >
                  Simpan & Publikasikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
