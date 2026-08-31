import React, { useState } from 'react';
import { Eye, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import StatsCard from './StatsCard';
import ClassBadge from './ClassBadge';

export default function DetectionResult({
  result,
  imagePreview,
  isLoading
}) {
  const [showOriginal, setShowOriginal] = useState(false);

  if (isLoading) {
    return (
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '3px solid rgba(245, 158, 11, 0.2)',
          borderTopColor: '#f59e0b',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }} />
        <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Menjalankan Inferensi YOLOv8n...</h3>
        <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '6px' }}>Mendeteksi objek pothole, crack, dan manhole</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="glass-card empty-state">
        <Layers className="empty-icon" />
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#e5e7eb', marginBottom: '6px' }}>
          Belum Ada Hasil Deteksi
        </h3>
        <p style={{ fontSize: '13px', maxWidth: '320px' }}>
          Unggah gambar jalan di panel sebelah kiri lalu klik tombol "Detect Road Damage" untuk memulai.
        </p>
      </div>
    );
  }

  const { total_detections, class_counts, detections, annotated_image } = result;

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          <Eye size={20} color="#f59e0b" />
          Hasil Deteksi AI
        </h2>

        {annotated_image && (
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            style={{
              fontSize: '12px',
              padding: '6px 12px',
              borderRadius: '6px',
              background: showOriginal ? '#f59e0b' : 'rgba(255,255,255,0.06)',
              color: showOriginal ? '#111827' : '#d1d5db',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            {showOriginal ? 'Lihat Bounding Box' : 'Lihat Gambar Asli'}
          </button>
        )}
      </div>

      {/* Summary Stats Cards */}
      <div className="stats-grid">
        <StatsCard
          type="total"
          label="Total Kerusakan"
          count={total_detections}
        />
        <StatsCard
          type="pothole"
          label="Pothole"
          count={class_counts?.pothole || 0}
          color="#fbbf24"
        />
        <StatsCard
          type="crack"
          label="Crack"
          count={class_counts?.crack || 0}
          color="#fb7185"
        />
        <StatsCard
          type="manhole"
          label="Manhole"
          count={class_counts?.manhole || 0}
          color="#38bdf8"
        />
      </div>

      {/* Image Display */}
      <div className="preview-wrapper">
        <img
          src={showOriginal ? imagePreview : (annotated_image || imagePreview)}
          alt="Detection Result"
          className="preview-img"
        />
      </div>

      {/* Detections Detail Table */}
      {detections && detections.length > 0 ? (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#e5e7eb', marginBottom: '10px' }}>
            Rincian Objek Terdeteksi ({detections.length})
          </h3>
          <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
            <table className="detections-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kategori</th>
                  <th>Confidence</th>
                  <th>Bounding Box [x1, y1, x2, y2]</th>
                </tr>
              </thead>
              <tbody>
                {detections.map((det, idx) => (
                  <tr key={idx}>
                    <td style={{ color: '#9ca3af', width: '36px' }}>{idx + 1}</td>
                    <td>
                      <ClassBadge className={det.class_name} />
                    </td>
                    <td style={{ width: '160px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
                        <span>{(det.confidence * 100).toFixed(1)}%</span>
                      </div>
                      <div className="confidence-bar-bg">
                        <div
                          className="confidence-bar-fill"
                          style={{
                            width: `${det.confidence * 100}%`,
                            backgroundColor:
                              det.class_name === 'crack'
                                ? '#f43f5e'
                                : det.class_name === 'manhole'
                                ? '#06b6d4'
                                : '#f59e0b'
                          }}
                        />
                      </div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '11px', color: '#9ca3af' }}>
                      [{det.bbox.join(', ')}]
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '8px',
          textAlign: 'center',
          color: '#9ca3af',
          fontSize: '13px'
        }}>
          <CheckCircle2 size={20} color="#10b981" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          Tidak ada kerusakan jalan yang terdeteksi pada batas confidence saat ini.
        </div>
      )}
    </div>
  );
}
