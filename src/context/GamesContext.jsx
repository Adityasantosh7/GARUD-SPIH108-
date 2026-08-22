import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_GAMES, SPORTS_LIST } from '../data/mockData';

const GamesContext = createContext();

export function GamesProvider({ children }) {
  const [games, setGames] = useState(() => {
    try {
      const savedGames = localStorage.getItem('sportsphere_games');
      if (savedGames) {
        return JSON.parse(savedGames);
      }
    } catch (e) {
      console.error('Error loading games from localStorage', e);
    }
    return DEFAULT_GAMES;
  });

  // Save games to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('sportsphere_games', JSON.stringify(games));
    } catch (e) {
      console.error('Error saving games to localStorage', e);
    }
  }, [games]);

  // Helper to calculate match compatibility score
  const calculateCompatibility = (game, user) => {
    if (!user) {
      return {
        score: game.matchScore || 85,
        details: game.compatibilityDetails || {
          sameSport: true,
          similarSkill: true,
          nearby: true,
          compatibleTime: true
        }
      };
    }

    const userSports = user.sports || [user.primarySport || 'cricket'];
    const sameSport = userSports.includes(game.sport) || user.primarySport === game.sport;
    const userSkill = (user.skillLevel || 'Intermediate').toLowerCase();
    const gameSkill = (game.skillLevel || 'Intermediate').toLowerCase();
    const similarSkill = userSkill === gameSkill || gameSkill.includes('all');
    const userArea = (user.area || user.location || 'Hyderabad').toLowerCase();
    const gameArea = (game.area || game.location || 'Hyderabad').toLowerCase();
    const nearby = userArea.includes('hyderabad') || gameArea.includes('hyderabad') || (game.distanceNum || 3) <= 5;
    const compatibleTime = true; // Evenings/Weekends match default

    let score = 50;
    if (sameSport) score += 25;
    if (similarSkill) score += 15;
    if (nearby) score += 10;

    return {
      score: Math.min(score, 99),
      details: {
        sameSport,
        similarSkill,
        nearby,
        compatibleTime
      }
    };
  };

  // Join Game action
  const joinGame = (gameId, currentUser) => {
    let result = { success: false, message: '', game: null };

    setGames((prevGames) => {
      return prevGames.map((g) => {
        if (g.id !== gameId) return g;

        // Check if user already joined
        const playerName = currentUser?.name || 'You';
        const isAlreadyJoined = g.players?.some(
          (p) => p.name === playerName || p.name === `${playerName} (You)` || p.email === currentUser?.email
        );

        if (isAlreadyJoined) {
          result = { success: false, message: 'You are already registered in this game.', game: g };
          return g;
        }

        // Check if full
        if (g.currentPlayers >= g.requiredPlayers) {
          result = { success: false, message: 'This game is already full.', game: g };
          return g;
        }

        const newPlayer = {
          name: `${playerName} (You)`,
          avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          skill: currentUser?.skillLevel || 'Intermediate'
        };

        const updatedGame = {
          ...g,
          currentPlayers: g.currentPlayers + 1,
          players: [...(g.players || []), newPlayer]
        };

        result = {
          success: true,
          message: `You're in! You successfully joined "${g.title}".`,
          game: updatedGame
        };

        return updatedGame;
      });
    });

    return result;
  };

  // Leave Game action
  const leaveGame = (gameId, currentUser) => {
    let result = { success: false, message: '', game: null };

    setGames((prevGames) => {
      return prevGames.map((g) => {
        if (g.id !== gameId) return g;

        const playerName = currentUser?.name || 'You';
        const filteredPlayers = (g.players || []).filter(
          (p) => p.name !== playerName && p.name !== `${playerName} (You)` && p.email !== currentUser?.email
        );

        const updatedGame = {
          ...g,
          currentPlayers: Math.max(1, (g.currentPlayers || 1) - 1),
          players: filteredPlayers
        };

        result = {
          success: true,
          message: `You left "${g.title}". Spot has been freed.`,
          game: updatedGame
        };

        return updatedGame;
      });
    });

    return result;
  };

  // Create & Publish new Game
  const createGame = (gameData, hostUser) => {
    const sportObj = SPORTS_LIST.find((s) => s.id === gameData.sport) || SPORTS_LIST[0];

    const hostName = hostUser?.name || 'Rahul Sharma';
    const hostAvatar = hostUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';

    const newGame = {
      id: `game-${Date.now()}`,
      sport: gameData.sport,
      sportLabel: sportObj.name,
      sportIcon: sportObj.icon,
      title: gameData.title,
      venue: gameData.venue,
      area: gameData.area || 'Hyderabad',
      date: gameData.date || 'Today',
      time: gameData.time || '6:00 PM',
      skillLevel: gameData.skillLevel || 'Intermediate',
      currentPlayers: 1,
      requiredPlayers: parseInt(gameData.requiredPlayers) || 4,
      distanceNum: 1.2,
      distance: '1.2 km away (Near you)',
      matchScore: 96,
      compatibilityDetails: {
        sameSport: true,
        similarSkill: true,
        nearby: true,
        compatibleTime: true
      },
      host: {
        name: `${hostName} (Host)`,
        avatar: hostAvatar,
        skill: hostUser?.skillLevel || 'Intermediate'
      },
      players: [
        {
          name: `${hostName} (Host - You)`,
          avatar: hostAvatar,
          skill: hostUser?.skillLevel || 'Intermediate'
        }
      ],
      description: gameData.description || 'Created game on SportSphere. Join in to play together!',
      costPerPlayer: gameData.costPerPlayer || 'Free / Split at venue'
    };

    setGames((prev) => [newGame, ...prev]);
    return newGame;
  };

  const isUserInGame = (game, currentUser) => {
    if (!game || !game.players) return false;
    const playerName = currentUser?.name || 'You';
    return game.players.some(
      (p) =>
        p.name === playerName ||
        p.name === `${playerName} (You)` ||
        p.name === `${playerName} (Host - You)` ||
        p.name?.includes('You') ||
        (currentUser?.email && p.email === currentUser?.email)
    );
  };

  return (
    <GamesContext.Provider
      value={{
        games,
        joinGame,
        leaveGame,
        createGame,
        isUserInGame,
        calculateCompatibility
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}

export function useGames() {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error('useGames must be used within a GamesProvider');
  }
  return context;
}
