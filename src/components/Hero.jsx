import React from 'react';
import { ArrowRight, Sparkles, MapPin, Users, Award, Play } from 'lucide-react';
import { SPORTS_LIST } from '../data/mockData';

export default function Hero({ onSelectSport }) {
  const handleScrollTo = (id) => {
    const element = document.querySelector(id);
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

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-100/80 via-white to-slate-50">
      {/* Background Decorative Rings / Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sportsGreen/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-sportsOrange/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-200 text-xs font-semibold text-navy-800 mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-sportsGreen animate-pulse"></span>
            <span className="font-bold text-navy-900">Team GARUD</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">Round 3 Hackathon Submission</span>
            <Sparkles className="w-3.5 h-3.5 text-sportsOrange" />
          </div>

          {/* Main Hero Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-navy-900 tracking-tight leading-[1.1] mb-6">
            One Platform.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 via-sportsGreen-600 to-sportsGreen-500">
              Every Sport.
            </span>{' '}
            <span className="relative inline-block">
              Every Athlete.
              <svg
                className="absolute -bottom-2 left-0 w-full text-sportsOrange/80"
                viewBox="0 0 250 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9C60 3 190 2 247 9"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-10">
            Build your sports identity, discover athletes and opportunities nearby, and connect with the sporting community around you.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#discovery-demo"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('#discovery-demo');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-sportsOrange hover:bg-sportsOrange-600 active:scale-95 transition-all shadow-lg shadow-sportsOrange/25 hover:shadow-xl hover:shadow-sportsOrange/30 group"
            >
              <span>Explore SportSphere</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('#how-it-works');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-navy-800 bg-white hover:bg-slate-50 active:scale-95 transition-all border border-slate-200 shadow-sm hover:shadow group"
            >
              <Play className="w-4 h-4 text-sportsGreen fill-sportsGreen" />
              <span>See How It Works</span>
            </a>
          </div>

          {/* Quick Sport Selector Bar */}
          <div className="pt-4 border-t border-slate-200/80">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Supported Multi-Sport Ecosystem
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {SPORTS_LIST.map((sport) => (
                <button
                  key={sport.id}
                  onClick={() => {
                    if (onSelectSport) onSelectSport(sport.id);
                    handleScrollTo('#discovery-demo');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100/80 border border-slate-200 text-sm font-semibold text-navy-800 shadow-sm hover:shadow transition-all group active:scale-95"
                >
                  <span className="text-base group-hover:scale-125 transition-transform">{sport.icon}</span>
                  <span>{sport.name}</span>
                  <span className="hidden md:inline-block text-[11px] text-slate-400 font-normal group-hover:text-sportsGreen-600">
                    • {sport.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Identity & Discovery Preview Cards */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="bg-white/90 backdrop-blur rounded-2xl p-5 border border-slate-200/80 shadow-card hover:shadow-elevated transition-all flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sportsGreen-50 border border-sportsGreen-100 flex items-center justify-center text-sportsGreen-600 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-sportsGreen-600 uppercase tracking-wider">Universal Identity</span>
              </div>
              <h3 className="text-base font-bold text-navy-900 mt-0.5">One Profile for Every Sport</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Adaptive sports traits without juggling 5 different apps or outdated bio notes.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/90 backdrop-blur rounded-2xl p-5 border border-slate-200/80 shadow-card hover:shadow-elevated transition-all flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Hyper-Local</span>
              </div>
              <h3 className="text-base font-bold text-navy-900 mt-0.5">Discover Nearby Matches</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Find compatible players and courts within 2 to 5 km of your location.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white/90 backdrop-blur rounded-2xl p-5 border border-slate-200/80 shadow-card hover:shadow-elevated transition-all flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sportsOrange-50 border border-sportsOrange-100 flex items-center justify-center text-sportsOrange-600 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-sportsOrange-600 uppercase tracking-wider">Direct Access</span>
              </div>
              <h3 className="text-base font-bold text-navy-900 mt-0.5">From Search to Court</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Seamless 1-click connection for practice sessions, pickups, and tournaments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
