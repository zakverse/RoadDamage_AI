import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Sliders, Play, RefreshCw, FileImage, Sparkles, Wand2 } from 'lucide-react';

export default function ImageUploader({
  imagePreview,
  selectedFile,
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

  // Load predefined sample road image
  const handleLoadSample = async (samplePath, sampleName) => {
    try {
      const response = await fetch(samplePath);
      const blob = await response.blob();
      const file = new File([blob], sampleName, { type: 'image/jpeg' });
      onImageSelected(file);
    } catch (err) {
      console.error('Failed to load sample image:', err);
    }
  };

  return (
    <div className="clay-card p-6 sm:p-8 bg-white h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-green-light text-brand-green-dark border-2 border-brand-green/30 flex items-center justify-center shadow-sm">
              <UploadCloud size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900">
                1. Upload Road Image
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                JPG, PNG, or WEBP up to 10MB
              </p>
            </div>
          </div>

          {selectedFile && (
            <button
              onClick={onReset}
              className="clay-btn clay-btn-white text-xs px-3 py-1.5 text-slate-600 hover:text-rose-600"
              title="Reset input"
            >
              <RefreshCw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/jpg,image/webp"
          className="hidden"
          id="road-image-input"
        />

        {/* Dropzone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          id="dropzone-area"
          className={`relative rounded-3xl border-3 border-dashed p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 group ${
            isDragOver
              ? 'border-brand-green bg-brand-green-light/40 scale-[1.01]'
              : imagePreview
              ? 'border-emerald-300 bg-cream-50 hover:bg-cream-100'
              : 'border-clay-border bg-cream-100/60 hover:bg-white hover:border-brand-green/60 shadow-inner'
          }`}
        >
          {imagePreview ? (
            <div className="flex flex-col items-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-clay-border max-h-[260px] w-full bg-slate-900 shadow-md">
                <img
                  src={imagePreview}
                  alt="Selected road"
                  className="w-full h-full max-h-[260px] object-contain mx-auto"
                />
              </div>

              {selectedFile && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white border border-clay-border text-xs font-semibold text-slate-700 shadow-sm">
                  <FileImage size={14} className="text-brand-green" />
                  <span className="truncate max-w-[200px]">{selectedFile.name}</span>
                  <span className="text-slate-400">({(selectedFile.size / 1024).toFixed(0)} KB)</span>
                </div>
              )}

              <p className="text-xs text-brand-green-dark font-heading font-bold mt-2 hover:underline">
                Click or drag new image to replace
              </p>
            </div>
          ) : (
            <div className="py-6 flex flex-col items-center">
              <div className="w-16 h-16 rounded-3xl bg-white border-2 border-clay-border shadow-clay-sm flex items-center justify-center text-brand-green mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <UploadCloud size={32} className="stroke-[2.5]" />
              </div>
              <h4 className="font-heading font-bold text-base text-slate-800 mb-1">
                Drag & Drop Road Photo Here
              </h4>
              <p className="text-xs text-slate-500 font-medium max-w-xs mb-4">
                Photos from dashboard cameras, smartphone captures, or UAV surveys
              </p>
              <button
                type="button"
                id="browse-files-btn"
                className="clay-btn clay-btn-white text-xs px-4 py-2 text-slate-700"
              >
                <ImageIcon size={16} className="text-brand-green" />
                <span>Browse Local Files</span>
              </button>
            </div>
          )}
        </div>

        {/* Quick Sample Selector */}
        <div className="mt-4 pt-3 border-t border-clay-border/60">
          <div className="flex items-center gap-1.5 text-xs font-heading font-bold text-slate-500 mb-2">
            <Wand2 size={14} className="text-amber-500" />
            <span>Or try sample test image:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              id="sample-pothole-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleLoadSample('/samples/sample_pothole.jpg', 'sample_pothole.jpg');
              }}
              className="clay-btn clay-btn-white text-xs px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-900 shadow-sm"
            >
              <span>🕳️ Pothole Sample</span>
            </button>
            <button
              type="button"
              id="sample-crack-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleLoadSample('/samples/sample_crack_manhole.jpg', 'sample_crack_manhole.jpg');
              }}
              className="clay-btn clay-btn-white text-xs px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-900 shadow-sm"
            >
              <span>⚡ Crack & Manhole</span>
            </button>
            <button
              type="button"
              id="sample-road-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleLoadSample('/samples/sample_road.jpg', 'sample_road.jpg');
              }}
              className="clay-btn clay-btn-white text-xs px-3 py-1.5 bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-900 shadow-sm"
            >
              <span>🛣️ Road Pavement</span>
            </button>
          </div>
        </div>

        {/* Confidence Threshold Slider */}
        <div className="mt-5 p-4 rounded-2xl bg-cream-100/80 border-2 border-clay-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sliders size={16} className="text-slate-600" />
              <label className="font-heading font-bold text-xs sm:text-sm text-slate-800">
                Confidence Threshold
              </label>
            </div>
            <span className="px-2.5 py-0.5 rounded-xl bg-white border border-clay-border font-heading font-bold text-xs text-brand-green-dark shadow-sm" id="conf-val">
              {(confidence * 100).toFixed(0)}%
            </span>
          </div>

          <input
            type="range"
            min="0.10"
            max="0.90"
            step="0.05"
            value={confidence}
            onChange={(e) => setConfidence(parseFloat(e.target.value))}
            className="clay-slider"
            id="confidence-slider"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1.5">
            <span>More Sensitive (10%)</span>
            <span>Balanced (25%)</span>
            <span>High Precision (90%)</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <button
          id="detect-button"
          onClick={onDetect}
          disabled={!imagePreview || isLoading}
          className="clay-btn clay-btn-green w-full py-4 text-base sm:text-lg shadow-clay-btn-green flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <RefreshCw size={20} className="animate-spin" />
              <span>Analyzing Road with YOLOv8...</span>
            </>
          ) : (
            <>
              <Play size={20} className="fill-white" />
              <span>Detect Road Damage</span>
              <Sparkles size={18} className="text-emerald-200 fill-emerald-200" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
