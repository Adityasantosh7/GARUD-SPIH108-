import React from 'react';
import { XCircle, CheckCircle2, ArrowRight, Layers, Zap } from 'lucide-react';
import { COMPARISON_DATA } from '../data/mockData';

export default function ComparisonSection() {
  return (
    <section id="comparison" className="py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-navy-800 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-200">
            <Zap className="w-3.5 h-3.5 text-sportsOrange" />
            Direct Problem Solution
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            From Fragmented to Connected
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            See how SportSphere transforms the chaotic, broken grassroots sports landscape into one structured, accessible ecosystem.
          </p>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* TODAY (Fragmented) */}
          <div className="rounded-3xl p-7 sm:p-9 bg-slate-50/80 border border-red-200/80 shadow-card flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/50 rounded-bl-full pointer-events-none -z-0" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider mb-5">
                <XCircle className="w-4 h-4" />
                <span>TODAY (The Struggle)</span>
              </div>

              <h3 className="text-2xl font-extrabold text-navy-900 mb-6">
                Disconnected & Closed Channels
              </h3>

              <div className="space-y-4">
                {COMPARISON_DATA.today.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 relative z-10">
              <p className="text-xs font-semibold text-red-600/90 italic">
                Outcome: Frustrated players, missed matches, and undiscovered grassroots talent.
              </p>
            </div>
          </div>

          {/* SPORTSPHERE (Connected) */}
          <div className="rounded-3xl p-7 sm:p-9 bg-gradient-to-br from-navy-900 to-navy-950 text-white border border-navy-800 shadow-elevated flex flex-col justify-between relative overflow-hidden ring-2 ring-sportsGreen/30">
            <div className="absolute top-0 right-0 w-40 h-40 bg-sportsGreen/10 rounded-bl-full pointer-events-none -z-0" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sportsGreen/20 text-sportsGreen text-xs font-black uppercase tracking-wider mb-5 border border-sportsGreen/30">
                <CheckCircle2 className="w-4 h-4" />
                <span>SPORTSPHERE (The Solution)</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-6">
                One Unified Digital Hub
              </h3>

              <div className="space-y-4">
                {COMPARISON_DATA.sportsphere.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 text-sm text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-sportsGreen/20 text-sportsGreen flex items-center justify-center shrink-0 mt-0.5 border border-sportsGreen/40">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="leading-snug font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-navy-800 relative z-10">
              <p className="text-xs font-semibold text-sportsGreen italic">
                Outcome: Instant discovery, verified compatibility, and active regular play.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
