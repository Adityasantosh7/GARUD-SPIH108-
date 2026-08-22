import React, { useState } from 'react';
import { Sparkles, Check, Database, Sliders, Layers, Shuffle, ArrowRight } from 'lucide-react';
import { SPORTS_LIST } from '../data/mockData';

export default function InnovationSection() {
  const [selectedSportIndex, setSelectedSportIndex] = useState(0);
  const currentSport = SPORTS_LIST[selectedSportIndex];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sportsGreen-50 text-sportsGreen-700 text-xs font-bold uppercase tracking-wider mb-3.5 border border-sportsGreen-200">
            <Sparkles className="w-3.5 h-3.5 text-sportsOrange" />
            Core Innovation
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            Built for Every Sport
          </h2>
          <p className="mt-2.5 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto px-2">
            A flexible schema that combines a universal athlete baseline with sport-specific dynamic attributes.
          </p>
        </div>

        {/* Interactive Sport Selector Chips */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 sm:pb-0 gap-2 max-w-4xl mx-auto mb-6 px-2">
          {SPORTS_LIST.map((sport, idx) => (
            <button
              key={sport.id}
              onClick={() => setSelectedSportIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 flex items-center gap-1.5 ${
                selectedSportIndex === idx
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{sport.icon}</span>
              <span>{sport.name}</span>
            </button>
          ))}
        </div>

        {/* Innovation Formula Presentation */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-5 sm:p-9 border border-slate-200 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 sm:gap-6 items-center">
            
            {/* Box 1: Universal Base */}
            <div className="md:col-span-5 p-4 sm:p-5 rounded-2xl bg-navy-900 text-white shadow-sm border border-navy-800">
              <div className="flex items-center gap-2 text-xs font-bold text-sportsGreen uppercase tracking-wider mb-2.5">
                <Database className="w-4 h-4" />
                <span>1. Universal Athlete Baseline</span>
              </div>
              <p className="text-xs text-slate-300 mb-3.5">
                Standard baseline identity shared across all athletes:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <div className="p-2 bg-white/10 rounded-xl">👤 Name & Avatar</div>
                <div className="p-2 bg-white/10 rounded-xl">📍 City & Geohash</div>
                <div className="p-2 bg-white/10 rounded-xl">🏆 Primary Sport</div>
                <div className="p-2 bg-white/10 rounded-xl">⭐ Baseline Rating</div>
              </div>
            </div>

            {/* Plus Operator */}
            <div className="md:col-span-1 flex items-center justify-center my-1 md:my-0">
              <div className="w-9 h-9 rounded-full bg-sportsOrange-100 text-sportsOrange font-black text-lg flex items-center justify-center shadow-xs">
                +
              </div>
            </div>

            {/* Box 2: Sport-Specific Adaptive Schema */}
            <div className="md:col-span-5 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-navy-900 uppercase tracking-wider">
                  <Sliders className="w-4 h-4 text-sportsOrange" />
                  <span>2. Dynamic Schema Attributes</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sportsGreen-50 text-sportsGreen-800 border border-sportsGreen-200">
                  {currentSport.icon} {currentSport.name}
                </span>
              </div>

              <p className="text-xs text-slate-500 mb-3">
                Tailored fields matching <strong className="text-navy-900">{currentSport.name}</strong> mechanics:
              </p>

              <div className="space-y-1.5 text-xs">
                {currentSport.attributes.map((attr, idx) => (
                  <div key={idx} className="p-2 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                    <span className="text-slate-500 font-medium">{attr.label}</span>
                    <span className="font-bold text-navy-900 text-right">{attr.example}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Key Principle Banner */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <blockquote className="text-sm sm:text-base md:text-lg font-bold text-navy-900 italic">
              "One unified platform without forcing every sport into the same format."
            </blockquote>
            <p className="text-xs text-slate-500 mt-1 max-w-xl mx-auto">
              Athletes get tailored discovery criteria whether they're setting up a Cricket net session, calculating 10K running paces, or rating a Chess sparring match.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

