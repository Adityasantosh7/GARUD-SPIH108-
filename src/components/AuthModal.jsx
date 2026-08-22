import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ onLoginSuccess }) {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [authMode, setAuthMode] = useState('social'); // 'social' | 'email'
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    sport: 'cricket',
    skillLevel: 'Intermediate'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeAuthModal();
    };
    if (isAuthModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      let userData = {};
      if (provider === 'google') {
        userData = {
          name: 'Karan Verma (Google)',
          email: 'karan.verma@gmail.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          provider: 'google'
        };
      } else if (provider === 'apple') {
        userData = {
          name: 'Karan Verma (Apple ID)',
          email: 'karan.v@icloud.com',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
          provider: 'apple'
        };
      }

      const user = login(provider, userData);
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess({
          title: `Welcome to SportSphere, ${user.name}!`,
          description: `Logged in via ${provider.toUpperCase()}. Your athlete identity is ready.`
        });
      }
    }, 400);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!emailForm.name || !emailForm.email) return;

    setIsLoading(true);
    setTimeout(() => {
      const sportIcons = {
        cricket: '🏏',
        football: '⚽',
        badminton: '🏸',
        swimming: '🏊',
        athletics: '🏃',
        chess: '♟️'
      };

      const user = login('email', {
        name: emailForm.name,
        email: emailForm.email,
        primarySport: emailForm.sport,
        primarySportLabel: emailForm.sport.charAt(0).toUpperCase() + emailForm.sport.slice(1),
        primarySportIcon: sportIcons[emailForm.sport] || '🏆',
        skillLevel: emailForm.skillLevel,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        provider: 'email'
      });

      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess({
          title: `Welcome, ${user.name}!`,
          description: 'Your athlete profile has been initialized.'
        });
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-navy-900 flex items-center justify-center transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white text-center relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-sportsGreen/20 border border-sportsGreen/30 text-sportsGreen flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black tracking-tight text-white">
            Join <span className="text-sportsGreen">SportSphere</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xs mx-auto">
            One sports identity to discover players, join matches, and track your events.
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {authMode === 'social' ? (
            <div className="space-y-3.5">
              {/* Google Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold shadow-sm hover:shadow transition-all active:scale-98 group"
              >
                {/* Google Colorful SVG */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Apple Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('apple')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-black hover:bg-neutral-900 text-white text-sm font-bold shadow-sm hover:shadow transition-all active:scale-98"
              >
                {/* Apple SVG */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.66-7.74-11.89-14.1-6.19-9.24-11.04-19.65-14.55-31.24-3.52-11.58-5.27-22.56-5.27-32.93 0-14.35 3.65-26.4 10.96-36.14 7.3-9.74 16.59-14.73 27.84-14.97 4.9 0 10.15 1.25 15.77 3.75 5.61 2.5 9.4 3.79 11.37 3.86 1.63 0 5.65-1.37 12.06-4.11 6.41-2.73 11.96-3.95 16.64-3.65 12.72.65 22.83 5.48 30.34 14.5-11.1 6.74-16.54 15.98-16.32 27.72.22 9.13 3.69 16.96 10.42 23.5 6.74 6.52 14.68 10.33 23.83 11.42-2.39 7.18-5.33 14.35-8.81 21.51zM119.22 33.15c0-7.39 2.66-14.46 7.99-21.21 5.33-6.74 12.18-11.09 20.55-13.04.22 1.3.33 2.5.33 3.59 0 7.39-2.77 14.45-8.32 21.19-5.54 6.74-12.39 11.09-20.55 13.06-.22-1.08-.33-2.18-.33-3.29z" />
                </svg>
                <span>Continue with Apple</span>
              </button>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400 font-bold tracking-wider">or</span>
                </div>
              </div>

              {/* Email Option Switch */}
              <button
                type="button"
                onClick={() => setAuthMode('email')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-bold transition-all"
              >
                <Mail className="w-4 h-4 text-sportsOrange" />
                <span>Continue with Custom Profile / Email</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karan Verma"
                    value={emailForm.name}
                    onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={emailForm.email}
                    onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Primary Sport
                  </label>
                  <select
                    value={emailForm.sport}
                    onChange={(e) => setEmailForm({ ...emailForm, sport: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sportsGreen/40 bg-white"
                  >
                    <option value="cricket">🏏 Cricket</option>
                    <option value="football">⚽ Football</option>
                    <option value="badminton">🏸 Badminton</option>
                    <option value="swimming">🏊 Swimming</option>
                    <option value="athletics">🏃 Athletics</option>
                    <option value="chess">♟️ Chess</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Skill Level
                  </label>
                  <select
                    value={emailForm.skillLevel}
                    onChange={(e) => setEmailForm({ ...emailForm, skillLevel: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sportsGreen/40 bg-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('social')}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-navy-900 hover:bg-slate-100"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <span>Create & Sign In</span>
                  <ArrowRight className="w-4 h-4 text-sportsGreen" />
                </button>
              </div>
            </form>
          )}

          {/* Guarantee / Hackathon Badge */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-sportsGreen" />
            <span>Instant Hackathon Evaluation Auth • No passwords required</span>
          </div>
        </div>
      </div>
    </div>
  );
}
