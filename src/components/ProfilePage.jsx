import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGames } from '../context/GamesContext';
import { SPORTS_LIST } from '../data/mockData';
import {
  User,
  MapPin,
  Calendar,
  Clock,
  Award,
  Sparkles,
  Edit3,
  CheckCircle2,
  Share2,
  ArrowLeft,
  Shield,
  Activity,
  Plus,
  Trash2,
  Check,
  X,
  Users,
  Compass
} from 'lucide-react';

export default function ProfilePage({ onNavigateHome, onOpenDiscover, onOpenGameDetails }) {
  const { user, updateProfile } = useAuth();
  const { games, isUserInGame } = useGames();
  const [activeTab, setActiveTab] = useState('sports'); // 'sports' | 'games'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Edit form state
  const [editFormData, setEditFormData] = useState({
    name: user?.name || 'Rahul Sharma',
    location: user?.location || 'Hyderabad',
    area: user?.area || 'Gachibowli, Hyderabad',
    skillLevel: user?.skillLevel || 'Intermediate',
    availability: user?.availability || 'Evenings & Weekends (6:00 PM onwards)',
    sports: user?.sports || ['cricket', 'badminton', 'basketball'],
    bio: user?.bio || ''
  });

  if (!user) return null;

  // Filter games the user is in
  const myJoinedGames = games.filter((g) => isUserInGame(g, user));

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedSportsLabels = SPORTS_LIST.filter((s) =>
      editFormData.sports.includes(s.id)
    ).map((s) => ({
      id: s.id,
      name: s.name,
      icon: s.icon,
      skill: editFormData.skillLevel
    }));

    updateProfile({
      name: editFormData.name,
      location: editFormData.location,
      area: editFormData.area,
      skillLevel: editFormData.skillLevel,
      availability: editFormData.availability,
      sports: editFormData.sports,
      sportsLabels: updatedSportsLabels,
      bio: editFormData.bio
    });

    setIsEditModalOpen(false);
  };

  const toggleSportSelection = (sportId) => {
    setEditFormData((prev) => {
      const exists = prev.sports.includes(sportId);
      if (exists) {
        if (prev.sports.length <= 1) return prev; // keep at least 1
        return { ...prev, sports: prev.sports.filter((s) => s !== sportId) };
      } else {
        return { ...prev, sports: [...prev.sports, sportId] };
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between py-4 mb-4">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-navy-900 transition-colors bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-sportsOrange" />
            <span>Return to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sportsGreen-50 text-sportsGreen-700 border border-sportsGreen-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Active Sports Profile</span>
            </span>
          </div>
        </div>

        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden mb-8">
          {/* Top Banner Graphic */}
          <div className="h-32 sm:h-44 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
          </div>

          {/* Profile Bio & Avatar Row */}
          <div className="px-6 sm:px-10 pb-8 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
              
              {/* Avatar + Name */}
              <div className="flex items-end gap-4">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-slate-100"
                  />
                  <span className="absolute bottom-1 right-1 w-8 h-8 rounded-xl bg-navy-900 border-2 border-white flex items-center justify-center text-base shadow-md">
                    🏸
                  </span>
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
                      {user.name}
                    </h1>
                    <Shield className="w-5 h-5 text-sportsGreen fill-sportsGreen" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-sportsOrange" />
                    <span>{user.area || user.location}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-semibold text-navy-900">Skill: {user.skillLevel}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto pt-2 sm:pt-0">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95"
                >
                  <Edit3 className="w-4 h-4 text-sportsGreen" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={onOpenDiscover}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sportsOrange hover:bg-sportsOrange-600 text-white text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95"
                >
                  <Compass className="w-4 h-4" />
                  <span>Find Games</span>
                </button>
              </div>
            </div>

            {/* Quick Profile Summary Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="p-3 bg-white rounded-xl border border-slate-200/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Location
                </span>
                <span className="text-sm font-black text-navy-900 mt-0.5 block">
                  📍 {user.area || user.location || 'Hyderabad'}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Overall Skill Rating
                </span>
                <span className="text-sm font-black text-sportsGreen mt-0.5 block">
                  ⭐ {user.skillLevel || 'Intermediate'}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Availability
                </span>
                <span className="text-sm font-black text-navy-900 mt-0.5 block truncate">
                  ⏰ {user.availability || 'Evenings'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('sports')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'sports'
                ? 'bg-navy-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-navy-900 border border-slate-200'
            }`}
          >
            My Sports ({user.sports?.length || 3})
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'games'
                ? 'bg-navy-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-navy-900 border border-slate-200'
            }`}
          >
            <span>My Joined Games</span>
            <span className="px-2 py-0.5 rounded-full bg-sportsOrange text-white text-[10px] font-extrabold">
              {myJoinedGames.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Multi-Sport Disciplines */}
        {activeTab === 'sports' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-navy-900">
                    Active Multi-Sport Profile
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    SportSphere supports multiple sports under one unified identity.
                  </p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="text-xs font-bold text-sportsOrange hover:text-sportsOrange-600 flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Sports</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SPORTS_LIST.filter((s) => (user.sports || ['cricket', 'badminton', 'basketball']).includes(s.id)).map((sport) => (
                  <div
                    key={sport.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl p-2 rounded-xl bg-white border border-slate-100 shadow-xs">
                          {sport.icon}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sportsGreen-50 text-sportsGreen-700 border border-sportsGreen-200">
                          {user.skillLevel || 'Intermediate'}
                        </span>
                      </div>
                      <h4 className="text-base font-extrabold text-navy-900">{sport.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{sport.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60">
                      <span className="text-[11px] font-semibold text-slate-400">
                        {sport.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: My Joined Games */}
        {activeTab === 'games' && (
          <div className="space-y-4">
            {myJoinedGames.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myJoinedGames.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => onOpenGameDetails(game)}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sportsGreen-50 text-sportsGreen-700 border border-sportsGreen-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Confirmed Spot</span>
                        </span>
                        <span className="text-2xl">{game.sportIcon}</span>
                      </div>

                      <h4 className="text-lg font-black text-navy-900 group-hover:text-sportsGreen-700 transition-colors">
                        {game.title}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-sportsOrange" />
                        <span>{game.venue}, {game.area}</span>
                      </p>

                      <div className="my-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-semibold text-navy-900">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-sportsOrange" />
                          <span>{game.date} • {game.time}</span>
                        </span>
                        <span className="text-sportsGreen-700 font-bold">
                          {game.currentPlayers} / {game.requiredPlayers} Players
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Match Details Ready</span>
                      <span className="font-bold text-sportsOrange group-hover:translate-x-1 transition-transform">
                        View Game Details →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
                <p className="text-sm font-semibold text-slate-500 mb-4">
                  You haven't joined any games yet.
                </p>
                <button
                  onClick={onOpenDiscover}
                  className="px-6 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-bold shadow-md hover:bg-navy-800"
                >
                  Discover Open Games
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Simple Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fade-in">
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6 bg-navy-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-sportsGreen" />
                <h3 className="text-lg font-bold">Edit Athlete Profile</h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Athlete Name
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Your Sports (Choose all that apply)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SPORTS_LIST.map((s) => {
                    const isSelected = editFormData.sports.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggleSportSelection(s.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-navy-900 text-white border-navy-900 shadow-sm ring-2 ring-sportsGreen/30'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-lg block">{s.icon}</span>
                        <span className="text-xs font-bold block mt-0.5">{s.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Skill Level
                  </label>
                  <select
                    value={editFormData.skillLevel}
                    onChange={(e) => setEditFormData({ ...editFormData, skillLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 bg-white font-semibold focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Location / Area
                  </label>
                  <input
                    type="text"
                    value={editFormData.area}
                    onChange={(e) => setEditFormData({ ...editFormData, area: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Availability (Days & Timings)
                </label>
                <input
                  type="text"
                  value={editFormData.availability}
                  onChange={(e) => setEditFormData({ ...editFormData, availability: e.target.value })}
                  placeholder="e.g. Evenings (6:00 PM onwards) & Weekends"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-md"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
