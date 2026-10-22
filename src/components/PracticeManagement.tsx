import React, { useState } from 'react';
import { Briefcase, Calendar, Clock, CheckCircle2, ShieldCheck, DollarSign, Users, FileText, ArrowUpRight, Search, Plus } from 'lucide-react';
import { Lawyer, ConsultationBooking, Currency, Language } from '../types';
import { CURRENCY_RATES } from '../data/mockLawyers';

interface PracticeManagementProps {
  bookings: ConsultationBooking[];
  lawyers: Lawyer[];
  currency: Currency;
  language: Language;
  onOpenRegister: () => void;
}

export const PracticeManagement: React.FC<PracticeManagementProps> = ({
  bookings,
  lawyers,
  currency,
  language,
  onOpenRegister
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'in-office' | 'urgent'>('all');

  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const verifiedCount = lawyers.filter(l => l.status === 'verified').length;

  const filteredBookings = bookings.filter(b => {
    if (activeFilter === 'video' && b.serviceType !== 'Virtual Video Consultation') return false;
    if (activeFilter === 'in-office' && b.serviceType !== 'In-Office Conference') return false;
    if (activeFilter === 'urgent' && b.urgency !== 'Urgent (24h)') return false;
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      return (
        b.clientName.toLowerCase().includes(q) ||
        b.lawyerName.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Overview Banner */}
      <div className="relative overflow-hidden glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-white/15">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>Chambers Practice Management Console</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif-legal text-white">
            {language === 'ur' ? 'وکلاء چیمبرز اور پریکٹس ڈیش بورڈ' : 'Chambers & Client Inbound Pipeline'}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {language === 'ur'
              ? 'مؤکلین کے مشاورتی شیڈول، قانونی کیسز کی ڈائری اور چیمبر کے وکلاء کی کارکردگی کا جائزہ لیں۔'
              : 'Monitor inbound client consultation requests, track pending dockets, and coordinate high-stakes client matters across international jurisdictions.'}
          </p>
        </div>

        {/* Ambient image background */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 pointer-events-none hidden lg:block overflow-hidden">
          <img
            src="/src/assets/images/corporate_law_chamber_1792638623295.jpg"
            alt="Law chamber"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Total Inbound Inquiries</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-white tabular-nums">
            {bookings.length}
          </p>
          <span className="text-[11px] text-emerald-400 mt-1 block">Active pipeline</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Verified Roster Advocates</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-white tabular-nums">
            {verifiedCount}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">Good standing</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Avg Partner Win Rate</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
            94.8%
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">Supreme & High Court rulings</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Median Consultation Rate</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-amber-300 tabular-nums">
            {rateInfo.symbol}{Math.round(240 * rateInfo.rate).toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">Per initial consultation</span>
        </div>

      </div>

      {/* Bookings & Client Consultation Stream */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white font-serif-legal">
              Client Consultation Dockets
            </h3>
            <p className="text-xs text-slate-400">
              Live incoming consultation briefs submitted through the directory portal
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter segments */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-white/10 text-xs">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeFilter === 'all' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({bookings.length})
              </button>
              <button
                onClick={() => setActiveFilter('video')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeFilter === 'video' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Video
              </button>
              <button
                onClick={() => setActiveFilter('in-office')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeFilter === 'in-office' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Chambers
              </button>
              <button
                onClick={() => setActiveFilter('urgent')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeFilter === 'urgent' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Urgent
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search docket..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="glass-input text-xs text-white pl-8 pr-3 py-1.5 rounded-xl w-48"
              />
            </div>
          </div>
        </div>

        {/* Table / List View */}
        {filteredBookings.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No dockets matching the selected filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 uppercase tracking-wider border-b border-white/10 font-mono text-[11px]">
                <tr>
                  <th className="py-3 px-3">Docket ID</th>
                  <th className="py-3 px-3">Client</th>
                  <th className="py-3 px-3">Retained Counsel</th>
                  <th className="py-3 px-3">Format</th>
                  <th className="py-3 px-3">Scheduled</th>
                  <th className="py-3 px-3">Priority</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-3 font-mono text-amber-300 font-semibold whitespace-nowrap">
                      {b.id}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="font-semibold text-white">{b.clientName}</div>
                      <div className="text-[11px] text-slate-400">{b.clientEmail}</div>
                    </td>
                    <td className="py-3.5 px-3 font-serif-legal text-slate-300 whitespace-nowrap">
                      {b.lawyerName}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-white/10">
                        {b.serviceType}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-300 whitespace-nowrap">
                      {b.preferredDate} · {b.preferredTime}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        b.urgency === 'Urgent (24h)'
                          ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                          : b.urgency === 'High Priority'
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {b.urgency}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{b.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </section>
  );
};
