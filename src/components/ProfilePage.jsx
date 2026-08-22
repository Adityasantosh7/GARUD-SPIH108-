import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SPORTS_LIST } from '../data/mockData';
import {
  User,
  MapPin,
  Calendar,
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
  Clock,
  Send,
  X
} from 'lucide-react';

export default function ProfilePage({ onNavigateHome, onOpenDemo }) {
  const { user, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('identity'); // 'identity' | 'events' | 'activity'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Edit form state
  const [editFormData, setEditFormData] = useState({
    name: user?.name || '',
    location: user?.location || 'Hyderabad',
    area: user?.area || 'Gachibowli, Hyderabad',
    primarySport: user?.primarySport || 'cricket',
    skillLevel: user?.skillLevel || 'Intermediate',
    bio: user?.bio || '',
    lookingFor: user?.lookingFor || '',
    battingHand: user?.sportSpecific?.['Batting Hand'] || 'Right Handed',
    bowlingStyle: user?.sportSpecific?.['Bowling Style'] || 'Right-arm Fast Medium',
    primaryRole: user?.sportSpecific?.['Primary Role'] || 'All-rounder'
  });

  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 bg-slate-50">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4 text-2xl">
          🔒
        </div>
        <h2 className="text-2xl font-black text-navy-900">Please Sign In</h2>
        <p className="text-sm text-slate-500 max-w-sm mt-1 mb-6">
          Sign in through Google, Apple, or Email to view and customize your SportSphere athlete identity.
        </p>
        <button
          onClick={onNavigateHome}
          className="px-6 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-sm shadow-md"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const sportObj = SPORTS_LIST.find((s) => s.id === editFormData.primarySport) || SPORTS_LIST[0];

    updateProfile({
      name: editFormData.name,
      location: editFormData.location,
      area: editFormData.area,
      primarySport: editFormData.primarySport,
      primarySportLabel: sportObj.name,
      primarySportIcon: sportObj.icon,
      skillLevel: editFormData.skillLevel,
      bio: editFormData.bio,
      lookingFor: editFormData.lookingFor,
      sportSpecific: {
        'Primary Role': editFormData.primaryRole,
        'Batting / Style': editFormData.battingHand,
        'Bowling / Specialty': editFormData.bowlingStyle,
        'Availability': 'Weekend & Weekday Evenings'
      }
    });

    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Return button */}
        <div className="flex items-center justify-between py-4 mb-4">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-navy-900 transition-colors bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-sportsOrange" />
            <span>Back to Discovery Home</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Auth Status:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-sportsGreen-50 text-sportsGreen-700 border border-sportsGreen-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Athlete</span>
            </span>
          </div>
        </div>

        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden mb-8">
          {/* Top Banner Graphic */}
          <div className="h-36 sm:h-48 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-semibold text-slate-200 border border-white/10">
                Connected via {user.provider ? user.provider.toUpperCase() : 'GOOGLE'}
              </span>
            </div>
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
                    {user.primarySportIcon || '🏏'}
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
                    <span>Member since {user.memberSince || '2024'}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto pt-2 sm:pt-0">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95"
                >
                  <Edit3 className="w-4 h-4 text-sportsGreen" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Profile link copied to clipboard!');
                  }}
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-900 text-xs sm:text-sm font-bold transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="p-3 bg-white rounded-xl border border-slate-200/60 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Matches Played
                </span>
                <span className="text-xl font-black text-navy-900 mt-0.5 block">
                  {user.matchesPlayed || 24}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/60 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Reliability
                </span>
                <span className="text-xl font-black text-sportsGreen mt-0.5 block">
                  {user.reliabilityScore || '98%'}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/60 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Connections
                </span>
                <span className="text-xl font-black text-navy-900 mt-0.5 block">
                  {user.connectionsCount || 18}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/60 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Community Rating
                </span>
                <span className="text-xl font-black text-sportsOrange mt-0.5 block">
                  ⭐ 4.9
                </span>
              </div>
            </div>

            {/* Bio & Looking For */}
            <div className="mt-6 space-y-3">
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {user.bio}
              </p>
              <div className="p-3.5 rounded-2xl bg-sportsGreen-50/60 border border-sportsGreen-100 flex items-start gap-2.5 text-xs text-sportsGreen-900">
                <Sparkles className="w-4 h-4 text-sportsGreen-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Currently Looking For:</strong> {user.lookingFor}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('identity')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'identity'
                ? 'bg-navy-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-navy-900 border border-slate-200'
            }`}
          >
            Multi-Sport Identity & Attributes
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'events'
                ? 'bg-navy-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-navy-900 border border-slate-200'
            }`}
          >
            <span>My Joined Events</span>
            <span className="px-2 py-0.5 rounded-full bg-sportsOrange text-white text-[10px] font-extrabold">
              {user.joinedEvents?.length || 2}
            </span>
          </button>
        </div>

        {/* Tab 1: Multi-Sport Identity */}
        {activeTab === 'identity' && (
          <div className="space-y-6">
            
            {/* Primary Sport Detailed Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2.5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                    {user.primarySportIcon || '🏏'}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-navy-900">
                        {user.primarySportLabel || 'Cricket'}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sportsGreen-50 text-sportsGreen-700 border border-sportsGreen-200">
                        Primary Sport
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Skill Rating: <strong className="text-navy-900">{user.skillLevel || 'Intermediate'}</strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="text-xs font-bold text-sportsOrange hover:text-sportsOrange-600 flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update Specs</span>
                </button>
              </div>

              {/* Sport-Specific Dynamic Schema Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {user.sportSpecific &&
                  Object.entries(user.sportSpecific).map(([key, val], idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {key}
                      </span>
                      <span className="text-xs font-bold text-navy-900 mt-0.5">
                        {val}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Secondary Sports */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-navy-900">
                    Secondary Sports & Cross-Training
                  </h3>
                  <p className="text-xs text-slate-500">
                    SportSphere allows you to play multiple sports under one verified profile.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.secondarySports?.map((secSport, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{secSport.icon}</span>
                      <div>
                        <h4 className="text-sm font-bold text-navy-900">{secSport.name}</h4>
                        <p className="text-xs text-slate-500">{secSport.trait}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-600">
                      {secSport.skillLevel}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: My Joined Events */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            {user.joinedEvents && user.joinedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.joinedEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sportsGreen-50 text-sportsGreen-700 border border-sportsGreen-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{evt.status}</span>
                        </span>
                        <span className="text-2xl">{evt.icon}</span>
                      </div>

                      <h4 className="text-base font-extrabold text-navy-900">{evt.name}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-sportsOrange" />
                        <span>{evt.location}</span>
                      </p>

                      <div className="my-3 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-semibold text-navy-800">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-sportsOrange" />
                          <span>{evt.day}</span>
                        </span>
                        <span className="text-slate-500">{evt.time}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Match Chat Available</span>
                      <button
                        onClick={() => alert(`Opening match coordination chat for ${evt.name}...`)}
                        className="font-bold text-sportsGreen-700 hover:text-sportsGreen-800 flex items-center gap-1"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Open Chat</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <p className="text-sm text-slate-500">No events joined yet.</p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Edit Profile Modal */}
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
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Primary Sport
                  </label>
                  <select
                    value={editFormData.primarySport}
                    onChange={(e) => setEditFormData({ ...editFormData, primarySport: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-navy-900 bg-white"
                  >
                    {SPORTS_LIST.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.icon} {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Skill Level
                  </label>
                  <select
                    value={editFormData.skillLevel}
                    onChange={(e) => setEditFormData({ ...editFormData, skillLevel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-navy-900 bg-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Location / Area (e.g. Gachibowli, Hyderabad)
                </label>
                <input
                  type="text"
                  value={editFormData.area}
                  onChange={(e) => setEditFormData({ ...editFormData, area: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Primary Role / Position
                </label>
                <input
                  type="text"
                  value={editFormData.primaryRole}
                  onChange={(e) => setEditFormData({ ...editFormData, primaryRole: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Looking For (Matches, Practice, Partners)
                </label>
                <input
                  type="text"
                  value={editFormData.lookingFor}
                  onChange={(e) => setEditFormData({ ...editFormData, lookingFor: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Bio
                </label>
                <textarea
                  rows={3}
                  value={editFormData.bio}
                  onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
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
                  className="px-5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-md"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
