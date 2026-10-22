/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { LawyerDirectoryGrid } from './components/LawyerDirectoryGrid';
import { LawyerDetailModal } from './components/LawyerDetailModal';
import { LawyerRegistrationModal } from './components/LawyerRegistrationModal';
import { BarVerificationGate } from './components/BarVerificationGate';
import { PracticeManagement } from './components/PracticeManagement';
import { AboutSection } from './components/AboutSection';
import { ClientOutreachModal } from './components/ClientOutreachModal';
import { Footer } from './components/Footer';

import { Lawyer, FilterState, Currency, Language, ConsultationBooking } from './types';
import { INITIAL_LAWYERS } from './data/mockLawyers';

export default function App() {
  const [lawyers, setLawyers] = useState<Lawyer[]>(INITIAL_LAWYERS);
  const [activeTab, setActiveTab] = useState<string>('directory');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [language, setLanguage] = useState<Language>('en');

  // Multi-criteria filter state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    country: 'All Countries',
    city: 'All Cities',
    specialization: 'All Specializations',
    minExperience: 0,
    maxFeeUSD: 600,
    sortBy: 'rating',
    onlyFeatured: false
  });

  // Modals state
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [outreachLawyer, setOutreachLawyer] = useState<Lawyer | null>(null);
  const [outreachMode, setOutreachMode] = useState<'consultation' | 'email'>('consultation');

  // Bookings / Client pipeline state
  const [bookings, setBookings] = useState<ConsultationBooking[]>([
    {
      id: 'LEX-BK-741920',
      lawyerId: 'law-1',
      lawyerName: 'Barrister Tariq Hassan, ASC',
      clientName: 'Habib Bank Consortium / M. Asif',
      clientEmail: 'asif.m@hbl-consortium.pk',
      clientPhone: '+92 300 4829102',
      serviceType: 'In-Office Conference',
      preferredDate: '2026-10-24',
      preferredTime: '11:00 AM',
      caseSummary: 'Cross-border multi-million dollar corporate debt restructuring and regulatory compliance before the High Court.',
      urgency: 'High Priority',
      submittedAt: '2026-10-21T18:30:00Z',
      status: 'Confirmed'
    },
    {
      id: 'LEX-BK-582104',
      lawyerId: 'law-2',
      lawyerName: 'Eleanor Vance, KC',
      clientName: 'Astraea Renewable Holdings Ltd',
      clientEmail: 'counsel@astraea-energy.co.uk',
      clientPhone: '+44 20 7192 4810',
      serviceType: 'Virtual Video Consultation',
      preferredDate: '2026-10-25',
      preferredTime: '03:30 PM',
      caseSummary: 'International arbitration seating under LCIA rules regarding North Sea concession agreements.',
      urgency: 'Normal',
      submittedAt: '2026-10-21T14:15:00Z',
      status: 'Confirmed'
    },
    {
      id: 'LEX-BK-918231',
      lawyerId: 'law-3',
      lawyerName: 'Marcus Sterling, Esq.',
      clientName: 'Vanguard Capital Partners',
      clientEmail: 'legal@vanguardcp.com',
      clientPhone: '+1 212 901 8832',
      serviceType: 'Virtual Video Consultation',
      preferredDate: '2026-10-23',
      preferredTime: '10:00 AM',
      caseSummary: 'SEC compliance inquiry review and pre-trial defense strategy for algorithmic fund.',
      urgency: 'Urgent (24h)',
      submittedAt: '2026-10-21T19:00:00Z',
      status: 'Confirmed'
    }
  ]);

  // Handlers
  const handleRegisterSuccess = (newLawyer: Lawyer) => {
    setLawyers(prev => [newLawyer, ...prev]);
  };

  const handleApproveLawyer = (id: string) => {
    setLawyers(prev =>
      prev.map(lawyer =>
        lawyer.id === id ? { ...lawyer, status: 'verified' as const } : lawyer
      )
    );
  };

  const handleRejectLawyer = (id: string) => {
    setLawyers(prev =>
      prev.map(lawyer =>
        lawyer.id === id ? { ...lawyer, status: 'rejected' as const } : lawyer
      )
    );
  };

  const handleBookConsultation = (lawyer: Lawyer) => {
    setOutreachLawyer(lawyer);
    setOutreachMode('consultation');
  };

  const handleEmailInquiry = (lawyer: Lawyer) => {
    setOutreachLawyer(lawyer);
    setOutreachMode('email');
  };

  const handleBookingSubmitted = (newBooking: ConsultationBooking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleSearchSubmit = () => {
    setActiveTab('directory');
    const elem = document.getElementById('directory-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pendingCount = lawyers.filter(l => l.status === 'pending').length;

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col ${language === 'ur' ? 'font-urdu' : ''}`}>
      
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRegister={() => setIsRegisterOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
        pendingCount={pendingCount}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'directory' && (
          <>
            {/* Hero Banner with Glassmorphism, 3D badge and quick filters */}
            <HeroBanner
              filters={filters}
              setFilters={setFilters}
              onSearchSubmit={handleSearchSubmit}
              language={language}
              onOpenRegister={() => setIsRegisterOpen(true)}
            />

            {/* Main Lawyer Directory Grid with Multi-Criteria Search & Filtering */}
            <LawyerDirectoryGrid
              lawyers={lawyers}
              filters={filters}
              setFilters={setFilters}
              currency={currency}
              language={language}
              onSelectLawyer={(lawyer) => setSelectedLawyer(lawyer)}
              onBookConsultation={handleBookConsultation}
              onEmailInquiry={handleEmailInquiry}
              onOpenRegister={() => setIsRegisterOpen(true)}
            />
          </>
        )}

        {activeTab === 'verification-gate' && (
          <BarVerificationGate
            lawyers={lawyers}
            onApprove={handleApproveLawyer}
            onReject={handleRejectLawyer}
            language={language}
          />
        )}

        {activeTab === 'practice-management' && (
          <PracticeManagement
            bookings={bookings}
            lawyers={lawyers}
            currency={currency}
            language={language}
            onOpenRegister={() => setIsRegisterOpen(true)}
          />
        )}

        {activeTab === 'about' && (
          <AboutSection
            language={language}
            onOpenRegister={() => setIsRegisterOpen(true)}
            onExploreDirectory={() => setActiveTab('directory')}
          />
        )}
      </main>

      {/* Lawyer Detailed Dossier Modal */}
      <LawyerDetailModal
        lawyer={selectedLawyer}
        onClose={() => setSelectedLawyer(null)}
        currency={currency}
        language={language}
        onBookConsultation={handleBookConsultation}
        onEmailInquiry={handleEmailInquiry}
      />

      {/* Lawyer Registration & Bar Security Gate Modal */}
      <LawyerRegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
        language={language}
      />

      {/* Direct Client Outreach & Consultation Booking Modal */}
      <ClientOutreachModal
        isOpen={!!outreachLawyer}
        onClose={() => setOutreachLawyer(null)}
        lawyer={outreachLawyer}
        initialMode={outreachMode}
        onBookingSubmitted={handleBookingSubmitted}
        currency={currency}
        language={language}
      />

      {/* Glassmorphic Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenRegister={() => setIsRegisterOpen(true)}
        language={language}
      />

    </div>
  );
}
