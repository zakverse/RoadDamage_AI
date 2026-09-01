import React, { useState } from 'react';
import { Eye, Layers, CheckCircle2, RefreshCw, Sparkles, MapPin, Scan, ArrowLeftRight } from 'lucide-react';
import StatsCard from './StatsCard';
import ClassBadge from './ClassBadge';

export default function DetectionResult({
  result,
  imagePreview,
  isLoading
}) {
  const [showOriginal, setShowOriginal] = useState(false);

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="clay-card p-8 sm:p-12 bg-white h-full min-h-[440px] flex flex-col items-center justify-center text-center">
        {/* Animated 3D Loader */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-brand-green-light border-3 border-brand-green flex items-center justify-center text-brand-green-dark shadow-clay-sm animate-bounce">
            <Scan size={40} className="stroke-[2.5]" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
          </span>
        </div>

        <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">
          Analyzing Road...
        </h3>
        <p className="text-sm sm:text-base text-slate-500 font-medium max-w-sm mb-6">
          AI is looking for road damage. Scanning for potholes, surface cracks, and manhole lids.
        </p>

        {/* Pulse Progress indicator */}
        <div className="w-full max-w-xs bg-cream-200 h-3 rounded-full overflow-hidden border border-clay-border shadow-inner">
          <div className="bg-brand-green h-full rounded-full animate-pulse w-3/4"></div>
        </div>
        <span className="text-xs text-slate-400 font-semibold mt-3">
          Running YOLOv8n inference (~50ms)
        </span>
      </div>
    );
  }

  // 2. Empty State
  if (!result) {
    return (
      <div className="clay-card p-8 sm:p-12 bg-white h-full min-h-[440px] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-cream-100 border-2 border-clay-border flex items-center justify-center text-slate-400 shadow-clay-sm mb-5">
          <Layers size={38} className="stroke-[2]" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-slate-800 mb-2">
          Ready to inspect a road?
        </h3>
        <p className="text-sm sm:text-base text-slate-500 font-medium max-w-sm mb-6">
          Upload a road image on the left to start detection. YOLOv8 will highlight defects with bounding boxes.
        </p>

        {/* Road Illustration Mini-Graphic */}
        <div className="p-4 rounded-2xl bg-cream-100 border-2 border-clay-border max-w-xs w-full text-left flex items-center gap-3 shadow-inner">
          <div className="w-10 h-10 rounded-xl bg-white border border-clay-border flex items-center justify-center text-brand-green shadow-sm shrink-0">
            <Sparkles size={20} />
          </div>
          <div className="text-xs font-semibold text-slate-600">
            <p className="font-heading font-bold text-slate-800">3 Target Classes</p>
            <p className="text-slate-400">Pothole • Crack • Manhole</p>
          </div>
        </div>
      </div>
    );
  }

  // 3. Results State
  const { total_detections, class_counts, detections, annotated_image } = result;

  return (
    <div className="clay-card p-6 sm:p-8 bg-white h-full flex flex-col justify-between">
      <div>
        {/* Results Header */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-green-light text-brand-green-dark border-2 border-brand-green/30 flex items-center justify-center shadow-sm">
              <Eye size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900">
                2. Detection Results
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Found {total_detections} damage instance{total_detections !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Toggle Button */}
          {annotated_image && (
            <button
              onClick={() => setShowOriginal(!showOriginal)}
              className="clay-btn clay-btn-white text-xs px-3.5 py-2 text-slate-700 hover:text-brand-green shadow-sm"
            >
              <ArrowLeftRight size={14} />
              <span>{showOriginal ? 'Show Bounding Boxes' : 'Show Original Photo'}</span>
            </button>
          )}
        </div>

        {/* Summary Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatsCard
            type="total"
            label="Total Objects"
            count={total_detections}
          />
          <StatsCard
            type="pothole"
            label="Potholes"
            count={class_counts?.pothole || 0}
          />
          <StatsCard
            type="crack"
            label="Cracks"
            count={class_counts?.crack || 0}
          />
          <StatsCard
            type="manhole"
            label="Manholes"
            count={class_counts?.manhole || 0}
          />
        </div>

        {/* Annotated Image Display */}
        <div className="relative rounded-3xl overflow-hidden border-3 border-clay-border bg-slate-900 shadow-md mb-6 max-h-[360px] flex items-center justify-center">
          <img
            src={showOriginal ? imagePreview : (annotated_image || imagePreview)}
            alt="Detection Result"
            className="w-full h-full max-h-[360px] object-contain mx-auto"
          />

          {/* Watermark Tag */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl text-white font-heading font-bold text-xs border border-white/20">
            {showOriginal ? 'Original Image' : 'YOLOv8 Annotated Image'}
          </div>
        </div>

        {/* Detailed Detections Table */}
        {detections && detections.length > 0 ? (
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
              <span>Detected Objects Detail</span>
              <span className="px-2 py-0.5 rounded-full bg-cream-200 text-xs text-slate-600 font-bold">
                {detections.length}
              </span>
            </h4>

            <div className="max-h-[220px] overflow-y-auto rounded-2xl border-2 border-clay-border bg-cream-50 shadow-inner">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-cream-200/80 sticky top-0 border-b border-clay-border">
                  <tr>
                    <th className="p-2.5 font-heading font-bold text-slate-600">#</th>
                    <th className="p-2.5 font-heading font-bold text-slate-600">Class</th>
                    <th className="p-2.5 font-heading font-bold text-slate-600">Confidence</th>
                    <th className="p-2.5 font-heading font-bold text-slate-600 hidden sm:table-cell">Bounding Box</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-clay-border/60">
                  {detections.map((det, idx) => (
                    <tr key={idx} className="hover:bg-white/80 transition-colors">
                      <td className="p-2.5 font-bold text-slate-400 w-8">{idx + 1}</td>
                      <td className="p-2.5">
                        <ClassBadge className={det.class_name} />
                      </td>
                      <td className="p-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-slate-800 w-10 text-right">
                            {(det.confidence * 100).toFixed(1)}%
                          </span>
                          <div className="w-20 sm:w-28 bg-cream-300 h-2 rounded-full overflow-hidden shadow-inner">
                            <div
                              className={`h-full rounded-full ${
                                det.class_name === 'crack'
                                  ? 'bg-rose-500'
                                  : det.class_name === 'manhole'
                                  ? 'bg-sky-500'
                                  : 'bg-amber-500'
                              }`}
                              style={{ width: `${det.confidence * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-2.5 font-mono text-[11px] text-slate-500 hidden sm:table-cell">
                        [{det.bbox.map(n => Math.round(n)).join(', ')}]
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-center text-emerald-900 font-medium text-xs flex items-center justify-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-600" />
            <span>No road damage detected at the current confidence threshold.</span>
          </div>
        )}
      </div>
    </div>
  );
}
