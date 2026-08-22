import React, { useState } from 'react';
import { SPORTS_LIST } from '../data/mockData';
import { Layers, Check, Sparkles, ArrowRight } from 'lucide-react';

export default function WhatIsSection({ onSelectSport }) {
  const [activeCard, setActiveCard] = useState('cricket');

  const handleCardClick = (sportId) => {
    setActiveCard(sportId);
    if (onSelectSport) onSelectSport(sportId);

    const el = document.querySelector('#discovery-demo');
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="what-is" className="py-16 sm:py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sportsGreen-50 text-sportsGreen-700 text-xs font-bold uppercase tracking-wider mb-3.5 border border-sportsGreen-200">
            <Layers className="w-3.5 h-3.5" />
            Unified Architecture
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            A Common Digital Space for Every Sport
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto px-2">
            SportSphere gives athletes a unified profile and helps them discover relevant players, teams and sporting opportunities based on their sport and location.
          </p>
        </div>

        {/* 6 Sport Adaptation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {SPORTS_LIST.map((sport) => {
            const isActive = activeCard === sport.id;
            return (
              <div
                key={sport.id}
                onClick={() => handleCardClick(sport.id)}
                className={`cursor-pointer rounded-3xl p-5 sm:p-6 transition-all duration-300 border bg-white flex flex-col justify-between group hover:-translate-y-1 ${
                  isActive
                    ? 'border-sportsGreen-500 shadow-elevated ring-2 ring-sportsGreen-400/20'
                    : 'border-slate-200/80 shadow-card hover:border-slate-300 hover:shadow-elevated'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3.5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl p-2 rounded-2xl bg-slate-50 border border-slate-100 shadow-xs">
                        {sport.icon}
                      </span>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-navy-900">{sport.name}</h3>
                        <span className="inline-block text-[11px] font-semibold text-sportsGreen-700 bg-sportsGreen-50 px-2 py-0.5 rounded-md border border-sportsGreen-100 mt-0.5">
                          {sport.badge}
                        </span>
                      </div>
                    </div>

                    <span className="flex h-6 w-6 rounded-full bg-slate-100 group-hover:bg-sportsGreen group-hover:text-white text-slate-400 items-center justify-center text-xs transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                    {sport.description}
                  </p>
                </div>

                {/* Adaptive Sport Attributes preview */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 mt-auto">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-sportsOrange" />
                      Adaptive Schema
                    </span>
                    <span className="text-sportsGreen-700 font-bold group-hover:underline">Explore ➔</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {sport.attributes.slice(0, 2).map((attr, idx) => (
                      <div key={idx} className="bg-white p-2 rounded-xl border border-slate-200/60">
                        <span className="text-[10px] text-slate-400 block font-medium">{attr.label}</span>
                        <span className="font-semibold text-navy-900 text-xs truncate block">{attr.example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="text-center px-4">
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto">
            💡 Click on any sport card above to filter the live discovery engine and explore compatible athletes and pickup sessions.
          </p>
        </div>

      </div>
    </section>
  );
}
