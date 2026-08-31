import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function Header({ isBackendOnline, checkingStatus }) {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="brand-icon">
          <AlertTriangle size={24} color="#111827" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="brand-title">RoadDamage AI</h1>
          <p className="brand-subtitle">Sistem Deteksi Kerusakan Jalan Berbasis YOLOv8n</p>
        </div>
      </div>

      <div>
        {checkingStatus ? (
          <div className="status-pill" style={{ color: '#9ca3af', borderColor: 'rgba(255,255,255,0.1)' }}>
            <span className="status-dot" style={{ backgroundColor: '#9ca3af', boxShadow: 'none' }}></span>
            Memeriksa API...
          </div>
        ) : isBackendOnline ? (
          <div className="status-pill">
            <span className="status-dot"></span>
            FastAPI YOLOv8n Siap
          </div>
        ) : (
          <div className="status-pill" style={{ color: '#f87171', borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)' }}>
            <span className="status-dot" style={{ backgroundColor: '#ef4444', boxShadow: '0 0 8px #ef4444' }}></span>
            Backend Offline (Port 8000)
          </div>
        )}
      </div>
    </header>
  );
}
