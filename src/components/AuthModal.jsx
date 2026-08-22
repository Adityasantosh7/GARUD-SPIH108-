import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Phone,
  KeyRound,
  Users,
  Smartphone,
  Check,
  RefreshCw
} from 'lucide-react';
import { useAuth, DEMO_PERSONAS } from '../context/AuthContext';
import { SPORTS_LIST } from '../data/mockData';

export default function AuthModal({ onLoginSuccess }) {
  const { isAuthModalOpen, authModalInitialTab, closeAuthModal, login, switchPersona } = useAuth();
  const [activeTab, setActiveTab] = useState(authModalInitialTab || 'social'); // 'social' | 'phone' | 'email' | 'demo'
  const [isLoading, setIsLoading] = useState(false);

  // Phone OTP state
  const [phoneStep, setPhoneStep] = useState('phone'); // 'phone' | 'otp'
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);

  // Email form state
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    sport: 'cricket',
    skillLevel: 'Intermediate',
    area: 'Gachibowli, Hyderabad',
    bio: 'Passionate sports enthusiast looking for weekend games and regular practice partners.'
  });

  useEffect(() => {
    if (authModalInitialTab) {
      setActiveTab(authModalInitialTab);
    }
  }, [authModalInitialTab]);

  useEffect(() => {
    let timer;
    if (phoneStep === 'otp' && resendTimer > 0) {
      timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [phoneStep, resendTimer]);

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
          name: 'Karan Verma',
          email: 'karan.verma@gmail.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          provider: 'google',
          primarySport: 'cricket',
          primarySportLabel: 'Cricket',
          primarySportIcon: '🏏',
          skillLevel: 'Intermediate',
          area: 'Gachibowli, Hyderabad'
        };
      } else if (provider === 'apple') {
        userData = {
          name: 'Ananya Sharma',
          email: 'ananya.sharma@icloud.com',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
          provider: 'apple',
          primarySport: 'badminton',
          primarySportLabel: 'Badminton',
          primarySportIcon: '🏸',
          skillLevel: 'Intermediate',
          area: 'Madhapur, Hyderabad'
        };
      } else if (provider === 'github') {
        userData = {
          name: 'Rahul Sen',
          email: 'rahul.sen@github.com',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
          provider: 'github',
          primarySport: 'football',
          primarySportLabel: 'Football',
          primarySportIcon: '⚽',
          skillLevel: 'Advanced',
          area: 'Kondapur, Hyderabad'
        };
      }

      const user = login(provider, userData);
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess({
          title: `Welcome to SportSphere, ${user.name}!`,
          description: `Signed in via ${provider.toUpperCase()}. Your athlete identity is ready.`
        });
      }
    }, 400);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPhoneStep('otp');
      setResendTimer(30);
      setOtpCode(['5', '9', '2', '4', '8', '1']); // Autofill demo OTP code
    }, 400);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const user = login('phone', {
        name: 'Priya Nambiar',
        email: 'priya.tri@gmail.com',
        provider: 'phone',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
        primarySport: 'swimming',
        primarySportLabel: 'Swimming',
        primarySportIcon: '🏊',
        skillLevel: 'Advanced',
        area: 'Jubilee Hills, Hyderabad',
        bio: 'Triathlete & open-water swimmer training for 10K running and Olympic distance events.'
      });
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess({
          title: `Phone Verified! Welcome, ${user.name}!`,
          description: 'Mobile authentication completed successfully.'
        });
      }
    }, 400);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!emailForm.name || !emailForm.email) return;

    setIsLoading(true);
    setTimeout(() => {
      const sportObj = SPORTS_LIST.find((s) => s.id === emailForm.sport) || SPORTS_LIST[0];

      const user = login('email', {
        name: emailForm.name,
        email: emailForm.email,
        primarySport: emailForm.sport,
        primarySportLabel: sportObj.name,
        primarySportIcon: sportObj.icon,
        skillLevel: emailForm.skillLevel,
        area: emailForm.area,
        bio: emailForm.bio,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        provider: 'email'
      });

      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess({
          title: `Welcome, ${user.name}!`,
          description: `Your custom ${sportObj.name} athlete profile is ready.`
        });
      }
    }, 400);
  };

  const handleSelectPersona = (persona) => {
    setIsLoading(true);
    setTimeout(() => {
      const user = switchPersona(persona.id);
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess({
          title: `Switched to ${user.name}`,
          description: `Loaded athlete profile for ${user.primarySportLabel} (${user.skillLevel}).`
        });
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/75 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top Banner */}
        <div className="p-6 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white text-center relative overflow-hidden shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-sportsGreen/20 border border-sportsGreen/30 text-sportsGreen flex items-center justify-center mx-auto mb-2.5 shadow-sm">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Join <span className="text-sportsGreen">SportSphere</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5 max-w-sm mx-auto">
            Choose your preferred sign-in method or try an instant athlete persona.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="bg-slate-100 p-1.5 grid grid-cols-4 gap-1 border-b border-slate-200 shrink-0">
          <button
            onClick={() => setActiveTab('social')}
            className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              activeTab === 'social'
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            <span>Social</span>
          </button>
          <button
            onClick={() => setActiveTab('phone')}
            className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              activeTab === 'phone'
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            <span>Phone OTP</span>
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              activeTab === 'email'
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            <span>Custom Email</span>
          </button>
          <button
            onClick={() => setActiveTab('demo')}
            className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              activeTab === 'demo'
                ? 'bg-navy-900 text-white shadow-sm'
                : 'text-sportsOrange hover:text-navy-900 font-extrabold'
            }`}
          >
            <span>⚡ 1-Click</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* TAB 1: SOCIAL & OAUTH */}
          {activeTab === 'social' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 font-medium mb-1">
                Fast, secure single-sign-on for athletes:
              </p>

              {/* Google Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold shadow-sm hover:shadow transition-all active:scale-98"
              >
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
                <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.66-7.74-11.89-14.1-6.19-9.24-11.04-19.65-14.55-31.24-3.52-11.58-5.27-22.56-5.27-32.93 0-14.35 3.65-26.4 10.96-36.14 7.3-9.74 16.59-14.73 27.84-14.97 4.9 0 10.15 1.25 15.77 3.75 5.61 2.5 9.4 3.79 11.37 3.86 1.63 0 5.65-1.37 12.06-4.11 6.41-2.73 11.96-3.95 16.64-3.65 12.72.65 22.83 5.48 30.34 14.5-11.1 6.74-16.54 15.98-16.32 27.72.22 9.13 3.69 16.96 10.42 23.5 6.74 6.52 14.68 10.33 23.83 11.42-2.39 7.18-5.33 14.35-8.81 21.51zM119.22 33.15c0-7.39 2.66-14.46 7.99-21.21 5.33-6.74 12.18-11.09 20.55-13.04.22 1.3.33 2.5.33 3.59 0 7.39-2.77 14.45-8.32 21.19-5.54 6.74-12.39 11.09-20.55 13.06-.22-1.08-.33-2.18-.33-3.29z" />
                </svg>
                <span>Continue with Apple</span>
              </button>

              {/* GitHub Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('github')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-sm hover:shadow transition-all active:scale-98"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Continue with GitHub</span>
              </button>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('demo')}
                  className="w-full py-2.5 px-3 rounded-xl bg-sportsGreen-50 hover:bg-sportsGreen-100 text-sportsGreen-800 text-xs font-bold flex items-center justify-center gap-2 border border-sportsGreen-200 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-sportsOrange" />
                  <span>Looking to test quickly? Try 1-Click Demo Profiles</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PHONE OTP */}
          {activeTab === 'phone' && (
            <div>
              {phoneStep === 'phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Enter Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      We will send a 6-digit verification code to this number.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <Smartphone className="w-4 h-4 text-sportsGreen" />
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fade-in">
                  <div className="text-center">
                    <span className="text-xs font-bold text-slate-500">
                      Code sent to <strong className="text-navy-900">{phoneNumber}</strong>
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider text-center mb-2">
                      Enter 6-Digit OTP
                    </label>
                    <div className="flex justify-center gap-2">
                      {otpCode.map((digit, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const newOtp = [...otpCode];
                            newOtp[idx] = e.target.value;
                            setOtpCode(newOtp);
                          }}
                          className="w-10 h-12 text-center text-lg font-black rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sportsGreen"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold px-2">
                    <button
                      type="button"
                      onClick={() => setPhoneStep('phone')}
                      className="text-slate-500 hover:text-navy-900"
                    >
                      Change Number
                    </button>
                    <span className="text-slate-400">
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : (
                        <button
                          type="button"
                          onClick={() => setResendTimer(30)}
                          className="text-sportsOrange font-bold"
                        >
                          Resend Code
                        </button>
                      )}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-sportsGreen hover:bg-sportsGreen-600 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Verify & Login</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: CUSTOM EMAIL & ATHLETE ONBOARDING */}
          {activeTab === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Siddharth Roy"
                    value={emailForm.name}
                    onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="siddharth@example.com"
                    value={emailForm.email}
                    onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Primary Sport
                  </label>
                  <select
                    value={emailForm.sport}
                    onChange={(e) => setEmailForm({ ...emailForm, sport: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-navy-900 bg-white"
                  >
                    {SPORTS_LIST.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.icon} {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Skill Level
                  </label>
                  <select
                    value={emailForm.skillLevel}
                    onChange={(e) => setEmailForm({ ...emailForm, skillLevel: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-navy-900 bg-white"
                  >
                    <option value="Beginner">🟢 Beginner</option>
                    <option value="Intermediate">🟡 Intermediate</option>
                    <option value="Advanced">🔴 Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Area / Locality
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gachibowli, Hyderabad"
                  value={emailForm.area}
                  onChange={(e) => setEmailForm({ ...emailForm, area: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Athlete Bio
                </label>
                <textarea
                  rows={2}
                  value={emailForm.bio}
                  onChange={(e) => setEmailForm({ ...emailForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 mt-2"
              >
                <span>Create Athlete Profile</span>
                <ArrowRight className="w-4 h-4 text-sportsGreen" />
              </button>
            </form>
          )}

          {/* TAB 4: 1-CLICK DEMO PERSONAS */}
          {activeTab === 'demo' && (
            <div className="space-y-2.5">
              <p className="text-xs text-slate-500 font-medium mb-1">
                Select an athlete persona to instantly test discovery, profile customization, and event joining:
              </p>

              {DEMO_PERSONAS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPersona(p)}
                  className="w-full p-3 rounded-2xl border border-slate-200 hover:border-sportsGreen-400 bg-white hover:bg-sportsGreen-50/40 flex items-center justify-between text-left transition-all group shadow-xs hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-navy-900 group-hover:text-sportsGreen-800">
                          {p.name}
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {p.primarySportIcon} {p.primarySportLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate max-w-[200px] sm:max-w-xs">
                        {p.area} • {p.skillLevel}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-navy-900 bg-slate-100 group-hover:bg-sportsGreen group-hover:text-white px-2.5 py-1.5 rounded-xl transition-colors shrink-0">
                    Switch ➔
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Guarantee / Hackathon Badge */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-sportsGreen" />
            <span>SportSphere Multi-Sport Identity Protocol • Zero Password Friction</span>
          </div>
        </div>
      </div>
    </div>
  );
}

