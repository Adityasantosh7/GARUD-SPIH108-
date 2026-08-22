import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GamesProvider } from './context/GamesContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import WhatIsSection from './components/WhatIsSection';
import HowItWorksSection from './components/HowItWorksSection';
import DiscoveryDemo from './components/DiscoveryDemo';
import GameDetailsModal from './components/GameDetailsModal';
import CreateGameModal from './components/CreateGameModal';
import ComparisonSection from './components/ComparisonSection';
import InnovationSection from './components/InnovationSection';
import WhyItMattersSection from './components/WhyItMattersSection';
import VisionSection from './components/VisionSection';
import ProfilePage from './components/ProfilePage';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import Toast from './components/Toast';

function AppContent() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'profile'
  const [selectedSport, setSelectedSport] = useState('all');
  const [activeGameItem, setActiveGameItem] = useState(null);
  const [isCreateGameOpen, setIsCreateGameOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleSelectSport = (sportId) => {
    setSelectedSport(sportId);
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.querySelector('#discovery-demo');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleOpenGameDetails = (game) => {
    setActiveGameItem(game);
  };

  const handleCloseGameDetails = () => {
    setActiveGameItem(null);
  };

  const handleOpenCreateGame = () => {
    setIsCreateGameOpen(true);
  };

  const handleCloseCreateGame = () => {
    setIsCreateGameOpen(false);
  };

  const handleGameCreated = (newGame) => {
    setToastMessage({
      title: 'Game Published! 🎉',
      description: `"${newGame.title}" is now live in Discover Games.`
    });
    if (currentView !== 'landing') {
      setCurrentView('landing');
    }
    setTimeout(() => {
      const el = document.querySelector('#discovery-demo');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleActionFeedback = (msg) => {
    setToastMessage(msg);
  };

  const handleLoginSuccess = (msg) => {
    setToastMessage(msg);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-navy-900 selection:bg-sportsGreen-100 selection:text-sportsGreen-800">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenCreateGame={handleOpenCreateGame}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'profile' ? (
          <ProfilePage
            onNavigateHome={() => setCurrentView('landing')}
            onOpenDiscover={() => {
              setCurrentView('landing');
              setTimeout(() => {
                const el = document.querySelector('#discovery-demo');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            onOpenGameDetails={handleOpenGameDetails}
          />
        ) : (
          <>
            {/* 1. Hero */}
            <Hero
              onSelectSport={handleSelectSport}
              onOpenCreateGame={handleOpenCreateGame}
              onOpenDiscover={() => {
                const el = document.querySelector('#discovery-demo');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. The Problem Story */}
            <ProblemSection />

            {/* 3. What is SportSphere */}
            <WhatIsSection onSelectSport={handleSelectSport} />

            {/* 4. How It Works (4 Steps) */}
            <HowItWorksSection />

            {/* 5. Main Core Discover Games Interface */}
            <DiscoveryDemo
              selectedSport={selectedSport}
              onSelectSport={handleSelectSport}
              onOpenGameDetails={handleOpenGameDetails}
              onOpenCreateGame={handleOpenCreateGame}
            />

            {/* 6. Comparison: From Fragmented to Connected */}
            <ComparisonSection />

            {/* 7. Innovation: Built for Every Sport */}
            <InnovationSection />

            {/* 8. Why SportSphere Matters */}
            <WhyItMattersSection />

            {/* 9. Our Vision */}
            <VisionSection onOpenDemo={() => {
              const el = document.querySelector('#discovery-demo');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Game Details Modal (Working Join Game) */}
      <GameDetailsModal
        game={activeGameItem}
        isOpen={Boolean(activeGameItem)}
        onClose={handleCloseGameDetails}
        onActionFeedback={handleActionFeedback}
      />

      {/* Interactive Create Game Modal (Working Create & Publish) */}
      <CreateGameModal
        isOpen={isCreateGameOpen}
        onClose={handleCloseCreateGame}
        onGameCreated={handleGameCreated}
      />

      {/* Authentication Modal */}
      <AuthModal onLoginSuccess={handleLoginSuccess} />

      {/* Action & Feedback Toast Notifications */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <GamesProvider>
        <AppContent />
      </GamesProvider>
    </AuthProvider>
  );
}
