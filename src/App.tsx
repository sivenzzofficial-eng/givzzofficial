/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { WelcomeModal } from './components/WelcomeModal';
import { GpayModal } from './components/GpayModal';
import { GstoreModal } from './components/GstoreModal';
import { TransactionsModal } from './components/TransactionsModal';
import { ProfileModal } from './components/ProfileModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AdminPanel } from './components/AdminPanel';
import { BlockedScreen } from './components/BlockedScreen';
import { NotificationToast } from './components/NotificationToast';
import { DailyMissionModal } from './components/DailyMissionModal';
import { RegisterModal } from './components/RegisterModal';
import { PaymentGatewayScreen } from './components/PaymentGatewayScreen';

const AppContent: React.FC = () => {
  const { currentUser, isAdminView, isPaymentScreenActive } = useApp();

  // Screen switch to WhatsApp Payment Gateway when active
  if (isPaymentScreenActive) {
    return (
      <>
        <PaymentGatewayScreen />
        <NotificationToast />
      </>
    );
  }

  // Screen switch to Admin Panel when authenticated
  if (isAdminView) {
    return (
      <>
        <AdminPanel />
        <NotificationToast />
      </>
    );
  }

  // If user or IP is blocked by Admin Givzz
  if (currentUser.isBlocked) {
    return (
      <>
        <BlockedScreen />
        <AdminAuthModal />
        <NotificationToast />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-blue-600 selection:text-white">
      {/* Navbar with Daily Mission, Gpay balance, profile menu, dark mode toggle & push notification bell */}
      <Navbar />

      {/* Main Dashboard with instant search filter, big website cards & bottom Panel Admin button */}
      <Dashboard />

      {/* Initial Modern Pop-up Welcome Modal */}
      <WelcomeModal />

      {/* Daily Mission Modal with Go and Klaim states */}
      <DailyMissionModal />

      {/* Register Account Modal (for mission 20% discount) */}
      <RegisterModal />

      {/* Gpay Dompet & Top Up Modal */}
      <GpayModal />

      {/* Gstore Digital Marketplace with Gpay payment & 20% discount support */}
      <GstoreModal />

      {/* Detail Transactions History Modal */}
      <TransactionsModal />

      {/* Profile & Customization Preferences Modal */}
      <ProfileModal />

      {/* Secret Admin Authentication Modal (No public key leak) */}
      <AdminAuthModal />

      {/* Real-time Push Notification Floating Toast */}
      <NotificationToast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
