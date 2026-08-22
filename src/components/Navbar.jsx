import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Compass,
  Menu,
  X,
  ArrowUpRight,
  User,
  LogIn,
  LogOut,
  ChevronDown,
  CheckCircle2,
  Bell,
  Sparkles,
  Calendar,
  Shuffle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ currentView, onNavigate, onOpenDemo }) {
  const { user, isAuthenticated, logout, openAuthModal, notifications, DEMO_PERSONAS, switchPersona } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Problem', href: '#problem' },
    { label: 'What is SportSphere', href: '#what-is' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Live Discovery', href: '#discovery-demo' },
    { label: 'Comparison', href: '#comparison' },
    { label: 'Vision', href: '#vision' },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const offsetPosition = elementRect - bodyRect - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const unreadCount = notifications ? notifications.filter((n) => !n.read).length : 0;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || currentView === 'profile'
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-navy-900 flex items-center justify-center text-sportsGreen transition-transform group-hover:scale-105 shadow-md shadow-navy-900/10">
              <Activity className="w-5 h-5 text-sportsGreen" />
            </div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-navy-900">
              Sport<span className="text-sportsGreen">Sphere</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-xs xl:text-sm font-bold text-slate-600 hover:text-navy-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Quick Switch Persona Pill Button */}
            <button
              onClick={() => openAuthModal('demo')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-navy-900 bg-slate-100 hover:bg-slate-200/80 transition-colors"
              title="1-Click switch athlete demo"
            >
              <Shuffle className="w-3.5 h-3.5 text-sportsOrange" />
              <span className="hidden xl:inline">Switch Athlete</span>
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 shadow-xs relative text-slate-600 hover:text-navy-900 transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sportsOrange text-white text-[10px] font-black flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 px-4 animate-slide-up z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <span className="text-xs font-extrabold text-navy-900 uppercase tracking-wider">
                      Activity & Alerts
                    </span>
                    <span className="text-[11px] font-semibold text-sportsGreen-700 bg-sportsGreen-50 px-2 py-0.5 rounded-full">
                      Live
                    </span>
                  </div>

                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {notifications && notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-left"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-navy-900">{notif.title}</p>
                            <span className="text-[10px] text-slate-400">{notif.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                            {notif.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-4">No new notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Authenticated User or Sign In */}
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl bg-white hover:bg-slate-100/80 border border-slate-200 shadow-sm transition-all text-left"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="hidden sm:block">
                    <p className="text-xs font-extrabold text-navy-900 leading-tight truncate max-w-[100px]">
                      {user.name.split(' ')[0]}
                    </p>
                    <p className="text-[10px] font-semibold text-sportsGreen-700 uppercase -mt-0.5">
                      {user.primarySportIcon} {user.primarySportLabel || 'Athlete'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Menu Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-slide-up z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-extrabold text-navy-900">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('profile');
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:text-navy-900 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                    >
                      <User className="w-4 h-4 text-sportsGreen" />
                      <span>My Athlete Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('landing');
                        setTimeout(() => {
                          const el = document.querySelector('#discovery-demo');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:text-navy-900 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                    >
                      <Compass className="w-4 h-4 text-sportsOrange" />
                      <span>Explore Discovery</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        openAuthModal('demo');
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:text-navy-900 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                    >
                      <Shuffle className="w-4 h-4 text-blue-500" />
                      <span>Switch Athlete Persona</span>
                    </button>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                          onNavigate('landing');
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('social')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-navy-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow transition-all active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5 text-sportsOrange" />
                <span>Sign In</span>
              </button>
            )}

            {/* Discover CTA Button */}
            <a
              href="#discovery-demo"
              onClick={(e) => handleScrollTo(e, '#discovery-demo')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-navy-900 hover:bg-navy-800 transition-all shadow-md shadow-navy-900/10 hover:shadow-lg active:scale-95 group"
            >
              <Compass className="w-3.5 h-3.5 text-sportsGreen group-hover:rotate-45 transition-transform" />
              <span>Explore</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Mobile Right Bar */}
          <div className="md:hidden flex items-center gap-2">
            {!isAuthenticated ? (
              <button
                onClick={() => openAuthModal('social')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-navy-900 bg-white border border-slate-200 shadow-xs"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => onNavigate(currentView === 'profile' ? 'landing' : 'profile')}
                className="p-1 rounded-xl bg-slate-100 border border-slate-200"
              >
                <img src={user.avatar} alt="User" className="w-7 h-7 rounded-lg object-cover" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-navy-900 bg-white border border-slate-200 shadow-xs transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col gap-3 animate-slide-up max-h-[85vh] overflow-y-auto">
            {isAuthenticated && user ? (
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt="" className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                  <div>
                    <p className="text-xs font-black text-navy-900">{user.name}</p>
                    <p className="text-[11px] font-semibold text-sportsGreen-700">
                      {user.primarySportIcon} {user.primarySportLabel} ({user.skillLevel})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('profile');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-navy-900 text-white text-xs font-bold shadow-xs"
                >
                  Dashboard
                </button>
              </div>
            ) : (
              <div className="p-3 bg-sportsGreen-50 rounded-2xl border border-sportsGreen-100 text-center">
                <p className="text-xs font-bold text-sportsGreen-900">Experience SportSphere</p>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('social');
                  }}
                  className="mt-2 w-full py-2 rounded-xl bg-navy-900 text-white text-xs font-bold shadow-sm"
                >
                  Sign In / Choose Athlete
                </button>
              </div>
            )}

            {/* Persona Switch button for mobile */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal('demo');
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 text-navy-900 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Shuffle className="w-4 h-4 text-sportsOrange" />
              <span>1-Click Switch Demo Persona</span>
            </button>

            <div className="space-y-1 pt-1 border-t border-slate-100">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="block text-sm font-bold text-slate-700 hover:text-navy-900 py-2 px-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="#discovery-demo"
                onClick={(e) => handleScrollTo(e, '#discovery-demo')}
                className="w-full py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold text-center text-white bg-navy-900 flex items-center justify-center gap-2 shadow-md"
              >
                <Compass className="w-4 h-4 text-sportsGreen" />
                <span>Explore Live Discovery</span>
              </a>

              {isAuthenticated && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                    onNavigate('landing');
                  }}
                  className="w-full py-2 text-xs font-bold text-center text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

