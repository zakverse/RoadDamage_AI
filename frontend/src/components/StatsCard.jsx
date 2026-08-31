import React from 'react';

export default function StatsCard({ type, label, count, color }) {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-number" style={{ color: color || '#f9fafb' }}>
        {count}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
