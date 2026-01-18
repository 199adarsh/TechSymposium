import React from 'react';
import './App.css';

import ResponsiveHeroBanner from './components/responsive-hero-banner';
import { LimelightNav } from './components/dock';
import FeaturesSectionMinimal from './components/ui/bento';
import CashbackPartnersDemo from './components/ui/card';

const customNavItems = [
  {
    id: 'home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
    label: 'Home',
  },
  {
    id: 'explore',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
      </svg>
    ),
    label: 'Explore',
  },
  {
    id: 'notifications',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    ),
    label: 'Notifications',
  },
];

function App() {
  return (
    <div className="App relative min-h-screen w-full">
      <ResponsiveHeroBanner
        badgeLabel="New"
        badgeText="First Commercial Flight to Mars 2026"
        title="Journey Beyond Earth"
        titleLine2="Into the Cosmos"
        description="Experience the cosmos like never before. Our advanced spacecraft and cutting-edge technology make interplanetary travel accessible, safe, and unforgettable."
        primaryButtonText="Book Your Journey"
        secondaryButtonText="Watch Launch"
        ctaButtonText="Events"
      />

      <FeaturesSectionMinimal />
      <CashbackPartnersDemo />

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <LimelightNav
          className="liquid-glass-dock !rounded-full !bg-transparent !border-none px-6 py-4"
          items={customNavItems}
        />
      </div>
    </div>
  );
}

export default App;
