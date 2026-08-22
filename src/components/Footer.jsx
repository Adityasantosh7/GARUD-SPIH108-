import React from 'react';
import { Activity, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 text-white pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-navy-800">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sportsGreen/20 flex items-center justify-center text-sportsGreen border border-sportsGreen/30">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                Sport<span className="text-sportsGreen">Sphere</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              One Platform. Every Sport. Every Athlete. Built to eliminate fragmented sports discovery and connect players to real games nearby.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
              <span>🚀 One Platform. Every Sport. Every Athlete.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#problem" className="hover:text-sportsGreen transition-colors">
                  The Problem Story
                </a>
              </li>
              <li>
                <a href="#what-is" className="hover:text-sportsGreen transition-colors">
                  Supported Sports
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-sportsGreen transition-colors">
                  How It Works (4 Steps)
                </a>
              </li>
              <li>
                <a href="#discovery-demo" className="hover:text-sportsGreen transition-colors">
                  Discover Games Hub
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-sportsGreen transition-colors">
                  Today vs SportSphere
                </a>
              </li>
              <li>
                <a href="#vision" className="hover:text-sportsGreen transition-colors">
                  Long-term Vision
                </a>
              </li>
            </ul>
          </div>

          {/* Supported Sports Taxonomy */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Multi-Sport Platform
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                🏏 Cricket
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                ⚽ Football
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                🏸 Badminton
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                🏀 Basketball
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                🏊 Swimming
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                ♟️ Chess
              </span>
            </div>
            <p className="text-xs text-slate-500 pt-2">
              Extensible multi-sport architecture engineered so any new sport or format integrates effortlessly.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} SportSphere. One Platform. Every Sport. Every Athlete.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
