import React, { useState } from 'react';
import { Sparkles, Check, Database, Sliders, Layers, Shuffle } from 'lucide-react';
import { SPORTS_LIST } from '../data/mockData';

export default function InnovationSection() {
  const [selectedSportIndex, setSelectedSportIndex] = useState(0);
  const currentSport = SPORTS_LIST[selectedSportIndex];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sportsGreen-50 text-sportsGreen-700 text-xs font-bold uppercase tracking-wider mb-4 border border-sportsGreen-200">
            <Sparkles className="w-3.5 h-3.5 text-sportsOrange" />
            Core Innovation
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            Built for Every Sport
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            A flexible schema that combines a universal athlete baseline with sport-specific dynamic attributes.
          </p>
        </div>

        {/* Innovation Formula Presentation */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
            
            {/* Box 1: Universal Base */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-navy-900 text-white shadow-sm border border-navy-800">
              <div className="flex items-center gap-2 text-xs font-bold text-sportsGreen uppercase tracking-wider mb-3">
                <Database className="w-4 h-4" />
                <span>1. Common Athlete Identity</span>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Core baseline shared across all athletes:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <div className="p-2 bg-white/10 rounded-xl">👤 Name</div>
                <div className="p-2 bg-white/10 rounded-xl">📍 Location</div>
                <div className="p-2 bg-white/10 rounded-xl">🏆 Sport</div>
                <div className="p-2 bg-white/10 rounded-xl">⭐ Skill Level</div>
              </div>
            </div>

            {/* Plus Operator */}
            <div className="md:col-span-1 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-sportsOrange-100 text-sportsOrange font-black text-xl flex items-center justify-center shadow-sm">
                +
              </div>
            </div>

            {/* Box 2: Sport-Specific Adaptive Schema */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-navy-900 uppercase tracking-wider">
                  <Sliders className="w-4 h-4 text-sportsOrange" />
                  <span>2. Sport-Specific Attributes</span>
                </div>
                {/* Switch Sport Tab */}
                <button
                  onClick={() => setSelectedSportIndex((prev) => (prev + 1) % SPORTS_LIST.length)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-sportsGreen-700 hover:text-sportsGreen-800 bg-sportsGreen-50 px-2 py-0.5 rounded-lg border border-sportsGreen-200"
                >
                  <Shuffle className="w-3 h-3" />
                  <span>Switch: {currentSport.icon}</span>
                </button>
              </div>

              <p className="text-xs text-slate-500 mb-4">
                Dynamic attributes for <strong className="text-navy-900">{currentSport.name}</strong>:
              </p>

              <div className="space-y-1.5 text-xs">
                {currentSport.attributes.map((attr, idx) => (
                  <div key={idx} className="p-2 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                    <span className="text-slate-500 font-medium">{attr.label}</span>
                    <span className="font-bold text-navy-900">{attr.example}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Key Principle Banner */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <blockquote className="text-base sm:text-lg font-bold text-navy-900 italic">
              "One platform without forcing every sport into the same format."
            </blockquote>
            <p className="text-xs text-slate-500 mt-1">
              Athletes get tailored discovery criteria whether they're setting up a Cricket net session, calculating 10K running paces, or rating a Chess sparring match.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
