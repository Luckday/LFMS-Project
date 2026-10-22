import React, { useState } from 'react';
import { X, Calendar, Mail, ShieldCheck, Clock, CheckCircle2, Video, Building2, FileText, AlertCircle } from 'lucide-react';
import { Lawyer, ConsultationBooking, Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/mockLawyers';

interface ClientOutreachModalProps {
  isOpen: boolean;
  onClose: () => void;
  lawyer: Lawyer | null;
  initialMode?: 'consultation' | 'email';
  onBookingSubmitted: (booking: ConsultationBooking) => void;
  currency: Currency;
  language: Language;
}

export const ClientOutreachModal: React.FC<ClientOutreachModalProps> = ({
  isOpen,
  onClose,
  lawyer,
  initialMode = 'consultation',
  onBookingSubmitted,
  currency,
  language
}) => {
  const [activeMode, setActiveMode] = useState<'consultation' | 'email'>(initialMode);
  const [submittedBooking, setSubmittedBooking] = useState<ConsultationBooking | null>(null);

  // Form states
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [serviceType, setServiceType] = useState<ConsultationBooking['serviceType']>('Virtual Video Consultation');
  const [preferredDate, setPreferredDate] = useState('2026-10-25');
  const [preferredTime, setPreferredTime] = useState('14:00');
  const [urgency, setUrgency] = useState<ConsultationBooking['urgency']>('Normal');
  const [caseSummary, setCaseSummary] = useState('');
  const [subject, setSubject] = useState('');

  if (!isOpen || !lawyer) return null;

  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const convertedFee = Math.round(lawyer.consultationFeeUSD * rateInfo.rate);

  const handleSubmitConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone || !caseSummary) return;

    const booking: ConsultationBooking = {
      id: `LEX-BK-${Math.floor(100000 + Math.random() * 900000)}`,
      lawyerId: lawyer.id,
      lawyerName: lawyer.name,
      clientName,
      clientEmail,
      clientPhone,
      serviceType,
      preferredDate,
      preferredTime,
      caseSummary,
      urgency,
      submittedAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    setSubmittedBooking(booking);
    onBookingSubmitted(booking);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !caseSummary) return;

    const emailBooking: ConsultationBooking = {
      id: `LEX-MSG-${Math.floor(100000 + Math.random() * 900000)}`,
      lawyerId: lawyer.id,
      lawyerName: lawyer.name,
      clientName,
      clientEmail,
      clientPhone: clientPhone || 'N/A',
      serviceType: 'Written Legal Opinion',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: 'ASAP',
      caseSummary: `Subject: ${subject || 'Direct Legal Inquiry'}\n\n${caseSummary}`,
      urgency,
      submittedAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    setSubmittedBooking(emailBooking);
    onBookingSubmitted(emailBooking);
  };

  const handleClose = () => {
    setSubmittedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl glass-panel-elevated rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedBooking ? (
          /* Confirmation Receipt View */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
                DISPATCHED & ENCRYPTED
              </span>
              <h3 className="text-2xl font-bold font-serif-legal text-white mt-2">
                Consultation Request Transmitted
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                A privileged case dossier reference has been registered with the legal chambers of <strong className="text-amber-300">{lawyer.name}</strong>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Reference Docket ID:</span>
                <span className="font-mono text-amber-300 font-bold">{submittedBooking.id}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Service Category:</span>
                <span className="text-white font-medium">{submittedBooking.serviceType}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Scheduled Window:</span>
                <span className="text-slate-200">{submittedBooking.preferredDate} at {submittedBooking.preferredTime}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Priority Level:</span>
                <span className="text-amber-400 font-semibold">{submittedBooking.urgency}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="glass-button-gold px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-amber-950 cursor-pointer shadow-lg"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <div>
            {/* Header Lockup */}
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <img
                src={lawyer.avatar}
                alt={lawyer.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-2xl object-cover border border-amber-400/40 bg-slate-900"
              />
              <div>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Privileged Client Communications</span>
                </div>
                <h3 className="text-xl font-bold text-white font-serif-legal">
                  {lawyer.name}
                </h3>
                <p className="text-xs text-slate-400">
                  {lawyer.firm} · {lawyer.city}, {lawyer.country}
                </p>
              </div>
            </div>

            {/* Mode Selector Tabs */}
            <div className="grid grid-cols-2 gap-2 my-5 p-1 rounded-xl bg-slate-900/80 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveMode('consultation')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeMode === 'consultation'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Consultation</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('email')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeMode === 'email'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Direct Inquiry</span>
              </button>
            </div>

            {/* Form Mode: Consultation Booking */}
            {activeMode === 'consultation' ? (
              <form onSubmit={handleSubmitConsultation} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe / Tariq Mahmood"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="client@organization.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 0000000"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Time *</label>
                    <input
                      type="time"
                      required
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl cursor-pointer"
                    />
                  </div>
                </div>

                {/* Service Mode Selector */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Consultation Method & Format *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { type: 'Virtual Video Consultation', icon: Video, desc: 'Secure 1-on-1 Video Link' },
                      { type: 'In-Office Conference', icon: Building2, desc: 'Lawyer Chamber Meeting' },
                      { type: 'Written Legal Opinion', icon: FileText, desc: 'Formal Statutory Memo' }
                    ].map(opt => {
                      const Icon = opt.icon;
                      const isSelected = serviceType === opt.type;
                      return (
                        <div
                          key={opt.type}
                          onClick={() => setServiceType(opt.type as any)}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-400 text-white'
                              : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                            <Icon className="w-3.5 h-3.5 text-amber-400" />
                            <span>{opt.type.split(' ')[0]} {opt.type.split(' ')[1]}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">{opt.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Urgency Priority</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full glass-input text-xs text-white p-2.5 rounded-xl cursor-pointer"
                  >
                    <option value="Normal" className="bg-slate-900">Normal (Within 48–72 hours)</option>
                    <option value="High Priority" className="bg-slate-900">High Priority (Within 24 hours)</option>
                    <option value="Urgent (24h)" className="bg-slate-900">Urgent (Immediate Arrest / Injunction)</option>
                  </select>
                </div>

                {/* Case summary */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Confidential Legal Matter Summary *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Briefly state dispute details, court name (if already filed), or legal documents under review..."
                    value={caseSummary}
                    onChange={(e) => setCaseSummary(e.target.value)}
                    className="w-full glass-input text-xs text-white p-2.5 rounded-xl leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-slate-300">
                    <span className="text-slate-400">Estimated Initial Fee: </span>
                    <strong className="text-amber-400 font-mono text-sm">
                      {rateInfo.symbol}{convertedFee.toLocaleString()}
                    </strong>
                  </div>

                  <button
                    type="submit"
                    className="glass-button-gold px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-amber-950 flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Consultation</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Email Inquiry Form */
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="client@domain.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Inquiry Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Commercial Contract Dispute / Cross-Border Arbitration Inquiry"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Message Body *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Provide relevant facts, background history, questions, and desired outcome..."
                    value={caseSummary}
                    onChange={(e) => setCaseSummary(e.target.value)}
                    className="w-full glass-input text-xs text-white p-2.5 rounded-xl leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="glass-button-gold px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-amber-950 flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Privileged Message</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
