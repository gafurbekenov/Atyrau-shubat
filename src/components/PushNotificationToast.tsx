import React from 'react';
import { Bell, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PushNotificationToast: React.FC = () => {
  const { activeToast, dismissToast } = useApp();

  if (!activeToast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-300">
      <div className="p-4 bg-stone-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-amber-600/30 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-600/30 text-amber-400 shrink-0 mt-0.5">
            <Bell className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                Атырау Шұбат · Push
              </span>
            </div>
            <p className="font-bold text-xs text-white mt-0.5">{activeToast.title}</p>
            <p className="text-xs text-stone-300 mt-1 leading-relaxed">
              {activeToast.message}
            </p>
          </div>
        </div>

        <button
          onClick={dismissToast}
          className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
