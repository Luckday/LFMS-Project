import React from 'react';
import { Star, ShieldCheck, MapPin, Phone, Mail, Calendar, ArrowUpRight } from 'lucide-react';
import { Lawyer, Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/mockLawyers';
import { TiltCard } from './TiltCard';

interface LawyerCardProps {
  lawyer: Lawyer;
  currency: Currency;
  language: Language;
  onSelect: (lawyer: Lawyer) => void;
  onBookConsultation: (lawyer: Lawyer) => void;
  onEmailInquiry: (lawyer: Lawyer) => void;
}

export const LawyerCard: React.FC<LawyerCardProps> = ({
  lawyer,
  currency,
  language,
  onSelect,
  onBookConsultation,
  onEmailInquiry
}) => {
  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const convertedFee = Math.round(lawyer.consultationFeeUSD * rateInfo.rate);

  return (
    <TiltCard
      className={`group rounded-2xl p-6 glass-card border transition-all duration-300 flex flex-col justify-between ${
        lawyer.isFeatured
          ? 'border-amber-500/30 shadow-amber-950/20'
          : 'border-white/10'
      }`}
    >
      <div>
        {/* Top Header Row: Featured Indicator & Rating */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            {lawyer.isFeatured && (
              <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-full">
                {language === 'ur' ? 'نمایاں قانونی مشیر' : 'Featured Partner'}
              </span>
            )}
            <div className="flex items-center gap-1 text-slate-300 text-xs">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{lawyer.city}, {lawyer.country}</span>
              <span>{lawyer.flag}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 text-amber-300 text-xs font-semibold">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="tabular-nums font-mono">{lawyer.rating.toFixed(2)}</span>
            <span className="text-slate-400 font-normal">({lawyer.reviewsCount})</span>
          </div>
        </div>

        {/* Lawyer Profile Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/15 bg-slate-900 shadow-md">
            <img
              src={lawyer.avatar}
              alt={lawyer.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            />
            {lawyer.status === 'verified' && (
              <div 
                className="absolute bottom-1 right-1 bg-amber-500 text-slate-950 p-0.5 rounded-full shadow"
                title="Bar Council Verified"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 
              onClick={() => onSelect(lawyer)}
              className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer truncate font-serif-legal"
            >
              {lawyer.name}
            </h3>
            <p className="text-xs text-amber-400/90 font-medium truncate mt-0.5">
              {lawyer.title}
            </p>
            <p className="text-xs text-slate-400 truncate mt-0.5">
              {lawyer.firm}
            </p>
          </div>
        </div>

        {/* Bar License Verification Badge */}
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 mb-4 text-xs">
          <div className="flex items-center justify-between text-slate-300 mb-1">
            <span className="text-slate-400 text-[11px]">{language === 'ur' ? 'بار کونسل لائسنس:' : 'Bar License ID:'}</span>
            <span className="font-mono text-[11px] text-amber-300 font-medium bg-amber-500/10 px-1.5 py-0.5 rounded">
              {lawyer.barLicenseNumber}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 truncate">
            {lawyer.barCouncil}
          </p>
        </div>

        {/* Specialization Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {lawyer.specializations.map((spec) => (
            <span
              key={spec}
              className="text-[11px] font-medium text-slate-300 bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded-md"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center mb-4">
          <div>
            <div className="text-xs text-slate-400">{language === 'ur' ? 'تجربہ' : 'Experience'}</div>
            <div className="text-sm font-semibold text-white font-mono tabular-nums">{lawyer.experienceYears} yrs</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">{language === 'ur' ? 'کامیابی شرح' : 'Win Ratio'}</div>
            <div className="text-sm font-semibold text-emerald-400 font-mono tabular-nums">{lawyer.winRate}%</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">{language === 'ur' ? 'مشاورت فیس' : 'Consult Fee'}</div>
            <div className="text-sm font-semibold text-amber-300 font-mono tabular-nums">
              {rateInfo.symbol}{convertedFee.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="pt-2 flex items-center gap-2">
        <button
          onClick={() => onSelect(lawyer)}
          className="flex-1 glass-button-subtle py-2 px-3 rounded-xl text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>{language === 'ur' ? 'مکمل پروفائل' : 'View Profile'}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onBookConsultation(lawyer)}
          className="flex-1 glass-button-gold py-2 px-3 rounded-xl text-xs font-semibold text-amber-950 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{language === 'ur' ? 'مشاورت بُک کریں' : 'Book Consult'}</span>
        </button>

        {/* Quick Phone Call Button */}
        <a
          href={`tel:${lawyer.phone}`}
          onClick={(e) => e.stopPropagation()}
          title={`Call ${lawyer.phone}`}
          className="p-2 rounded-xl border border-white/10 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
        >
          <Phone className="w-4 h-4" />
        </a>

        {/* Quick Email Inquiry Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEmailInquiry(lawyer);
          }}
          title={`Email ${lawyer.email}`}
          className="p-2 rounded-xl border border-white/10 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <Mail className="w-4 h-4" />
        </button>
      </div>
    </TiltCard>
  );
};
