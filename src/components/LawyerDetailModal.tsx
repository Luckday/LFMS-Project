import React from 'react';
import { X, ShieldCheck, MapPin, Phone, Mail, Calendar, GraduationCap, Globe, Star, Award, Building, ExternalLink } from 'lucide-react';
import { Lawyer, Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/mockLawyers';

interface LawyerDetailModalProps {
  lawyer: Lawyer | null;
  onClose: () => void;
  currency: Currency;
  language: Language;
  onBookConsultation: (lawyer: Lawyer) => void;
  onEmailInquiry: (lawyer: Lawyer) => void;
}

export const LawyerDetailModal: React.FC<LawyerDetailModalProps> = ({
  lawyer,
  onClose,
  currency,
  language,
  onBookConsultation,
  onEmailInquiry
}) => {
  if (!lawyer) return null;

  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const convertedFee = Math.round(lawyer.consultationFeeUSD * rateInfo.rate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl glass-panel-elevated rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient background glow */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Hero Section */}
        <div className="flex flex-col md:flex-row items-start gap-6 pb-6 border-b border-white/10 relative z-10">
          
          {/* Avatar & Badges */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-500/40 shadow-xl bg-slate-900">
            <img
              src={lawyer.avatar}
              alt={lawyer.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            {lawyer.status === 'verified' && (
              <div className="absolute bottom-2 right-2 bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>VERIFIED</span>
              </div>
            )}
          </div>

          {/* Core Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                {lawyer.availability}
              </span>
              <span className="text-xs text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {lawyer.city}, {lawyer.country} {lawyer.flag}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif-legal text-white">
              {lawyer.name}
            </h2>
            <p className="text-sm font-semibold text-amber-400/90 mt-1">
              {lawyer.title}
            </p>
            <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              {lawyer.firm}
            </p>

            {/* Quick Metrics */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{lawyer.rating.toFixed(2)}</span>
                <span className="text-slate-400 font-normal">({lawyer.reviewsCount} reviews)</span>
              </div>
              <div className="text-slate-300">
                <span className="text-slate-400">Experience: </span>
                <strong className="text-white font-mono">{lawyer.experienceYears} Years</strong>
              </div>
              <div className="text-slate-300">
                <span className="text-slate-400">Case Success Rate: </span>
                <strong className="text-emerald-400 font-mono">{lawyer.winRate}%</strong>
              </div>
              <div className="text-slate-300">
                <span className="text-slate-400">Consultation: </span>
                <strong className="text-amber-400 font-mono text-sm">
                  {rateInfo.symbol}{convertedFee.toLocaleString()}
                </strong>
              </div>
            </div>

          </div>

        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-6 relative z-10">
          
          {/* Left Column: Bio, Education, Credentials */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Bio */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 font-serif-legal">
                {language === 'ur' ? 'قانونی پروفائل اور تعارف' : 'Practice Biography'}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {lawyer.bio}
              </p>
            </div>

            {/* Specializations Badges */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 font-serif-legal">
                {language === 'ur' ? 'شعبہ جات و تخصص' : 'Core Practice Areas'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {lawyer.specializations.map(spec => (
                  <span
                    key={spec}
                    className="text-xs font-medium text-slate-200 bg-white/[0.05] border border-white/10 px-3 py-1 rounded-lg"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Education & Qualifications */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 font-serif-legal flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>{language === 'ur' ? 'تعلیمی اسناد و ڈگریاں' : 'Education & Qualifications'}</span>
              </h4>
              <ul className="space-y-2">
                {lawyer.education.map((edu, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-amber-400/80 font-bold">•</span>
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages Spoken */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 font-serif-legal">
                {language === 'ur' ? 'زبانیں' : 'Languages Fluent'}
              </h4>
              <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                {lawyer.languages.map(l => (
                  <span key={l} className="bg-slate-900/80 border border-white/5 px-2.5 py-1 rounded-md">
                    {l}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Statutory Bar License, Location, Direct Contact */}
          <div className="md:col-span-5 space-y-5">
            
            {/* Official Bar Verification Card */}
            <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/25 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Bar License Verified
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  AUTHENTICATED
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Roll License #:</span>
                  <span className="font-mono text-white font-semibold">{lawyer.barLicenseNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Statutory Body:</span>
                  <span className="text-slate-200 text-right truncate max-w-[180px]">{lawyer.barCouncil}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Admission Date:</span>
                  <span className="font-mono text-slate-300">{lawyer.barIssuedDate}</span>
                </div>
              </div>
            </div>

            {/* Office Address & Location */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
              <h5 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span>Chamber Address</span>
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lawyer.address}
              </p>
            </div>

            {/* Direct Social Media Links */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
              <h5 className="text-xs font-semibold text-slate-200">
                Verified Social & Web Presence
              </h5>
              <div className="flex flex-wrap gap-2 text-xs">
                {lawyer.socials.linkedin && (
                  <a
                    href={lawyer.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/15 border border-blue-500/30 text-blue-300 hover:text-white hover:bg-blue-600/30 transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {lawyer.socials.twitter && (
                  <a
                    href={lawyer.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600/15 border border-sky-500/30 text-sky-300 hover:text-white hover:bg-sky-600/30 transition-colors"
                  >
                    <span>Twitter/X</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {lawyer.socials.website && (
                  <a
                    href={lawyer.socials.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white transition-colors"
                  >
                    <Globe className="w-3 h-3 text-amber-400" />
                    <span>Firm Site</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Direct Outreach CTAs */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onBookConsultation(lawyer);
                }}
                className="w-full glass-button-gold py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-amber-950 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>{language === 'ur' ? 'باقاعدہ قانونی مشاورت بُک کریں' : 'Schedule Direct Consultation'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${lawyer.phone}`}
                  className="py-2.5 px-3 rounded-xl border border-white/15 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-amber-400 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Chambers</span>
                </a>

                <button
                  onClick={() => {
                    onClose();
                    onEmailInquiry(lawyer);
                  }}
                  className="py-2.5 px-3 rounded-xl border border-white/15 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-amber-400 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
