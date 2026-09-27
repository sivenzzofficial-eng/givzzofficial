export interface WebItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'AI & Tools' | 'Game & Fun' | 'E-Commerce' | 'Portfolio' | 'Utilities';
  image: string;
  badge?: string;
  featured?: boolean;
  clicks?: number;
  addedDate?: string;
}

export interface GpayTransaction {
  id: string;
  type: 'topup' | 'purchase' | 'refund' | 'transfer' | 'reward';
  title: string;
  description: string;
  amount: number;
  date: string;
  status: 'Berhasil' | 'Diproses' | 'Gagal';
  referenceId: string;
  category: string;
}

export interface GstoreProduct {
  id: string;
  name: string;
  category: 'Game' | 'Streaming' | 'Voucher' | 'Pulsa & Data';
  price: number;
  image: string;
  popular?: boolean;
  description: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  username: string;
  role: 'user' | 'vip' | 'admin';
  ipAddress: string;
  saldoGpay: number;
  isBlocked: boolean;
  blockedReason?: string;
  registeredDate: string;
  avatar: string;
  isRegisteredAccount?: boolean;
  hasDiscount20?: boolean;
}

export interface SystemAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'info' | 'warning' | 'promo';
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  rewardType: 'saldo' | 'discount';
  rewardAmount: number;
  rewardLabel: string;
  isCompleted: boolean;
  isClaimed: boolean;
  actionType: 'topup' | 'register' | 'explore' | 'gstore';
  actionTarget: string;
}

export interface PaymentOrder {
  id: string;
  type: 'topup' | 'purchase';
  productName: string;
  amount: number;
  method: string;
  category: string;
  createdAt: number;
}
