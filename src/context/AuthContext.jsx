import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USER = {
  id: 'usr-1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  provider: 'google',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  location: 'Hyderabad',
  area: 'Gachibowli, Hyderabad',
  primarySport: 'badminton',
  primarySportLabel: 'Badminton',
  primarySportIcon: '🏸',
  skillLevel: 'Intermediate',
  sports: ['cricket', 'badminton', 'basketball'],
  sportsLabels: [
    { id: 'cricket', name: 'Cricket', icon: '🏏', skill: 'Intermediate' },
    { id: 'badminton', name: 'Badminton', icon: '🏸', skill: 'Intermediate' },
    { id: 'basketball', name: 'Basketball', icon: '🏀', skill: 'Intermediate' }
  ],
  availability: 'Evenings & Weekends (6:00 PM onwards)',
  bio: 'Passionate multi-sport athlete in Hyderabad. Looking for regular evening badminton doubles, weekend cricket matches, and casual 5v5 basketball runs.',
  lookingFor: 'Badminton practice partners, weekend cricket squads, and basketball pickup runs',
  reliabilityScore: '98%',
  matchesPlayed: 28,
  connectionsCount: 19
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('sportsphere_user');
      return savedUser ? JSON.parse(savedUser) : DEFAULT_USER;
    } catch (e) {
      return DEFAULT_USER;
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
      const base = prev || DEFAULT_USER;
      return {
        ...base,
        ...updatedFields
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
