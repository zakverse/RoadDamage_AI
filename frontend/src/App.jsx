import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import QuickStats from './components/QuickStats';
import ImageUploader from './components/ImageUploader';
import DetectionResult from './components/DetectionResult';
import HowItWorks from './components/HowItWorks';
import DamageTypes from './components/DamageTypes';
import ModelInfo from './components/ModelInfo';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { AlertCircle, X, Sparkles } from 'lucide-react';

// Mengambil API Base URL:
// - Jika VITE_API_URL didefinisikan (misal: "https://backend.onrender.com"), gunakan URL tersebut.
// - Jika VITE_API_URL diset kosong (""), gunakan same-origin path ("/api/health" & "/api/predict").
// - Jika tidak didefinisikan (default local dev), gunakan "http://127.0.0.1:8000".
const RAW_API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = RAW_API_URL !== undefined ? RAW_API_URL.replace(/\/+$/, '') : 'http://127.0.0.1:8000';
const HEALTH_URL = API_BASE_URL ? `${API_BASE_URL}/health` : '/api/health';
const PREDICT_URL = API_BASE_URL ? `${API_BASE_URL}/predict` : '/api/predict';

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
      const res = await fetch(HEALTH_URL);
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
    if (!file) return;

    // Validasi tipe file citra
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Format file tidak didukung. Harap unggah file gambar (JPG, PNG, atau WEBP).');
      return;
    }

    // Validasi batas ukuran file (maksimal 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('Ukuran gambar terlalu besar (maksimal 10MB). Harap pilih gambar yang lebih kecil.');
      return;
    }

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

    // Buat AbortController untuk timeout 30 detik (menghindari request menggantung jika server lambat)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(PREDICT_URL, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || `Server mengembalikan status HTTP ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('Detection error:', error);
      if (error.name === 'AbortError') {
        setErrorMessage('Waktu proses habis (timeout 30 detik). Server membutuhkan waktu lebih lama untuk memproses gambar.');
      } else {
        setErrorMessage(
          error.message || 'Gagal terhubung ke backend API. Pastikan server backend sedang aktif dan dapat diakses.'
        );
      }
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
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col selection:bg-brand-green-light selection:text-brand-green-dark">
      {/* 1. Navigation Bar */}
      <Header
        isBackendOnline={isBackendOnline}
        checkingStatus={checkingStatus}
        onCheckHealth={checkHealth}
      />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Quick Stats */}
        <QuickStats />

        {/* 4. Detection Workspace */}
        <section id="detect" className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-12 scroll-mt-20 sm:scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <span className="font-heading font-bold text-xs uppercase tracking-wider text-brand-green px-3 py-1 rounded-full bg-brand-green-light border border-brand-green/30 inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles size={14} className="fill-brand-green text-brand-green" />
              Interactive Detection Workspace
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-2 sm:mt-3 mb-2 tracking-tight">
              Road Damage Detector
            </h2>
            <p className="text-xs sm:text-base text-slate-600 font-medium px-2 sm:px-0">
              Upload an image and let YOLOv8 analyze the road condition with instant visual bounding boxes.
            </p>
          </div>

          {/* Error Alert Pill */}
          {errorMessage && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-clay-sm animate-shake">
              <div className="flex items-center gap-2 sm:gap-3">
                <AlertCircle size={20} className="text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="p-1 rounded-lg hover:bg-rose-100 text-rose-700 transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* Detection Dual-Panel Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Left: Upload and Controls */}
            <div className="lg:col-span-5">
              <ImageUploader
                imagePreview={imagePreview}
                selectedFile={selectedFile}
                onImageSelected={handleImageSelected}
                confidence={confidence}
                setConfidence={setConfidence}
                onDetect={handleDetect}
                isLoading={isLoading}
                onReset={handleReset}
              />
            </div>

            {/* Right: Results Display */}
            <div className="lg:col-span-7">
              <DetectionResult
                result={result}
                imagePreview={imagePreview}
                isLoading={isLoading}
              />
            </div>
          </div>
        </section>

        {/* 5. How It Works */}
        <HowItWorks />

        {/* 6. Damage Types */}
        <DamageTypes />

        {/* 7. Model Specifications */}
        <ModelInfo />

        {/* 8. Final Call to Action */}
        <FinalCTA />
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
}
