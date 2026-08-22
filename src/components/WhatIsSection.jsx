import React, { useState } from 'react';
import { SPORTS_LIST } from '../data/mockData';
import { Layers, Check, Sparkles } from 'lucide-react';

export default function WhatIsSection({ onSelectSport }) {
  const [activeCard, setActiveCard] = useState('cricket');

  return (
    <section id="what-is" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sportsGreen-50 text-sportsGreen-700 text-xs font-bold uppercase tracking-wider mb-4 border border-sportsGreen-200">
            <Layers className="w-3.5 h-3.5" />
            Unified Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            A Common Digital Space for Every Sport
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            SportSphere gives athletes a unified profile and helps them discover relevant athletes, teams and sporting opportunities based on their sport and location.
          </p>
        </div>

        {/* 6 Sport Adaptation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SPORTS_LIST.map((sport) => {
            const isActive = activeCard === sport.id;
            return (
              <div
                key={sport.id}
                onClick={() => {
                  setActiveCard(sport.id);
                  if (onSelectSport) onSelectSport(sport.id);
                }}
                className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 border bg-white ${
                  isActive
                    ? 'border-sportsGreen-500 shadow-elevated ring-2 ring-sportsGreen-400/20 translate-y--1'
                    : 'border-slate-200/80 shadow-card hover:border-slate-300 hover:shadow-elevated'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                      {sport.icon}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-navy-900">{sport.name}</h3>
                      <span className="inline-block text-xs font-semibold text-sportsGreen-700 bg-sportsGreen-50 px-2 py-0.5 rounded-md border border-sportsGreen-100 mt-0.5">
                        {sport.badge}
                      </span>
                    </div>
                  </div>

                  {isActive && (
                    <span className="flex h-5 w-5 rounded-full bg-sportsGreen text-white items-center justify-center text-[10px] shadow-sm">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                  {sport.description}
                </p>

                {/* Adaptive Sport Attributes preview */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-sportsOrange" />
                    <span>Adaptive Schema Fields</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {sport.attributes.slice(0, 2).map((attr, idx) => (
                      <div key={idx} className="bg-white p-2 rounded-xl border border-slate-200/60">
                        <span className="text-[10px] text-slate-400 block font-medium">{attr.label}</span>
                        <span className="font-semibold text-navy-900 truncate block">{attr.example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="text-center">
          <p className="text-xs text-slate-500 font-medium">
            💡 One flexible structure that adapts seamlessly without creating isolated siloed apps for each sport.
          </p>
        </div>

      </div>
    </section>
  );
}
