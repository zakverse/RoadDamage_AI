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
        throw new Error(errData.detail || `Server returned ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Detection error:', error);
      setErrorMessage(
        error.message || 'Failed to connect to backend API. Please make sure the FastAPI server is running on port 8000.'
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
        <section id="detect" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="font-heading font-bold text-xs uppercase tracking-wider text-brand-green px-3.5 py-1 rounded-full bg-brand-green-light border border-brand-green/30 inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles size={14} className="fill-brand-green text-brand-green" />
              Interactive Detection Workspace
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 mb-2 tracking-tight">
              Road Damage Detector
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Upload an image and let YOLOv8 analyze the road condition with instant visual bounding boxes.
            </p>
          </div>

          {/* Error Alert Pill */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 text-sm font-semibold flex items-center justify-between shadow-clay-sm animate-shake">
              <div className="flex items-center gap-3">
                <AlertCircle size={22} className="text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="p-1 rounded-lg hover:bg-rose-100 text-rose-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* Detection Dual-Panel Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
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
