import React, { createContext, useContext, useState, useEffect } from 'react';
import { WebItem, GpayTransaction, UserAccount, SystemAnnouncement, DailyMission, PaymentOrder } from '../types';
import { INITIAL_WEBSITES } from '../data/websites';
import { INITIAL_DAILY_MISSIONS } from '../data/missions';

// Audio feedback using Web Audio API
const playTone = (type: 'success' | 'alert' | 'click' | 'block' | 'mission') => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'mission') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
      osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'alert') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'block') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    }
  } catch (e) {
    console.debug('Web Audio not allowed before user gesture or unavailable', e);
  }
};

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  timestamp: string;
  read?: boolean;
}

interface AppContextType {
  // Website catalog
  websites: WebItem[];
  addWebsite: (item: Omit<WebItem, 'id' | 'clicks' | 'addedDate'>) => void;
  deleteWebsite: (id: string) => void;

  // Welcome modal
  isWelcomeOpen: boolean;
  setIsWelcomeOpen: (open: boolean) => void;

  // Announcement
  announcement: SystemAnnouncement;
  setAnnouncement: React.Dispatch<React.SetStateAction<SystemAnnouncement>>;

  // Dark mode
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Current User
  currentUser: UserAccount;
  updateCurrentUser: (updates: Partial<UserAccount>) => void;
  registerAccount: (name: string, email: string, username: string) => void;

  // Admin Master Keys & View
  adminKey1: string;
  adminKey2: string;
  isAdminLoggedIn: boolean;
  loginAdmin: (k1: string, k2: string) => boolean;
  logoutAdmin: () => void;
  isAdminView: boolean;
  setIsAdminView: (v: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;

  // Admin User Management
  allUsers: UserAccount[];
  deleteUser: (userId: string) => void;
  resetUserPassword: (userId: string) => string;
  toggleBlockUser: (userId: string, reason?: string) => void;
  updateUserBalance: (userId: string, newBalance: number) => void;
  blockedIps: string[];
  blockIpManually: (ip: string, reason: string) => void;
  unblockIp: (ip: string) => void;

  // Gpay & Transactions
  saldoGpay: number;
  transactions: GpayTransaction[];
  topUpGpay: (amount: number, method: string) => void;
  payWithGpay: (amount: number, itemTitle: string, category: string) => boolean;
  hasDiscount20: boolean;
  
  // WhatsApp Payment Gateway (Screen Switch)
  activePaymentOrder: PaymentOrder | null;
  isPaymentScreenActive: boolean;
  startWhatsAppPayment: (order: Omit<PaymentOrder, 'id' | 'createdAt'>) => void;
  cancelWhatsAppPayment: () => void;
  completeWhatsAppPayment: (verifiedTrxId: string) => void;
  completedPaymentResult: { order: PaymentOrder; trxId: string } | null;
  clearCompletedPaymentResult: () => void;

  // Daily Missions
  dailyMissions: DailyMission[];
  unclaimedMissionsCount: number;
  markMissionCompleted: (actionType: 'topup' | 'register' | 'explore' | 'gstore') => void;
  claimMissionReward: (missionId: string) => void;
  executeMissionAction: (mission: DailyMission) => void;
  isDailyMissionModalOpen: boolean;
  setIsDailyMissionModalOpen: (open: boolean) => void;

  // Modals & UI Viewers
  isGpayModalOpen: boolean;
  setIsGpayModalOpen: (open: boolean) => void;
  isGstoreModalOpen: boolean;
  setIsGstoreModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  isTransactionsModalOpen: boolean;
  setIsTransactionsModalOpen: (open: boolean) => void;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (open: boolean) => void;

  // Push Notifications
  notifications: PushNotification[];
  addPushNotification: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  clearNotifications: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('givzz_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('givzz_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('givzz_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Websites
  const [websites, setWebsites] = useState<WebItem[]>(() => {
    const saved = localStorage.getItem('givzz_websites');
    return saved ? JSON.parse(saved) : INITIAL_WEBSITES;
  });

  useEffect(() => {
    localStorage.setItem('givzz_websites', JSON.stringify(websites));
  }, [websites]);

  const addWebsite = (item: Omit<WebItem, 'id' | 'clicks' | 'addedDate'>) => {
    const newItem: WebItem = {
      ...item,
      id: `web-${Date.now()}`,
      clicks: 0,
      addedDate: new Date().toISOString().split('T')[0],
    };
    setWebsites((prev) => [newItem, ...prev]);
    addPushNotification('Website Berhasil Ditambahkan', `Website "${item.title}" sekarang aktif di direktori Givzz.`, 'success');
  };

  const deleteWebsite = (id: string) => {
    setWebsites((prev) => prev.filter((w) => w.id !== id));
    addPushNotification('Website Dihapus', 'Website telah dihapus dari direktori.', 'info');
  };

  // Welcome modal
  const [isWelcomeOpen, setIsWelcomeOpen] = useState<boolean>(true);

  // Announcement
  const [announcement, setAnnouncement] = useState<SystemAnnouncement>({
    id: 'ann-1',
    title: '📢 PENGUMUMAN RESMI GIVZZ ECOSYSTEM',
    content: 'Selamat datang di Hub Website Resmi Givzz! Pembayaran via WhatsApp (QRIS / DANA / Transfer) kini aktif dengan verifikasi aman 10 menit.',
    date: '2026-09-26',
    type: 'info',
  });

  // Search & Category
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Sound option
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Push Notifications
  const [notifications, setNotifications] = useState<PushNotification[]>([
    {
      id: 'notif-init',
      title: 'Selamat Datang di Givzz Hub!',
      message: 'Selesaikan Daily Mission untuk mendapatkan bonus saldo Gpay dan Diskon 20%!',
      type: 'info',
      timestamp: 'Baru saja',
    },
  ]);

  const addPushNotification = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const newNotif: PushNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    setNotifications((prev) => [newNotif, ...prev.slice(0, 19)]);

    if (soundEnabled) {
      if (type === 'success') playTone('success');
      else if (type === 'warning') playTone('alert');
      else playTone('click');
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, { body: message, icon: '/favicon.ico' });
      } catch (e) {
        console.debug(e);
      }
    }
  };

  const clearNotifications = () => setNotifications([]);

  // BUG SALDO GRATIS DIHAPUS: Saldo awal user baru HARUS Rp 0!
  const [currentUser, setCurrentUser] = useState<UserAccount>(() => {
    const saved = localStorage.getItem('givzz_current_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Jika sebelumnya kena bug saldo demo 100k/250k pada guest, reset ke 0
        if (parsed.name === 'Givzz Guest User' && (parsed.saldoGpay === 100000 || parsed.saldoGpay === 250000)) {
          parsed.saldoGpay = 0;
        }
        return parsed;
      } catch (e) {
        console.debug(e);
      }
    }
    return {
      id: 'usr-givzz-01',
      name: 'Givzz Guest User',
      email: 'guest@givzz.hub',
      username: '@givzz_guest',
      role: 'user',
      ipAddress: '182.253.112.45 (Jakarta, ID)',
      saldoGpay: 0, // Saldo awal murni Rp 0!
      isBlocked: false,
      registeredDate: '2026-09-26',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      isRegisteredAccount: false,
      hasDiscount20: false,
    };
  });

  const saldoGpay = currentUser.saldoGpay;
  const hasDiscount20 = !!currentUser.hasDiscount20;

  useEffect(() => {
    localStorage.setItem('givzz_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const updateCurrentUser = (updates: Partial<UserAccount>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
  };

  // Transactions: Bersih dari saldo bonus demo gratis
  const [transactions, setTransactions] = useState<GpayTransaction[]>(() => {
    const saved = localStorage.getItem('givzz_transactions');
    if (saved) {
      try {
        const parsed: GpayTransaction[] = JSON.parse(saved);
        // Filter out initial fake bonus that inflated saldo
        return parsed.filter((t) => t.id !== 'GPAY-TX-88290');
      } catch (e) {
        console.debug(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('givzz_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // DAILY MISSIONS STATE
  const [dailyMissions, setDailyMissions] = useState<DailyMission[]>(() => {
    const saved = localStorage.getItem('givzz_daily_missions');
    return saved ? JSON.parse(saved) : INITIAL_DAILY_MISSIONS;
  });

  useEffect(() => {
    localStorage.setItem('givzz_daily_missions', JSON.stringify(dailyMissions));
  }, [dailyMissions]);

  const unclaimedMissionsCount = dailyMissions.filter((m) => m.isCompleted && !m.isClaimed).length;

  const markMissionCompleted = (actionType: 'topup' | 'register' | 'explore' | 'gstore') => {
    setDailyMissions((prev) =>
      prev.map((mission) => {
        if (mission.actionType === actionType && !mission.isCompleted) {
          addPushNotification(
            '🎯 Misi Selesai!',
            `Misi "${mission.title}" telah diverifikasi oleh sistem! Buka Daily Mission untuk KLAIM hadiahmu sekarang.`,
            'success'
          );
          if (soundEnabled) playTone('mission');
          return { ...mission, isCompleted: true };
        }
        return mission;
      })
    );
  };

  const claimMissionReward = (missionId: string) => {
    const targetMission = dailyMissions.find((m) => m.id === missionId);
    if (!targetMission || !targetMission.isCompleted || targetMission.isClaimed) return;

    if (targetMission.rewardType === 'saldo') {
      const rewardAmt = targetMission.rewardAmount;
      const newBal = currentUser.saldoGpay + rewardAmt;
      const txId = `GPAY-TX-${Math.floor(10000 + Math.random() * 90000)}`;

      const newTx: GpayTransaction = {
        id: txId,
        type: 'reward',
        title: `Klaim Misi: ${targetMission.title}`,
        description: `Hadiah misi harian Givzz Ecosystem`,
        amount: rewardAmt,
        date: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
        status: 'Berhasil',
        referenceId: `CLAIM-${Date.now().toString().slice(-6)}`,
        category: 'Reward',
      };

      setCurrentUser((prev) => ({ ...prev, saldoGpay: newBal }));
      setTransactions((prev) => [newTx, ...prev]);

      addPushNotification(
        '🎁 Hadiah Saldo Berhasil Diklaim!',
        `Bonus Rp ${rewardAmt.toLocaleString('id-ID')} telah ditambahkan ke dompet Gpay Anda! Total saldo: Rp ${newBal.toLocaleString('id-ID')}`,
        'success'
      );
    } else if (targetMission.rewardType === 'discount') {
      setCurrentUser((prev) => ({ ...prev, hasDiscount20: true }));

      addPushNotification(
        '🎉 Kupon Diskon 20% Aktif!',
        'Selamat! Diskon 20% sekarang aktif untuk semua transaksi & platform/web di Givzz Hub!',
        'success'
      );
    }

    setDailyMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, isClaimed: true } : m))
    );

    if (soundEnabled) playTone('success');
  };

  const executeMissionAction = (mission: DailyMission) => {
    setIsDailyMissionModalOpen(false);

    if (mission.actionTarget === 'gpay_modal') {
      setIsGpayModalOpen(true);
    } else if (mission.actionTarget === 'register_modal') {
      setIsRegisterModalOpen(true);
    } else if (mission.actionTarget === 'welcome_modal') {
      setIsWelcomeOpen(true);
    } else if (mission.actionTarget === 'gstore_modal') {
      setIsGstoreModalOpen(true);
    }
  };

  const registerAccount = (name: string, email: string, username: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      name,
      email,
      username: username.startsWith('@') ? username : `@${username}`,
      role: 'vip',
      isRegisteredAccount: true,
    }));

    markMissionCompleted('register');

    addPushNotification(
      'Akun Berhasil Didaftarkan!',
      `Selamat datang ${name}! Anda telah resmi terdaftar sebagai VIP Member Givzz Hub.`,
      'success'
    );
  };

  // WHATSAPP PAYMENT GATEWAY (SCREEN SWITCH)
  const [activePaymentOrder, setActivePaymentOrder] = useState<PaymentOrder | null>(null);
  const [completedPaymentResult, setCompletedPaymentResult] = useState<{ order: PaymentOrder; trxId: string } | null>(null);

  const isPaymentScreenActive = activePaymentOrder !== null;

  const startWhatsAppPayment = (orderData: Omit<PaymentOrder, 'id' | 'createdAt'>) => {
    // Tutup modal yang mungkin sedang terbuka agar fokus ke screen switch bayar
    setIsGpayModalOpen(false);
    setIsGstoreModalOpen(false);

    const newOrder: PaymentOrder = {
      ...orderData,
      id: `ORDER-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: Date.now(),
    };
    setActivePaymentOrder(newOrder);
    setCompletedPaymentResult(null);
  };

  const cancelWhatsAppPayment = () => {
    if (activePaymentOrder) {
      addPushNotification(
        'Pembayaran Dibatalkan',
        `Pesanan ${activePaymentOrder.productName} telah dibatalkan atau waktu pembayaran habis.`,
        'warning'
      );
    }
    setActivePaymentOrder(null);
  };

  const completeWhatsAppPayment = (verifiedTrxId: string) => {
    if (!activePaymentOrder) return;

    const order = activePaymentOrder;
    const nowStr = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });

    if (order.type === 'topup') {
      // Tambah saldo Gpay
      const newBal = currentUser.saldoGpay + order.amount;
      setCurrentUser((prev) => ({ ...prev, saldoGpay: newBal }));

      const newTx: GpayTransaction = {
        id: verifiedTrxId,
        type: 'topup',
        title: `Top Up Saldo Gpay via WA (${order.method})`,
        description: `Isi ulang saldo via WhatsApp Givzz`,
        amount: order.amount,
        date: nowStr,
        status: 'Berhasil',
        referenceId: `REF-${verifiedTrxId}`,
        category: 'Top Up',
      };
      setTransactions((prev) => [newTx, ...prev]);

      // Trigger daily mission topup
      markMissionCompleted('topup');

      addPushNotification(
        '🟢 Saldo Gpay Masuk!',
        `Top up Rp ${order.amount.toLocaleString('id-ID')} via WhatsApp berhasil diverifikasi! Saldo saat ini: Rp ${newBal.toLocaleString('id-ID')}`,
        'success'
      );
    } else {
      // Pembelian produk Gstore / Web
      const newTx: GpayTransaction = {
        id: verifiedTrxId,
        type: 'purchase',
        title: `Pembelian: ${order.productName}`,
        description: `Pembayaran via WhatsApp (${order.method})`,
        amount: order.amount,
        date: nowStr,
        status: 'Berhasil',
        referenceId: `REF-${verifiedTrxId}`,
        category: order.category || 'Pembelian',
      };
      setTransactions((prev) => [newTx, ...prev]);

      // Trigger daily mission gstore
      markMissionCompleted('gstore');

      addPushNotification(
        '💸 Pembayaran Berhasil!',
        `Pesanan "${order.productName}" senilai Rp ${order.amount.toLocaleString('id-ID')} berhasil diverifikasi!`,
        'success'
      );
    }

    if (soundEnabled) playTone('success');

    // Simpan hasil untuk popup sukses
    setCompletedPaymentResult({
      order,
      trxId: verifiedTrxId,
    });
    setActivePaymentOrder(null);
  };

  const clearCompletedPaymentResult = () => {
    setCompletedPaymentResult(null);
  };

  // Direct Gpay Top Up
  const topUpGpay = (amount: number, method: string) => {
    startWhatsAppPayment({
      type: 'topup',
      productName: `Top Up Saldo Gpay Rp ${amount.toLocaleString('id-ID')}`,
      amount,
      method,
      category: 'Top Up',
    });
  };

  // Direct Gpay Saldo Payment
  const payWithGpay = (originalAmount: number, itemTitle: string, category: string): boolean => {
    if (currentUser.isBlocked) {
      addPushNotification('Akses Dibatasi', 'Akun Anda sedang dibekukan oleh Admin Givzz.', 'warning');
      return false;
    }

    const effectiveAmount = hasDiscount20
      ? Math.round(originalAmount * 0.8)
      : originalAmount;

    if (currentUser.saldoGpay < effectiveAmount) {
      addPushNotification(
        'Saldo Tidak Cukup',
        `Saldo Gpay Anda (Rp ${currentUser.saldoGpay.toLocaleString('id-ID')}) kurang untuk transaksi Rp ${effectiveAmount.toLocaleString('id-ID')}. Anda dialihkan ke pembayaran via WA / QRIS.`,
        'warning'
      );
      // Auto divert to WhatsApp Payment Gateway!
      startWhatsAppPayment({
        type: 'purchase',
        productName: itemTitle,
        amount: effectiveAmount,
        method: 'QRIS / DANA via WhatsApp',
        category: category,
      });
      return false;
    }

    const txId = `GPAY-TX-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBalance = currentUser.saldoGpay - effectiveAmount;

    const newTx: GpayTransaction = {
      id: txId,
      type: 'purchase',
      title: hasDiscount20 ? `Pembelian: ${itemTitle} (Diskon 20%)` : `Pembelian: ${itemTitle}`,
      description: hasDiscount20
        ? `Hemat Rp ${(originalAmount - effectiveAmount).toLocaleString('id-ID')} berkat Kupon Diskon 20%`
        : `Pembayaran sukses di Gstore menggunakan Gpay`,
      amount: effectiveAmount,
      date: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
      status: 'Berhasil',
      referenceId: `GST-${Date.now().toString().slice(-8)}`,
      category: category,
    };

    setCurrentUser((prev) => ({ ...prev, saldoGpay: newBalance }));
    setTransactions((prev) => [newTx, ...prev]);

    addPushNotification(
      '💸 Pembayaran Gpay Berhasil!',
      `Pembelian "${itemTitle}" senilai Rp ${effectiveAmount.toLocaleString('id-ID')} sukses${hasDiscount20 ? ' (Diskon 20% terpakai!)' : ''}. Sisa saldo: Rp ${newBalance.toLocaleString('id-ID')}`,
      'success'
    );

    return true;
  };

  // All Users in the system (for Admin monitoring)
  const [allUsers, setAllUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('givzz_all_users');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'usr-givzz-01',
            name: 'Givzz User (Member)',
            email: 'givengiovano84@gmail.com',
            username: '@givzz_official',
            role: 'vip',
            ipAddress: '182.253.112.45',
            saldoGpay: 0,
            isBlocked: false,
            registeredDate: '2026-01-15',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          },
          {
            id: 'usr-02',
            name: 'Andi Saputra',
            email: 'andi.saputra@gmail.com',
            username: '@andisaputra',
            role: 'user',
            ipAddress: '114.125.78.201',
            saldoGpay: 0,
            isBlocked: false,
            registeredDate: '2026-02-10',
            avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
          },
          {
            id: 'usr-03',
            name: 'Budi Santoso (Suspect Fraud)',
            email: 'budi.fakeacc@tempmail.com',
            username: '@budi_cheat',
            role: 'user',
            ipAddress: '36.88.241.119',
            saldoGpay: 0,
            isBlocked: true,
            blockedReason: 'Spam exploit dan manipulasi transaksi saldo',
            registeredDate: '2026-03-01',
            avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
          },
          {
            id: 'usr-04',
            name: 'Siti Rahmawati',
            email: 'siti.rahma@yahoo.co.id',
            username: '@siti_r',
            role: 'user',
            ipAddress: '103.28.14.92',
            saldoGpay: 0,
            isBlocked: false,
            registeredDate: '2026-02-18',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem('givzz_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  // Blocked IPs
  const [blockedIps, setBlockedIps] = useState<string[]>(() => {
    const saved = localStorage.getItem('givzz_blocked_ips');
    return saved ? JSON.parse(saved) : ['36.88.241.119', '194.26.29.11'];
  });

  useEffect(() => {
    localStorage.setItem('givzz_blocked_ips', JSON.stringify(blockedIps));
  }, [blockedIps]);

  // Admin Master Keys - Strictly protected
  const adminKey1 = 'GIVZZ-2026';
  const adminKey2 = '889900';

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  const loginAdmin = (k1: string, k2: string): boolean => {
    const match = k1.trim() === adminKey1 && k2.trim() === adminKey2;
    if (match) {
      setIsAdminLoggedIn(true);
      setIsAdminView(true);
      setIsAdminModalOpen(false);
      addPushNotification('🛡️ Akses Admin Diberikan', 'Selamat datang di Panel Admin Givzz Real-time.', 'success');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setIsAdminView(false);
    addPushNotification('Akses Admin Selesai', 'Anda telah kembali ke tampilan Dashboard pengguna.', 'info');
  };

  const deleteUser = (userId: string) => {
    setAllUsers((prev) => prev.filter((u) => u.id !== userId));
    if (currentUser.id === userId) {
      setCurrentUser((prev) => ({ ...prev, isBlocked: true, blockedReason: 'Akun telah dihapus oleh Admin.' }));
    }
    addPushNotification('User Dihapus', `Akun ID ${userId} berhasil dihapus permanen dari sistem.`, 'info');
  };

  const resetUserPassword = (userId: string): string => {
    const tempPass = `Givzz#${Math.floor(1000 + Math.random() * 9000)}!`;
    addPushNotification(
      'Password Direset',
      `Password untuk ID ${userId} telah direset menjadi: ${tempPass}`,
      'info'
    );
    return tempPass;
  };

  const toggleBlockUser = (userId: string, reason = 'Pelanggaran kebijakan & aktivitas fraud terdeteksi') => {
    setAllUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const willBlock = !u.isBlocked;
          if (willBlock) {
            setBlockedIps((ips) => (ips.includes(u.ipAddress) ? ips : [...ips, u.ipAddress]));
          }
          return {
            ...u,
            isBlocked: willBlock,
            blockedReason: willBlock ? reason : undefined,
          };
        }
        return u;
      })
    );

    if (currentUser.id === userId) {
      const willBlock = !currentUser.isBlocked;
      setCurrentUser((prev) => ({
        ...prev,
        isBlocked: willBlock,
        blockedReason: willBlock ? reason : undefined,
      }));
      if (willBlock) {
        playTone('block');
      }
    }

    addPushNotification(
      'Status Pengguna Diperbarui',
      `Status blokir akun ${userId} berhasil diperbarui.`,
      'warning'
    );
  };

  const updateUserBalance = (userId: string, newBalance: number) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, saldoGpay: newBalance } : u))
    );
    if (currentUser.id === userId) {
      setCurrentUser((prev) => ({ ...prev, saldoGpay: newBalance }));
    }
    addPushNotification(
      'Saldo Diubah Admin',
      `Saldo akun ${userId} diubah menjadi Rp ${newBalance.toLocaleString('id-ID')}`,
      'info'
    );
  };

  const blockIpManually = (ip: string, reason: string) => {
    if (!blockedIps.includes(ip)) {
      setBlockedIps((prev) => [...prev, ip]);
    }
    if (currentUser.ipAddress.includes(ip)) {
      setCurrentUser((prev) => ({ ...prev, isBlocked: true, blockedReason: `IP ${ip} diblokir: ${reason}` }));
      playTone('block');
    }
    addPushNotification('IP Berhasil Diblokir', `IP ${ip} telah masuk dalam blacklist sistem Givzz.`, 'warning');
  };

  const unblockIp = (ip: string) => {
    setBlockedIps((prev) => prev.filter((item) => item !== ip));
    if (currentUser.ipAddress.includes(ip)) {
      setCurrentUser((prev) => ({ ...prev, isBlocked: false, blockedReason: undefined }));
    }
    addPushNotification('IP Di-unblock', `IP ${ip} telah diizinkan kembali mengakses sistem.`, 'success');
  };

  // Modals state
  const [isGpayModalOpen, setIsGpayModalOpen] = useState(false);
  const [isGstoreModalOpen, setIsGstoreModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false);
  const [isDailyMissionModalOpen, setIsDailyMissionModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        websites,
        addWebsite,
        deleteWebsite,
        isWelcomeOpen,
        setIsWelcomeOpen,
        announcement,
        setAnnouncement,
        isDarkMode,
        toggleDarkMode,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        currentUser,
        updateCurrentUser,
        registerAccount,
        adminKey1,
        adminKey2,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isAdminView,
        setIsAdminView,
        isAdminModalOpen,
        setIsAdminModalOpen,
        allUsers,
        deleteUser,
        resetUserPassword,
        toggleBlockUser,
        updateUserBalance,
        blockedIps,
        blockIpManually,
        unblockIp,
        saldoGpay,
        transactions,
        topUpGpay,
        payWithGpay,
        hasDiscount20,
        activePaymentOrder,
        isPaymentScreenActive,
        startWhatsAppPayment,
        cancelWhatsAppPayment,
        completeWhatsAppPayment,
        completedPaymentResult,
        clearCompletedPaymentResult,
        dailyMissions,
        unclaimedMissionsCount,
        markMissionCompleted,
        claimMissionReward,
        executeMissionAction,
        isDailyMissionModalOpen,
        setIsDailyMissionModalOpen,
        isGpayModalOpen,
        setIsGpayModalOpen,
        isGstoreModalOpen,
        setIsGstoreModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isTransactionsModalOpen,
        setIsTransactionsModalOpen,
        isRegisterModalOpen,
        setIsRegisterModalOpen,
        notifications,
        addPushNotification,
        clearNotifications,
        soundEnabled,
        setSoundEnabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
