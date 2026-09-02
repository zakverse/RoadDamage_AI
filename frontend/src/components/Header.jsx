import React, { useState } from 'react';
import { AlertCircle, RefreshCw, Zap, Menu, X } from 'lucide-react';
import logoImg from '../logo.png';

export default function Header({ isBackendOnline, checkingStatus, onCheckHealth }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#detect", label: "Detect" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#damage-types", label: "Damage Types" },
    { href: "#model-info", label: "Model" },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-2 sm:top-4 z-50 w-full max-w-7xl mx-auto px-3 sm:px-6 mb-6 sm:mb-8">
      <nav className="clay-card py-2.5 sm:py-3.5 px-3.5 sm:px-6 flex items-center justify-between backdrop-blur-md bg-white/95 relative">
        {/* Brand with Project Logo */}
        <a href="#" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white flex items-center justify-center p-1 shadow-clay-sm border-2 border-clay-border group-hover:rotate-6 transition-transform overflow-hidden shrink-0">
            <img
              src={logoImg}
              alt="RoadDamage AI Logo"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-heading text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
                RoadDamage<span className="text-brand-green">.AI</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-green-light text-brand-green-dark border border-brand-green/30">
                v1.0 • YOLOv8n
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden md:block">
              Vision AI for Road Infrastructure
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-cream-100 p-1.5 rounded-2xl border-2 border-clay-border">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-1.5 rounded-xl font-heading font-semibold text-sm text-slate-700 hover:text-brand-green hover:bg-white transition-all shadow-none hover:shadow-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Status Pill & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Backend Status Pill */}
          {checkingStatus ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] sm:text-xs font-bold shadow-sm">
              <RefreshCw size={13} className="animate-spin text-amber-600" />
              <span className="hidden xs:inline">Checking</span>
            </div>
          ) : isBackendOnline ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] sm:text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ring-2 ring-emerald-300"></span>
              <span>Ready</span>
            </div>
          ) : (
            <div
              onClick={onCheckHealth}
              title="Click to reconnect"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-[11px] sm:text-xs font-bold cursor-pointer hover:bg-rose-100 transition-colors shadow-sm"
            >
              <AlertCircle size={13} className="text-rose-600" />
              <span className="hidden xs:inline">Offline</span>
            </div>
          )}

          {/* Inspect Road Button (Desktop & Tablet) */}
          <a
            href="#detect"
            className="hidden md:inline-flex clay-btn clay-btn-green text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
          >
            <Zap size={15} />
            <span>Inspect Road</span>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-2xl bg-cream-100 border-2 border-clay-border text-slate-700 hover:text-brand-green hover:bg-white transition-all shadow-sm focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 clay-card p-4 bg-white/98 backdrop-blur-lg border-2 border-clay-border shadow-clay-md animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="px-4 py-2.5 rounded-xl font-heading font-semibold text-slate-700 hover:text-brand-green hover:bg-cream-100 active:bg-brand-green-light transition-all flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-slate-300 font-normal">→</span>
              </a>
            ))}

            <div className="pt-2 mt-1 border-t border-clay-border">
              <a
                href="#detect"
                onClick={handleNavClick}
                className="clay-btn clay-btn-green w-full py-3 text-sm justify-center"
              >
                <Zap size={16} />
                <span>Start Detection Now</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
