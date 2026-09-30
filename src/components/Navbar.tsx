import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, X, ArrowUpRight } from 'lucide-react';
import { AppNotification } from '../types';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string, param?: string) => void;
  onOpenSearch: () => void;
  notifications: AppNotification[];
  onToggleNotificationDropdown: () => void;
  isNotificationOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
  notifications,
  onToggleNotificationDropdown,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { label: 'Explore', route: 'explore' },
    { label: 'Skills', route: 'skills' },
    { label: 'Players', route: 'players' },
    { label: 'Coaches', route: 'coaches' },
    { label: 'Venues', route: 'venues' },
    { label: 'Journey', route: 'journey' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090C]/85 backdrop-blur-xl border-b border-white/[0.07] py-3.5 shadow-2xl shadow-black/40'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => onNavigate('home')}
            className="text-xl sm:text-2xl font-extrabold tracking-tighter text-white font-display flex items-center group cursor-pointer focus:outline-none"
          >
            <span>SKILL</span>
            <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">EARN</span>
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => onNavigate(link.route)}
                  className={`text-sm font-medium transition-all relative py-1 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-cyan-300 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Command Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-cyan-500/30 text-xs text-slate-300 transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono text-slate-500 bg-white/[0.05] px-1 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onToggleNotificationDropdown}
              aria-label="Notifications"
              className="relative p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-[10px] font-bold text-black rounded-full flex items-center justify-center font-mono ring-2 ring-[#08090C]">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dashboard shortcut / Start Teaching CTA */}
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                currentRoute === 'dashboard'
                  ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/10'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => onNavigate('teach')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white transition-all shadow-md shadow-cyan-500/20 cursor-pointer whitespace-nowrap"
            >
              <span>Teach a Skill</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-slate-300 hover:text-white cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-xl bg-[#0F121C] border border-white/10 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
            {navLinks.map(link => (
              <button
                key={link.route}
                onClick={() => {
                  onNavigate(link.route);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentRoute === link.route
                    ? 'bg-cyan-500/10 text-cyan-300'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  onNavigate('teach');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              >
                Start Teaching
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
