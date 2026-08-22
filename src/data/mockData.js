export const SPORTS_LIST = [
  {
    id: 'cricket',
    name: 'Cricket',
    icon: '🏏',
    badge: 'Matches • Nets • Teams',
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
      { label: 'Looking For', example: 'Sparring partner (Intermediate)' }
    ]
  },
  {
    id: 'basketball',
    name: 'Basketball',
    icon: '🏀',
    badge: 'Full Court • 3v3 Pickups',
    description: 'Indoor hardwood courts, outdoor streetball, and weekend 5v5 pickup runs.',
    attributes: [
      { label: 'Position', example: 'Point Guard / Shooting Guard' },
      { label: 'Play Style', example: 'Playmaker & Perimeter Shooter' },
      { label: 'Format', example: '5v5 Full Court & 3v3 Half' },
      { label: 'Preferred Court', example: 'Indoor Hardwood / Synthetic' }
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
  '⚡ Today Games',
  '🏸 Badminton Doubles',
  '🏏 Weekend Cricket',
  '⚽ Turf 7v7',
  '🏀 5v5 Basketball',
  '🏊 Lap Swimming',
  '♟️ Rapid Chess',
  '📍 Gachibowli',
  '📍 Madhapur'
];

export const DEFAULT_GAMES = [
  {
    id: 'game-1',
    sport: 'badminton',
    sportLabel: 'Badminton',
    sportIcon: '🏸',
    title: 'Badminton Evening Game',
    venue: 'Nexus Sports Arena',
    area: 'Gachibowli, Hyderabad',
    date: 'Today',
    time: '6:00 PM - 8:00 PM',
    skillLevel: 'Intermediate',
    currentPlayers: 3,
    requiredPlayers: 4,
    distanceNum: 1.8,
    distance: '1.8 km away',
    matchScore: 88,
    compatibilityDetails: {
      sameSport: true,
      similarSkill: true,
      nearby: true,
      compatibleTime: true
    },
    host: {
      name: 'Vikas Rao',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      skill: 'Intermediate'
    },
    players: [
      { name: 'Vikas Rao (Host)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Priya S.', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' },
      { name: 'Arun K.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    description: 'Looking for 1 more intermediate badminton player for fast-paced doubles sparring. Wooden synthetic court booked. Non-marking shoes mandatory.',
    costPerPlayer: '₹150 (Court split)'
  },
  {
    id: 'game-2',
    sport: 'cricket',
    sportLabel: 'Cricket',
    sportIcon: '🏏',
    title: 'Weekend Cricket Match',
    venue: 'Gachibowli Stadium Nets & Turf',
    area: 'Gachibowli, Hyderabad',
    date: 'Saturday',
    time: '7:00 AM - 10:30 AM',
    skillLevel: 'Intermediate',
    currentPlayers: 8,
    requiredPlayers: 10,
    distanceNum: 2.4,
    distance: '2.4 km away',
    matchScore: 92,
    compatibilityDetails: {
      sameSport: true,
      similarSkill: true,
      nearby: true,
      compatibleTime: true
    },
    host: {
      name: 'Arjun Varma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      skill: 'Intermediate'
    },
    players: [
      { name: 'Arjun Varma (Host)', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Siddharth R.', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80' },
      { name: 'Rohit P.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Deepak T.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Manoj G.', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' },
      { name: 'Karthik N.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80' },
      { name: 'Sanjay B.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Naveen K.', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80' }
    ],
    description: '20-over leather ball practice match against corporate team. Need 2 batsmen/all-rounders with match fitness. White cricket kits preferred.',
    costPerPlayer: '₹250 (Pitch + Umpire split)'
  },
  {
    id: 'game-3',
    sport: 'football',
    sportLabel: 'Football',
    sportIcon: '⚽',
    title: 'Evening Football 7v7',
    venue: 'Cyber City Turf Club',
    area: 'Gachibowli, Hyderabad',
    date: 'Today',
    time: '7:30 PM - 9:00 PM',
    skillLevel: 'Beginner',
    currentPlayers: 7,
    requiredPlayers: 10,
    distanceNum: 2.1,
    distance: '2.1 km away',
    matchScore: 84,
    compatibilityDetails: {
      sameSport: true,
      similarSkill: false,
      nearby: true,
      compatibleTime: true
    },
    host: {
      name: 'Rahul Sen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      skill: 'Beginner'
    },
    players: [
      { name: 'Rahul Sen (Host)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Sameer J.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Arman K.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Gaurav M.', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80' },
      { name: 'Sunny P.', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' },
      { name: 'Adil H.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80' },
      { name: 'Tanmay C.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    description: 'Casual friendly 7v7 turf pickup under floodlights. High energy, friendly vibes, rotating goalkeepers. Turf shoes or sneakers only.',
    costPerPlayer: '₹200 per player'
  },
  {
    id: 'game-4',
    sport: 'badminton',
    sportLabel: 'Badminton',
    sportIcon: '🏸',
    title: 'Badminton Doubles Rallies',
    venue: 'Kukatpally Indoor Badminton Center',
    area: 'Kukatpally, Hyderabad',
    date: 'Tomorrow',
    time: '6:30 AM - 8:00 AM',
    skillLevel: 'Intermediate',
    currentPlayers: 3,
    requiredPlayers: 4,
    distanceNum: 3.5,
    distance: '3.5 km away',
    matchScore: 91,
    compatibilityDetails: {
      sameSport: true,
      similarSkill: true,
      nearby: true,
      compatibleTime: true
    },
    host: {
      name: 'Sneha Patil',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      skill: 'Intermediate'
    },
    players: [
      { name: 'Sneha Patil (Host)', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' },
      { name: 'Harish M.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Ravi T.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    description: 'Early morning high-intensity badminton session. Need one more intermediate partner for balanced doubles matches.',
    costPerPlayer: '₹175'
  },
  {
    id: 'game-5',
    sport: 'basketball',
    sportLabel: 'Basketball',
    sportIcon: '🏀',
    title: 'Weekend Basketball 5v5',
    venue: 'Madhapur Sports Complex',
    area: 'Madhapur, Hyderabad',
    date: 'Sunday',
    time: '5:30 PM - 7:30 PM',
    skillLevel: 'Intermediate',
    currentPlayers: 8,
    requiredPlayers: 10,
    distanceNum: 2.8,
    distance: '2.8 km away',
    matchScore: 89,
    compatibilityDetails: {
      sameSport: true,
      similarSkill: true,
      nearby: true,
      compatibleTime: true
    },
    host: {
      name: 'Rohan Mehra',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
      skill: 'Intermediate'
    },
    players: [
      { name: 'Rohan Mehra (Host)', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80' },
      { name: 'Tarun V.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Abhishek D.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Farhan S.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Kunal B.', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' },
      { name: 'Aditya P.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80' },
      { name: 'Varun K.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Jatin N.', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80' }
    ],
    description: 'Full-court 5v5 pickup runs on synthetic outdoor court. Looking for 2 active players with solid hustle and team passing mindset.',
    costPerPlayer: 'Free Community Court'
  },
  {
    id: 'game-6',
    sport: 'swimming',
    sportLabel: 'Swimming',
    sportIcon: '🏊',
    title: 'Morning Swim Laps & Pace Training',
    venue: 'GHMC Olympic Aquatics Complex',
    area: 'Jubilee Hills, Hyderabad',
    date: 'Tuesday',
    time: '6:00 AM - 7:30 AM',
    skillLevel: 'Advanced',
    currentPlayers: 2,
    requiredPlayers: 4,
    distanceNum: 4.2,
    distance: '4.2 km away',
    matchScore: 82,
    compatibilityDetails: {
      sameSport: false,
      similarSkill: true,
      nearby: false,
      compatibleTime: true
    },
    host: {
      name: 'Ananya Rao',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      skill: 'Advanced'
    },
    players: [
      { name: 'Ananya Rao (Host)', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80' },
      { name: 'Devendra M.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' }
    ],
    description: 'Structured 50m lap swimming session focusing on freestyle interval pace (1:35/100m) and endurance conditioning.',
    costPerPlayer: 'Pool Entry ₹100'
  },
  {
    id: 'game-7',
    sport: 'chess',
    sportLabel: 'Chess',
    sportIcon: '♟️',
    title: 'Rapid Chess Meetup (10+0)',
    venue: 'Roastery Coffee House',
    area: 'Banjara Hills, Hyderabad',
    date: 'Sunday',
    time: '4:00 PM - 7:00 PM',
    skillLevel: 'Intermediate',
    currentPlayers: 5,
    requiredPlayers: 8,
    distanceNum: 3.9,
    distance: '3.9 km away',
    matchScore: 87,
    compatibilityDetails: {
      sameSport: true,
      similarSkill: true,
      nearby: true,
      compatibleTime: true
    },
    host: {
      name: 'Vikram Mehta',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      skill: 'Intermediate (1840 Elo)'
    },
    players: [
      { name: 'Vikram Mehta (Host)', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Nikhil S.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Praveen G.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Divya M.', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' },
      { name: 'Ritesh V.', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80' }
    ],
    description: 'Over-the-board Rapid chess (10+0 and 5+3 Blitz). Clock sparring, endgame discussions, and friendly tournament brackets.',
    costPerPlayer: 'Free (Order your own beverage)'
  }
];

export const WORKFLOW_STEPS = [
  {
    number: '01',
    title: 'Create Profile',
    badge: 'Identity',
    description: 'Select your sports, skill levels, location, and availability in seconds.',
    subtext: 'Flexible identity system that adapts automatically across any sport.',
    iconName: 'UserPlus',
    color: 'emerald'
  },
  {
    number: '02',
    title: 'Discover Games',
    badge: 'Discovery',
    description: 'Browse local matches and practice sessions filtered by sport, distance, and skill.',
    subtext: 'Instantly view available spots, venues, and compatibility match scores.',
    iconName: 'Compass',
    color: 'blue'
  },
  {
    number: '03',
    title: 'Connect & Join',
    badge: 'Match',
    description: 'Claim your spot with 1-click Join Game and get confirmed on the player roster.',
    subtext: 'No unsearchable chat groups or ghosted invites—direct roster confirmation.',
    iconName: 'MessageSquare',
    color: 'amber'
  },
  {
    number: '04',
    title: 'Actually Play',
    badge: 'Play',
    description: 'Show up to the court, turf, pool, or board and turn your intention into real games.',
    subtext: 'From wanting to play to actually stepping onto the field.',
    iconName: 'Trophy',
    color: 'orange'
  }
];

export const COMPARISON_DATA = {
  today: {
    title: 'TODAY (Fragmented)',
    items: [
      { text: 'Scattered across unorganized, noisy chat groups', negative: true },
      { text: 'Relying exclusively on existing immediate personal contacts', negative: true },
      { text: 'Isolated single-sport apps with zero cross-discovery', negative: true },
      { text: 'Matches constantly cancelled due to missing 1-2 players', negative: true },
      { text: 'Incompatible skill levels leading to unbalanced games', negative: true }
    ]
  },
  sportsphere: {
    title: 'SPORTSPHERE (Unified)',
    items: [
      { text: 'One Unified Profile for all your sports disciplines', positive: true },
      { text: 'Real-time Discover Games hub with hyper-local radius search', positive: true },
      { text: '1-Click Join Game with live player count updates', positive: true },
      { text: 'Create and publish your own game in under 30 seconds', positive: true },
      { text: 'Clear compatibility scores to ensure balanced matches', positive: true }
    ]
  }
};

export const VALUE_PILLARS = [
  {
    title: 'Athletes & Players',
    icon: 'UserCheck',
    color: 'emerald',
    description: 'Find compatible players, sparring buddies, and open matches within minutes.'
  },
  {
    title: 'Teams & Groups',
    icon: 'ShieldCheck',
    color: 'blue',
    description: 'Fill open roster spots quickly and prevent match cancellations.'
  },
  {
    title: 'Sports Venues',
    icon: 'CalendarCheck',
    color: 'orange',
    description: 'Connect with active local sporting groups and maximize court utilization.'
  },
  {
    title: 'Local Communities',
    icon: 'Users',
    color: 'purple',
    description: 'Make grassroots sports accessible, healthy, and easy for everyone nearby.'
  }
];
