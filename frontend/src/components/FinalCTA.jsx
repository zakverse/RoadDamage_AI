import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-12">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-[32px] bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 p-6 sm:p-14 text-center text-white border-3 sm:border-4 border-emerald-400 shadow-clay-lg">
        
        {/* Decorative Floating Sparkles */}
        <div className="absolute top-6 left-8 text-white/40 animate-float hidden sm:block">
          <Sparkles size={36} />
        </div>
        <div className="absolute bottom-6 right-8 text-white/40 animate-float-reverse hidden sm:block">
          <Sparkles size={40} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] sm:text-xs font-heading font-bold uppercase tracking-wider">
            <ShieldCheck size={15} />
            <span>Start Free Road Inspection</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
            Ready to Check a Road?
          </h2>

          <p className="text-sm sm:text-lg text-emerald-50 font-medium max-w-lg mx-auto leading-relaxed px-1 sm:px-0">
            Upload an image and let RoadDamage AI analyze it in seconds. 
            Automate road inspection with reliable machine learning.
          </p>

          <div className="pt-2 sm:pt-4">
            <a
              href="#detect"
              className="clay-btn clay-btn-white text-emerald-900 text-sm sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 shadow-clay-md hover:scale-105 transition-transform w-full sm:w-auto justify-center"
            >
              <span>Start Detection</span>
              <ArrowRight size={18} className="stroke-[2.5]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
