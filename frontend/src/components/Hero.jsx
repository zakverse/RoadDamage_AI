import React from 'react';
import { ArrowRight, HelpCircle, Sparkles, CheckCircle2, AlertTriangle, Disc3 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 pt-2 sm:pt-4 pb-12 sm:pb-16 lg:pb-24 overflow-hidden lg:overflow-visible">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Heading & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 sm:space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-white border-2 border-clay-border shadow-clay-sm">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-brand-green animate-ping"></span>
            <Sparkles size={15} className="text-amber-500 fill-amber-400" />
            <span className="font-heading font-semibold text-[11px] sm:text-xs text-slate-700 uppercase tracking-wider">
              Powered by Ultralytics YOLOv8
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.14]">
            Detect Road Damage, <br className="hidden sm:inline" />
            <span className="relative inline-block text-brand-green underline decoration-wavy decoration-brand-green/40">
              Anytime
            </span>
            , Anywhere!
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium max-w-xl leading-relaxed px-1 sm:px-0">
            Upload a road image and let AI identify potholes, cracks, and manholes automatically. 
            Real-time computer vision tailored for road infrastructure audits.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2 w-full sm:w-auto">
            <a
              href="#detect"
              className="clay-btn clay-btn-green text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 shadow-clay-btn-green justify-center"
            >
              <span>Start Detection</span>
              <ArrowRight size={18} className="stroke-[2.5]" />
            </a>

            <a
              href="#how-it-works"
              className="clay-btn clay-btn-white text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-3.5 shadow-clay-sm text-slate-700 justify-center"
            >
              <HelpCircle size={18} className="text-slate-500 stroke-[2]" />
              <span>How It Works</span>
            </a>
          </div>

          {/* Feature Micro-Badges */}
          <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-5 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-brand-green fill-brand-green-light" />
              <span>Zero Manual Labeling</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-brand-green fill-brand-green-light" />
              <span>Sub-60ms Latency</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-brand-green fill-brand-green-light" />
              <span>50-Epoch Trained</span>
            </div>
          </div>
        </div>

        {/* Right Column: Playful Claymorphism Preview Card */}
        <div className="lg:col-span-5 relative flex justify-center px-2 sm:px-4 mt-2 sm:mt-0">
          
          {/* Floating Decorative Element 1 - Top Left */}
          <div className="absolute -top-3 left-0 sm:-top-4 sm:-left-4 z-20 clay-card-sm px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-white flex items-center gap-2 animate-float shadow-clay-md">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-600 shrink-0">
              <AlertTriangle size={15} className="stroke-[2.5]" />
            </div>
            <div>
              <p className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 leading-none">Detection</p>
              <p className="font-heading font-bold text-[11px] sm:text-xs text-slate-800">Pothole 94%</p>
            </div>
          </div>

          {/* Floating Decorative Element 2 - Top Right */}
          <div className="absolute -top-4 right-0 sm:-top-6 sm:-right-2 z-20 clay-card-sm px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-white flex items-center gap-2 animate-float-reverse shadow-clay-md">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-brand-green-light border border-brand-green/30 flex items-center justify-center text-brand-green-dark shrink-0">
              <Sparkles size={15} className="stroke-[2.5]" />
            </div>
            <div>
              <p className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 leading-none">Speed</p>
              <p className="font-heading font-bold text-[11px] sm:text-xs text-slate-800">⚡ ~50ms</p>
            </div>
          </div>

          {/* Floating Decorative Element 3 - Bottom Left */}
          <div className="absolute -bottom-3 left-0 sm:-bottom-5 sm:-left-4 z-20 clay-card-sm px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-white flex items-center gap-2 animate-float shadow-clay-md">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-600 shrink-0">
              <Disc3 size={15} className="stroke-[2.5]" />
            </div>
            <div>
              <p className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 leading-none">Class</p>
              <p className="font-heading font-bold text-[11px] sm:text-xs text-slate-800">Manhole 98%</p>
            </div>
          </div>

          {/* Main Preview Clay Card */}
          <div className="clay-card p-3.5 sm:p-5 w-full max-w-md bg-white relative z-10">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b-2 border-clay-border mb-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-400 border border-rose-500"></span>
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400 border border-amber-500"></span>
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 border border-emerald-500"></span>
                <span className="text-[11px] sm:text-xs font-heading font-bold text-slate-500 ml-1">Live YOLOv8 Preview</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-cream-200 text-slate-700">
                Test Image #402
              </span>
            </div>

            {/* Simulated Road Image with Bounding Boxes */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-clay-border bg-slate-800 aspect-[4/3] shadow-inner group">
              {/* Road surface background */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop')`,
                  filter: 'contrast(1.05) brightness(0.9)'
                }}
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>

              {/* Simulated Bounding Box 1: Pothole */}
              <div className="absolute top-[32%] left-[22%] w-[38%] h-[34%] border-2 sm:border-3 border-amber-400 rounded-xl bg-amber-400/20 backdrop-blur-[1px] flex flex-col justify-start items-start p-1 sm:p-1.5 shadow-lg animate-soft-pulse">
                <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-amber-500 text-slate-900 font-heading font-bold text-[9px] sm:text-[10px] shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  pothole 0.94
                </span>
              </div>

              {/* Simulated Bounding Box 2: Crack */}
              <div className="absolute top-[58%] right-[12%] w-[32%] h-[28%] border-2 sm:border-3 border-rose-400 rounded-xl bg-rose-400/20 backdrop-blur-[1px] flex flex-col justify-start items-start p-1 sm:p-1.5 shadow-lg">
                <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-rose-500 text-white font-heading font-bold text-[9px] sm:text-[10px] shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  crack 0.89
                </span>
              </div>

              {/* Bottom Badge inside image */}
              <div className="absolute bottom-2 left-2 right-2 sm:bottom-2.5 sm:left-3 sm:right-3 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-white/90 bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-white/20">
                <span>Model: YOLOv8n</span>
                <span className="text-emerald-400">IoU: 0.50</span>
              </div>
            </div>

            {/* Micro Caption */}
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium text-center mt-2.5 sm:mt-3">
              *Visual illustration showing AI detection bounding boxes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
