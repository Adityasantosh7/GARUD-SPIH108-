import React, { useState } from 'react';
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
import Footer from './components/Footer';
import Toast from './components/Toast';

export default function App() {
  const [selectedSport, setSelectedSport] = useState('all');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const handleSelectSport = (sportId) => {
    setSelectedSport(sportId);
  };

  const handleOpenModal = (item) => {
    setActiveModalItem(item);
  };

  const handleCloseModal = () => {
    setActiveModalItem(null);
  };

  const handleActionSuccess = (msg) => {
    setToastMessage(msg);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-navy-900 selection:bg-sportsGreen-100 selection:text-sportsGreen-800">
      {/* Navigation */}
      <Navbar />

      {/* Main Story Content */}
      <main className="flex-1">
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

      {/* Action Toast Feedback */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
