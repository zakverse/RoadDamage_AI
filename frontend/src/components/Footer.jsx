import React from 'react';
import logoImg from '../logo.png';

export default function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-3 sm:px-6 pt-8 sm:pt-10 pb-12 sm:pb-16 border-t-2 border-clay-border/80 mt-8 sm:mt-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 text-center md:text-left">
        
        {/* Brand info */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white flex items-center justify-center p-1 shadow-clay-sm border border-clay-border overflow-hidden shrink-0">
            <img
              src={logoImg}
              alt="RoadDamage AI Logo"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
          <div className="text-left">
            <span className="font-heading font-bold text-base sm:text-lg text-slate-800 tracking-tight">
              RoadDamage<span className="text-brand-green">.AI</span>
            </span>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
              AI-powered road damage detection using YOLOv8n.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-heading font-semibold text-slate-600">
          <a href="#detect" className="hover:text-brand-green transition-colors py-1">
            Detect
          </a>
          <a href="#how-it-works" className="hover:text-brand-green transition-colors py-1">
            How It Works
          </a>
          <a href="#damage-types" className="hover:text-brand-green transition-colors py-1">
            Damage Types
          </a>
          <a href="#model-info" className="hover:text-brand-green transition-colors py-1">
            Model
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[11px] sm:text-xs font-medium text-slate-400 text-center md:text-right">
          <p>© {new Date().getFullYear()} RoadDamage AI. All rights reserved.</p>
          <p className="flex items-center justify-center md:justify-end gap-1 mt-0.5">
            Crafted for Road Infrastructure Monitoring
          </p>
        </div>
      </div>
    </footer>
  );
}
