import React from 'react';
import { Scale, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenRegister: () => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenRegister,
  language
}) => {
  return (
    <footer className="border-t border-white/10 glass-panel mt-20 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Wordmark & Statement */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <Scale className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-lg font-bold font-serif-legal text-white">
                LexVeritas
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Global lawyer directory and practice management platform with mandatory statutory Bar Council license authentication.
            </p>
            <div className="flex items-center gap-2 text-amber-400/90 text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Legal Counsel Guaranteed</span>
            </div>
          </div>

          {/* Col 2: Navigation Mirror */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-serif-legal">
              Platform Directory
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('directory')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Find Verified Attorneys
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('verification-gate')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Bar Council Verification Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('practice-management')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Chambers Practice Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Verification Governance & Standards
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Jurisdictions & Bar Councils */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-serif-legal">
              Recognized Bar Councils
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Pakistan Bar Council (PBC)</li>
              <li>Punjab, Sindh & Islamabad Bar Councils</li>
              <li>Bar Standards Board (UK Middle Temple)</li>
              <li>New York State Bar Association (NYSBA)</li>
              <li>Dubai Legal Affairs Department (DLAD)</li>
              <li>All China Lawyers Association (ACLA)</li>
            </ul>
          </div>

          {/* Col 4: Member Portal Action */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-serif-legal">
              Advocates & Counsel
            </h4>
            <p className="text-xs text-slate-400">
              Are you a licensed advocate of the High Court or Supreme Court? Submit your Bar License ID for onboarding.
            </p>
            <button
              onClick={onOpenRegister}
              className="glass-button-gold px-4 py-2 rounded-xl text-xs font-semibold text-amber-950 cursor-pointer shadow-md inline-block"
            >
              Register Legal Profile
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© {new Date().getFullYear()} LexVeritas Platform. All rights reserved. Attorney-client confidentiality privileged.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Statutory Terms</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Bar Code Policy</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Privilege Safeguards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
