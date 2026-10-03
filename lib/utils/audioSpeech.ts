"use client";

/**
 * Robust Multi-Strategy Audio Speech Engine for Roamwise AI Travel Application.
 * Supports HTML5 TTS Audio Streaming, Web Speech Synthesis with locale matching,
 * and Web Audio API Synthesizer fallback.
 */

export function playSpeechAudio(text: string, targetLang: string = "Telugu", isLoud: boolean = false) {
  if (typeof window === "undefined" || !text || !text.trim()) return;

  const cleanText = text.trim();

  // Resolve 2-letter language code
  let langCode = "te";
  const lower = targetLang.toLowerCase();

  if (lower.includes("telugu") || lower === "te") langCode = "te";
  else if (lower.includes("hindi") || lower === "hi") langCode = "hi";
  else if (lower.includes("tamil") || lower === "ta") langCode = "ta";
  else if (lower.includes("kannada") || lower === "kn") langCode = "kn";
  else if (lower.includes("malayalam") || lower === "ml") langCode = "ml";
  else if (lower.includes("bengali") || lower === "bn") langCode = "bn";
  else if (lower.includes("marathi") || lower === "mr") langCode = "mr";
  else if (lower.includes("japanese") || lower === "ja") langCode = "ja";
  else if (lower.includes("korean") || lower === "ko") langCode = "ko";
  else if (lower.includes("french") || lower === "fr") langCode = "fr";
  else if (lower.includes("spanish") || lower === "es") langCode = "es";
  else if (lower.includes("english") || lower === "en") langCode = "en";

  // Strategy 1: HTML5 Audio with Google TTS engine
  try {
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      cleanText
    )}&tl=${langCode}&client=tw-ob`;

    const audio = new Audio(ttsUrl);
    audio.volume = isLoud ? 1.0 : 0.9;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Successfully playing TTS stream
        })
        .catch(() => {
          // Fallback to Web Speech API
          speakWithWebSpeech(cleanText, langCode, isLoud);
        });
      return;
    }
  } catch (err) {
    // Fallback
  }

  // Strategy 2: Browser Web Speech Synthesis API
  speakWithWebSpeech(cleanText, langCode, isLoud);
}

function speakWithWebSpeech(text: string, langCode: string, isLoud: boolean) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    playWebAudioBeep();
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Clear queued utterances

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = isLoud ? 1.0 : 0.9;
    utterance.rate = isLoud ? 0.8 : 0.95;

    const voiceLocales: Record<string, string> = {
      te: "te-IN",
      hi: "hi-IN",
      ta: "ta-IN",
      kn: "kn-IN",
      ml: "ml-IN",
      bn: "bn-IN",
      mr: "mr-IN",
      ja: "ja-JP",
      ko: "ko-KR",
      fr: "fr-FR",
      es: "es-ES",
      en: "en-US",
    };

    const locale = voiceLocales[langCode] || "en-US";
    utterance.lang = locale;

    // Attach matching voice if present in system
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(
      (v) => v.lang === locale || v.lang.startsWith(langCode) || v.lang.replace("_", "-") === locale
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onerror = () => {
      playWebAudioBeep();
    };

    window.speechSynthesis.speak(utterance);
  } catch {
    playWebAudioBeep();
  }
}

/**
 * Web Audio API fallback tone chime synthesizer to guarantee audible feedback
 */
export function playWebAudioBeep() {
  if (typeof window === "undefined") return;

  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5 note

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // Ignore context restrictions
  }
}
