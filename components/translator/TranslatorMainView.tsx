import React, { useState, useEffect } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { DESTINATION_LANGUAGE_MAP } from "@/lib/data/translationData";
import { LanguageSelector } from "./LanguageSelector";
import { TextTranslator } from "./TextTranslator";
import { VoiceConversationMode } from "./VoiceConversationMode";
import { TravelPhraseAssistant } from "./TravelPhraseAssistant";
import { CameraTranslator } from "./CameraTranslator";
import { TravelModeCard } from "./TravelModeCard";
import { OfflinePacksCard } from "./OfflinePacksCard";
import { TranslationHistoryCard } from "./TranslationHistoryCard";
import { Globe, Mic, Camera, BookOpen, Sparkles } from "lucide-react";

export function TranslatorMainView() {
  const { activeTrip, selectedDestination } = useRoamwiseStore();

  const [userLang, setUserLang] = useState("English");
  const [localLang, setLocalLang] = useState("Konkani");
  const [activeSubTab, setActiveSubTab] = useState<"text" | "voice" | "phrases" | "camera">("text");

  // Destination-aware auto language selection
  useEffect(() => {
    const targetDest = (selectedDestination || activeTrip.destination || "").toLowerCase();
    const match = Object.entries(DESTINATION_LANGUAGE_MAP).find(([k]) => targetDest.includes(k));
    if (match) {
      setLocalLang(match[1].name);
    } else if (targetDest.includes("tokyo") || targetDest.includes("japan")) {
      setLocalLang("Japanese");
    } else if (targetDest.includes("paris") || targetDest.includes("france")) {
      setLocalLang("French");
    } else if (targetDest.includes("sikkim")) {
      setLocalLang("Nepali");
    } else {
      setLocalLang("Hindi");
    }
  }, [activeTrip.destination, selectedDestination]);

  return (
    <div className="space-y-8 pb-12">
      {/* Title & Subtitle Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 text-xs font-bold border border-teal-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Destination-Aware Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          AI Travel Translator
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Translate for real travel situations. Automatically configured for {selectedDestination || activeTrip.destination.split(",")[0]}.
        </p>
      </div>

      {/* 1. SIGNATURE FEATURE: TRAVEL MODE CARD */}
      <TravelModeCard userLang={userLang} localLang={localLang} />

      {/* 2. LANGUAGE SELECTOR BAR */}
      <LanguageSelector
        userLang={userLang}
        localLang={localLang}
        onUserLangChange={setUserLang}
        onLocalLangChange={setLocalLang}
      />

      {/* 3. SUB-FEATURE MODE SWITCHER TABS */}
      <div className="flex items-center gap-2 border-b border-border/60 pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab("text")}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeSubTab === "text"
              ? "bg-teal-600 text-white shadow-md"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>TEXT</span>
        </button>

        <button
          onClick={() => setActiveSubTab("voice")}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeSubTab === "voice"
              ? "bg-purple-600 text-white shadow-md"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>🎙 VOICE</span>
        </button>

        <button
          onClick={() => setActiveSubTab("phrases")}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeSubTab === "phrases"
              ? "bg-amber-600 text-white shadow-md"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>PHRASES</span>
        </button>

        <button
          onClick={() => setActiveSubTab("camera")}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeSubTab === "camera"
              ? "bg-sky-600 text-white shadow-md"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>📷 CAMERA</span>
        </button>
      </div>

      {/* 4. ACTIVE SUB-FEATURE COMPONENT */}
      {activeSubTab === "text" && <TextTranslator userLang={userLang} localLang={localLang} />}
      {activeSubTab === "voice" && <VoiceConversationMode userLang={userLang} localLang={localLang} />}
      {activeSubTab === "phrases" && <TravelPhraseAssistant userLang={userLang} localLang={localLang} />}
      {activeSubTab === "camera" && <CameraTranslator userLang={userLang} localLang={localLang} />}

      {/* 5. OFFLINE PACKS CARD */}
      <OfflinePacksCard localLang={localLang} />

      {/* 6. TRANSLATION HISTORY CARD */}
      <TranslationHistoryCard />
    </div>
  );
}
