import React from 'react';
import { UserCheck, Compass, MessageSquare, Trophy, ArrowRight } from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/mockData';

const iconMap = {
  UserPlus: UserCheck,
  Compass: Compass,
  MessageSquare: MessageSquare,
  Trophy: Trophy
};

export default function HowItWorksSection({ onOpenDemo }) {
  return (
    <section id="how-it-works" className="py-20 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200">
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            How Will Someone Use It?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From discovering nearby players to stepping onto the court in four frictionless steps.
          </p>
        </div>

        {/* Workflow Progression Pipeline Banner */}
        <div className="max-w-4xl mx-auto mb-12 p-3.5 rounded-2xl bg-slate-900 text-white shadow-lg overflow-x-auto">
          <div className="flex items-center justify-between min-w-[500px] text-xs sm:text-sm font-extrabold uppercase tracking-wider px-4">
            <span className="flex items-center gap-2 text-sportsGreen">
              <span className="w-6 h-6 rounded-full bg-sportsGreen/20 text-sportsGreen flex items-center justify-center text-xs">1</span>
              PROFILE
            </span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <span className="flex items-center gap-2 text-blue-400">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">2</span>
              DISCOVER
            </span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <span className="flex items-center gap-2 text-amber-400">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">3</span>
              CONNECT
            </span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <span className="flex items-center gap-2 text-sportsOrange">
              <span className="w-6 h-6 rounded-full bg-sportsOrange/20 text-sportsOrange flex items-center justify-center text-xs">4</span>
              PARTICIPATE
            </span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((step) => {
            const Icon = iconMap[step.iconName] || UserCheck;
            return (
              <div
                key={step.number}
                className="relative rounded-3xl p-6 bg-slate-50 hover:bg-white border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-slate-300 group-hover:text-navy-900 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-navy-900 group-hover:text-sportsGreen text-navy-900 border border-slate-200 flex items-center justify-center shadow-sm transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60">
                  <p className="text-[11px] text-slate-400 leading-normal italic">
                    {step.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA link */}
        <div className="mt-12 text-center">
          <a
            href="#discovery-demo"
            className="inline-flex items-center gap-2 text-sm font-bold text-sportsOrange hover:text-sportsOrange-600 transition-colors group"
          >
            <span>Try the interactive discovery panel below</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
