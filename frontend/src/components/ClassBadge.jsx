import React from 'react';

export default function ClassBadge({ className }) {
  const normalized = (className || '').toLowerCase();

  const configs = {
    pothole: {
      label: 'Pothole',
      bg: 'bg-amber-100',
      text: 'text-amber-900',
      border: 'border-amber-300',
      dot: 'bg-amber-500'
    },
    crack: {
      label: 'Crack',
      bg: 'bg-rose-100',
      text: 'text-rose-900',
      border: 'border-rose-300',
      dot: 'bg-rose-500'
    },
    manhole: {
      label: 'Manhole',
      bg: 'bg-sky-100',
      text: 'text-sky-900',
      border: 'border-sky-300',
      dot: 'bg-sky-500'
    }
  };

  const current = configs[normalized] || {
    label: className || 'Unknown',
    bg: 'bg-slate-100',
    text: 'text-slate-800',
    border: 'border-slate-300',
    dot: 'bg-slate-400'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-heading font-bold border ${current.bg} ${current.text} ${current.border} shadow-sm`}>
      <span className={`w-2 h-2 rounded-full ${current.dot}`}></span>
      {current.label}
    </span>
  );
}
