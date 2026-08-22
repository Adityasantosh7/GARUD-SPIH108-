import React, { useState, useMemo } from 'react';
import { MOCK_DISCOVERY_ITEMS, SPORTS_LIST } from '../data/mockData';
import { Search, MapPin, Filter, Users, Calendar, ArrowRight, UserCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DiscoveryDemo({ selectedSport, onSelectSport, onOpenModal }) {
  const [activeSportFilter, setActiveSportFilter] = useState(selectedSport || 'all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [filterType, setFilterType] = useState('all'); // all | athlete | event
  const [searchQuery, setSearchQuery] = useState('');

  // Sync external sport selection
  React.useEffect(() => {
    if (selectedSport) {
      setActiveSportFilter(selectedSport);
    }
  }, [selectedSport]);

  const filteredItems = useMemo(() => {
    return MOCK_DISCOVERY_ITEMS.filter((item) => {
      // Sport filter
      if (activeSportFilter !== 'all' && item.sport !== activeSportFilter) {
        return false;
      }
      // Type filter (athlete vs event)
      if (filterType !== 'all' && item.type !== filterType) {
        return false;
      }
      // Location area filter
      if (selectedLocation !== 'all') {
        const itemArea = (item.area || '').toLowerCase();
        if (!itemArea.includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesSport = item.sportLabel.toLowerCase().includes(q);
        const matchesSkill = (item.skillLevel || '').toLowerCase().includes(q);
        const matchesLookingFor = (item.lookingFor || item.description || '').toLowerCase().includes(q);
        if (!matchesName && !matchesSport && !matchesSkill && !matchesLookingFor) {
          return false;
        }
      }
      return true;
    });
  }, [activeSportFilter, filterType, selectedLocation, searchQuery]);

  const sportsFilterButtons = [
    { id: 'all', name: 'All Sports', icon: '⚡' },
    ...SPORTS_LIST.map((s) => ({ id: s.id, name: s.name, icon: s.icon }))
  ];

  return (
    <section id="discovery-demo" className="py-20 bg-slate-100/70 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sportsOrange-50 text-sportsOrange-700 text-xs font-bold uppercase tracking-wider mb-4 border border-sportsOrange-200">
            <Sparkles className="w-3.5 h-3.5" />
            Core Interactive Demo
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            Discover What's Around You
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Filter by sport, location, and match type to discover active athletes and nearby games in real-time.
          </p>
        </div>

        {/* Discovery Control Panel */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-card border border-slate-200/90 mb-8 space-y-5">
          
          {/* Top Bar: Search & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by player name, skill, or format..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sportsGreen/40 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear
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
                <option value="Gachibowli">📍 Gachibowli, Hyd</option>
                <option value="Madhapur">📍 Madhapur, Hyd</option>
                <option value="Kondapur">📍 Kondapur, Hyd</option>
                <option value="Hitec">📍 Hitec City, Hyd</option>
                <option value="Jubilee">📍 Jubilee Hills, Hyd</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>

            {/* Type Filter Buttons */}
            <div className="sm:col-span-3 flex rounded-xl bg-slate-100 p-1 border border-slate-200">
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
          </div>

          {/* Sport Filter Pill Buttons */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Filter by Sport:
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Showing <strong className="text-navy-900">{filteredItems.length}</strong> matches
              </span>
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
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4 text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-navy-900">No matching athletes or events found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Try resetting your filters or selecting "All Sports" to view available players across Hyderabad.
            </p>
            <button
              onClick={() => {
                setActiveSportFilter('all');
                setSelectedLocation('all');
                setFilterType('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isAthlete = item.type === 'athlete';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                          {item.sportIcon}
                        </div>
                        <div>
                          <h3 className="text-lg font-extrabold text-navy-900 group-hover:text-sportsGreen-700 transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                            <span className="font-semibold text-navy-800">{item.sportLabel}</span>
                            <span>•</span>
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                              {isAthlete ? item.skillLevel : 'Event'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Location Badge */}
                      <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/60">
                        <MapPin className="w-3 h-3 text-sportsOrange" />
                        <span>{item.location}</span>
                      </span>
                    </div>

                    {/* Middle Info Details */}
                    {isAthlete ? (
                      <div className="my-4 space-y-2">
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                            Looking for
                          </span>
                          <p className="text-xs font-semibold text-navy-900 leading-snug">
                            {item.lookingFor}
                          </p>
                        </div>
                        {item.area && (
                          <p className="text-xs text-slate-500 flex items-center gap-1.5 px-1">
                            <span>📍 {item.area}</span>
                            <span className="text-slate-400">({item.distance})</span>
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="my-4 space-y-2">
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
                        {item.area && (
                          <p className="text-xs text-slate-500 flex items-center gap-1.5 px-1">
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
                          <span>View Profile</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>View Event</span>
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
