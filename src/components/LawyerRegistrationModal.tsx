import React, { useState } from 'react';
import { X, ShieldAlert, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Building, User, Mail, Phone, MapPin, DollarSign, Award } from 'lucide-react';
import { Lawyer, Language } from '../types';
import { COUNTRIES, CITIES_BY_COUNTRY, SPECIALIZATIONS, BAR_COUNCILS_LIST } from '../data/mockLawyers';

interface LawyerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (newLawyer: Lawyer) => void;
  language: Language;
}

export const LawyerRegistrationModal: React.FC<LawyerRegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess,
  language
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submittedLawyer, setSubmittedLawyer] = useState<Lawyer | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [firm, setFirm] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [city, setCity] = useState('Lahore');
  const [experienceYears, setExperienceYears] = useState(5);
  const [consultationFeeUSD, setConsultationFeeUSD] = useState(150);

  // Step 2: Bar Council Security Gate
  const [barCouncil, setBarCouncil] = useState('Pakistan Bar Council');
  const [barLicenseNumber, setBarLicenseNumber] = useState('');
  const [barIssuedDate, setBarIssuedDate] = useState('2018-05-15');
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Step 3: Specializations & Bio
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>(['Corporate Law']);
  const [bio, setBio] = useState('');
  const [education, setEducation] = useState('LL.B. (Hons), High Court Advocate');
  const [linkedin, setLinkedin] = useState('');
  const [website, setWebsite] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!name.trim() || !email.trim() || !phone.trim() || !firm.trim()) {
      setErrorMsg('Please fill in all mandatory chamber fields.');
      return;
    }
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!barLicenseNumber.trim()) {
      setErrorMsg('Bar Council License Number / Bar Code ID is strictly mandatory.');
      return;
    }
    if (!agreedTerms) {
      setErrorMsg('You must certify the validity of your Bar Council credentials.');
      return;
    }
    setStep(3);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (selectedSpecs.length === 0) {
      setErrorMsg('Please select at least one practice area specialization.');
      return;
    }
    if (!bio.trim()) {
      setErrorMsg('Please provide a brief professional biography.');
      return;
    }

    const flagMap: Record<string, string> = {
      Pakistan: '🇵🇰',
      'United Kingdom': '🇬🇧',
      'United States': '🇺🇸',
      'United Arab Emirates': '🇦🇪',
      China: '🇨🇳'
    };

    const newLawyer: Lawyer = {
      id: `law-user-${Date.now()}`,
      name,
      title: title || 'Advocate High Court',
      firm,
      country,
      city,
      countryCode: country === 'Pakistan' ? 'PK' : country === 'United Kingdom' ? 'GB' : country === 'United States' ? 'US' : country === 'United Arab Emirates' ? 'AE' : 'CN',
      flag: flagMap[country] || '⚖️',
      specializations: selectedSpecs,
      experienceYears: Number(experienceYears),
      consultationFeeUSD: Number(consultationFeeUSD),
      rating: 5.0,
      reviewsCount: 1,
      barCouncil,
      barLicenseNumber,
      barIssuedDate,
      // CRITICAL: Profiles remain pending and hidden until verified!
      status: 'pending',
      isFeatured: false,
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800',
      bio,
      education: education.split('\n').filter(e => e.trim().length > 0),
      languages: country === 'Pakistan' ? ['English', 'Urdu'] : ['English'],
      phone,
      email,
      address: `${city}, ${country}`,
      socials: {
        linkedin: linkedin || undefined,
        website: website || undefined
      },
      winRate: 90,
      casesCompleted: 15,
      availability: 'Available Today',
      registeredAt: new Date().toISOString().split('T')[0]
    };

    setSubmittedLawyer(newLawyer);
    onRegisterSuccess(newLawyer);
  };

  const toggleSpecialization = (spec: string) => {
    if (selectedSpecs.includes(spec)) {
      if (selectedSpecs.length > 1) {
        setSelectedSpecs(selectedSpecs.filter(s => s !== spec));
      }
    } else {
      setSelectedSpecs([...selectedSpecs, spec]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl glass-panel-elevated rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedLawyer ? (
          /* Submission Success & Pending Verification Notice */
          <div className="text-center py-6 space-y-5">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-xl shadow-amber-950/50">
              <ShieldAlert className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/25">
                STATUS: PENDING BAR VERIFICATION
              </span>
              <h3 className="text-2xl font-bold font-serif-legal text-white">
                Application Submitted for Authentication
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-amber-300">{submittedLawyer.name}</strong>. Pursuant to regulatory security policies, your profile is <strong className="text-amber-400">hidden from the public directory</strong> until your Bar License ID (<code className="font-mono text-xs bg-slate-900 px-1.5 py-0.5 rounded text-amber-300">{submittedLawyer.barLicenseNumber}</code>) is authenticated by the Bar Council Authority.
              </p>
            </div>

            {/* Information Box */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Chambers:</span>
                <span className="text-slate-200">{submittedLawyer.firm}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Bar Council:</span>
                <span className="text-slate-200">{submittedLawyer.barCouncil}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Audit Status:</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  Queue Position #1 (Under Review)
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onClose}
                className="glass-button-gold px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-amber-950 cursor-pointer"
              >
                Return to Directory
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Registration Form */
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                <Award className="w-4 h-4" />
                <span>Lawyer Onboarding Portal</span>
              </div>
              <h2 className="text-2xl font-bold font-serif-legal text-white">
                Register as Verified Legal Counsel
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Join the international roster. Bar Council License ID verification is mandatory.
              </p>

              {/* Progress Steps */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10">
                <div className={`h-1.5 rounded-full ${step >= 1 ? 'bg-amber-400' : 'bg-slate-800'}`} />
                <div className={`h-1.5 rounded-full ${step >= 2 ? 'bg-amber-400' : 'bg-slate-800'}`} />
                <div className={`h-1.5 rounded-full ${step >= 3 ? 'bg-amber-400' : 'bg-slate-800'}`} />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span className={step === 1 ? 'text-amber-300 font-semibold' : ''}>1. Particulars</span>
                <span className={step === 2 ? 'text-amber-300 font-semibold' : ''}>2. Bar Security Gate</span>
                <span className={step === 3 ? 'text-amber-300 font-semibold' : ''}>3. Practice & Bio</span>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Basic Information */}
            {step === 1 && (
              <form onSubmit={handleNextStep1} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Barrister Ahmed Khan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Title / Designation *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Advocate High Court / Partner"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Law Firm / Chambers *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Khan & Associates Chambers"
                      value={firm}
                      onChange={(e) => setFirm(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Official Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="counsel@firm.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="+92 300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Country *</label>
                    <select
                      value={country}
                      onChange={(e) => {
                        const newC = e.target.value;
                        setCountry(newC);
                        if (CITIES_BY_COUNTRY[newC]) {
                          setCity(CITIES_BY_COUNTRY[newC][0]);
                        }
                      }}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl cursor-pointer"
                    >
                      {COUNTRIES.filter(c => c !== 'All Countries').map(c => (
                        <option key={c} value={c} className="bg-slate-900">{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">City *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl cursor-pointer"
                    >
                      {(CITIES_BY_COUNTRY[country] || ['Lahore']).map(ct => (
                        <option key={ct} value={ct} className="bg-slate-900">{ct}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Years of Legal Practice</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(Number(e.target.value))}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Initial Consultation Fee (USD $)</label>
                    <input
                      type="number"
                      min="50"
                      max="2000"
                      value={consultationFeeUSD}
                      onChange={(e) => setConsultationFeeUSD(Number(e.target.value))}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="glass-button-gold px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-amber-950 flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    <span>Proceed to Bar Security Gate</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Bar Council Security & Verification Gate */}
            {step === 2 && (
              <form onSubmit={handleNextStep2} className="space-y-5">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <ShieldCheck className="w-5 h-5 shrink-0" />
                    <span>Statutory Bar Verification Protocol</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Under platform authenticity standards, all advocates must supply valid Bar Council enrollment numbers. Fake or expired roll numbers will lead to permanent blacklisting. Profiles remain in a <strong>"Pending Verification"</strong> status and hidden until verified.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Statutory Bar Council Organization *
                  </label>
                  <select
                    value={barCouncil}
                    onChange={(e) => setBarCouncil(e.target.value)}
                    className="w-full glass-input text-xs text-white p-2.5 rounded-xl cursor-pointer"
                  >
                    {BAR_COUNCILS_LIST.map(bc => (
                      <option key={bc} value={bc} className="bg-slate-900">{bc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Bar Council License Number / Bar Code ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PBC-LHR-2019-8421 or SRA-ID-88192"
                    value={barLicenseNumber}
                    onChange={(e) => setBarLicenseNumber(e.target.value)}
                    className="w-full glass-input text-xs text-white p-2.5 rounded-xl font-mono"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Enter the exact license ID printed on your high court / bar council identity smart card.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Date of Bar Council Enrollment / Admission *
                  </label>
                  <input
                    type="date"
                    required
                    value={barIssuedDate}
                    onChange={(e) => setBarIssuedDate(e.target.value)}
                    className="w-full glass-input text-xs text-white p-2.5 rounded-xl cursor-pointer"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 flex items-start gap-2.5">
                  <input
                    id="affirmation"
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-500/20 bg-slate-950 border-white/20 cursor-pointer"
                  />
                  <label htmlFor="affirmation" className="text-xs text-slate-300 cursor-pointer leading-tight">
                    I solemnly affirm that I am an active, licensed attorney in good standing with the chosen Bar Council. I understand my profile will remain hidden from the public directory until officially authenticated.
                  </label>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="glass-button-subtle px-4 py-2 rounded-xl text-xs font-medium text-slate-300 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="glass-button-gold px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-amber-950 flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    <span>Proceed to Practice Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Specializations, Bio, and Final Review */}
            {step === 3 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Practice Specializations (Select all that apply) *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SPECIALIZATIONS.filter(s => s !== 'All Specializations').map(spec => {
                      const isSelected = selectedSpecs.includes(spec);
                      return (
                        <button
                          type="button"
                          key={spec}
                          onClick={() => toggleSpecialization(spec)}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-semibold'
                              : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {isSelected && '✓ '}
                          {spec}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Professional Biography & Legal Achievements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your chamber background, notable trial experience, and practice philosophy..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full glass-input text-xs text-white p-2.5 rounded-xl leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Education & Degrees (One per line)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="LL.M., Harvard Law School&#10;LL.B., University of London"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full glass-input text-xs text-white p-2.5 rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Chamber Website URL</label>
                    <input
                      type="url"
                      placeholder="https://yourlawfirm.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2 rounded-xl"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="glass-button-subtle px-4 py-2 rounded-xl text-xs font-medium text-slate-300 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="glass-button-gold px-7 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-amber-950 flex items-center gap-1.5 cursor-pointer shadow-xl"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit for Bar Verification</span>
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
