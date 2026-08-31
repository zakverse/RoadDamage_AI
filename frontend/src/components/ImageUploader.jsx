import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Sliders, Play, RefreshCw } from 'lucide-react';

export default function ImageUploader({
  imagePreview,
  onImageSelected,
  confidence,
  setConfidence,
  onDetect,
  isLoading,
  onReset
}) {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageSelected(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelected(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="glass-card">
      <h2 className="section-title">
        <UploadCloud size={20} color="#f59e0b" />
        Input Gambar Jalan
      </h2>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/jpg,image/webp"
        style={{ display: 'none' }}
      />

      {/* Dropzone */}
      <div
        className={`dropzone ${isDragOver ? 'active' : ''}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {imagePreview ? (
          <div>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                maxHeight: '220px',
                maxWidth: '100%',
                borderRadius: '8px',
                objectFit: 'contain',
                marginBottom: '10px'
              }}
            />
            <p className="dropzone-text" style={{ fontSize: '13px', color: '#f59e0b' }}>
              Klik atau geser gambar baru untuk mengganti
            </p>
          </div>
        ) : (
          <div>
            <UploadCloud className="dropzone-icon" />
            <p className="dropzone-text">Pilih atau Drag & Drop Gambar ke Sini</p>
            <p className="dropzone-subtext">Mendukung format JPG, PNG, atau WEBP</p>
          </div>
        )}
      </div>

      {/* Confidence Threshold Slider */}
      <div className="slider-group">
        <div className="slider-header">
          <span className="slider-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sliders size={16} />
            Confidence Threshold
          </span>
          <span className="slider-value">{(confidence * 100).toFixed(0)}%</span>
        </div>
        <input
          type="range"
          min="0.10"
          max="0.90"
          step="0.05"
          value={confidence}
          onChange={(e) => setConfidence(parseFloat(e.target.value))}
          className="custom-range"
        />
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          className="btn-detect"
          onClick={onDetect}
          disabled={!imagePreview || isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              Menganalisis Kerusakan...
            </>
          ) : (
            <>
              <Play size={18} fill="#111827" />
              Detect Road Damage
            </>
          )}
        </button>

        {imagePreview && (
          <button
            onClick={onReset}
            style={{
              marginTop: '24px',
              padding: '14px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              color: '#d1d5db',
              cursor: 'pointer'
            }}
            title="Reset Gambar"
          >
            <RefreshCw size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
