import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Bell, X } from 'lucide-react';
import { useApp, PushNotification } from '../context/AppContext';

export const NotificationToast: React.FC = () => {
  const { notifications } = useApp();
  const [visibleNotif, setVisibleNotif] = useState<PushNotification | null>(notifications[0] || null);

  useEffect(() => {
    if (notifications.length > 0) {
      setVisibleNotif(notifications[0]);
      const timer = setTimeout(() => {
        setVisibleNotif(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  if (!visibleNotif) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-auto">
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex items-start gap-3 text-slate-800 dark:text-slate-100">
        <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 shrink-0 mt-0.5">
          {visibleNotif.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          {visibleNotif.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-500" />}
          {visibleNotif.type === 'info' && <Bell className="w-5 h-5 text-blue-500" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
              {visibleNotif.title}
            </h4>
            <span className="text-[10px] text-slate-400">
              {visibleNotif.timestamp}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
            {visibleNotif.message}
          </p>
        </div>

        <button
          onClick={() => setVisibleNotif(null)}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
