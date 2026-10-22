import React from 'react';
import { ShieldCheck, Scale, Award, Globe, FileCheck, CheckCircle2, Lock, Users } from 'lucide-react';
import { Language } from '../types';

interface AboutSectionProps {
  language: Language;
  onOpenRegister: () => void;
  onExploreDirectory: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  language,
  onOpenRegister,
  onExploreDirectory
}) => {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold">
          <Scale className="w-4 h-4" />
          <span>{language === 'ur' ? 'قانونی اعتماد اور شفافیت' : 'Institutional Integrity & Governance'}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-serif-legal text-white">
          {language === 'ur' ? 'لیکس ویریٹاس کا تعارف و منشور' : 'The Veritas Legal Standard'}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {language === 'ur'
            ? 'لیکس ویریٹاس پاکستان اور بین الاقوامی سطح پر قانونی چیمبرز، وکلاء اور مؤکلین کے درمیان شفاف، مستند اور محفوظ رابطہ قائم کرنے کا معتبر ترین پلیٹ فارم ہے۔'
            : 'LexVeritas was founded to solve a critical issue in modern legal access: verifying the credentials, statutory bar licenses, and track records of legal advocates before a client commits.'}
        </p>
      </div>

      {/* 3 Pillars Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-serif-legal text-white">
            100% Statutory Bar Authentication
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every enrolled advocate is required to submit their statutory license roll issued by bodies such as the Pakistan Bar Council, UK Bar Standards Board, New York State Bar, or Dubai Legal Affairs Department.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-serif-legal text-white">
            Privileged Confidentiality
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            All client inquiries, case briefs, and consultation requests transmitted through our platform operate under strict attorney-client privilege protocols with military-grade 256-bit data isolation.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-serif-legal text-white">
            Cross-Border Legal Networks
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Seamlessly coordinate multi-jurisdictional matters. Retain counsel simultaneously across South Asia, the Middle East, the UK, Europe, and North America for international trade and arbitration.
          </p>
        </div>

      </div>

      {/* Verification Lifecycle Walkthrough */}
      <div className="glass-panel-elevated rounded-3xl p-8 sm:p-12 border border-white/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-bold font-serif-legal text-white">
              How the Bar ID Verification Gate Operates
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Unlike generic directory websites that allow anyone to create an unverified lawyer profile, LexVeritas mandates a zero-trust verification pipeline:
            </p>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono font-bold shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-white">Advocate Registration with Bar Roll Number</h4>
                  <p className="text-slate-400 mt-0.5">The lawyer submits their identity, chamber particulars, and active Bar Council license ID number.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono font-bold shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-white">Mandatory "Pending Verification" State</h4>
                  <p className="text-slate-400 mt-0.5">The profile is automatically quarantined and hidden from the public directory to protect clients from unverified representation.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono font-bold shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-white">Statutory Authority Clearance & Publication</h4>
                  <p className="text-slate-400 mt-0.5">Upon roll verification against statutory council gazettes, the profile is activated with an official gold Verified Bar Seal.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={onOpenRegister}
                className="glass-button-gold px-5 py-2.5 rounded-xl text-xs font-semibold text-amber-950 cursor-pointer shadow-lg"
              >
                Apply for Bar Verification
              </button>
              <button
                onClick={onExploreDirectory}
                className="glass-button-subtle px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 cursor-pointer"
              >
                Explore Active Roster
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative">
              <img
                src="/src/assets/images/corporate_law_chamber_1792638623295.jpg"
                alt="Law chamber and legal library"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Institutional Arbitration Chambers</span>
                </div>
                <p className="text-xs text-slate-200">
                  Facilitating high-stakes commercial disputes and trusted legal consultations globally.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
