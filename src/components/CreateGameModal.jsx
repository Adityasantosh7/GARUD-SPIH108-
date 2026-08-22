import React, { useState, useEffect } from 'react';
import {
  X,
  PlusCircle,
  MapPin,
  Calendar,
  Clock,
  Users,
  Award,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { SPORTS_LIST } from '../data/mockData';
import { useGames } from '../context/GamesContext';
import { useAuth } from '../context/AuthContext';

export default function CreateGameModal({ isOpen, onClose, onGameCreated }) {
  const { createGame } = useGames();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    sport: 'badminton',
    title: '',
    venue: '',
    area: 'Gachibowli, Hyderabad',
    date: 'Today',
    time: '6:00 PM - 7:30 PM',
    skillLevel: 'Intermediate',
    requiredPlayers: '4',
    description: '',
    costPerPlayer: 'Free / Court split'
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [createdGameItem, setCreatedGameItem] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setCreatedGameItem(null);
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.venue) {
      alert('Please enter a game title and venue.');
      return;
    }

    const newGame = createGame(formData, user);
    setCreatedGameItem(newGame);
    setIsSuccess(true);

    if (onGameCreated) {
      onGameCreated(newGame);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-7 bg-navy-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sportsOrange/20 border border-sportsOrange/30 text-sportsOrange flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black">Create a Game</h3>
              <p className="text-xs text-slate-300">
                Publish a match or practice run to discover nearby players.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-slate-700">
          {isSuccess && createdGameItem ? (
            <div className="text-center py-6 space-y-4 animate-scale-in">
              <div className="w-16 h-16 rounded-3xl bg-sportsGreen-50 text-sportsGreen-600 border border-sportsGreen-200 flex items-center justify-center mx-auto text-3xl shadow-sm">
                🎉
              </div>
              <h4 className="text-2xl font-black text-navy-900">Game Published!</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                "{createdGameItem.title}" is now live in <strong>Discover Games</strong>. Other athletes nearby can now find and join your game.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-400">Sport:</span>
                  <span className="font-bold text-navy-900">{createdGameItem.sportIcon} {createdGameItem.sportLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Venue:</span>
                  <span className="font-bold text-navy-900">{createdGameItem.venue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Time:</span>
                  <span className="font-bold text-navy-900">{createdGameItem.date} • {createdGameItem.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Players:</span>
                  <span className="font-bold text-sportsGreen-700">{createdGameItem.currentPlayers} / {createdGameItem.requiredPlayers}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                >
                  View in Discover Games
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Sport Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Choose Sport
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {SPORTS_LIST.map((sport) => {
                    const isSelected = formData.sport === sport.id;
                    return (
                      <button
                        type="button"
                        key={sport.id}
                        onClick={() => setFormData({ ...formData, sport: sport.id })}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-navy-900 text-white border-navy-900 shadow-sm ring-2 ring-sportsGreen/40'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <span className="text-xl block mb-0.5">{sport.icon}</span>
                        <span className="text-[11px] font-bold block truncate">{sport.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Game Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Game Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Evening Badminton Doubles, 5v5 Basketball Pickup"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40 font-medium"
                />
              </div>

              {/* Venue & Locality */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Venue / Ground Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nexus Sports Arena, Gopichand Academy"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    City / Locality
                  </label>
                  <select
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 bg-white font-semibold focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                  >
                    <option value="Gachibowli, Hyderabad">Gachibowli, Hyderabad</option>
                    <option value="Madhapur, Hyderabad">Madhapur, Hyderabad</option>
                    <option value="Kondapur, Hyderabad">Kondapur, Hyderabad</option>
                    <option value="Kukatpally, Hyderabad">Kukatpally, Hyderabad</option>
                    <option value="Hitec City, Hyderabad">Hitec City, Hyderabad</option>
                    <option value="Jubilee Hills, Hyderabad">Jubilee Hills, Hyderabad</option>
                    <option value="Banjara Hills, Hyderabad">Banjara Hills, Hyderabad</option>
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <select
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 bg-white font-semibold focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Saturday">This Saturday</option>
                    <option value="Sunday">This Sunday</option>
                    <option value="Weekday Evenings">Weekday Evenings</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 6:00 PM - 8:00 PM"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                  />
                </div>
              </div>

              {/* Skill & Required Players */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Skill Level Needed
                  </label>
                  <select
                    value={formData.skillLevel}
                    onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 bg-white font-semibold focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                  >
                    <option value="All Levels">⚡ Open to All Skill Levels</option>
                    <option value="Beginner">🟢 Beginner</option>
                    <option value="Intermediate">🟡 Intermediate</option>
                    <option value="Advanced">🔴 Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Total Players Needed
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="30"
                    required
                    value={formData.requiredPlayers}
                    onChange={(e) => setFormData({ ...formData, requiredPlayers: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 font-bold focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Additional Notes / Rules
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Non-marking shoes required, feather shuttles provided, split court fee..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-navy-900 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-sportsOrange hover:bg-sportsOrange-600 text-white text-sm font-extrabold shadow-lg shadow-sportsOrange/30 hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>CREATE GAME</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
