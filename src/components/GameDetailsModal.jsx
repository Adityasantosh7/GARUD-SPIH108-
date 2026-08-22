import React, { useEffect, useState } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Users,
  Award,
  Zap,
  Check,
  CheckCircle2,
  AlertCircle,
  Share2,
  ShieldCheck
} from 'lucide-react';
import { useGames } from '../context/GamesContext';
import { useAuth } from '../context/AuthContext';

export default function GameDetailsModal({ game, isOpen, onClose, onActionFeedback }) {
  const { joinGame, leaveGame, isUserInGame, calculateCompatibility } = useGames();
  const { user } = useAuth();
  const [successBanner, setSuccessBanner] = useState(null);

  useEffect(() => {
    setSuccessBanner(null);
  }, [game]);

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

  if (!isOpen || !game) return null;

  const isJoined = isUserInGame(game, user);
  const isFull = (game.currentPlayers || 0) >= (game.requiredPlayers || 4);
  const spotsLeft = Math.max(0, (game.requiredPlayers || 4) - (game.currentPlayers || 0));
  const compatibility = calculateCompatibility(game, user);

  const handleJoin = () => {
    const res = joinGame(game.id, user);
    if (res.success) {
      setSuccessBanner("You're in! You successfully joined this game.");
      if (onActionFeedback) {
        onActionFeedback({
          title: "You're in!",
          description: `You've joined "${game.title}". See you at ${game.venue} on ${game.date}!`
        });
      }
    } else {
      alert(res.message);
    }
  };

  const handleLeave = () => {
    const res = leaveGame(game.id, user);
    if (res.success) {
      setSuccessBanner(null);
      if (onActionFeedback) {
        onActionFeedback({
          title: 'Spot Released',
          description: `You left "${game.title}".`
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-navy-900 via-navy-950 to-navy-800 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4">
            <div className="text-4xl p-3 bg-white/10 rounded-2xl backdrop-blur border border-white/10 shadow-inner">
              {game.sportIcon}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sportsGreen/20 text-sportsGreen border border-sportsGreen/30">
                  {game.sportLabel}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
                  Skill: {game.skillLevel}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                {game.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 mt-1.5">
                <MapPin className="w-3.5 h-3.5 text-sportsOrange" />
                <span>{game.venue}, {game.area}</span>
                {game.distance && <span className="text-slate-400 font-normal">({game.distance})</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700">
          
          {/* Success Banner When Joined */}
          {(successBanner || isJoined) && (
            <div className="p-4 rounded-2xl bg-sportsGreen-50 border border-sportsGreen-200 flex items-start gap-3 animate-slide-up">
              <CheckCircle2 className="w-5 h-5 text-sportsGreen-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-sportsGreen-950">
                  You're in! You successfully joined this game.
                </h4>
                <p className="text-xs text-sportsGreen-800 mt-0.5">
                  Your spot is confirmed on the player roster below. Show up on time and enjoy the match!
                </p>
              </div>
            </div>
          )}

          {/* Logistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="p-2.5 bg-white rounded-xl border border-slate-200/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Date</span>
              <span className="text-xs font-bold text-navy-900 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-sportsOrange" />
                {game.date}
              </span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Time</span>
              <span className="text-xs font-bold text-navy-900 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-sportsOrange" />
                {game.time}
              </span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Roster</span>
              <span className="text-xs font-black text-navy-900 flex items-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5 text-sportsGreen-600" />
                {game.currentPlayers} / {game.requiredPlayers} Players
              </span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-200/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Availability</span>
              <span className={`text-xs font-bold mt-0.5 block ${spotsLeft === 0 ? 'text-red-600' : 'text-sportsGreen-700'}`}>
                {spotsLeft === 0 ? 'Game Full' : `${spotsLeft} spot${spotsLeft > 1 ? 's' : ''} left`}
              </span>
            </div>
          </div>

          {/* Simple Match Compatibility Score Box (Section 8) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/90 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sportsGreen/20 text-sportsGreen-700 flex items-center justify-center font-bold text-xs">
                  <Zap className="w-4 h-4 fill-sportsGreen-600 text-sportsGreen-600" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-navy-900">
                    {compatibility.score}% Match
                  </h4>
                  <span className="text-[11px] font-semibold text-sportsGreen-700">
                    Good match for you
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Compatibility Rating
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200/60 text-xs">
              <div className="flex items-center gap-1.5 text-slate-700">
                <Check className="w-3.5 h-3.5 text-sportsGreen stroke-[3]" />
                <span>Same sport</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Check className="w-3.5 h-3.5 text-sportsGreen stroke-[3]" />
                <span>Similar skill</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Check className="w-3.5 h-3.5 text-sportsGreen stroke-[3]" />
                <span>Nearby</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Check className="w-3.5 h-3.5 text-sportsGreen stroke-[3]" />
                <span>Compatible time</span>
              </div>
            </div>
          </div>

          {/* Game Description */}
          {game.description && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Game Details & Requirements
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70">
                {game.description}
              </p>
            </div>
          )}

          {/* Confirmed Player Roster */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-sportsGreen" />
                <span>Confirmed Players ({game.players?.length || 0} / {game.requiredPlayers})</span>
              </h4>
              {spotsLeft > 0 && (
                <span className="text-xs font-bold text-sportsOrange">
                  {spotsLeft} spot{spotsLeft > 1 ? 's' : ''} available
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {game.players?.map((player, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border flex items-center justify-between ${
                    player.name?.includes('You')
                      ? 'bg-sportsGreen-50/80 border-sportsGreen-300 text-sportsGreen-950 font-bold'
                      : 'bg-white border-slate-200 text-navy-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={player.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                      alt={player.name}
                      className="w-8 h-8 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <p className="text-xs font-bold">{player.name}</p>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {player.skill ? `Skill: ${player.skill}` : 'Player'}
                      </span>
                    </div>
                  </div>
                  {player.name?.includes('You') && (
                    <span className="text-[10px] font-extrabold bg-sportsGreen text-white px-2 py-0.5 rounded-md">
                      Joined
                    </span>
                  )}
                </div>
              ))}

              {/* Empty Placeholder Slots */}
              {Array.from({ length: spotsLeft }).map((_, idx) => (
                <div
                  key={`empty-${idx}`}
                  className="p-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 flex items-center justify-between text-slate-400"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-xs">
                      +
                    </div>
                    <span className="text-xs italic">Open Spot #{idx + 1}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Available</span>
                </div>
              ))}
            </div>
          </div>

          {/* Split Cost Note */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
            <span>Estimated Cost: <strong>{game.costPerPlayer || 'Free / Court split'}</strong></span>
            <span className="text-[11px] text-slate-400">Direct venue split</span>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-navy-900 hover:bg-slate-200/60 transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {isJoined ? (
              <>
                <button
                  onClick={handleLeave}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                >
                  Leave Game
                </button>
                <div className="px-5 py-2.5 rounded-xl bg-sportsGreen text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>You're Confirmed</span>
                </div>
              </>
            ) : (
              <button
                onClick={handleJoin}
                disabled={isFull}
                className={`px-8 py-3 rounded-xl text-sm font-extrabold shadow-lg transition-all active:scale-95 flex items-center gap-2 ${
                  isFull
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                    : 'bg-sportsOrange hover:bg-sportsOrange-600 text-white shadow-sportsOrange/30 hover:shadow-xl'
                }`}
              >
                <span>{isFull ? 'GAME IS FULL' : 'JOIN GAME'}</span>
                {!isFull && <CheckCircle2 className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
