import React, { useEffect, useState } from 'react';
import { X, MapPin, Calendar, Users, Award, Shield, Check, Send, Sparkles, AlertCircle } from 'lucide-react';

export default function DetailModal({ item, isOpen, onClose, onActionSuccess }) {
  const [actionState, setActionState] = useState(false);

  useEffect(() => {
    setActionState(false);
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const isAthlete = item.type === 'athlete';

  const handleAction = () => {
    setActionState(true);
    if (onActionSuccess) {
      onActionSuccess({
        title: isAthlete ? `Connection Request Sent!` : `Joined Event Successfully!`,
        description: isAthlete
          ? `You've sent a connect invite to ${item.name}. They will be notified to coordinate practice.`
          : `You are confirmed for "${item.name}". See you on ${item.day || 'the scheduled date'}!`
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-navy-900 to-navy-800 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4">
            <div className="text-4xl p-3 bg-white/10 rounded-2xl backdrop-blur border border-white/10 shadow-inner">
              {item.sportIcon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sportsGreen/20 text-sportsGreen border border-sportsGreen/30">
                  {item.sportLabel}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
                  {isAthlete ? `Skill: ${item.skillLevel}` : 'Community Event'}
                </span>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-white">
                {item.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-sportsOrange" />
                <span>{item.area || item.location}</span>
                {item.distance && <span className="text-slate-400 font-normal">({item.distance})</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700">
          
          {/* Main Info Box */}
          {isAthlete ? (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Looking For
              </span>
              <p className="text-sm font-semibold text-navy-900">
                {item.lookingFor}
              </p>
              {item.bio && (
                <p className="text-xs text-slate-600 mt-2 leading-relaxed pt-2 border-t border-slate-200/60">
                  "{item.bio}"
                </p>
              )}
            </div>
          ) : (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-navy-900">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                  <Calendar className="w-4 h-4 text-sportsOrange" />
                  <span>{item.schedule || `Sunday`}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                  <Users className="w-4 h-4 text-sportsGreen-600" />
                  <span>{item.participantsCount} / {item.maxSpots || 8} Confirmed ({item.spotsRemaining || 2} spots left)</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          )}

          {/* Sport Specific Attributes */}
          {item.sportSpecific && (
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-sportsOrange" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900">
                  Sport-Specific Attributes ({item.sportLabel})
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.entries(item.sportSpecific).map(([key, val], idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col"
                  >
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {key}
                    </span>
                    <span className="text-xs font-semibold text-navy-900 mt-0.5">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Guarantee Banner */}
          <div className="p-3 bg-sportsGreen-50/60 rounded-xl border border-sportsGreen-100 flex items-center gap-2 text-xs text-sportsGreen-800">
            <Shield className="w-4 h-4 text-sportsGreen-600 shrink-0" />
            <span>SportSphere Verified Athlete Profile • Local Community Moderated</span>
          </div>

        </div>

        {/* Modal Footer / Action Button */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-navy-900 hover:bg-slate-200/60 transition-colors"
          >
            Close
          </button>

          <button
            onClick={handleAction}
            disabled={actionState}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 ${
              actionState
                ? 'bg-sportsGreen text-white shadow-sportsGreen/30 cursor-default'
                : isAthlete
                ? 'bg-navy-900 text-white hover:bg-navy-800 shadow-navy-900/20 hover:shadow-lg'
                : 'bg-sportsOrange text-white hover:bg-sportsOrange-600 shadow-sportsOrange/30 hover:shadow-lg'
            }`}
          >
            {actionState ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{isAthlete ? 'Connected!' : 'Joined Event!'}</span>
              </>
            ) : (
              <>
                {isAthlete ? (
                  <>
                    <Send className="w-4 h-4 text-sportsGreen" />
                    <span>Connect with {item.name}</span>
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4" />
                    <span>Join Event</span>
                  </>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
