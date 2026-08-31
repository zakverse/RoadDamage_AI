import React from 'react';

export default function ClassBadge({ className, count }) {
  const normalized = (className || '').toLowerCase();
  
  let badgeClass = 'badge-pothole';
  let label = 'Pothole';

  if (normalized === 'crack' || normalized.includes('crack')) {
    badgeClass = 'badge-crack';
    label = 'Crack';
  } else if (normalized === 'manhole' || normalized.includes('manhole')) {
    badgeClass = 'badge-manhole';
    label = 'Manhole';
  }

  return (
    <span className={`badge ${badgeClass}`}>
      <span>●</span>
      {label}
      {count !== undefined && <span style={{ opacity: 0.8, marginLeft: 4 }}>({count})</span>}
    </span>
  );
}
