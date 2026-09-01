import React from 'react';
import { Layers, AlertTriangle, Activity, Disc3 } from 'lucide-react';

export default function StatsCard({ type, label, count }) {
  const configs = {
    total: {
      icon: Layers,
      cardClass: 'clay-card-sm bg-slate-50 border-slate-200 text-slate-900',
      iconBg: 'bg-slate-200 text-slate-800'
    },
    pothole: {
      icon: AlertTriangle,
      cardClass: 'clay-card-sm bg-amber-50 border-amber-200 text-amber-950',
      iconBg: 'bg-amber-200 text-amber-800'
    },
    crack: {
      icon: Activity,
      cardClass: 'clay-card-sm bg-rose-50 border-rose-200 text-rose-950',
      iconBg: 'bg-rose-200 text-rose-800'
    },
    manhole: {
      icon: Disc3,
      cardClass: 'clay-card-sm bg-sky-50 border-sky-200 text-sky-950',
      iconBg: 'bg-sky-200 text-sky-800'
    }
  };

  const current = configs[type] || configs.total;
  const Icon = current.icon;

  return (
    <div className={`${current.cardClass} p-3.5 sm:p-4 flex items-center gap-3.5`}>
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${current.iconBg} shadow-sm shrink-0`}>
        <Icon size={20} className="stroke-[2.5]" />
      </div>
      <div>
        <p className="text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 leading-tight">
          {count ?? 0}
        </p>
      </div>
    </div>
  );
}
