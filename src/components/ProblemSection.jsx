import React from 'react';
import { MessageCircle, Search, Share2, AlertCircle, ArrowDown, CheckCircle2, XCircle } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section id="problem" className="py-20 bg-white border-y border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-4 border border-red-100">
            <AlertCircle className="w-3.5 h-3.5" />
            The Discovery Dilemma
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
            Your Next Teammate Could Be Nearby.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Athletes are scattered across fragmented platforms, dead chat groups, and closed informal circles.
          </p>
        </div>

        {/* Real Life Scenario Callout */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100/90 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card relative">
            <div className="absolute -top-3.5 left-8 bg-navy-900 text-white text-[11px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm">
              Real Life Scenario
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-sm">
                🏸
              </div>
              <div className="space-y-2 text-left">
                <p className="text-lg sm:text-xl font-bold text-navy-900 leading-snug">
                  "You play badminton. You want someone at your exact skill level to practice with."
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  They may be living only <span className="font-semibold text-navy-900">a few kilometres away</span> from your court. But finding them currently means asking mutual friends, spamming noisy WhatsApp groups, or endlessly searching different apps.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fragmented vs Unified Workflow Flowchart */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              The Current Reality
            </p>
          </div>

          {/* 3 Broken Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-red-100/80 text-red-600 flex items-center justify-center mb-2.5">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-navy-900">Different Apps</h4>
              <p className="text-xs text-slate-500 mt-1">Cricket on app A, fitness on app B, running on app C.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-red-100/80 text-red-600 flex items-center justify-center mb-2.5">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-navy-900">WhatsApp Groups</h4>
              <p className="text-xs text-slate-500 mt-1">Cluttered chat feeds with zero searchability or skill verification.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-red-100/80 text-red-600 flex items-center justify-center mb-2.5">
                <Share2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-navy-900">Personal Networks</h4>
              <p className="text-xs text-slate-500 mt-1">Confined exclusively to your existing circle of friends.</p>
            </div>
          </div>

          {/* Flow Down Indicator */}
          <div className="flex flex-col items-center justify-center my-4">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </div>
            <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-red-100 text-red-700 text-xs sm:text-sm font-extrabold border border-red-200">
              <XCircle className="w-4 h-4" />
              Fragmented Sports Discovery
            </div>
          </div>

          {/* Flow Down to Solution */}
          <div className="flex flex-col items-center justify-center my-4">
            <div className="w-8 h-8 rounded-full bg-sportsGreen-100 flex items-center justify-center text-sportsGreen-700">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>

          {/* SportSphere Solution Banner */}
          <div className="bg-navy-900 text-white rounded-3xl p-6 sm:p-8 text-center shadow-xl shadow-navy-900/10 border border-navy-800">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sportsGreen/20 text-sportsGreen text-xs font-bold uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-4 h-4" />
              The Solution
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              SportSphere brings it together.
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              One unified digital sports space uniting athletes, teams, and local sporting events into a seamless, accessible discovery ecosystem.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
