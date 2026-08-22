import React, { useState, useMemo } from 'react';
import { MOCK_DISCOVERY_ITEMS, SPORTS_LIST, POPULAR_SEARCH_TAGS } from '../data/mockData';
import {
  Search,
  MapPin,
  Filter,
  Users,
  Calendar,
  ArrowRight,
  UserCheck,
  Sparkles,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  Zap,
  CheckCircle,
  Tag,
  Clock
} from 'lucide-react';

export default function DiscoveryDemo({ selectedSport, onSelectSport, onOpenModal }) {
  const [activeSportFilter, setActiveSportFilter] = useState(selectedSport || 'all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'athlete' | 'event'
  const [skillLevelFilter, setSkillLevelFilter] = useState('all'); // 'all' | 'Beginner' | 'Intermediate' | 'Advanced'
  const [maxDistance, setMaxDistance] = useState('all'); // 'all' | '2' | '3' | '5'
  const [sortBy, setSortBy] = useState('distance'); // 'distance' | 'match' | 'skill'
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Sync external sport selection
  React.useEffect(() => {
    if (selectedSport) {
      setActiveSportFilter(selectedSport);
    }
  }, [selectedSport]);

  // Filter and Sort Engine
  const filteredAndSortedItems = useMemo(() => {
    let result = MOCK_DISCOVERY_ITEMS.filter((item) => {
      // 1. Sport filter
      if (activeSportFilter !== 'all' && item.sport !== activeSportFilter) {
        return false;
      }
      // 2. Type filter
      if (filterType !== 'all' && item.type !== filterType) {
        return false;
      }
      // 3. Location filter
      if (selectedLocation !== 'all') {
        const itemArea = (item.area || '').toLowerCase();
        if (!itemArea.includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }
      // 4. Skill level filter
      if (skillLevelFilter !== 'all') {
        if (!item.skillLevel.toLowerCase().includes(skillLevelFilter.toLowerCase())) {
          return false;
        }
      }
      // 5. Distance filter
      if (maxDistance !== 'all') {
        const maxDistNum = parseFloat(maxDistance);
        if (item.distanceNum && item.distanceNum > maxDistNum) {
          return false;
        }
      }
      // 6. Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().replace(/^[⚡🏸🏏⚽🏃🏊♟️📍]\s*/, '');
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesSport = item.sportLabel.toLowerCase().includes(q);
        const matchesSkill = (item.skillLevel || '').toLowerCase().includes(q);
        const matchesArea = (item.area || '').toLowerCase().includes(q);
        const matchesLookingFor = (item.lookingFor || item.description || '').toLowerCase().includes(q);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(q));

        if (!matchesName && !matchesSport && !matchesSkill && !matchesArea && !matchesLookingFor && !matchesTags) {
          return false;
        }
      }
      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'distance') {
        return (a.distanceNum || 99) - (b.distanceNum || 99);
      }
      if (sortBy === 'match') {
        return (b.matchScore || 80) - (a.matchScore || 80);
      }
      if (sortBy === 'skill') {
        const order = { Advanced: 3, Intermediate: 2, Beginner: 1 };
        return (order[b.skillLevel] || 0) - (order[a.skillLevel] || 0);
      }
      return 0;
    });

    return result;
  }, [
    activeSportFilter,
    filterType,
    selectedLocation,
    skillLevelFilter,
    maxDistance,
    searchQuery,
    sortBy
  ]);

  const sportsFilterButtons = [
    { id: 'all', name: 'All Sports', icon: '⚡' },
    ...SPORTS_LIST.map((s) => ({ id: s.id, name: s.name, icon: s.icon }))
  ];

  const handleResetFilters = () => {
    setActiveSportFilter('all');
    setSelectedLocation('all');
    setFilterType('all');
    setSkillLevelFilter('all');
    setMaxDistance('all');
    setSortBy('distance');
    setSearchQuery('');
    if (onSelectSport) onSelectSport('all');
  };

  const hasActiveFilters =
    activeSportFilter !== 'all' ||
    selectedLocation !== 'all' ||
    filterType !== 'all' ||
    skillLevelFilter !== 'all' ||
    maxDistance !== 'all' ||
    searchQuery.trim() !== '';

  return (
    <section id="discovery-demo" className="py-20 bg-slate-100/70 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sportsOrange-50 text-sportsOrange-700 text-xs font-bold uppercase tracking-wider mb-4 border border-sportsOrange-200">
            <Sparkles className="w-3.5 h-3.5" />
            Live Search & Discovery Engine
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            Discover What's Around You
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Find active athletes, sparring partners, and nearby pickup games matched to your exact sport and radius.
          </p>
        </div>

        {/* Popular Quick Search Tags */}
        <div className="max-w-5xl mx-auto mb-6 flex items-center justify-center flex-wrap gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Quick Searches:
          </span>
          {POPULAR_SEARCH_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all active:scale-95 ${
                searchQuery === tag
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/80 shadow-xs'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Discovery Control Panel */}
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
                placeholder="Search by player name, skill, format, or court..."
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
                <option value="all">📍 All Hyderabad Hubs</option>
                <option value="Gachibowli">📍 Gachibowli</option>
                <option value="Madhapur">📍 Madhapur</option>
                <option value="Kondapur">📍 Kondapur</option>
                <option value="Hitec">📍 Hitec City</option>
                <option value="Jubilee">📍 Jubilee Hills</option>
                <option value="Banjara">📍 Banjara Hills</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>

            {/* Type Filter Buttons */}
            <div className="sm:col-span-2 flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                onClick={() => setFilterType('all')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'all'
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('athlete')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'athlete'
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                Athletes
              </button>
              <button
                onClick={() => setFilterType('event')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'event'
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                Events
              </button>
            </div>

            {/* Advanced Filters Toggle Button */}
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

          {/* Advanced Multi-Dimension Filters Drawer */}
          {showAdvancedFilters && (
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in bg-slate-50/60 p-4 rounded-2xl border">
              {/* Skill Level */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Skill Level
                </label>
                <select
                  value={skillLevelFilter}
                  onChange={(e) => setSkillLevelFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                >
                  <option value="all">⚡ Any Skill Level</option>
                  <option value="Beginner">🟢 Beginner</option>
                  <option value="Intermediate">🟡 Intermediate</option>
                  <option value="Advanced">🔴 Advanced</option>
                </select>
              </div>

              {/* Distance Radius */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Maximum Distance
                </label>
                <select
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                >
                  <option value="all">📍 Any Radius across City</option>
                  <option value="2">Within 2.0 km</option>
                  <option value="3">Within 3.0 km</option>
                  <option value="5">Within 5.0 km</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Sort Results By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40"
                >
                  <option value="distance">📍 Distance (Nearest First)</option>
                  <option value="match">⭐ Compatibility Match %</option>
                  <option value="skill">🏆 Skill Level (Adv to Beg)</option>
                </select>
              </div>
            </div>
          )}

          {/* Sport Filter Pill Buttons */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Filter by Sport:
              </span>
              <div className="flex items-center gap-3">
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sportsOrange hover:text-sportsOrange-600 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset All</span>
                  </button>
                )}
                <span className="text-xs font-semibold text-slate-500">
                  Showing <strong className="text-navy-900">{filteredAndSortedItems.length}</strong> matches
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

        {/* Results Grid */}
        {filteredAndSortedItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4 text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-navy-900">No matching athletes or events found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Try adjusting your search criteria, widening your radius, or resetting all filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 transition-colors shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredAndSortedItems.map((item) => {
              const isAthlete = item.type === 'athlete';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Top Match Score Pill */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-sportsGreen-50 text-sportsGreen-700 border border-sportsGreen-200">
                      <Zap className="w-3 h-3 text-sportsGreen-600 fill-sportsGreen-600" />
                      <span>{item.matchScore || 95}% Match</span>
                    </span>

                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                      <MapPin className="w-3 h-3 text-sportsOrange" />
                      <span>{item.distance || `${item.distanceNum} km`}</span>
                    </span>
                  </div>

                  <div>
                    {/* Card Header */}
                    <div className="flex items-start gap-3.5 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        {item.sportIcon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-lg font-black text-navy-900 group-hover:text-sportsGreen-700 transition-colors truncate">
                            {item.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                          <span className="font-bold text-navy-800">{item.sportLabel}</span>
                          <span>•</span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-600">
                            {isAthlete ? item.skillLevel : 'Event'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle Info Details */}
                    {isAthlete ? (
                      <div className="my-3 space-y-2">
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                            Looking for
                          </span>
                          <p className="text-xs font-semibold text-navy-900 leading-snug">
                            {item.lookingFor}
                          </p>
                        </div>
                        
                        {/* Tags */}
                        {item.tags && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {item.tags.map((t, idx) => (
                              <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.area && (
                          <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                            <span>📍 {item.area}</span>
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="my-3 space-y-2">
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-navy-900 flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-sportsOrange" />
                              {item.schedule || item.day}
                            </span>
                            <span className="font-bold text-sportsGreen-700 bg-sportsGreen-50 px-2 py-0.5 rounded-md border border-sportsGreen-100 text-[11px]">
                              👥 {item.participantsCount} Participants
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Event Tags */}
                        {item.tags && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {item.tags.map((t, idx) => (
                              <span key={idx} className="text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60 px-2 py-0.5 rounded-md">
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.area && (
                          <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                            <span>📍 {item.area}</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Action Button */}
                  <div className="pt-4 border-t border-slate-100 mt-2">
                    <button
                      onClick={() => onOpenModal(item)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm ${
                        isAthlete
                          ? 'bg-navy-900 text-white hover:bg-navy-800 group-hover:shadow-md'
                          : 'bg-sportsOrange text-white hover:bg-sportsOrange-600 group-hover:shadow-md'
                      }`}
                    >
                      {isAthlete ? (
                        <>
                          <UserCheck className="w-4 h-4 text-sportsGreen" />
                          <span>View Profile & Connect</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>View Event & Join</span>
                        </>
                      )}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
