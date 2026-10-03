"use client";

import React, { useState } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { playSpeechAudio } from "@/lib/utils/audioSpeech";
import {
  Volume2,
  Copy,
  Trash2,
  Sparkles,
  ArrowRight,
  Check,
  RotateCcw,
  Info,
} from "lucide-react";

interface Props {
  userLang: string;
  localLang: string;
}

export function TextTranslator({ userLang, localLang }: Props) {
  const showToast = useRoamwiseStore((state) => state.showToast);

  const [inputText, setInputText] = useState("Where is the nearest railway station?");
  const [translatedText, setTranslatedText] = useState("最寄りの駅はどこですか？");
  const [pronunciation, setPronunciation] = useState("Moyori no eki wa doko desu ka?");
  const [literalMeaning, setLiteralMeaning] = useState<string | undefined>("Nearest station is where?");
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsTranslating(true);

    try {
      const res = await fetch("/api/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          fromLang: userLang,
          toLang: localLang,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setTranslatedText(data.translatedText);
          setPronunciation(data.pronunciation || "");
          setLiteralMeaning(data.literalMeaning);
          setIsTranslating(false);
          return;
        }
      }
    } catch {
      // Fallback response
    }

    setTranslatedText(`[${localLang}] ${inputText}`);
    setPronunciation(`${inputText} (phonetics)`);
    setIsTranslating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    showToast("Copied to Clipboard!", "Show this text to the local person.");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = (text: string) => {
    playSpeechAudio(text, localLang);
    showToast("Playing Audio 🔊", `Speaking in ${localLang}`);
  };

  const handleClear = () => {
    setInputText("");
    setTranslatedText("");
    setPronunciation("");
    setLiteralMeaning(undefined);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 shadow-sm space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Text & Phrase Translator
            </h3>
            <p className="text-xs text-muted-foreground">
              {userLang} → {localLang}
            </p>
          </div>
        </div>

        {inputText && (
          <button
            onClick={handleClear}
            className="text-xs text-muted-foreground hover:text-rose-600 flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Input Box */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Enter text in {userLang}:
        </label>
        <div className="relative">
          <textarea
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Type what you want to say in ${userLang}...`}
            className="w-full p-4 rounded-2xl border border-border bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          />
          <button
            onClick={handleTranslate}
            disabled={isTranslating}
            className="absolute right-3 bottom-3 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <span>{isTranslating ? "Translating..." : "Translate"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Large High-Contrast Display Card */}
      {translatedText && (
        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Show this to local ({localLang}):
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeak(translatedText)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-teal-600 text-slate-200 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold"
                title="Speak translation aloud"
              >
                <Volume2 className="w-4 h-4 text-teal-400" />
                <span>Listen 🔊</span>
              </button>
              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-xs font-bold flex items-center gap-1"
                title="Copy text"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <div className="text-2xl sm:text-4xl font-extrabold tracking-wide leading-relaxed text-emerald-300 font-sans py-2">
            {translatedText}
          </div>

          {(pronunciation || literalMeaning) && (
            <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs">
              {pronunciation && (
                <div className="flex items-start gap-2 text-slate-300">
                  <span className="font-bold text-amber-400 shrink-0">Pronunciation:</span>
                  <span className="italic font-medium">{pronunciation}</span>
                </div>
              )}
              {literalMeaning && (
                <div className="flex items-start gap-2 text-slate-400 text-[11px]">
                  <Info className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Literal meaning:</strong> "{literalMeaning}"
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
