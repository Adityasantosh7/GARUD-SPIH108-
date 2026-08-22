import React from 'react';
import { UserCheck, Compass, MessageSquare, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const iconMap = {
  UserPlus: UserCheck,
  Compass: Compass,
  MessageSquare: MessageSquare,
  Trophy: Trophy
};

export default function HowItWorksSection({ onOpenDemo }) {
  const { openAuthModal } = useAuth();

  const handleStepAction = (stepNumber) => {
    if (stepNumber === '01') {
      openAuthModal('social');
    } else {
      const el = document.querySelector('#discovery-demo');
      if (el) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const offsetPosition = elementRect - bodyRect - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3.5 border border-blue-200">
            Simple 4-Step Process
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            How Will Someone Use It?
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto px-2">
            From creating your verified athlete profile to stepping onto the court in four frictionless steps.
          </p>
        </div>

        {/* Workflow Progression Pipeline Banner */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-12 p-3 sm:p-4 rounded-2xl bg-slate-900 text-white shadow-lg overflow-x-auto">
          <div className="flex items-center justify-between min-w-[480px] text-xs sm:text-sm font-extrabold uppercase tracking-wider px-3">
            <button
              onClick={() => handleStepAction('01')}
              className="flex items-center gap-2 text-sportsGreen hover:underline cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-sportsGreen/20 text-sportsGreen flex items-center justify-center text-xs">1</span>
              PROFILE
            </button>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <button
              onClick={() => handleStepAction('02')}
              className="flex items-center gap-2 text-blue-400 hover:underline cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">2</span>
              DISCOVER
            </button>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <button
              onClick={() => handleStepAction('03')}
              className="flex items-center gap-2 text-amber-400 hover:underline cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">3</span>
              CONNECT
            </button>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <button
              onClick={() => handleStepAction('04')}
              className="flex items-center gap-2 text-sportsOrange hover:underline cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-sportsOrange/20 text-sportsOrange flex items-center justify-center text-xs">4</span>
              PARTICIPATE
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {WORKFLOW_STEPS.map((step) => {
            const Icon = iconMap[step.iconName] || UserCheck;
            return (
              <div
                key={step.number}
                onClick={() => handleStepAction(step.number)}
                className="relative rounded-3xl p-5 sm:p-6 bg-slate-50 hover:bg-white border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl sm:text-3xl font-black text-slate-300 group-hover:text-navy-900 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white group-hover:bg-navy-900 group-hover:text-sportsGreen text-navy-900 border border-slate-200 flex items-center justify-center shadow-xs transition-all duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-1.5">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <p className="text-[11px] text-slate-400 italic">
                    {step.subtext}
                  </p>
                  <span className="text-xs font-bold text-sportsOrange opacity-0 group-hover:opacity-100 transition-opacity">
                    Try ➔
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA link */}
        <div className="mt-10 sm:mt-12 text-center">
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

