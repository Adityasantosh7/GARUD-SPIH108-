import React from 'react';
import { Eye, Users, Shield, Calendar, ArrowLeftRight, Sparkles, Compass } from 'lucide-react';

export default function VisionSection({ onOpenDemo }) {
  return (
    <section id="vision" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-900 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Eye className="w-3.5 h-3.5 text-sportsGreen" />
            Long Term Outlook
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            Our Vision
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-700 font-semibold leading-relaxed max-w-3xl mx-auto">
            "To create a connected digital ecosystem where every athlete—regardless of sport or skill level—can be discovered, connected and given opportunities to participate."
          </p>
        </div>

        {/* Ecosystem Interconnected Diagram */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card mb-12">
          <div className="text-center mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              The SportSphere Tri-Core Ecosystem
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Core 1: Athletes */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:border-sportsGreen-400 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-sportsGreen-50 text-sportsGreen-600 flex items-center justify-center mb-3 text-2xl shadow-sm">
                🏃‍♂️
              </div>
              <h4 className="text-lg font-black text-navy-900">ATHLETES</h4>
              <p className="text-xs text-slate-500 mt-1">
                Verified identities, skill ratings, and real-time sparring availability.
              </p>
            </div>

            {/* Core 2: Teams */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:border-blue-400 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 text-2xl shadow-sm">
                🛡️
              </div>
              <h4 className="text-lg font-black text-navy-900">TEAMS & CLUBS</h4>
              <p className="text-xs text-slate-500 mt-1">
                Open roster slots, scrimmage scheduling, and player recruitment.
              </p>
            </div>

            {/* Core 3: Events */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center hover:border-sportsOrange-400 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-sportsOrange-50 text-sportsOrange-600 flex items-center justify-center mb-3 text-2xl shadow-sm">
                🏆
              </div>
              <h4 className="text-lg font-black text-navy-900">EVENTS & MATCHES</h4>
              <p className="text-xs text-slate-500 mt-1">
                Community runs, turf pickups, weekend tournaments, and open courts.
              </p>
            </div>

          </div>

          {/* Interconnection arrows summary */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-600">
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              ATHLETES ↔ TEAMS
            </span>
            <span className="text-slate-300">•</span>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              TEAMS ↔ EVENTS
            </span>
            <span className="text-slate-300">•</span>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              ATHLETES ↔ EVENTS
            </span>
          </div>

          {/* Future Scope Road-map note */}
          <div className="mt-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Future Scope Roadmap:</strong> Specialized modules for Certified Coaches, Venue Court Booking Integrations, and Regional League Championships will expand onto this core foundation in subsequent phases.
            </div>
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-slate-500 mb-4">
            “There may already be thousands of athletes around you. SportSphere simply makes it easier to find the right ones.”
          </p>
          <a
            href="#discovery-demo"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-navy-900 hover:bg-navy-800 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Compass className="w-4 h-4 text-sportsGreen" />
            <span>Try The Discovery Demo</span>
          </a>
        </div>

      </div>
    </section>
  );
}
