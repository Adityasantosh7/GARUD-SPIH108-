import React, { useEffect, useState } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Users,
  Award,
  Shield,
  Check,
  Send,
  Sparkles,
  AlertCircle,
  Share2,
  MessageSquare,
  ChevronRight,
  PhoneCall
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DetailModal({ item, isOpen, onClose, onActionSuccess }) {
  const { user, addJoinedEvent, sendConnectionRequest, openAuthModal } = useAuth();
  const [actionState, setActionState] = useState(false);
  const [connectMessage, setConnectMessage] = useState('Hey! Looking forward to connecting for practice.');
  const [selectedQuickMsg, setSelectedQuickMsg] = useState(0);

  const quickMessages = [
    'Hey! Would love to spar with you this weekend.',
    'Are you available for morning practice sessions?',
    'Looking for a partner with your skill rating to train regularly.',
    'Let’s set up a friendly weekend match!'
  ];

  useEffect(() => {
    setActionState(false);
    setSelectedQuickMsg(0);
    setConnectMessage(quickMessages[0]);
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
    if (!user) {
      onClose();
      openAuthModal('social');
      return;
    }

    setActionState(true);

    if (isAthlete) {
      sendConnectionRequest(item, connectMessage);
      if (onActionSuccess) {
        onActionSuccess({
          title: `Invite Sent to ${item.name}!`,
          description: `"${connectMessage}" has been sent. You can coordinate directly in chat.`
        });
      }
    } else {
      addJoinedEvent(item);
      if (onActionSuccess) {
        onActionSuccess({
          title: `Confirmed for ${item.name}!`,
          description: `You are on the match roster for ${item.schedule || item.day || 'the scheduled date'}.`
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/75 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-7 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3.5 sm:gap-4 pr-8">
            <div className="text-3xl sm:text-4xl p-2.5 sm:p-3 bg-white/10 rounded-2xl backdrop-blur border border-white/10 shadow-inner shrink-0">
              {item.sportIcon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sportsGreen/20 text-sportsGreen border border-sportsGreen/30">
                  {item.sportLabel}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
                  {isAthlete ? `Skill: ${item.skillLevel}` : 'Match / Event'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                {item.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-sportsOrange shrink-0" />
                <span className="truncate">{item.area || item.location}</span>
                {item.distance && <span className="text-slate-400 font-normal shrink-0">({item.distance})</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-4 sm:space-y-5 flex-1 text-slate-700">
          
          {/* Main Info Box */}
          {isAthlete ? (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Looking For
              </span>
              <p className="text-xs sm:text-sm font-bold text-navy-900 leading-snug">
                {item.lookingFor}
              </p>
              {item.bio && (
                <p className="text-xs text-slate-600 pt-2 border-t border-slate-200/60 leading-relaxed italic">
                  "{item.bio}"
                </p>
              )}
            </div>
          ) : (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex flex-wrap gap-2.5 text-xs font-bold text-navy-900">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
                  <Calendar className="w-4 h-4 text-sportsOrange" />
                  <span>{item.schedule || item.day || `Upcoming Weekend`}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
                  <Users className="w-4 h-4 text-sportsGreen-600" />
                  <span>{item.participantsCount} Joined ({item.spotsRemaining || 3} spots left)</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          )}

          {/* Sport Specific Attributes */}
          {item.sportSpecific && (
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-sportsOrange" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900">
                  Sport-Specific Schema ({item.sportLabel})
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(item.sportSpecific).map(([key, val], idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col"
                  >
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {key}
                    </span>
                    <span className="text-xs font-bold text-navy-900 mt-0.5">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Athlete Direct Message Composer */}
          {isAthlete && !actionState && (
            <div className="p-4 rounded-2xl bg-sportsGreen-50/50 border border-sportsGreen-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sportsGreen-900 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-sportsGreen-700" />
                  <span>Personalize Connection Message</span>
                </span>
              </div>

              {/* Quick Message Chips */}
              <div className="flex flex-wrap gap-1.5">
                {quickMessages.map((msg, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedQuickMsg(idx);
                      setConnectMessage(msg);
                    }}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all text-left ${
                      selectedQuickMsg === idx
                        ? 'bg-navy-900 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {msg}
                  </button>
                ))}
              </div>

              <textarea
                rows={2}
                value={connectMessage}
                onChange={(e) => setConnectMessage(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
              />
            </div>
          )}

          {/* Verification Guarantee Banner */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-xs text-slate-600">
            <Shield className="w-4 h-4 text-sportsGreen-600 shrink-0" />
            <span>SportSphere Verified Protocol • Local Moderation Enabled</span>
          </div>

        </div>

        {/* Modal Footer / Action Button */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-navy-900 hover:bg-slate-200/60 transition-colors"
          >
            Close
          </button>

          <button
            onClick={handleAction}
            disabled={actionState}
            className={`flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 ${
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
                <span>{isAthlete ? 'Request Sent!' : 'Confirmed & Joined!'}</span>
              </>
            ) : (
              <>
                {isAthlete ? (
                  <>
                    <Send className="w-4 h-4 text-sportsGreen" />
                    <span>Send Invite to {item.name.split(' ')[0]}</span>
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4" />
                    <span>Join Match Roster</span>
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

