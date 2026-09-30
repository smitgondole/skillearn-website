import React from 'react';
import { AppNotification } from '../types';
import { Calendar, Star, Trophy, CheckCheck, X } from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onNavigate: (route: string) => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'session':
        return <Calendar className="w-4 h-4 text-cyan-400" />;
      case 'review':
        return <Star className="w-4 h-4 text-amber-400" />;
      case 'skill':
        return <Trophy className="w-4 h-4 text-emerald-400" />;
      case 'booking':
        return <CheckCheck className="w-4 h-4 text-blue-400" />;
      default:
        return <Calendar className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed top-16 right-4 sm:right-8 z-50 w-[340px] sm:w-[380px] bg-[#0F121C]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="p-3.5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white">Notifications</span>
          <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
            {notifications.filter(n => !n.read).length} new
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onMarkAllAsRead}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Mark all read
          </button>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-h-[360px] overflow-y-auto divide-y divide-white/[0.04]">
        {notifications.map(notif => (
          <div
            key={notif.id}
            onClick={() => {
              onMarkAsRead(notif.id);
              if (notif.type === 'session') onNavigate('dashboard');
              if (notif.type === 'review') onNavigate('reviews');
              if (notif.type === 'skill') onNavigate('progress');
              if (notif.type === 'booking') onNavigate('dashboard');
              onClose();
            }}
            className={`p-3.5 transition-colors cursor-pointer flex gap-3 ${
              notif.read ? 'bg-transparent hover:bg-white/[0.03]' : 'bg-cyan-500/[0.06] hover:bg-cyan-500/[0.1]'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              {getIcon(notif.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-semibold text-white truncate">{notif.title}</span>
                <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.time}</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed line-clamp-2">
                {notif.description}
              </p>
            </div>
            {!notif.read && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 self-center" />
            )}
          </div>
        ))}
      </div>

      <div className="p-2.5 bg-black/40 border-t border-white/5 text-center">
        <button
          onClick={() => {
            onNavigate('dashboard');
            onClose();
          }}
          className="text-xs font-medium text-slate-300 hover:text-cyan-300 transition-colors"
        >
          View all scheduled sessions in Dashboard →
        </button>
      </div>
    </div>
  );
};
