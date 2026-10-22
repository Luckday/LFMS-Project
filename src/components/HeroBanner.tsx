import React from 'react';
import { Search, MapPin, Briefcase, ShieldCheck, ArrowRight, Award, Gavel, Scale } from 'lucide-react';
import { FilterState, Language } from '../types';
import { COUNTRIES, SPECIALIZATIONS } from '../data/mockLawyers';

interface HeroBannerProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onSearchSubmit: () => void;
  language: Language;
  onOpenRegister: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  filters,
  setFilters,
  onSearchSubmit,
  language,
  onOpenRegister
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-white/10">
      {/* Background Hero Image with Measured Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_law_firm_glass_1792638622434.jpg"
          alt="Prestigious Law Firm Office Glass View"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Dual atmospheric scrims for high contrast and glowing glass feeling */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        
        {/* Subtle radial gold & blue light spheres */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value proposition and headline */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial trust marker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold tracking-wide text-amber-300">
                {language === 'ur'
                  ? '۱۰۰٪ بار کونسل سے تصدیق شدہ قانونی ماہرین'
                  : '100% Bar Council Verified Legal Practitioners'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif-legal tracking-tight text-white leading-tight">
              {language === 'ur' ? (
                <>
                  اعلیٰ درجے کے <span className="text-amber-400">قانونی مشیران</span> اور لائیر ڈائریکٹری
                </>
              ) : (
                <>
                  Elite Legal Counsel, <br />
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                    Instituted Upon Truth.
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {language === 'ur'
                ? 'پاکستان، برطانیہ، امریکہ، چین اور خلیجی ممالک میں سپریم کورٹ اور ہائی کورٹ کے معزز وکلاء، انٹرنیشنل آربٹریشنرز اور کارپوریٹ ماہرین سے براہ راست رابطہ اور مشاورت حاصل کریں۔'
                : 'Connect with verified advocates, King’s Counsel, state bar litigators, and corporate partners across Pakistan, United Kingdom, USA, UAE, and China with strict Bar Council authentication.'}
            </p>

            {/* Quick Action Link buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onSearchSubmit}
                className="glass-button-gold px-6 py-3 rounded-xl font-semibold text-amber-950 flex items-center gap-2 shadow-xl cursor-pointer"
              >
                <span>{language === 'ur' ? 'ڈائریکٹری تلاش کریں' : 'Explore Directory'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenRegister}
                className="glass-button-subtle px-6 py-3 rounded-xl font-semibold text-slate-200 hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <Gavel className="w-4 h-4 text-amber-400" />
                <span>{language === 'ur' ? 'بطور وکیل رجسٹر ہوں' : 'Lawyer Registration'}</span>
              </button>
            </div>

            {/* Live Metrics strip */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">2,840+</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'ur' ? 'تصدیق شدہ وکلاء' : 'Verified Attorneys'}
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 tabular-nums">98.4%</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'ur' ? 'کامیاب قانونی مقدمات' : 'Favorable Outcomes'}
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">5</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'ur' ? 'عالمی دائرہ کار' : 'Key Jurisdictions'}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Floating Glass Insignia and Quick Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* 3D Glass Emblem Card */}
            <div className="relative w-full max-w-md glass-panel-elevated rounded-3xl p-6 border border-white/15 animate-float-3d">
              <div className="flex items-center gap-4 pb-5 border-b border-white/10">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-amber-400/30 shadow-inner shrink-0 bg-slate-900/80">
                  <img
                    src="/src/assets/images/bar_council_seal_glass_1792638623331.jpg"
                    alt="Bar Council Seal Glass"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                      Authenticity Guarantee
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <h2 className="text-lg font-bold text-white font-serif-legal">
                    Bar ID Verification Gate
                  </h2>
                  <p className="text-xs text-slate-400">
                    Active verification through statutory regulatory bar councils
                  </p>
                </div>
              </div>

              {/* Verified Process Feature Points */}
              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-200">License ID Validation</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Every advocate must submit their active Bar Council roll license number before public listing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-200">Direct Client Confidentiality</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      End-to-end privileged consultation channels, direct phone dialing, and calendar scheduling.
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Regulatory Clearance Status:</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  Active & Secure
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Floating Glass Search & Multi-Criteria Filter Bar */}
        <div className="mt-12 lg:mt-16 glass-panel-elevated rounded-2xl p-4 sm:p-6 border border-white/15 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                {language === 'ur' ? 'وکیل کا نام یا مطلوبہ لفظ' : 'Lawyer Name or Keywords'}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={language === 'ur' ? 'مثال: بیرسٹر طارق، کرمنل، ٹیکس، نیب...' : 'e.g., Barrister Tariq, Corporate, Arbitration...'}
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full glass-input text-sm text-white pl-10 pr-4 py-2.5 rounded-xl placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Country Dropdown */}
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                {language === 'ur' ? 'ملک' : 'Country'}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={filters.country}
                  onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value, city: 'All Cities' }))}
                  className="w-full glass-input text-sm text-white pl-10 pr-4 py-2.5 rounded-xl cursor-pointer"
                >
                  {COUNTRIES.map(c => (
                    <option key={c} value={c} className="bg-slate-900 text-slate-100">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Specialization Dropdown */}
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                {language === 'ur' ? 'شعبہ قانون' : 'Practice Specialization'}
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={filters.specialization}
                  onChange={(e) => setFilters(prev => ({ ...prev, specialization: e.target.value }))}
                  className="w-full glass-input text-sm text-white pl-10 pr-4 py-2.5 rounded-xl cursor-pointer"
                >
                  {SPECIALIZATIONS.map(s => (
                    <option key={s} value={s} className="bg-slate-900 text-slate-100">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Submit Button */}
            <div className="md:col-span-1 pt-0 md:pt-6">
              <button
                onClick={onSearchSubmit}
                aria-label="Filter directory"
                className="w-full glass-button-gold py-2.5 rounded-xl flex items-center justify-center font-semibold text-amber-950 cursor-pointer shadow-lg hover:brightness-110"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
