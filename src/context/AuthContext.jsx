import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_PERSONAS = [
  {
    id: 'usr-karan',
    name: 'Karan Verma',
    email: 'karan.verma@gmail.com',
    provider: 'google',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    location: 'Hyderabad',
    area: 'Gachibowli, Hyderabad',
    primarySport: 'cricket',
    primarySportLabel: 'Cricket',
    primarySportIcon: '🏏',
    skillLevel: 'Intermediate',
    bio: 'Weekend leather-ball all-rounder and fast bowler. Always up for competitive Sunday league matches and morning turf sessions.',
    lookingFor: 'Weekend T20 tournament teams & morning net practice',
    memberSince: 'August 2024',
    reliabilityScore: '98%',
    matchesPlayed: 28,
    connectionsCount: 19,
    sportSpecific: {
      'Primary Role': 'Middle-Order Batsman & Medium Pacer',
      'Batting Hand': 'Right Handed',
      'Bowling Style': 'Right-arm Fast Medium',
      'Preferred Format': 'T20 & 20-Over Turf Matches',
      'Availability': 'Saturday & Sunday Mornings'
    },
    secondarySports: [
      {
        id: 'badminton',
        name: 'Badminton',
        icon: '🏸',
        skillLevel: 'Intermediate',
        trait: 'Singles Sparring & Mixed Doubles'
      },
      {
        id: 'athletics',
        name: 'Athletics',
        icon: '🏃',
        skillLevel: 'Intermediate',
        trait: '10K Pace 5:15 min/km'
      }
    ],
    joinedEvents: [
      {
        id: 'evt-1',
        name: 'Local Badminton Practice',
        sport: 'Badminton',
        icon: '🏸',
        day: 'Sunday',
        time: '7:00 AM - 9:00 AM',
        location: 'Gachibowli Indoor Arena, Hyderabad',
        status: 'Confirmed'
      },
      {
        id: 'evt-2',
        name: 'Hitec 7v7 Football Clash',
        sport: 'Football',
        icon: '⚽',
        day: 'Friday',
        time: '8:00 PM - 10:00 PM',
        location: 'Hitec City Turf Arena, Hyderabad',
        status: 'Confirmed'
      }
    ],
    sentRequests: [
      {
        id: 'req-1',
        recipientName: 'Ananya Sharma',
        sport: 'Badminton',
        date: 'Today',
        message: 'Hey Ananya! Would love to spar on wooden courts this Saturday evening.',
        status: 'Pending'
      }
    ]
  },
  {
    id: 'usr-ananya',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@icloud.com',
    provider: 'apple',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    location: 'Hyderabad',
    area: 'Madhapur, Hyderabad',
    primarySport: 'badminton',
    primarySportLabel: 'Badminton',
    primarySportIcon: '🏸',
    skillLevel: 'Intermediate',
    bio: 'State-level singles player looking for aggressive sparring partners and mixed doubles tournaments in Hitec City / Madhapur.',
    lookingFor: 'Singles practice partners & doubles tournaments',
    memberSince: 'July 2024',
    reliabilityScore: '99%',
    matchesPlayed: 42,
    connectionsCount: 31,
    sportSpecific: {
      'Playing Style': 'Aggressive Baseline Smashing & Drops',
      'Preferred Court': 'Wooden & Synthetic Indoor',
      'Racquet Grip': 'Yonex Nanoflare 800 (Right Handed)',
      'Preferred Format': 'Best of 3 (21 Points BWF Rules)',
      'Availability': 'Weekday Evenings 6:30 PM'
    },
    secondarySports: [
      {
        id: 'swimming',
        name: 'Swimming',
        icon: '🏊',
        skillLevel: 'Intermediate',
        trait: 'Endurance Freestyle Laps'
      }
    ],
    joinedEvents: [
      {
        id: 'evt-1',
        name: 'Local Badminton Practice',
        sport: 'Badminton',
        icon: '🏸',
        day: 'Sunday',
        time: '7:00 AM - 9:00 AM',
        location: 'Gachibowli Indoor Arena, Hyderabad',
        status: 'Confirmed'
      }
    ],
    sentRequests: []
  },
  {
    id: 'usr-rahul',
    name: 'Rahul Sen',
    email: 'rahul.sen@github.com',
    provider: 'github',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    location: 'Hyderabad',
    area: 'Kondapur, Hyderabad',
    primarySport: 'football',
    primarySportLabel: 'Football',
    primarySportIcon: '⚽',
    skillLevel: 'Advanced',
    bio: 'Winger and playmaking midfielder. Passionate about 5v5 / 7v7 turf matches and regional corporate cups.',
    lookingFor: 'Weekend 7v7 teams and evening friendly scrimmages',
    memberSince: 'September 2024',
    reliabilityScore: '96%',
    matchesPlayed: 35,
    connectionsCount: 22,
    sportSpecific: {
      'Preferred Position': 'Left Winger / Attacking Mid',
      'Preferred Format': '5v5 & 7v7 Turf under Lights',
      'Dominant Foot': 'Left Footed',
      'Pace Rating': 'High Acceleration & Crossing',
      'Availability': 'Friday & Sunday Nights'
    },
    secondarySports: [
      {
        id: 'athletics',
        name: 'Athletics',
        icon: '🏃',
        skillLevel: 'Advanced',
        trait: 'Sprint Intervals & Agility'
      }
    ],
    joinedEvents: [
      {
        id: 'evt-2',
        name: 'Hitec 7v7 Football Clash',
        sport: 'Football',
        icon: '⚽',
        day: 'Friday',
        time: '8:00 PM - 10:00 PM',
        location: 'Hitec City Turf Arena, Hyderabad',
        status: 'Confirmed'
      }
    ],
    sentRequests: []
  },
  {
    id: 'usr-priya',
    name: 'Priya Nambiar',
    email: 'priya.tri@gmail.com',
    provider: 'phone',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    location: 'Hyderabad',
    area: 'Jubilee Hills, Hyderabad',
    primarySport: 'swimming',
    primarySportLabel: 'Swimming',
    primarySportIcon: '🏊',
    skillLevel: 'Advanced',
    bio: 'Open-water swimmer and marathon runner. Training for Olympic distance triathlon, seeking pacing partners for morning laps.',
    lookingFor: 'Lap swimming buddy & triathlon pacers',
    memberSince: 'May 2024',
    reliabilityScore: '100%',
    matchesPlayed: 54,
    connectionsCount: 40,
    sportSpecific: {
      'Primary Stroke': 'Freestyle & Butterfly',
      '50m PB': '29.4 seconds',
      'Preferred Pool': '50m Olympic Standard',
      'Weekly Volume': '8,000m - 12,000m',
      'Availability': 'Tue, Thu, Sat 6:00 AM'
    },
    secondarySports: [
      {
        id: 'athletics',
        name: 'Athletics',
        icon: '🏃',
        skillLevel: 'Advanced',
        trait: 'Half-Marathon (1h 48m)'
      },
      {
        id: 'chess',
        name: 'Chess',
        icon: '♟️',
        skillLevel: 'Intermediate',
        trait: 'Rapid 1450 Elo'
      }
    ],
    joinedEvents: [],
    sentRequests: []
  },
  {
    id: 'usr-vikram',
    name: 'Vikram Joshi',
    email: 'vikram.joshi@chess.org',
    provider: 'email',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    location: 'Hyderabad',
    area: 'Banjara Hills, Hyderabad',
    primarySport: 'chess',
    primarySportLabel: 'Chess',
    primarySportIcon: '♟️',
    skillLevel: 'Advanced',
    bio: 'FIDE rated candidate master (1840 Elo). Looking for over-the-board Rapid and Blitz sparring partners across Hyderabad.',
    lookingFor: 'OTB Rapid sparring (15+10) & weekend tournament prep',
    memberSince: 'January 2024',
    reliabilityScore: '97%',
    matchesPlayed: 76,
    connectionsCount: 45,
    sportSpecific: {
      'FIDE / Elo Rating': '1840 Elo (Rapid)',
      'Preferred Format': '15+10 Rapid & 3+2 Blitz',
      'Favorite Openings': "King's Indian & Sicilian Najdorf",
      'Board Preference': 'DGT Electronic & Wooden Staunton',
      'Availability': 'Saturday & Sunday Afternoons'
    },
    secondarySports: [
      {
        id: 'badminton',
        name: 'Badminton',
        icon: '🏸',
        skillLevel: 'Beginner',
        trait: 'Casual Weekend Doubles'
      }
    ],
    joinedEvents: [],
    sentRequests: []
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('sportsphere_user');
      if (savedUser) return JSON.parse(savedUser);
      return DEMO_PERSONAS[0]; // Default logged-in with first persona for instant exploration
    } catch (e) {
      return DEMO_PERSONAS[0];
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialTab, setAuthModalInitialTab] = useState('social'); // 'social' | 'phone' | 'email' | 'demo'

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('sportsphere_notifications');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'notif-1',
              title: 'Welcome to SportSphere!',
              description: 'Your athlete identity is active. Explore nearby athletes and events.',
              time: 'Just now',
              read: false
            }
          ];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('sportsphere_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('sportsphere_user');
      }
    } catch (e) {
      console.error('Error saving user to localStorage', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('sportsphere_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error('Error saving notifications to localStorage', e);
    }
  }, [notifications]);

  const addNotification = (title, description) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      description,
      time: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const login = (provider = 'google', customData = {}) => {
    const base = DEMO_PERSONAS[0];
    const newUser = {
      ...base,
      ...customData,
      id: customData.id || `usr-${Date.now()}`,
      provider: provider,
      memberSince: customData.memberSince || 'August 2024',
      reliabilityScore: customData.reliabilityScore || '98%',
      matchesPlayed: customData.matchesPlayed !== undefined ? customData.matchesPlayed : 12,
      connectionsCount: customData.connectionsCount !== undefined ? customData.connectionsCount : 8,
      joinedEvents: customData.joinedEvents || base.joinedEvents,
      secondarySports: customData.secondarySports || base.secondarySports,
      sentRequests: customData.sentRequests || []
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    addNotification(`Signed in via ${provider.toUpperCase()}`, `Welcome, ${newUser.name}! Your athlete profile is ready.`);
    return newUser;
  };

  const switchPersona = (personaId) => {
    const selected = DEMO_PERSONAS.find((p) => p.id === personaId) || DEMO_PERSONAS[0];
    setUser(selected);
    setIsAuthModalOpen(false);
    addNotification('Switched Athlete Persona', `Switched active profile to ${selected.name} (${selected.primarySportLabel}).`);
    return selected;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sportsphere_user');
    addNotification('Signed Out', 'You have been signed out of your athlete profile.');
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        ...updatedFields
      };
      return updated;
    });
    addNotification('Profile Updated', 'Your athlete specifications have been successfully saved.');
  };

  const addJoinedEvent = (eventItem) => {
    if (!user) {
      openAuthModal('social');
      return false;
    }

    let isAdded = false;
    setUser((prev) => {
      if (!prev) return prev;
      const alreadyJoined = prev.joinedEvents?.some((e) => e.id === eventItem.id);
      if (alreadyJoined) return prev;

      isAdded = true;
      const newEvent = {
        id: eventItem.id,
        name: eventItem.name || eventItem.title,
        sport: eventItem.sportLabel,
        icon: eventItem.sportIcon,
        day: eventItem.schedule || eventItem.day || 'Scheduled',
        time: eventItem.time || 'TBD',
        location: eventItem.area || (eventItem.location ? eventItem.location : 'Hyderabad'),
        status: 'Confirmed'
      };

      return {
        ...prev,
        joinedEvents: [newEvent, ...(prev.joinedEvents || [])]
      };
    });

    if (isAdded) {
      addNotification('Joined Event', `You're confirmed for "${eventItem.name || eventItem.title}".`);
    }
    return true;
  };

  const leaveJoinedEvent = (eventId) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        joinedEvents: (prev.joinedEvents || []).filter((e) => e.id !== eventId)
      };
    });
    addNotification('Event Canceled', 'You have left the scheduled event.');
  };

  const sendConnectionRequest = (athleteItem, customMessage) => {
    if (!user) {
      openAuthModal('social');
      return false;
    }

    const newReq = {
      id: `req-${Date.now()}`,
      recipientName: athleteItem.name,
      sport: athleteItem.sportLabel,
      icon: athleteItem.sportIcon,
      date: 'Just now',
      message: customMessage || `Hey ${athleteItem.name}! Let's connect for practice.`,
      status: 'Invite Sent'
    };

    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        sentRequests: [newReq, ...(prev.sentRequests || [])],
        connectionsCount: (prev.connectionsCount || 0) + 1
      };
    });

    addNotification('Connection Invite Sent', `Invite sent to ${athleteItem.name} (${athleteItem.sportLabel}).`);
    return true;
  };

  const addSecondarySport = (sportObj) => {
    setUser((prev) => {
      if (!prev) return prev;
      const exists = prev.secondarySports?.some((s) => s.id === sportObj.id);
      if (exists) return prev;
      return {
        ...prev,
        secondarySports: [...(prev.secondarySports || []), sportObj]
      };
    });
    addNotification('Cross-Sport Added', `Added ${sportObj.name} to your multi-sport identity.`);
  };

  const removeSecondarySport = (sportId) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        secondarySports: (prev.secondarySports || []).filter((s) => s.id !== sportId)
      };
    });
  };

  const openAuthModal = (tab = 'social') => {
    setAuthModalInitialTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        DEMO_PERSONAS,
        login,
        switchPersona,
        logout,
        updateProfile,
        addJoinedEvent,
        leaveJoinedEvent,
        sendConnectionRequest,
        addSecondarySport,
        removeSecondarySport,
        notifications,
        addNotification,
        isAuthModalOpen,
        authModalInitialTab,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
