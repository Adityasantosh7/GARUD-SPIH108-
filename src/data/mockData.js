export const SPORTS_LIST = [
  {
    id: 'cricket',
    name: 'Cricket',
    icon: '🏏',
    badge: 'Matches • Teams',
    description: 'Leather ball, tennis ball, turf leagues, and net practice sessions.',
    attributes: [
      { label: 'Batting Hand', example: 'Right-handed' },
      { label: 'Bowling Style', example: 'Right-arm Fast Medium' },
      { label: 'Role', example: 'All-rounder' },
      { label: 'Format', example: 'T20 / Weekend 30-Overs' }
    ]
  },
  {
    id: 'football',
    name: 'Football',
    icon: '⚽',
    badge: 'Pickups • Turf 7v7',
    description: 'Turf games, 11-a-side weekend friendlies, and club tryouts.',
    attributes: [
      { label: 'Position', example: 'Central Midfielder (CM)' },
      { label: 'Preferred Foot', example: 'Left / Both' },
      { label: 'Match Frequency', example: '2x per week' },
      { label: 'Preferred Ground', example: 'Artificial Turf 7v7' }
    ]
  },
  {
    id: 'badminton',
    name: 'Badminton',
    icon: '🏸',
    badge: 'Singles • Doubles',
    description: 'Wooden indoor court sparring, singles drills, and local open cups.',
    attributes: [
      { label: 'Play Style', example: 'Attacking / Smash specialist' },
      { label: 'Format', example: 'Singles & Mixed Doubles' },
      { label: 'Court Type', example: 'Indoor Wooden / Synthetic' },
      { label: 'Looking For', example: 'Sparring partner (Adv-Intermediate)' }
    ]
  },
  {
    id: 'swimming',
    name: 'Swimming',
    icon: '🏊',
    badge: 'Training • Personal Best',
    description: 'Lap swimming, open water training, and time trials.',
    attributes: [
      { label: 'Primary Stroke', example: 'Freestyle & Butterfly' },
      { label: '50m Freestyle PB', example: '28.4 seconds' },
      { label: 'Pool Preference', example: '50m Olympic / Heated Indoor' },
      { label: 'Goal', example: 'Triathlon Swim Training' }
    ]
  },
  {
    id: 'athletics',
    name: 'Athletics',
    icon: '🏃',
    badge: 'Pace • Track Sessions',
    description: 'Endurance distance runs, sprint intervals, and marathon groups.',
    attributes: [
      { label: 'Primary Discipline', example: '10K Road & Half Marathon' },
      { label: 'Average Pace', example: '4:55 min/km' },
      { label: 'Weekly Mileage', example: '40-50 km' },
      { label: 'Training Routine', example: 'Early Morning Weekend Runs' }
    ]
  },
  {
    id: 'chess',
    name: 'Chess',
    icon: '♟️',
    badge: 'Rating • Events',
    description: 'Rapid, Blitz sparring, classical OTB boards, and weekend swiss events.',
    attributes: [
      { label: 'FIDE / Platform Rating', example: '1840 Elo' },
      { label: 'Favorite Time Control', example: '10+0 Rapid / 3+2 Blitz' },
      { label: 'Opening Repertoire', example: "Queen's Gambit & Sicilian" },
      { label: 'Focus', example: 'OTB Practice & Tactics' }
    ]
  }
];

export const POPULAR_SEARCH_TAGS = [
  '⚡ Weekend Matches',
  '🏸 Singles Sparring',
  '🏏 Nets Practice',
  '⚽ Turf 7v7',
  '🏃 Morning 10K',
  '🏊 Lap Swimming',
  '♟️ Rapid Chess',
  '📍 Gachibowli'
];

export const MOCK_DISCOVERY_ITEMS = [
  {
    id: 'ath-1',
    type: 'athlete',
    name: 'Arjun',
    fullName: 'Arjun Varma',
    sport: 'cricket',
    sportLabel: 'Cricket',
    sportIcon: '🏏',
    skillLevel: 'Intermediate',
    location: 'Hyderabad',
    area: 'Gachibowli, Hyderabad',
    distanceNum: 2.4,
    distance: '2.4 km away',
    matchScore: 98,
    availability: 'Sat & Sun mornings',
    tags: ['Leather Ball', 'Top Order', 'Medium Fast'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    lookingFor: 'Weekend T20 teams & net practice partners',
    sportSpecific: {
      'Primary Role': 'Top-order Batsman & Off-spinner',
      'Batting Hand': 'Right Handed (Power hitter)',
      'Bowling Style': 'Right-arm Offbreak',
      'Availability': 'Saturday & Sunday mornings',
      'Recent Activity': 'Scored 48*(24) in Hyderabad Corporate Cup'
    },
    bio: 'Playing cricket for 8+ years. Looking for competitive weekend leather-ball teams and serious nets session partners in Gachibowli.'
  },
  {
    id: 'ath-2',
    type: 'athlete',
    name: 'Priya',
    fullName: 'Priya Sharma',
    sport: 'badminton',
    sportLabel: 'Badminton',
    sportIcon: '🏸',
    skillLevel: 'Intermediate',
    location: 'Hyderabad',
    area: 'Madhapur, Hyderabad',
    distanceNum: 1.8,
    distance: '1.8 km away',
    matchScore: 96,
    availability: 'Weekday evenings (6:30 PM)',
    tags: ['Singles Sparring', 'Wooden Court', 'Drops & Smashes'],
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    lookingFor: 'Practice partners & mixed doubles partner',
    sportSpecific: {
      'Play Style': 'All-court & Quick Reflexes',
      'Dominant Hand': 'Right',
      'Preferred Court': 'Indoor Wooden (GamePoint / Gopichand Academy area)',
      'Availability': 'Weekday evenings (6:30 PM - 8:30 PM)',
      'Skill Note': 'Strong baseline drops and quick net interceptions'
    },
    bio: 'Regular badminton player looking for intermediate/advanced players for high-intensity rallies and doubles tournaments.'
  },
  {
    id: 'ath-3',
    type: 'athlete',
    name: 'Rahul',
    fullName: 'Rahul Sen',
    sport: 'football',
    sportLabel: 'Football',
    sportIcon: '⚽',
    skillLevel: 'Beginner',
    location: 'Hyderabad',
    area: 'Kondapur, Hyderabad',
    distanceNum: 3.1,
    distance: '3.1 km away',
    matchScore: 91,
    availability: 'Friday & Sunday nights',
    tags: ['Turf 5v5', 'Winger', 'Friendly Pickup'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    lookingFor: 'Casual turf games & 5v5 friendly pickups',
    sportSpecific: {
      'Position': 'Winger / Right Midfielder',
      'Preferred Foot': 'Right',
      'Format': '5v5 & 7v7 Artificial Turf',
      'Availability': 'Friday & Sunday evenings',
      'Focus': 'Stamina building and fun weekend matches'
    },
    bio: 'Passionate football enthusiast looking to join weekly turf pickup games with friendly, welcoming groups.'
  },
  {
    id: 'evt-1',
    type: 'event',
    name: 'Local Badminton Practice',
    title: 'Local Badminton Practice',
    sport: 'badminton',
    sportLabel: 'Badminton',
    sportIcon: '🏸',
    skillLevel: 'Intermediate',
    location: 'Hyderabad',
    area: 'Gachibowli Indoor Arena, Hyderabad',
    distanceNum: 2.0,
    distance: '2.0 km away',
    matchScore: 99,
    availability: 'Sunday 7:00 AM',
    tags: ['2 Synthetic Courts', 'Feather Shuttles', 'Rotating Doubles'],
    bannerImg: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80',
    schedule: 'Sunday • 7:00 AM - 9:00 AM',
    day: 'Sunday',
    time: '7:00 AM - 9:00 AM',
    participantsCount: 6,
    maxSpots: 8,
    spotsRemaining: 2,
    organizer: 'Gachibowli Shuttlers Club',
    sportSpecific: {
      'Format': 'Rotating Doubles & Sparring Rallies',
      'Courts Booked': '2 Synthetic Wooden Courts',
      'Shuttles Provided': 'Yonex AS-20 Feather Shuttles',
      'Entry Fee': '₹200 per player (Court split)',
      'Rules': 'Non-marking shoes mandatory'
    },
    description: 'Friendly weekend practice session open for intermediate badminton enthusiasts. We rotate courts so everyone gets balanced match time and practice.'
  },
  {
    id: 'ath-4',
    type: 'athlete',
    name: 'Ananya',
    fullName: 'Ananya Rao',
    sport: 'swimming',
    sportLabel: 'Swimming',
    sportIcon: '🏊',
    skillLevel: 'Advanced',
    location: 'Hyderabad',
    area: 'Jubilee Hills, Hyderabad',
    distanceNum: 4.5,
    distance: '4.5 km away',
    matchScore: 94,
    availability: 'Tue & Thu 6:00 AM',
    tags: ['Freestyle', '50m Olympic Pool', 'Triathlon Prep'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    lookingFor: 'Lap swimming buddy & triathlon training partner',
    sportSpecific: {
      'Primary Stroke': 'Freestyle & Breaststroke',
      'Pace': '1:32 / 100m pace',
      'Pool': '50m Olympic Pool (GHMC Complex)',
      'Routine': 'Tuesday & Thursday 6:00 AM sessions'
    },
    bio: 'State-level competitive swimmer now training for standard distance triathlons. Looking for focused morning swim buddies.'
  },
  {
    id: 'evt-2',
    type: 'event',
    name: 'Hitec 7v7 Football Clash',
    title: 'Hitec 7v7 Football Clash',
    sport: 'football',
    sportLabel: 'Football',
    sportIcon: '⚽',
    skillLevel: 'Intermediate',
    location: 'Hyderabad',
    area: 'Hitec City Turf Arena, Hyderabad',
    distanceNum: 3.6,
    distance: '3.6 km away',
    matchScore: 95,
    availability: 'Friday 8:00 PM',
    tags: ['Under Lights', 'FIFA Grade Turf', 'Bibs Provided'],
    bannerImg: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80',
    schedule: 'Friday • 8:00 PM - 10:00 PM',
    day: 'Friday',
    time: '8:00 PM - 10:00 PM',
    participantsCount: 12,
    maxSpots: 14,
    spotsRemaining: 2,
    organizer: 'Cyber City Kickers',
    sportSpecific: {
      'Format': '7 vs 7 Fast Paced Turf Match',
      'Turf Size': 'FIFA Grade Artificial Turf',
      'Bibs & Ball': 'Provided on venue',
      'Split Fee': '₹250 per player',
      'Footwear': 'Turf studs or flat trainers only'
    },
    description: 'Weekly Friday night under-lights football match. High-energy game with rotating subs, refereeing on honour system, and post-match hydration.'
  },
  {
    id: 'ath-5',
    type: 'athlete',
    name: 'Vikram',
    fullName: 'Vikram Mehta',
    sport: 'chess',
    sportLabel: 'Chess',
    sportIcon: '♟️',
    skillLevel: 'Advanced',
    location: 'Hyderabad',
    area: 'Banjara Hills, Hyderabad',
    distanceNum: 4.0,
    distance: '4.0 km away',
    matchScore: 92,
    availability: 'Saturday 4:00 PM',
    tags: ['1840 Elo', 'Rapid 15+10', 'OTB Board'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    lookingFor: 'Over-the-board Rapid sparring & tournament prep',
    sportSpecific: {
      'Rating': 'FIDE 1840 / Lichess 2120',
      'Preferred Control': '15+10 Rapid / 5+3 Blitz',
      'Venue': 'Roastery Coffee House / Board Game Lounges',
      'Focus Area': 'Endgame precision & Sicilian Najdorf preparation'
    },
    bio: 'Tournament chess player looking for serious sparring partners rated 1600+ for over-the-board clocks and analysis sessions.'
  },
  {
    id: 'evt-3',
    type: 'event',
    name: 'Sunrise 10K Community Run',
    title: 'Sunrise 10K Community Run',
    sport: 'athletics',
    sportLabel: 'Athletics',
    sportIcon: '🏃',
    skillLevel: 'Beginner',
    location: 'Hyderabad',
    area: 'KBR National Park Gate 1, Hyderabad',
    distanceNum: 3.2,
    distance: '3.2 km away',
    matchScore: 97,
    availability: 'Saturday 6:00 AM',
    tags: ['5:15 Pacers', 'Hydration Support', 'Free Event'],
    bannerImg: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&auto=format&fit=crop&q=80',
    schedule: 'Saturday • 6:00 AM',
    day: 'Saturday',
    time: '6:00 AM - 7:30 AM',
    participantsCount: 28,
    maxSpots: 50,
    spotsRemaining: 22,
    organizer: 'Hyderabad Runners Collective',
    sportSpecific: {
      'Distance': '5K Fun Loop & 10K Paced Loop',
      'Pace Groups': '5:00 / 5:45 / 6:30 min/km pacers',
      'Hydration': 'Water & electrolytes at 5K point',
      'Fee': 'Free Community Event',
      'Post Run': 'Stretching & Chai at Park Gate'
    },
    description: 'Weekly Saturday sunrise run around KBR outer loop. Group warm-up at 5:50 AM, staggered pace groups, followed by group cool down.'
  },
  {
    id: 'ath-6',
    type: 'athlete',
    name: 'Karthik',
    fullName: 'Karthik Reddy',
    sport: 'athletics',
    sportLabel: 'Athletics',
    sportIcon: '🏃',
    skillLevel: 'Intermediate',
    location: 'Hyderabad',
    area: 'Kondapur, Hyderabad',
    distanceNum: 2.9,
    distance: '2.9 km away',
    matchScore: 93,
    availability: 'Sun 5:30 AM',
    tags: ['Half Marathon', 'Tempo 5:15 Pace', 'Long Runs'],
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
    lookingFor: 'Morning long-run pacers (5:15 min/km)',
    sportSpecific: {
      'Focus': 'Hyderabad Half Marathon Prep',
      'Pace': '5:15 min/km tempo pace',
      'Distance Target': '15-18 km Sunday long runs',
      'Availability': 'Saturday & Sunday 5:30 AM'
    },
    bio: 'Preparing for my 3rd Half Marathon. Looking for disciplined runners running 5:00-5:30 pace to share the morning kilometers.'
  },
  {
    id: 'ath-7',
    type: 'athlete',
    name: 'Siddharth',
    fullName: 'Siddharth Roy',
    sport: 'cricket',
    sportLabel: 'Cricket',
    sportIcon: '🏏',
    skillLevel: 'Advanced',
    location: 'Hyderabad',
    area: 'Madhapur, Hyderabad',
    distanceNum: 1.5,
    distance: '1.5 km away',
    matchScore: 97,
    availability: 'Weekend Tournaments',
    tags: ['Wicketkeeper', 'Opener', 'Division League'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    lookingFor: 'Competitive corporate cup team & morning nets',
    sportSpecific: {
      'Primary Role': 'Wicketkeeper Batsman',
      'Batting Hand': 'Left Handed Opener',
      'Experience': 'HCA Division League Player',
      'Availability': 'Saturday matches & weekday nets 6 AM'
    },
    bio: 'Left-handed opening batsman and keeper. Playing competitive weekend matches across Hyderabad for 6+ years.'
  },
  {
    id: 'evt-4',
    type: 'event',
    name: 'Weekend Rapid Chess Blitz',
    title: 'Weekend Rapid Chess Blitz',
    sport: 'chess',
    sportLabel: 'Chess',
    sportIcon: '♟️',
    skillLevel: 'Intermediate',
    location: 'Hyderabad',
    area: 'Jubilee Hills Board Lounge, Hyderabad',
    distanceNum: 4.2,
    distance: '4.2 km away',
    matchScore: 94,
    availability: 'Sunday 4:30 PM',
    tags: ['5 Rounds Swiss', '10+0 Time Control', 'DGT Clocks'],
    bannerImg: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&auto=format&fit=crop&q=80',
    schedule: 'Sunday • 4:30 PM - 7:30 PM',
    day: 'Sunday',
    time: '4:30 PM - 7:30 PM',
    participantsCount: 16,
    maxSpots: 20,
    spotsRemaining: 4,
    organizer: 'Hyderabad Chess Knights',
    sportSpecific: {
      'Tournament Style': '5-Round Swiss System',
      'Time Control': '10 minutes per side (Rapid)',
      'Boards Provided': 'Standard Staunton wooden sets with DGT timers',
      'Registration': 'Free for club members / ₹100 for open guests'
    },
    description: 'Weekly Sunday rapid meet for chess enthusiasts. Casual analysis and timed rated matches in a cafe setting.'
  }
];

export const WORKFLOW_STEPS = [
  {
    number: '01',
    title: 'Create Your Profile',
    badge: 'Identity',
    description: 'Add your sport, skill level, location, and relevant achievements without messy forms.',
    subtext: 'Flexible schema adapts automatically whether you play Cricket, Swim, or play Chess.',
    iconName: 'UserPlus',
    color: 'emerald'
  },
  {
    number: '02',
    title: 'Discover',
    badge: 'Discovery',
    description: 'Find athletes, teams, and events based on your exact interests and nearby radius.',
    subtext: 'Filter effortlessly by sport type, distance, and skill compatibility.',
    iconName: 'Compass',
    color: 'blue'
  },
  {
    number: '03',
    title: 'Connect',
    badge: 'Network',
    description: 'Connect directly with suitable athletes, team captains, or event hosts.',
    subtext: 'No cold calls or dead WhatsApp group chats—reach players who are actively looking.',
    iconName: 'MessageSquare',
    color: 'amber'
  },
  {
    number: '04',
    title: 'Participate',
    badge: 'Action',
    description: 'Join a match, practice session, or local tournament with complete confidence.',
    subtext: 'Turn digital discovery into real-world court, turf, track, and board participation.',
    iconName: 'Trophy',
    color: 'orange'
  }
];

export const COMPARISON_DATA = {
  today: {
    title: 'TODAY (Fragmented)',
    items: [
      { text: 'Scattered across dozens of dead WhatsApp groups', negative: true },
      { text: 'Relying solely on existing personal contacts', negative: true },
      { text: 'Different isolated single-sport apps with no cross-discovery', negative: true },
      { text: 'Zero visibility for upcoming local talent and grassroots events', negative: true },
      { text: 'Matches cancel last minute due to missing 1-2 players', negative: true }
    ]
  },
  sportsphere: {
    title: 'SPORTSPHERE (Unified)',
    items: [
      { text: 'One Universal Sports Identity for every discipline', positive: true },
      { text: 'One Unified Discovery Space with localized radius filtering', positive: true },
      { text: 'Athletes + Teams + Events seamlessly interconnected', positive: true },
      { text: '1-Click Direct Connection with matched skill levels', positive: true },
      { text: 'Zero friction from profile creation to real-world participation', positive: true }
    ]
  }
};

export const VALUE_PILLARS = [
  {
    title: 'Athletes',
    icon: 'UserCheck',
    color: 'emerald',
    description: 'Find practice partners, sparring buddies, and matches beyond their existing immediate network.'
  },
  {
    title: 'Teams & Clubs',
    icon: 'ShieldCheck',
    color: 'blue',
    description: 'Discover potential players, fill open roster spots, and organize friendly scrimmages easily.'
  },
  {
    title: 'Event Organizers',
    icon: 'CalendarCheck',
    color: 'orange',
    description: 'Reach verified, active participants in their city and maximize tournament registrations.'
  },
  {
    title: 'Local Communities',
    icon: 'Users',
    color: 'purple',
    description: 'Make grassroots sports participation, public grounds, and active lifestyles genuinely accessible.'
  }
];
