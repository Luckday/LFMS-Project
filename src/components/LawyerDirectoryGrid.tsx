import React from 'react';
import { Filter, SlidersHorizontal, RotateCcw, Search, CheckCircle2 } from 'lucide-react';
import { Lawyer, FilterState, Currency, Language } from '../types';
import { LawyerCard } from './LawyerCard';
import { COUNTRIES, CITIES_BY_COUNTRY, SPECIALIZATIONS, CURRENCY_RATES } from '../data/mockLawyers';

interface LawyerDirectoryGridProps {
  lawyers: Lawyer[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  currency: Currency;
  language: Language;
  onSelectLawyer: (lawyer: Lawyer) => void;
  onBookConsultation: (lawyer: Lawyer) => void;
  onEmailInquiry: (lawyer: Lawyer) => void;
  onOpenRegister: () => void;
}

export const LawyerDirectoryGrid: React.FC<LawyerDirectoryGridProps> = ({
  lawyers,
  filters,
  setFilters,
  currency,
  language,
  onSelectLawyer,
  onBookConsultation,
  onEmailInquiry,
  onOpenRegister
}) => {
  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;

  // Filter only VERIFIED lawyers for the public directory!
  // Pending ones are securely withheld until verified in the Bar Gate
  const verifiedLawyers = lawyers.filter(l => l.status === 'verified');

  // Available cities based on selected country
  const availableCities = filters.country !== 'All Countries' && CITIES_BY_COUNTRY[filters.country]
    ? ['All Cities', ...CITIES_BY_COUNTRY[filters.country]]
    : ['All Cities'];

  // Apply multi-criteria filtering
  const filteredLawyers = verifiedLawyers.filter(lawyer => {
    // Search query matches name, firm, title, bio, or specializations
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = lawyer.name.toLowerCase().includes(q);
      const matchFirm = lawyer.firm.toLowerCase().includes(q);
      const matchTitle = lawyer.title.toLowerCase().includes(q);
      const matchCity = lawyer.city.toLowerCase().includes(q);
      const matchBio = lawyer.bio.toLowerCase().includes(q);
      const matchSpec = lawyer.specializations.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchFirm && !matchTitle && !matchCity && !matchBio && !matchSpec) {
        return false;
      }
    }

    // Country match
    if (filters.country !== 'All Countries' && lawyer.country !== filters.country) {
      return false;
    }

    // City match
    if (filters.city !== 'All Cities' && lawyer.city !== filters.city) {
      return false;
    }

    // Specialization match
    if (filters.specialization !== 'All Specializations' && !lawyer.specializations.includes(filters.specialization)) {
      return false;
    }

    // Experience
    if (lawyer.experienceYears < filters.minExperience) {
      return false;
    }

    // Fee
    if (lawyer.consultationFeeUSD > filters.maxFeeUSD) {
      return false;
    }

    // Featured toggle
    if (filters.onlyFeatured && !lawyer.isFeatured) {
      return false;
    }

    return true;
  });

  // Sorting
  const sortedLawyers = [...filteredLawyers].sort((a, b) => {
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    if (filters.sortBy === 'experience') return b.experienceYears - a.experienceYears;
    if (filters.sortBy === 'fee-low') return a.consultationFeeUSD - b.consultationFeeUSD;
    if (filters.sortBy === 'fee-high') return b.consultationFeeUSD - a.consultationFeeUSD;
    if (filters.sortBy === 'cases') return b.casesCompleted - a.casesCompleted;
    return 0;
  });

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      country: 'All Countries',
      city: 'All Cities',
      specialization: 'All Specializations',
      minExperience: 0,
      maxFeeUSD: 600,
      sortBy: 'rating',
      onlyFeatured: false
    });
  };

  return (
    <section id="directory-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Directory Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === 'ur' ? 'مستند و بااعتماد قانونی ڈائریکٹری' : 'Verified Legal Roster'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif-legal text-white">
            {language === 'ur' ? 'سپریم و ہائی کورٹ کے نامور وکلاء' : 'Distinguished Advocates & Counsel'}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {language === 'ur'
              ? 'تمام وکلاء کے بار کونسل لائسنس نمبرز تصدیق شدہ ہیں۔ اپنی قانونی ضرورت کے مطابق فوری رابطہ کریں۔'
              : 'Each legal practitioner is verified via official Bar Council registry roll numbers.'}
          </p>
        </div>

        {/* Counter and Results Summary */}
        <div className="flex items-center gap-3">
          <div className="glass-panel px-4 py-2 rounded-xl border border-white/10 text-xs text-slate-300">
            <span>{language === 'ur' ? 'دستیاب وکلاء:' : 'Verified Profiles:'} </span>
            <strong className="text-amber-400 font-mono text-sm tabular-nums">
              {sortedLawyers.length}
            </strong>
            <span className="text-slate-500"> / {verifiedLawyers.length}</span>
          </div>

          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white glass-button-subtle rounded-xl cursor-pointer"
            title="Reset Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'فلٹرز ختم کریں' : 'Reset'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout: Filter Sidebar (Left) + Lawyers Cards (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Filter Controls Sidebar */}
        <div className="lg:col-span-3 glass-panel rounded-2xl p-6 border border-white/10 space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-sm font-bold text-white font-serif-legal">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span>{language === 'ur' ? 'فلٹر اور ترتیب' : 'Filter & Refine'}</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-amber-400/90 hover:underline cursor-pointer"
            >
              Clear
            </button>
          </div>

          {/* Quick Search */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {language === 'ur' ? 'تلاش' : 'Search Keywords'}
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Name, firm, law area..."
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full glass-input text-xs text-white pl-9 pr-3 py-2 rounded-xl"
              />
            </div>
          </div>

          {/* Country Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {language === 'ur' ? 'ملک' : 'Country'}
            </label>
            <select
              value={filters.country}
              onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value, city: 'All Cities' }))}
              className="w-full glass-input text-xs text-white p-2.5 rounded-xl cursor-pointer"
            >
              {COUNTRIES.map(c => (
                <option key={c} value={c} className="bg-slate-900 text-slate-100">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* City Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {language === 'ur' ? 'شہر' : 'City'}
            </label>
            <select
              value={filters.city}
              onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
              disabled={filters.country === 'All Countries'}
              className={`w-full glass-input text-xs text-white p-2.5 rounded-xl cursor-pointer ${
                filters.country === 'All Countries' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {availableCities.map(c => (
                <option key={c} value={c} className="bg-slate-900 text-slate-100">
                  {c}
                </option>
              ))}
            </select>
            {filters.country === 'All Countries' && (
              <p className="text-[11px] text-slate-400 mt-1">Select a country first to filter by city</p>
            )}
          </div>

          {/* Specialization Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {language === 'ur' ? 'شعبہ قانون' : 'Practice Area'}
            </label>
            <select
              value={filters.specialization}
              onChange={(e) => setFilters(prev => ({ ...prev, specialization: e.target.value }))}
              className="w-full glass-input text-xs text-white p-2.5 rounded-xl cursor-pointer"
            >
              {SPECIALIZATIONS.map(s => (
                <option key={s} value={s} className="bg-slate-900 text-slate-100">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Experience Range Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span>{language === 'ur' ? 'کم از کم تجربہ:' : 'Min Experience:'}</span>
              <span className="font-mono text-amber-400 font-semibold">{filters.minExperience} years</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="1"
              value={filters.minExperience}
              onChange={(e) => setFilters(prev => ({ ...prev, minExperience: Number(e.target.value) }))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Max Consultation Fee Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span>{language === 'ur' ? 'زیادہ سے زیادہ فیس:' : 'Max Consult Fee:'}</span>
              <span className="font-mono text-amber-400 font-semibold">
                {rateInfo.symbol}{Math.round(filters.maxFeeUSD * rateInfo.rate).toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="600"
              step="25"
              value={filters.maxFeeUSD}
              onChange={(e) => setFilters(prev => ({ ...prev, maxFeeUSD: Number(e.target.value) }))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Sort By Option */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {language === 'ur' ? 'ترتیب دیں' : 'Sort Results'}
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="w-full glass-input text-xs text-white p-2.5 rounded-xl cursor-pointer"
            >
              <option value="rating" className="bg-slate-900">Highest Rated</option>
              <option value="experience" className="bg-slate-900">Most Experienced</option>
              <option value="cases" className="bg-slate-900">Most Cases Completed</option>
              <option value="fee-low" className="bg-slate-900">Fee: Low to High</option>
              <option value="fee-high" className="bg-slate-900">Fee: High to Low</option>
            </select>
          </div>

          {/* Featured Only Checkbox */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <label htmlFor="featured-toggle" className="text-xs font-medium text-slate-300 cursor-pointer">
              {language === 'ur' ? 'صرف نمایاں پارٹنرز' : 'Only Featured Partners'}
            </label>
            <input
              id="featured-toggle"
              type="checkbox"
              checked={filters.onlyFeatured}
              onChange={(e) => setFilters(prev => ({ ...prev, onlyFeatured: e.target.checked }))}
              className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500/20 bg-slate-900 cursor-pointer"
            />
          </div>

        </div>

        {/* Lawyer Cards Grid */}
        <div className="lg:col-span-9">
          {sortedLawyers.length === 0 ? (
            <div className="glass-panel rounded-2xl p-12 text-center border border-white/10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto text-slate-400 border border-white/10">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white font-serif-legal">
                {language === 'ur' ? 'کوئی وکیل نہیں ملا' : 'No Attorneys Matched Filters'}
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                {language === 'ur'
                  ? 'آپ کے منتخب کردہ فلٹرز پر کوئی وکیل موجود نہیں ہے۔ برائے مہربانی فلٹرز کو ریسیٹ کریں۔'
                  : 'Try broadening your search criteria or resetting filters to view all verified legal counsel.'}
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="glass-button-gold px-5 py-2.5 rounded-xl text-xs font-semibold text-amber-950 cursor-pointer"
                >
                  {language === 'ur' ? 'تمام فلٹرز ری سیٹ کریں' : 'Reset All Filters'}
                </button>
                <button
                  onClick={onOpenRegister}
                  className="glass-button-subtle px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 cursor-pointer"
                >
                  {language === 'ur' ? 'اپنا نام درج کروائیں' : 'Register as Lawyer'}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedLawyers.map((lawyer) => (
                <LawyerCard
                  key={lawyer.id}
                  lawyer={lawyer}
                  currency={currency}
                  language={language}
                  onSelect={onSelectLawyer}
                  onBookConsultation={onBookConsultation}
                  onEmailInquiry={onEmailInquiry}
                />
              ))}
            </div>
          )}
        </div>

      </div>

    </section>
  );
};
