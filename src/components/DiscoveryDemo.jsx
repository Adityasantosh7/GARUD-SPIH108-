import React, { useState, useMemo } from 'react';
import { SPORTS_LIST, POPULAR_SEARCH_TAGS } from '../data/mockData';
import { useGames } from '../context/GamesContext';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Users,
  Award,
  Zap,
  CheckCircle2,
  SlidersHorizontal,
  RotateCcw,
  PlusCircle,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';

export default function DiscoveryDemo({
  selectedSport,
  onSelectSport,
  onOpenGameDetails,
  onOpenCreateGame
}) {
  const { games, isUserInGame, joinGame, calculateCompatibility } = useGames();
  const { user } = useAuth();

  const [activeSportFilter, setActiveSportFilter] = useState(selectedSport || 'all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [skillLevelFilter, setSkillLevelFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all'); // 'all' | 'Today' | 'Tomorrow' | 'Weekend'
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Sync external sport selection
  React.useEffect(() => {
    if (selectedSport) {
      setActiveSportFilter(selectedSport);
    }
  }, [selectedSport]);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // 1. Sport filter
      if (activeSportFilter !== 'all' && game.sport !== activeSportFilter) {
        return false;
      }
      // 2. Location filter
      if (selectedLocation !== 'all') {
        const gameArea = `${game.area || ''} ${game.venue || ''}`.toLowerCase();
        if (!gameArea.includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }
      // 3. Skill Level filter
      if (skillLevelFilter !== 'all') {
        if (!game.skillLevel.toLowerCase().includes(skillLevelFilter.toLowerCase()) && !game.skillLevel.toLowerCase().includes('all')) {
          return false;
        }
      }
      // 4. Date filter
      if (dateFilter !== 'all') {
        const gameDate = (game.date || '').toLowerCase();
        if (dateFilter === 'Weekend') {
          if (!gameDate.includes('saturday') && !gameDate.includes('sunday') && !gameDate.includes('weekend')) {
            return false;
          }
        } else if (!gameDate.includes(dateFilter.toLowerCase())) {
          return false;
        }
      }
      // 5. Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().replace(/^[⚡🏸🏏⚽🏀🏃🏊♟️📍]\s*/, '');
        const matchesTitle = game.title.toLowerCase().includes(q);
        const matchesSport = game.sportLabel.toLowerCase().includes(q);
        const matchesVenue = game.venue.toLowerCase().includes(q);
        const matchesArea = (game.area || '').toLowerCase().includes(q);
        const matchesSkill = game.skillLevel.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSport && !matchesVenue && !matchesArea && !matchesSkill) {
          return false;
        }
      }
      return true;
    });
  }, [games, activeSportFilter, selectedLocation, skillLevelFilter, dateFilter, searchQuery]);

  const sportsFilterButtons = [
    { id: 'all', name: 'All Sports', icon: '⚡' },
    ...SPORTS_LIST.map((s) => ({ id: s.id, name: s.name, icon: s.icon }))
  ];

  const handleResetFilters = () => {
    setActiveSportFilter('all');
    setSelectedLocation('all');
    setSkillLevelFilter('all');
    setDateFilter('all');
    setSearchQuery('');
    if (onSelectSport) onSelectSport('all');
  };

  const hasActiveFilters =
    activeSportFilter !== 'all' ||
    selectedLocation !== 'all' ||
    skillLevelFilter !== 'all' ||
    dateFilter !== 'all' ||
    searchQuery.trim() !== '';

  return (
    <section id="discovery-demo" className="py-20 bg-slate-100/70 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Create Game Action */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-6xl mx-auto">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sportsOrange-50 text-sportsOrange-700 text-xs font-bold uppercase tracking-wider mb-3 border border-sportsOrange-200">
              <Zap className="w-3.5 h-3.5" />
              Live Game Discovery
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
              Discover Games Around You
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Find open matches, choose your sport, and claim your spot in seconds.
            </p>
          </div>

          <button
            onClick={onOpenCreateGame}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-sportsOrange hover:bg-sportsOrange-600 text-white font-extrabold text-sm shadow-lg shadow-sportsOrange/25 hover:shadow-xl transition-all active:scale-95 shrink-0"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Create a Game</span>
          </button>
        </div>

        {/* Quick Search Tag Pills */}
        <div className="max-w-6xl mx-auto mb-6 flex items-center justify-center sm:justify-start flex-wrap gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Quick Filter:
          </span>
          {POPULAR_SEARCH_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all active:scale-95 ${
                searchQuery === tag
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-xs'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Filter Control Box */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-card border border-slate-200/90 mb-8 space-y-5 max-w-6xl mx-auto">
          
          {/* Main Search & Location Row */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
            {/* Search Input */}
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by game title, venue, or sport..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40 focus:bg-white transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Location Selector */}
            <div className="sm:col-span-3 relative">
              <MapPin className="w-4 h-4 text-sportsOrange absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-navy-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sportsGreen/40 focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="all">📍 All Locations (Hyderabad)</option>
                <option value="Gachibowli">📍 Gachibowli</option>
                <option value="Madhapur">📍 Madhapur</option>
                <option value="Kukatpally">📍 Kukatpally</option>
                <option value="Kondapur">📍 Kondapur</option>
                <option value="Hitec">📍 Hitec City</option>
                <option value="Jubilee">📍 Jubilee Hills</option>
                <option value="Banjara">📍 Banjara Hills</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>

            {/* Date Quick Selector */}
            <div className="sm:col-span-2 relative">
              <Calendar className="w-4 h-4 text-sportsOrange absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-navy-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sportsGreen/40 focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="all">Any Date</option>
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Weekend">This Weekend</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>

            {/* Advanced Filters Button */}
            <div className="sm:col-span-2">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                  showAdvancedFilters
                    ? 'bg-navy-900 text-white border-navy-900 shadow-sm'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-sportsGreen" />
                <span>{showAdvancedFilters ? 'Hide Filters' : 'More Filters'}</span>
              </button>
            </div>
          </div>

          {/* Advanced Drawer */}
          {showAdvancedFilters && (
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in bg-slate-50/60 p-4 rounded-2xl border">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Filter by Skill Level
                </label>
                <select
                  value={skillLevelFilter}
                  onChange={(e) => setSkillLevelFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                >
                  <option value="all">⚡ All Skill Levels</option>
                  <option value="Beginner">🟢 Beginner</option>
                  <option value="Intermediate">🟡 Intermediate</option>
                  <option value="Advanced">🔴 Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Multi-Sport Support
                </label>
                <p className="text-xs text-slate-500 pt-1">
                  SportSphere seamlessly handles Cricket, Football, Badminton, Basketball, Swimming, Chess and easily extends to more disciplines.
                </p>
              </div>
            </div>
          )}

          {/* Sport Selector Pills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Choose Sport:
              </span>
              <div className="flex items-center gap-3">
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sportsOrange hover:text-sportsOrange-600 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Filters</span>
                  </button>
                )}
                <span className="text-xs font-semibold text-slate-500">
                  Showing <strong className="text-navy-900">{filteredGames.length}</strong> available games
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {sportsFilterButtons.map((btn) => {
                const isActive = activeSportFilter === btn.id;
                return (
                  <button
                    key={btn.id}
                    onClick={() => {
                      setActiveSportFilter(btn.id);
                      if (onSelectSport) onSelectSport(btn.id);
                    }}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 ${
                      isActive
                        ? 'bg-navy-900 text-white shadow-md shadow-navy-900/20 ring-2 ring-navy-900/10'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <span>{btn.icon}</span>
                    <span>{btn.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-sportsGreen ml-0.5"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Games Results Grid */}
        {filteredGames.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4 text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-navy-900">No games found for this selection</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Be the first to organize a match in your locality or adjust your sport filter!
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Reset Filters
              </button>
              <button
                onClick={onOpenCreateGame}
                className="px-5 py-2.5 rounded-xl bg-sportsOrange text-white text-xs font-bold hover:bg-sportsOrange-600 shadow-md"
              >
                Create This Game
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredGames.map((game) => {
              const isJoined = isUserInGame(game, user);
              const isFull = game.currentPlayers >= game.requiredPlayers;
              const spotsLeft = Math.max(0, game.requiredPlayers - game.currentPlayers);
              const compatibility = calculateCompatibility(game, user);

              return (
                <div
                  key={game.id}
                  onClick={() => onOpenGameDetails(game)}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-pointer relative overflow-hidden"
                >
                  {/* Top Bar: Compatibility Badge + Distance */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-sportsGreen-50 text-sportsGreen-700 border border-sportsGreen-200">
                      <Zap className="w-3 h-3 text-sportsGreen-600 fill-sportsGreen-600" />
                      <span>{compatibility.score}% Match</span>
                    </span>

                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                      <MapPin className="w-3 h-3 text-sportsOrange" />
                      <span>{game.distance || `${game.distanceNum || 2.0} km`}</span>
                    </span>
                  </div>

                  <div>
                    {/* Game Title & Sport */}
                    <div className="flex items-start gap-3.5 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        {game.sportIcon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-sportsGreen-700 uppercase tracking-wider">
                            {game.sportLabel}
                          </span>
                          <span>•</span>
                          <span className="text-[11px] font-semibold text-slate-500">
                            ⭐ {game.skillLevel}
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-navy-900 group-hover:text-sportsGreen-700 transition-colors truncate mt-0.5">
                          {game.title}
                        </h3>
                      </div>
                    </div>

                    {/* Logistics Card */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 mb-4">
                      <div className="text-xs text-navy-900 font-semibold flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-sportsOrange shrink-0" />
                        <span className="truncate">{game.venue}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <strong className="text-navy-900">{game.date}</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{game.time}</span>
                        </span>
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                        <span className="text-slate-500 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-sportsGreen-600" />
                          <span>Players Roster:</span>
                        </span>
                        <span className="font-extrabold text-navy-900">
                          {game.currentPlayers} / {game.requiredPlayers} Players
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenGameDetails(game);
                      }}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm ${
                        isJoined
                          ? 'bg-sportsGreen text-white shadow-sportsGreen/20'
                          : isFull
                          ? 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          : 'bg-sportsOrange text-white hover:bg-sportsOrange-600 group-hover:shadow-md'
                      }`}
                    >
                      {isJoined ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Joined ✓</span>
                        </>
                      ) : isFull ? (
                        <span>View Full Game</span>
                      ) : (
                        <>
                          <span>JOIN GAME</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
