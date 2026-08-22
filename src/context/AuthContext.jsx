import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USER = {
  id: 'usr-1',
  name: 'Karan Verma',
  email: 'karan.verma@example.com',
  provider: 'google',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  location: 'Hyderabad',
  area: 'Gachibowli, Hyderabad',
  primarySport: 'cricket',
  primarySportLabel: 'Cricket',
  primarySportIcon: '🏏',
  skillLevel: 'Intermediate',
  bio: 'Passionate weekend all-rounder and badminton enthusiast. Looking for competitive leather-ball matches and evening singles badminton sparring.',
  lookingFor: 'Weekend T20 tournament teams & evening badminton sparring partners',
  memberSince: 'August 2024',
  reliabilityScore: '98%',
  matchesPlayed: 24,
  connectionsCount: 18,
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
      trait: 'Attacking Singles & Mixed Doubles'
    },
    {
      id: 'athletics',
      name: 'Athletics',
      icon: '🏃',
      skillLevel: 'Intermediate',
      trait: '10K Road Paces (5:10 min/km)'
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
  ]
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('sportsphere_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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

  const login = (provider = 'google', customData = {}) => {
    const newUser = {
      ...DEFAULT_USER,
      provider,
      ...customData,
      id: customData.id || `usr-${Date.now()}`
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sportsphere_user');
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        ...updatedFields
      };
    });
  };

  const addJoinedEvent = (eventItem) => {
    setUser((prev) => {
      if (!prev) return prev;
      const alreadyJoined = prev.joinedEvents?.some((e) => e.id === eventItem.id);
      if (alreadyJoined) return prev;

      const newEvent = {
        id: eventItem.id,
        name: eventItem.name || eventItem.title,
        sport: eventItem.sportLabel,
        icon: eventItem.sportIcon,
        day: eventItem.day || eventItem.schedule || 'Scheduled',
        time: eventItem.time || 'TBD',
        location: eventItem.area || eventItem.location,
        status: 'Confirmed'
      };

      return {
        ...prev,
        joinedEvents: [newEvent, ...(prev.joinedEvents || [])]
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
        updateProfile,
        addJoinedEvent,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false)
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
