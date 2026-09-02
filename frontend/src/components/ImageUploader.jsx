import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Sliders, Play, RefreshCw, FileImage, Sparkles, Wand2, Camera } from 'lucide-react';

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
  const cameraInputRef = useRef(null);
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
    <div className="clay-card p-4 sm:p-8 bg-white h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-brand-green-light text-brand-green-dark border-2 border-brand-green/30 flex items-center justify-center shadow-sm shrink-0">
              <UploadCloud size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-heading text-base sm:text-xl font-bold text-slate-900 leading-tight">
                1. Upload Road Image
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                JPG, PNG, or WEBP (Max 10MB)
              </p>
            </div>
          </div>

          {selectedFile && (
            <button
              onClick={onReset}
              className="clay-btn clay-btn-white text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 text-slate-600 hover:text-rose-600 shrink-0"
              title="Reset input"
            >
              <RefreshCw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Hidden file input for file picker */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/jpg,image/webp"
          className="hidden"
          id="road-image-input"
        />

        {/* Hidden file input for direct camera capture (Mobile device camera) */}
        <input
          type="file"
          ref={cameraInputRef}
          onChange={handleFileChange}
          accept="image/*"
          capture="environment"
          className="hidden"
          id="road-camera-input"
        />

        {/* Dropzone / Upload Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          id="dropzone-area"
          className={`relative rounded-2xl sm:rounded-3xl border-3 border-dashed p-4 sm:p-8 text-center cursor-pointer transition-all duration-200 group ${
            isDragOver
              ? 'border-brand-green bg-brand-green-light/40 scale-[1.01]'
              : imagePreview
              ? 'border-emerald-300 bg-cream-50 hover:bg-cream-100'
              : 'border-clay-border bg-cream-100/60 hover:bg-white hover:border-brand-green/60 shadow-inner'
          }`}
        >
          {imagePreview ? (
            <div className="flex flex-col items-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-clay-border max-h-[200px] sm:max-h-[260px] w-full bg-slate-900 shadow-md">
                <img
                  src={imagePreview}
                  alt="Selected road"
                  className="w-full h-full max-h-[200px] sm:max-h-[260px] object-contain mx-auto"
                />
              </div>

              {selectedFile && (
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-clay-border text-[11px] font-semibold text-slate-700 shadow-sm max-w-full truncate">
                  <FileImage size={13} className="text-brand-green shrink-0" />
                  <span className="truncate max-w-[140px] sm:max-w-[200px]">{selectedFile.name}</span>
                  <span className="text-slate-400 shrink-0">({(selectedFile.size / 1024).toFixed(0)} KB)</span>
                </div>
              )}

              <p className="text-[11px] sm:text-xs text-brand-green-dark font-heading font-bold mt-2 hover:underline">
                Tap or drag new image to replace
              </p>
            </div>
          ) : (
            <div className="py-3 sm:py-6 flex flex-col items-center">
              <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-white border-2 border-clay-border shadow-clay-sm flex items-center justify-center text-brand-green mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <UploadCloud size={28} className="stroke-[2.5]" />
              </div>
              <h4 className="font-heading font-bold text-sm sm:text-base text-slate-800 mb-1">
                Upload or Take Road Photo
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium max-w-xs mb-3.5 sm:mb-4 px-2">
                Use smartphone camera in the field, dashcam footage, or select from gallery
              </p>

              {/* Action Buttons: Camera + Files */}
              <div className="flex flex-wrap items-center justify-center gap-2 w-full max-w-xs">
                {/* Camera Button for Smartphone */}
                <button
                  type="button"
                  id="camera-capture-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    cameraInputRef.current?.click();
                  }}
                  className="clay-btn clay-btn-green text-xs px-3.5 py-2 flex-1 justify-center shadow-sm"
                >
                  <Camera size={15} />
                  <span>Ambil Foto</span>
                </button>

                {/* Local Files Browser */}
                <button
                  type="button"
                  id="browse-files-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="clay-btn clay-btn-white text-xs px-3.5 py-2 flex-1 justify-center text-slate-700 shadow-sm"
                >
                  <ImageIcon size={15} className="text-brand-green" />
                  <span>Pilih File</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Sample Selector */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-clay-border/60">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-heading font-bold text-slate-500 mb-2">
            <Wand2 size={13} className="text-amber-500" />
            <span>Or try sample test image:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <button
              type="button"
              id="sample-pothole-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleLoadSample('/samples/sample_pothole.jpg', 'sample_pothole.jpg');
              }}
              className="clay-btn clay-btn-white text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-900 shadow-sm"
            >
              <span>🕳️ Pothole</span>
            </button>
            <button
              type="button"
              id="sample-crack-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleLoadSample('/samples/sample_crack_manhole.jpg', 'sample_crack_manhole.jpg');
              }}
              className="clay-btn clay-btn-white text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-900 shadow-sm"
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
              className="clay-btn clay-btn-white text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-900 shadow-sm"
            >
              <span>🛣️ Road Pavement</span>
            </button>
          </div>
        </div>

        {/* Confidence Threshold Slider */}
        <div className="mt-4 sm:mt-5 p-3 sm:p-4 rounded-2xl bg-cream-100/80 border-2 border-clay-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Sliders size={15} className="text-slate-600" />
              <label className="font-heading font-bold text-xs sm:text-sm text-slate-800">
                Confidence Threshold
              </label>
            </div>
            <span className="px-2 sm:px-2.5 py-0.5 rounded-xl bg-white border border-clay-border font-heading font-bold text-xs text-brand-green-dark shadow-sm" id="conf-val">
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

          <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-400 font-semibold mt-1.5">
            <span>Sensitif (10%)</span>
            <span>Seimbang (25%)</span>
            <span>Presisi (90%)</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4 sm:mt-6">
        <button
          id="detect-button"
          onClick={onDetect}
          disabled={!imagePreview || isLoading}
          className="clay-btn clay-btn-green w-full py-3.5 sm:py-4 text-sm sm:text-lg shadow-clay-btn-green flex items-center justify-center gap-2 sm:gap-3"
        >
          {isLoading ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              <span>Analyzing Road with YOLOv8...</span>
            </>
          ) : (
            <>
              <Play size={18} className="fill-white" />
              <span>Detect Road Damage</span>
              <Sparkles size={16} className="text-emerald-200 fill-emerald-200" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
