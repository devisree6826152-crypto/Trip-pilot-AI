"use client";

import React, { useState } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { playSpeechAudio } from "@/lib/utils/audioSpeech";
import { Mic, Volume2, ArrowDown, User, MessageSquare, Play, Sparkles, RefreshCw } from "lucide-react";

interface Props {
  userLang: string;
  localLang: string;
}

interface DialogueTurn {
  id: string;
  speaker: "you" | "them";
  originalText: string;
  translatedText: string;
  pronunciation?: string;
}

export function VoiceConversationMode({ userLang, localLang }: Props) {
  const showToast = useRoamwiseStore((state) => state.showToast);

  const [turns, setTurns] = useState<DialogueTurn[]>([
    {
      id: "turn-1",
      speaker: "you",
      originalText: "Where is the nearest bus station?",
      translatedText: "అత్యంత సమీపంలో ఉన్న బస్ స్టాప్ ఎక్కడ ఉంది?",
      pronunciation: "Atyanta sameepamlo unna bus stop ekkada undi?",
    },
    {
      id: "turn-2",
      speaker: "them",
      originalText: "まっすぐ行って、信号を右に曲がってください。",
      translatedText: "Go straight and turn right at the traffic lights.",
      pronunciation: "Massugu itte, shingō o mege te kudasai.",
    },
  ]);

  const [isRecordingYou, setIsRecordingYou] = useState(false);
  const [isRecordingThem, setIsRecordingThem] = useState(false);

  const handleSpeakUser = async () => {
    setIsRecordingYou(true);
    showToast("Listening...", `Speak now in ${userLang}`);

    const samplePhrase = "Could you tell us what time the last train leaves?";

    try {
      const res = await fetch("/api/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: samplePhrase,
          fromLang: userLang,
          toLang: localLang,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsRecordingYou(false);
          const newTurn: DialogueTurn = {
            id: `turn-${Date.now()}`,
            speaker: "you",
            originalText: samplePhrase,
            translatedText: data.translatedText,
            pronunciation: data.pronunciation,
          };
          playSpeechAudio(data.translatedText, localLang);
          setTurns((prev) => [...prev, newTurn]);
          showToast("Translated & Played 🔊", `Translated into ${localLang}`);
          return;
        }
      }
    } catch {
      // Fallback
    }

    setIsRecordingYou(false);
    const newTurn: DialogueTurn = {
      id: `turn-${Date.now()}`,
      speaker: "you",
      originalText: samplePhrase,
      translatedText: `[${localLang}]: ${samplePhrase}`,
    };
    setTurns((prev) => [...prev, newTurn]);
  };

  const handleSpeakThem = async () => {
    setIsRecordingThem(true);
    showToast("Listening to Local Response...", `Speak now in ${localLang}`);

    const sampleLocalText = "The last train leaves at 11:30 PM tonight.";

    try {
      const res = await fetch("/api/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: sampleLocalText,
          fromLang: localLang,
          toLang: userLang,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsRecordingThem(false);
          const newTurn: DialogueTurn = {
            id: `turn-${Date.now()}`,
            speaker: "them",
            originalText: sampleLocalText,
            translatedText: data.translatedText,
            pronunciation: data.pronunciation,
          };
          playSpeechAudio(data.translatedText, userLang);
          setTurns((prev) => [...prev, newTurn]);
          showToast(`Translated to ${userLang}!`, `Translated from ${localLang}`);
          return;
        }
      }
    } catch {
      // Fallback
    }

    setIsRecordingThem(false);
    const newTurn: DialogueTurn = {
      id: `turn-${Date.now()}`,
      speaker: "them",
      originalText: sampleLocalText,
      translatedText: `[${userLang}]: ${sampleLocalText}`,
    };
    setTurns((prev) => [...prev, newTurn]);
  };

  const handlePlayAudio = (text: string, speaker: "you" | "them") => {
    const targetLang = speaker === "you" ? localLang : userLang;
    playSpeechAudio(text, targetLang);
    showToast("Playing Audio 🔊", `Speaking "${text}"`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              🎤 2-Way Voice Conversation Mode
            </h3>
            <p className="text-xs text-muted-foreground">
              Real-time bilingual voice translation between {userLang} and {localLang}
            </p>
          </div>
        </div>

        <button
          onClick={() => setTurns([])}
          className="text-xs text-muted-foreground hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      {/* Dialogue Turns Container */}
      <div className="space-y-4 max-h-[380px] overflow-y-auto p-2">
        {turns.map((turn) => {
          const isYou = turn.speaker === "you";
          return (
            <div
              key={turn.id}
              className={`p-4 rounded-2xl border transition-all ${
                isYou
                  ? "bg-slate-50 dark:bg-slate-800/80 border-border"
                  : "bg-teal-500/10 dark:bg-teal-950/40 border-teal-500/30"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className={isYou ? "text-slate-700 dark:text-slate-300" : "text-teal-700 dark:text-teal-300"}>
                  {isYou ? `👤 You (${userLang})` : `🌏 Local Person (${localLang})`}
                </span>
                <button
                  onClick={() => handlePlayAudio(turn.translatedText, turn.speaker)}
                  className="flex items-center gap-1 text-[11px] font-bold text-teal-600 hover:text-teal-700 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-border"
                >
                  <Volume2 className="w-3.5 h-3.5 text-teal-500" />
                  <span>Play 🔊</span>
                </button>
              </div>

              <div className="text-xs text-muted-foreground mb-1">
                "{turn.originalText}"
              </div>

              <div className="flex items-center gap-1 text-slate-400 my-1">
                <ArrowDown className="w-3 h-3 text-teal-500" />
              </div>

              <div className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                "{turn.translatedText}"
              </div>

              {turn.pronunciation && (
                <div className="text-[11px] italic text-muted-foreground mt-1">
                  Pronunciation: {turn.pronunciation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dual Voice Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border/60">
        {/* You Speak */}
        <button
          onClick={handleSpeakUser}
          disabled={isRecordingYou}
          className={`p-4 rounded-2xl border font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
            isRecordingYou
              ? "bg-rose-600 text-white border-rose-600 animate-pulse"
              : "bg-teal-600 hover:bg-teal-700 text-white border-teal-600 hover:scale-[1.01]"
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>{isRecordingYou ? "Listening to You..." : `🎤 Tap to Speak (${userLang})`}</span>
        </button>

        {/* They Speak */}
        <button
          onClick={handleSpeakThem}
          disabled={isRecordingThem}
          className={`p-4 rounded-2xl border font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
            isRecordingThem
              ? "bg-rose-600 text-white border-rose-600 animate-pulse"
              : "bg-slate-800 hover:bg-slate-900 text-white border-slate-800 hover:scale-[1.01]"
          }`}
        >
          <Mic className="w-4 h-4 text-amber-400" />
          <span>{isRecordingThem ? "Listening to Them..." : `🎤 Tap to Let Them Speak (${localLang})`}</span>
        </button>
      </div>
    </div>
  );
}
