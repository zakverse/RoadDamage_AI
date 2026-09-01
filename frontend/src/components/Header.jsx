import React from 'react';
import { AlertCircle, RefreshCw, Zap } from 'lucide-react';
import logoImg from '../logo.png';

export default function Header({ isBackendOnline, checkingStatus, onCheckHealth }) {
  return (
    <header className="sticky top-4 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 mb-8">
      <nav className="clay-card py-3.5 px-6 flex items-center justify-between backdrop-blur-md bg-white/95">
        {/* Brand with Project Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center p-1 shadow-clay-sm border-2 border-clay-border group-hover:rotate-6 transition-transform overflow-hidden shrink-0">
            <img
              src={logoImg}
              alt="RoadDamage AI Logo"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl font-bold text-slate-800 tracking-tight">
                RoadDamage<span className="text-brand-green">.AI</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-brand-green-light text-brand-green-dark border border-brand-green/30">
                v1.0 • YOLOv8n
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden md:block">
              Vision AI for Road Infrastructure
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-cream-100 p-1.5 rounded-2xl border-2 border-clay-border">
          <a
            href="#detect"
            className="px-4 py-1.5 rounded-xl font-heading font-semibold text-sm text-slate-700 hover:text-brand-green hover:bg-white transition-all shadow-none hover:shadow-sm"
          >
            Detect
          </a>
          <a
            href="#how-it-works"
            className="px-4 py-1.5 rounded-xl font-heading font-semibold text-sm text-slate-700 hover:text-brand-green hover:bg-white transition-all shadow-none hover:shadow-sm"
          >
            How It Works
          </a>
          <a
            href="#damage-types"
            className="px-4 py-1.5 rounded-xl font-heading font-semibold text-sm text-slate-700 hover:text-brand-green hover:bg-white transition-all shadow-none hover:shadow-sm"
          >
            Damage Types
          </a>
          <a
            href="#model-info"
            className="px-4 py-1.5 rounded-xl font-heading font-semibold text-sm text-slate-700 hover:text-brand-green hover:bg-white transition-all shadow-none hover:shadow-sm"
          >
            Model
          </a>
        </div>

        {/* Backend Status Pill */}
        <div className="flex items-center gap-3">
          {checkingStatus ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-800 text-xs font-bold shadow-sm">
              <RefreshCw size={14} className="animate-spin text-amber-600" />
              <span>Checking...</span>
            </div>
          ) : isBackendOnline ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-xs font-bold shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ring-2 ring-emerald-300"></span>
              <span>Ready</span>
            </div>
          ) : (
            <div
              onClick={onCheckHealth}
              title="Click to reconnect"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-800 text-xs font-bold cursor-pointer hover:bg-rose-100 transition-colors shadow-sm"
            >
              <AlertCircle size={14} className="text-rose-600" />
              <span>Backend Offline</span>
            </div>
          )}

          <a
            href="#detect"
            className="hidden sm:inline-flex clay-btn clay-btn-green text-sm px-4 py-2"
          >
            <Zap size={16} />
            Inspect Road
          </a>
        </div>
      </nav>
    </header>
  );
}
