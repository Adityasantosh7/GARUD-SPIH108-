import React from 'react';
import { UserCheck, ShieldCheck, CalendarCheck, Users, Quote, HeartHandshake } from 'lucide-react';
import { VALUE_PILLARS } from '../data/mockData';

const iconMap = {
  UserCheck: UserCheck,
  ShieldCheck: ShieldCheck,
  CalendarCheck: CalendarCheck,
  Users: Users
};

export default function WhyItMattersSection() {
  return (
    <section id="why-it-matters" className="py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sportsGreen-50 text-sportsGreen-700 text-xs font-bold uppercase tracking-wider mb-4 border border-sportsGreen-200">
            <HeartHandshake className="w-3.5 h-3.5" />
            Social & Sporting Impact
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            Why SportSphere Matters
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Empowering every athlete, team, venue, and community in the sporting landscape.
          </p>
        </div>

        {/* 4 Impact Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-14">
          {VALUE_PILLARS.map((pillar, idx) => {
            const Icon = iconMap[pillar.icon] || UserCheck;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 hover:bg-white border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-navy-900 group-hover:text-sportsGreen text-navy-900 border border-slate-200 flex items-center justify-center mb-4 shadow-sm transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quote Callout Banner */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl relative overflow-hidden">
            <Quote className="w-12 h-12 text-sportsOrange/20 absolute -top-2 left-6 pointer-events-none" />
            <Quote className="w-12 h-12 text-sportsGreen/20 absolute -bottom-2 right-6 pointer-events-none rotate-180" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-snug">
                "Talent and opportunity should not remain disconnected simply because the right network doesn't exist."
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-slate-300">
                <span>The Core Mission of SportSphere</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
