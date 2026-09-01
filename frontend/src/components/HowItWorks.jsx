import React from 'react';
import { Upload, ScanEye, BarChart3, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Upload",
      description: "Upload a road image from your device or drag & drop directly into the workspace.",
      icon: Upload,
      cardClass: "clay-card-green text-emerald-950",
      badgeClass: "bg-emerald-200 text-emerald-900 border-emerald-300"
    },
    {
      step: "02",
      title: "Analyze",
      description: "YOLOv8 detects road damage in milliseconds using deep convolutional feature maps.",
      icon: ScanEye,
      cardClass: "clay-card-blue text-sky-950",
      badgeClass: "bg-sky-200 text-sky-900 border-sky-300"
    },
    {
      step: "03",
      title: "Understand",
      description: "View detected damage, bounding boxes, category breakdowns, and confidence scores.",
      icon: BarChart3,
      cardClass: "clay-card-pink text-rose-950",
      badgeClass: "bg-rose-200 text-rose-900 border-rose-300"
    }
  ];

  return (
    <section id="how-it-works" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="font-heading font-bold text-xs uppercase tracking-wider text-brand-green px-3 py-1 rounded-full bg-brand-green-light border border-brand-green/30">
          Simple 3-Step Process
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-3">
          How RoadDamage AI Works
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium">
          Built for municipal highway agencies, civil engineers, and automated road condition auditing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`${item.cardClass} p-8 flex flex-col justify-between relative transition-all duration-200 hover:-translate-y-1`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className={`font-heading font-extrabold text-lg px-3 py-1 rounded-2xl border ${item.badgeClass} shadow-sm`}>
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-white/80 border border-white flex items-center justify-center shadow-sm">
                    <Icon size={24} className="stroke-[2.5]" />
                  </div>
                </div>

                <h3 className="font-heading text-2xl font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm opacity-80 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/5 flex items-center gap-2 text-xs font-heading font-bold opacity-80">
                <span>Fast & Automated</span>
                <ArrowRight size={14} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
