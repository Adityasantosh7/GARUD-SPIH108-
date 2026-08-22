import React, { useState, useEffect } from 'react';
import { Activity, Compass, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenDemo }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Problem', href: '#problem' },
    { label: 'What is SportSphere', href: '#what-is' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Live Discovery', href: '#discovery-demo' },
    { label: 'Why It Matters', href: '#why-it-matters' },
    { label: 'Vision', href: '#vision' },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-sportsGreen transition-transform group-hover:scale-105 shadow-md shadow-navy-900/10">
              <Activity className="w-5 h-5 text-sportsGreen" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-navy-900">
                  Sport<span className="text-sportsGreen">Sphere</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-navy-700 border border-slate-200">
                  Team GARUD
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest -mt-1 hidden sm:block">
                Round 3 Hackathon
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-sm font-semibold text-slate-600 hover:text-navy-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#discovery-demo"
              onClick={(e) => handleScrollTo(e, '#discovery-demo')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-navy-900 hover:bg-navy-800 transition-all shadow-md shadow-navy-900/10 hover:shadow-lg active:scale-95 group"
            >
              <Compass className="w-4 h-4 text-sportsGreen group-hover:rotate-45 transition-transform" />
              <span>Discover Players</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="#discovery-demo"
              onClick={(e) => handleScrollTo(e, '#discovery-demo')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-navy-900"
            >
              Discover
            </a>
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
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation</span>
              <span className="text-xs font-bold text-sportsGreen bg-sportsGreen-50 px-2 py-0.5 rounded-full border border-sportsGreen-100">
                Team GARUD
              </span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-sm font-semibold text-slate-700 hover:text-navy-900 py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <a
                href="#discovery-demo"
                onClick={(e) => handleScrollTo(e, '#discovery-demo')}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-center text-white bg-navy-900 flex items-center justify-center gap-2 shadow-sm"
              >
                <Compass className="w-4 h-4 text-sportsGreen" />
                <span>Explore Interactive Demo</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
