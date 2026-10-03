"use client";

import React, { useState, useRef } from "react";
import { CAMERA_OCR_PRESETS } from "@/lib/data/translationData";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { Camera, Image, Sparkles, CheckCircle2, ArrowRight, Loader2, Upload, RefreshCcw } from "lucide-react";

interface Props {
  userLang: string;
  localLang: string;
}

export function CameraTranslator({ userLang, localLang }: Props) {
  const showToast = useRoamwiseStore((state) => state.showToast);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedPresetId, setSelectedPresetId] = useState("preset-menu");
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [ocrResult, setOcrResult] = useState<any>(CAMERA_OCR_PRESETS[0]);

  const runOcrScan = async (presetId?: string, imageSrc?: string) => {
    setIsScanning(true);

    try {
      const res = await fetch("/api/ai/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          presetId: presetId || selectedPresetId,
          targetLang: userLang,
          uploadedImage: imageSrc || null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setOcrResult(data);
          setIsScanning(false);
          showToast("Camera Scan Complete!", `Extracted & translated into ${userLang}.`);
          return;
        }
      }
    } catch {
      // Fallback
    }

    const preset = CAMERA_OCR_PRESETS.find((p) => p.id === (presetId || selectedPresetId)) || CAMERA_OCR_PRESETS[0];
    setOcrResult(preset);
    setIsScanning(false);
  };

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    setUploadedImageSrc(null);
    runOcrScan(presetId, undefined);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setUploadedImageSrc(dataUrl);
      runOcrScan(undefined, dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 shadow-sm space-y-6">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold shrink-0">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              📷 Camera Scan & OCR Translate
            </h3>
            <p className="text-xs text-muted-foreground">
              Scan or upload photo of menus, signs, and notices → Translate into {userLang}
            </p>
          </div>
        </div>

        <button
          onClick={handleUploadClick}
          className="text-xs font-bold px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white shadow-md flex items-center gap-2 justify-center transition-all shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Any Photo</span>
        </button>
      </div>

      {/* Preset Picker Chips */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
          Or Select Sample Camera Preset:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CAMERA_OCR_PRESETS.map((p) => {
            const isSelected = !uploadedImageSrc && selectedPresetId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                className={`p-3 rounded-2xl border text-left text-xs transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? "bg-sky-500/10 border-sky-500/40 text-sky-950 dark:text-sky-200 font-bold shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800/60 border-border/80 hover:bg-slate-100"
                }`}
              >
                <Image className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="line-clamp-1">{p.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Uploaded Image Preview (If Any) */}
      {uploadedImageSrc && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-sky-400 font-bold">
            <span className="flex items-center gap-1.5">
              <Camera className="w-4 h-4" /> User Uploaded Photo
            </span>
            <button
              onClick={() => {
                setUploadedImageSrc(null);
                handleSelectPreset("preset-menu");
              }}
              className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
            >
              <RefreshCcw className="w-3 h-3" /> Remove Photo
            </button>
          </div>
          <div className="relative rounded-xl overflow-hidden max-h-56 bg-black flex items-center justify-center">
            <img
              src={uploadedImageSrc}
              alt="Uploaded scan preview"
              className="max-h-56 object-contain rounded-xl"
            />
            {isScanning && (
              <div className="absolute inset-0 bg-sky-950/70 backdrop-blur-xs flex items-center justify-center">
                <div className="text-center text-white space-y-2">
                  <Loader2 className="w-8 h-8 text-sky-400 animate-spin mx-auto" />
                  <p className="text-xs font-bold">Extracting & Translating into {userLang}...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* OCR Result View */}
      {isScanning && !uploadedImageSrc ? (
        <div className="py-12 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-sky-600 animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
            Running Vision OCR Scan & Translating into {userLang}...
          </p>
        </div>
      ) : (
        ocrResult && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block">
                  Camera Vision OCR Result — {ocrResult.category}
                </span>
                <h4 className="font-bold text-sm text-slate-100">{ocrResult.title}</h4>
                <p className="text-[11px] text-slate-400">
                  Target Language: <strong className="text-emerald-400">{userLang}</strong>
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>OCR Synced</span>
              </span>
            </div>

            {/* Extracted & Translated List */}
            <div className="space-y-3">
              {ocrResult.detectedItems?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-border bg-slate-50/70 dark:bg-slate-800/40 space-y-1.5"
                >
                  <div className="text-xs font-mono text-muted-foreground">
                    Original Text: {item.raw}
                  </div>
                  <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                    <ArrowRight className="w-4 h-4 shrink-0" />
                    <span className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                      {item.translated}
                    </span>
                  </div>
                  {item.detail && (
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      💡 {item.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
