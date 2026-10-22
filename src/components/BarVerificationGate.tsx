import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Check, X, Search, RefreshCw, AlertCircle, FileText, CheckCircle2, UserCheck } from 'lucide-react';
import { Lawyer, Language } from '../types';

interface BarVerificationGateProps {
  lawyers: Lawyer[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  language: Language;
}

export const BarVerificationGate: React.FC<BarVerificationGateProps> = ({
  lawyers,
  onApprove,
  onReject,
  language
}) => {
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const pendingLawyers = lawyers.filter(l => l.status === 'pending');
  const verifiedLawyers = lawyers.filter(l => l.status === 'verified');

  const handleSimulateVerify = (id: string) => {
    setVerifyingId(id);
    setTimeout(() => {
      onApprove(id);
      setVerifyingId(null);
      setSuccessToast(`License Roll authenticated! Lawyer profile has been published to the public directory.`);
      setTimeout(() => setSuccessToast(null), 4000);
    }, 1200);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Toast */}
      {successToast && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-3 shadow-xl backdrop-blur-md animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-white/15 mb-10">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Statutory Compliance & Security Gate</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif-legal text-white">
            {language === 'ur' ? 'بار کونسل تصدیق و منظوری کا پورٹل' : 'Bar Council License Authority & Audit Desk'}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            {language === 'ur'
              ? 'سیکیورٹی اور صداقت کے اصول کے مطابق، ہر وکیل کی رجسٹریشن پہلے "پینڈنگ تصدیق" میں رکھی جاتی ہے اور پبلک ڈائریکٹری میں چھپا دی جاتی ہے۔ یہاں بار کونسل کے ریکارڈ سے تصدیق کر کے منظوری دی جاتی ہے۔'
              : 'Pursuant to LexVeritas integrity standards, newly registered advocates remain hidden in a "Pending Verification" queue until authorized by statutory Bar Council roll check.'}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Pending Review: <strong className="text-amber-400 font-mono tabular-nums">{pendingLawyers.length}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Active in Public Directory: <strong className="text-emerald-400 font-mono tabular-nums">{verifiedLawyers.length}</strong></span>
            </div>
          </div>
        </div>

        {/* Ambient watermark illustration badge */}
        <div className="absolute right-6 -bottom-6 w-48 h-48 opacity-15 pointer-events-none hidden md:block">
          <ShieldCheck className="w-full h-full text-amber-400" />
        </div>
      </div>

      {/* Pending Applicants Queue */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white font-serif-legal flex items-center gap-2">
              <span>{language === 'ur' ? 'زیر التواء درخواستیں' : 'Pending Verification Queue'}</span>
              <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/30">
                {pendingLawyers.length} Awaiting Audit
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Profiles in this list are currently HIDDEN from public directory visitors.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search roll # or lawyer name..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full glass-input text-xs text-white pl-9 pr-3 py-2 rounded-xl"
            />
          </div>
        </div>

        {pendingLawyers.length === 0 ? (
          <div className="glass-panel rounded-2xl p-10 text-center border border-white/10 space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white font-serif-legal">
              Verification Queue is Clear
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              All submitted advocate applications have been audited against Bar Council rosters. New submissions will immediately appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingLawyers
              .filter(l => 
                l.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
                l.barLicenseNumber.toLowerCase().includes(filterQuery.toLowerCase()) ||
                l.firm.toLowerCase().includes(filterQuery.toLowerCase())
              )
              .map((applicant) => (
                <div
                  key={applicant.id}
                  className="glass-panel rounded-2xl p-6 border border-amber-500/30 relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Pending Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-xs font-mono font-semibold uppercase text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      HIDDEN FROM PUBLIC
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Applied: {applicant.registeredAt}
                    </span>
                  </div>

                  {/* Applicant Details */}
                  <div className="py-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={applicant.avatar}
                        alt={applicant.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover border border-white/15 bg-slate-900"
                      />
                      <div>
                        <h4 className="text-base font-bold text-white font-serif-legal">
                          {applicant.name}
                        </h4>
                        <p className="text-xs text-amber-400/90 font-medium">
                          {applicant.title}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {applicant.firm} · {applicant.city}, {applicant.country} {applicant.flag}
                        </p>
                      </div>
                    </div>

                    {/* Bar License Verification Highlight */}
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 space-y-1.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-[11px]">Submitted Bar License:</span>
                        <span className="font-mono text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {applicant.barLicenseNumber}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-300 text-[11px]">
                        <span className="text-slate-400">Bar Authority:</span>
                        <span className="truncate max-w-[200px]">{applicant.barCouncil}</span>
                      </div>
                      <div className="flex justify-between text-slate-300 text-[11px]">
                        <span className="text-slate-400">Date of Admission:</span>
                        <span className="font-mono">{applicant.barIssuedDate}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300">
                      <span className="text-slate-400">Practice Areas: </span>
                      {applicant.specializations.join(', ')}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <button
                      onClick={() => handleSimulateVerify(applicant.id)}
                      disabled={verifyingId === applicant.id}
                      className="flex-1 glass-button-gold py-2.5 px-4 rounded-xl text-xs font-bold text-amber-950 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg disabled:opacity-50"
                    >
                      {verifyingId === applicant.id ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Checking Official Bar Roll...</span>
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-4 h-4" />
                          <span>Verify & Publish to Directory</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onReject(applicant.id)}
                      disabled={verifyingId === applicant.id}
                      className="py-2.5 px-3 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      title="Reject Applicant"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

      </div>
    </section>
  );
};
