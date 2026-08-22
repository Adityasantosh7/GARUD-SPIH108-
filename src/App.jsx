import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import WhatIsSection from './components/WhatIsSection';
import HowItWorksSection from './components/HowItWorksSection';
import DiscoveryDemo from './components/DiscoveryDemo';
import DetailModal from './components/DetailModal';
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
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const { addJoinedEvent } = useAuth();

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

  const handleOpenModal = (item) => {
    setActiveModalItem(item);
  };

  const handleCloseModal = () => {
    setActiveModalItem(null);
  };

  const handleActionSuccess = (msg) => {
    setToastMessage(msg);
    if (activeModalItem && activeModalItem.type === 'event') {
      addJoinedEvent(activeModalItem);
    }
  };

  const handleLoginSuccess = (msg) => {
    setToastMessage(msg);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-navy-900 selection:bg-sportsGreen-100 selection:text-sportsGreen-800">
      {/* Navigation with Auth State */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'profile' ? (
          <ProfilePage
            onNavigateHome={() => setCurrentView('landing')}
            onOpenDemo={() => {
              setCurrentView('landing');
              setTimeout(() => {
                const el = document.querySelector('#discovery-demo');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          />
        ) : (
          <>
            {/* 1. Hero */}
            <Hero onSelectSport={handleSelectSport} />

            {/* 2. The Problem Story */}
            <ProblemSection />

            {/* 3. What is SportSphere */}
            <WhatIsSection onSelectSport={handleSelectSport} />

            {/* 4. How It Works (4 Steps) */}
            <HowItWorksSection />

            {/* 5. Main Interactive Discovery Demo */}
            <DiscoveryDemo
              selectedSport={selectedSport}
              onSelectSport={handleSelectSport}
              onOpenModal={handleOpenModal}
            />

            {/* 6. Comparison: From Fragmented to Connected */}
            <ComparisonSection />

            {/* 7. Innovation: Built for Every Sport */}
            <InnovationSection />

            {/* 8. Why SportSphere Matters */}
            <WhyItMattersSection />

            {/* 9. Our Vision */}
            <VisionSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Detail Modal */}
      <DetailModal
        item={activeModalItem}
        isOpen={Boolean(activeModalItem)}
        onClose={handleCloseModal}
        onActionSuccess={handleActionSuccess}
      />

      {/* Authentication Modal (Google, Apple, Email) */}
      <AuthModal onLoginSuccess={handleLoginSuccess} />

      {/* Action & Auth Toast Feedback */}
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
      <AppContent />
    </AuthProvider>
  );
}
