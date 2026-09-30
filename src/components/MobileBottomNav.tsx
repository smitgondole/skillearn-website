import React from 'react';
import { Home, Compass, Calendar, MessageSquare, User } from 'lucide-react';

interface MobileBottomNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  unreadMessagesCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentRoute,
  onNavigate,
  unreadMessagesCount,
}) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'dashboard', label: 'Bookings', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadMessagesCount },
    { id: 'progress', label: 'Profile', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F121C]/90 backdrop-blur-xl border-t border-white/10 px-2 py-2 flex items-center justify-around shadow-2xl">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = currentRoute === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {tab.badge && tab.badge > 0 ? (
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-cyan-500 text-[9px] font-bold text-black rounded-full flex items-center justify-center font-mono">
                  {tab.badge}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] mt-1">{tab.label}</span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-cyan-400 mt-0.5" />
            )}
          </button>
        );
      })}
    </div>
  );
};
