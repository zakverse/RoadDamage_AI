import React from 'react';
import { Images, Layers, Tag, Cpu } from 'lucide-react';

export default function QuickStats() {
  const stats = [
    {
      value: "2,009",
      label: "Road Images",
      subtext: "Train, Val, & Test Sets",
      icon: Images,
      color: "green",
      cardClass: "clay-card-green text-emerald-950",
      iconBg: "bg-emerald-200 text-emerald-800 border-emerald-300"
    },
    {
      value: "4,737",
      label: "Annotated Objects",
      subtext: "Ground-truth Bounding Boxes",
      icon: Layers,
      color: "blue",
      cardClass: "clay-card-blue text-sky-950",
      iconBg: "bg-sky-200 text-sky-800 border-sky-300"
    },
    {
      value: "3",
      label: "Damage Classes",
      subtext: "Pothole, Crack, Manhole",
      icon: Tag,
      color: "pink",
      cardClass: "clay-card-pink text-rose-950",
      iconBg: "bg-rose-200 text-rose-800 border-rose-300"
    },
    {
      value: "YOLOv8n",
      label: "AI Model",
      subtext: "3.0M Params • 50 Epochs",
      icon: Cpu,
      color: "yellow",
      cardClass: "clay-card-yellow text-amber-950",
      iconBg: "bg-amber-200 text-amber-800 border-amber-300"
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`${item.cardClass} p-5 sm:p-6 transition-transform hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${item.iconBg} shadow-sm`}>
                  <Icon size={20} className="stroke-[2.5]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider opacity-60">Verified</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-1">
                {item.value}
              </div>
              <div className="font-heading font-bold text-sm sm:text-base opacity-90">
                {item.label}
              </div>
              <div className="text-xs opacity-70 mt-0.5 font-medium">
                {item.subtext}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
