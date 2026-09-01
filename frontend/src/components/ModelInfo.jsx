import React from 'react';
import { Cpu, Maximize2, Tag, Database, Zap, Award } from 'lucide-react';

export default function ModelInfo() {
  const specs = [
    { label: "Model Architecture", value: "YOLOv8n (Nano)", icon: Cpu },
    { label: "Task Type", value: "Object Detection", icon: Zap },
    { label: "Number of Classes", value: "3 Target Classes", icon: Tag },
    { label: "Input Resolution", value: "640 × 640 pixels", icon: Maximize2 },
    { label: "Training Dataset", value: "2,009 Road Images", icon: Database },
    { label: "Inference Latency", value: "~50ms / 20 FPS (CPU)", icon: Award },
  ];

  return (
    <section id="model-info" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="clay-card p-8 sm:p-12 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-6 space-y-4">
            <span className="font-heading font-bold text-xs uppercase tracking-wider text-brand-green px-3 py-1 rounded-full bg-brand-green-light border border-brand-green/30">
              Model Specifications
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Powered by YOLOv8
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              YOLOv8 (You Only Look Once v8) is the state-of-the-art vision model developed by Ultralytics. 
              Our fine-tuned <strong>YOLOv8n</strong> backbone provides real-time detection speed on edge devices 
              with high localization accuracy for road defects.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-xl bg-cream-100 border border-clay-border text-xs font-heading font-bold text-slate-700">
                🏷️ Pothole
              </span>
              <span className="px-3 py-1 rounded-xl bg-cream-100 border border-clay-border text-xs font-heading font-bold text-slate-700">
                ⚡ Crack
              </span>
              <span className="px-3 py-1 rounded-xl bg-cream-100 border border-clay-border text-xs font-heading font-bold text-slate-700">
                🛡️ Manhole
              </span>
            </div>
          </div>

          {/* Right specs grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec, idx) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-cream-100/70 border-2 border-clay-border flex items-start gap-3.5 shadow-inner"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-clay-border flex items-center justify-center text-brand-green shadow-sm shrink-0">
                      <Icon size={20} className="stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400">
                        {spec.label}
                      </p>
                      <p className="font-heading font-extrabold text-sm sm:text-base text-slate-900 mt-0.5">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
