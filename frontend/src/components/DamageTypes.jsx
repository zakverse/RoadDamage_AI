import React from 'react';
import { AlertTriangle, Activity, Disc3, ArrowUpRight } from 'lucide-react';

export default function DamageTypes() {
  const types = [
    {
      name: "POTHOLE",
      subtitle: "Road surface holes",
      description: "Bowl-shaped depressions in the road pavement caused by water infiltration, freeze-thaw cycles, and heavy vehicle traffic.",
      badge: "High Hazard",
      icon: AlertTriangle,
      colorClass: "clay-card-yellow text-amber-950",
      accentBg: "bg-amber-200 text-amber-900 border-amber-300",
      badgeColor: "bg-amber-400 text-amber-950"
    },
    {
      name: "CRACK",
      subtitle: "Surface cracks",
      description: "Longitudinal, transverse, and alligator cracks forming fissures that compromise structural asphalt integrity if unsealed.",
      badge: "Medium Hazard",
      icon: Activity,
      colorClass: "clay-card-pink text-rose-950",
      accentBg: "bg-rose-200 text-rose-900 border-rose-300",
      badgeColor: "bg-rose-400 text-rose-950"
    },
    {
      name: "MANHOLE",
      subtitle: "Drain/manhole covers",
      description: "Utility covers, storm drains, and cast-iron utility access points that can be sunken, displaced, or uneven with road level.",
      badge: "Infrastructure",
      icon: Disc3,
      colorClass: "clay-card-blue text-sky-950",
      accentBg: "bg-sky-200 text-sky-900 border-sky-300",
      badgeColor: "bg-sky-400 text-sky-950"
    }
  ];

  return (
    <section id="damage-types" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="font-heading font-bold text-xs uppercase tracking-wider text-brand-green px-3 py-1 rounded-full bg-brand-green-light border border-brand-green/30">
          Supervised Classification
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-3">
          3 Detected Damage Types
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium">
          Accurately labeled and learned from 4,737 ground-truth bounding box instances.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {types.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`${item.colorClass} p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1.5`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-3xl ${item.accentBg} border flex items-center justify-center shadow-sm`}>
                    <Icon size={28} className="stroke-[2.5]" />
                  </div>
                  <span className={`text-[11px] font-heading font-bold px-3 py-1 rounded-full shadow-sm ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-extrabold tracking-tight mb-1">
                  {item.name}
                </h3>
                <p className="font-heading font-semibold text-sm opacity-90 mb-3">
                  "{item.subtitle}"
                </p>
                <p className="text-sm opacity-80 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-heading font-bold opacity-80">
                <span>Class ID: {idx}</span>
                <span className="flex items-center gap-1">YOLO Bounding Box <ArrowUpRight size={14} /></span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
