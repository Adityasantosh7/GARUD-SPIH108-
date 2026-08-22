import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Compass,
  Menu,
  X,
  PlusCircle,
  User,
  LogIn,
  LogOut,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ currentView, onNavigate, onOpenCreateGame }) {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', view: 'landing', href: '#' },
    { label: 'Discover', view: 'discover', href: '#discovery-demo' },
    { label: 'Create Game', action: 'create' },
    { label: 'Profile', view: 'profile' }
  ];

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);
    if (link.action === 'create') {
      if (onOpenCreateGame) onOpenCreateGame();
      return;
    }

    if (link.view === 'profile') {
      onNavigate('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (link.view === 'discover') {
      if (currentView !== 'landing') {
        onNavigate('landing');
        setTimeout(() => {
          const el = document.querySelector('#discovery-demo');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector('#discovery-demo');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (link.view === 'landing') {
      onNavigate('landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || currentView === 'profile'
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-sportsGreen transition-transform group-hover:scale-105 shadow-md shadow-navy-900/10">
              <Activity className="w-5 h-5 text-sportsGreen" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-navy-900">
              Sport<span className="text-sportsGreen">Sphere</span>
            </span>
          </a>

          {/* Desktop Nav Links (Home | Discover | Create Game | Profile) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className={`text-sm font-bold transition-colors ${
                  currentView === link.view
                    ? 'text-sportsGreen font-extrabold'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action: Create Game CTA & Profile Pill */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenCreateGame}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-navy-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-sportsOrange" />
              <span>Create Game</span>
            </button>

            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-white hover:bg-slate-100/80 border border-slate-200 shadow-sm transition-all text-left"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="hidden lg:block">
                    <p className="text-xs font-black text-navy-900 leading-tight truncate max-w-[100px]">
                      {user.name}
                    </p>
                    <p className="text-[10px] font-semibold text-sportsGreen-700 uppercase -mt-0.5">
                      {user.sports?.[0] || 'Athlete'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-slide-up z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-black text-navy-900">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">📍 {user.area || user.location}</p>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('profile');
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:text-navy-900 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                    >
                      <User className="w-4 h-4 text-sportsGreen" />
                      <span>My Profile</span>
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
                      <span>Discover Games</span>
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
                onClick={openAuthModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-navy-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow transition-all"
              >
                <LogIn className="w-3.5 h-3.5 text-sportsOrange" />
                <span>Sign In</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick({ view: 'discover' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-navy-900 hover:bg-navy-800 transition-all shadow-md shadow-navy-900/10 hover:shadow-lg active:scale-95 group"
            >
              <Compass className="w-4 h-4 text-sportsGreen group-hover:rotate-45 transition-transform" />
              <span>Find Games</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenCreateGame}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-sportsOrange"
            >
              + Create
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-navy-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col gap-3 animate-slide-up">
            {user && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={user.avatar} alt="" className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-bold text-navy-900">{user.name}</p>
                    <p className="text-[10px] text-slate-500">📍 {user.area || user.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('profile');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-navy-900 text-white text-xs font-bold"
                >
                  Profile
                </button>
              </div>
            )}

            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-left text-sm font-bold text-slate-700 hover:text-navy-900 py-2 px-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick({ view: 'discover' });
                }}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-center text-white bg-navy-900 flex items-center justify-center gap-2 shadow-sm"
              >
                <Compass className="w-4 h-4 text-sportsGreen" />
                <span>Find Your Game</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
