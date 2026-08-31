import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import DetectionResult from './components/DetectionResult';
import { AlertCircle } from 'lucide-react';

const API_BASE_URL = 'http://127.0.0.1:8000';

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [confidence, setConfidence] = useState(0.25);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  // Check Backend Health
  const checkHealth = async () => {
    try {
      setCheckingStatus(true);
      const res = await fetch(`${API_BASE_URL}/health`);
      if (res.ok) {
        setIsBackendOnline(true);
      } else {
        setIsBackendOnline(false);
      }
    } catch (err) {
      setIsBackendOnline(false);
    } finally {
      setCheckingStatus(false);
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleImageSelected = (file) => {
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    setResult(null);
    setErrorMessage(null);
  };

  const handleDetect = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('conf', confidence);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || `Server error (${response.status})`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Detection error:', error);
      setErrorMessage(
        error.message || 'Gagal menghubungi backend API. Pastikan server FastAPI aktif di port 8000.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header
        isBackendOnline={isBackendOnline}
        checkingStatus={checkingStatus}
      />

      {/* Error Alert */}
      {errorMessage && (
        <div style={{
          marginBottom: '24px',
          padding: '14px 18px',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: 'var(--radius-md)',
          color: '#fca5a5',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <AlertCircle size={20} color="#ef4444" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Grid */}
      <main className="main-grid">
        {/* Left Column: Upload & Settings */}
        <section>
          <ImageUploader
            imagePreview={imagePreview}
            onImageSelected={handleImageSelected}
            confidence={confidence}
            setConfidence={setConfidence}
            onDetect={handleDetect}
            isLoading={isLoading}
            onReset={handleReset}
          />
        </section>

        {/* Right Column: Results */}
        <section>
          <DetectionResult
            result={result}
            imagePreview={imagePreview}
            isLoading={isLoading}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>RoadDamage AI • Week 3 Assignment "Kelompok Road Damage" • YOLOv8n Object Detection</p>
      </footer>
    </div>
  );
}
