import React from 'react';
import { Scale, ShieldCheck, Globe, DollarSign } from 'lucide-react';
import { Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/mockLawyers';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRegister: () => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  pendingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenRegister,
  currency,
  setCurrency,
  language,
  setLanguage,
  pendingCount
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 glass-panel backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark with legal crest */}
        <div 
          onClick={() => setActiveTab('directory')} 
          className="flex items-center gap-3 cursor-pointer group whitespace-nowrap shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-950/40 group-hover:border-amber-400/60 transition-colors">
            <Scale className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-xl font-bold font-serif-legal tracking-wider text-white">
            LexVeritas
          </span>
        </div>

        {/* Zone 2: 4–5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('directory')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'directory'
                ? 'text-amber-400 border-amber-400 font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            {language === 'ur' ? 'وکلاء ڈائریکٹری' : 'Lawyer Directory'}
          </button>

          <button
            onClick={() => setActiveTab('verification-gate')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 flex items-center gap-2 ${
              activeTab === 'verification-gate'
                ? 'text-amber-400 border-amber-400 font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400/90" />
            <span>{language === 'ur' ? 'بار کونسل تصدیق' : 'Bar Verification'}</span>
            {pendingCount > 0 && (
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('practice-management')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'practice-management'
                ? 'text-amber-400 border-amber-400 font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            {language === 'ur' ? 'پریکٹس مینجمنٹ' : 'Firm Management'}
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activeTab === 'about'
                ? 'text-amber-400 border-amber-400 font-semibold'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            {language === 'ur' ? 'ہمارے بارے میں' : 'About & Standards'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action + currency & language toggles */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Currency Selector */}
          <div className="relative hidden sm:flex items-center rounded-lg border border-white/10 bg-slate-900/60 px-2 py-1 text-xs text-slate-300">
            <DollarSign className="w-3.5 h-3.5 text-amber-400/80 mr-1" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              aria-label="Currency"
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              {Object.keys(CURRENCY_RATES).map((curr) => (
                <option key={curr} value={curr} className="bg-slate-900 text-slate-100">
                  {curr} ({CURRENCY_RATES[curr as Currency].symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 rounded-lg border border-white/10 hover:border-amber-400/40 hover:text-white transition-colors bg-slate-900/60"
            title="Toggle English / Urdu"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400/80" />
            <span className="font-semibold">{language === 'en' ? 'اردو' : 'EN'}</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenRegister}
            className="glass-button-gold px-4 py-2 text-xs sm:text-sm font-semibold text-amber-950 rounded-xl whitespace-nowrap shrink-0 shadow-lg"
          >
            {language === 'ur' ? 'وکیل رجسٹریشن' : 'Register Lawyer'}
          </button>
        </div>

      </div>

      {/* Mobile nav row */}
      <div className="md:hidden flex items-center justify-around px-4 py-2.5 border-t border-white/5 bg-slate-950/80 text-xs">
        <button
          onClick={() => setActiveTab('directory')}
          className={`py-1 ${activeTab === 'directory' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          {language === 'ur' ? 'ڈائریکٹری' : 'Directory'}
        </button>
        <button
          onClick={() => setActiveTab('verification-gate')}
          className={`py-1 flex items-center gap-1 ${activeTab === 'verification-gate' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          <span>{language === 'ur' ? 'بار تصدیق' : 'Bar Gate'}</span>
          {pendingCount > 0 && (
            <span className="text-[10px] px-1 rounded bg-amber-500/20 text-amber-300">
              {pendingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('practice-management')}
          className={`py-1 ${activeTab === 'practice-management' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          {language === 'ur' ? 'مینجمنٹ' : 'Management'}
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`py-1 ${activeTab === 'about' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          {language === 'ur' ? 'تعارف' : 'About'}
        </button>
      </div>
    </header>
  );
};
