"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import {
  Bot,
  Send,
  Sparkles,
  User,
  CheckCircle2,
  RotateCcw,
  Clock,
  Wallet,
  Compass,
  ArrowRight,
  Loader2,
  Trash2,
  Check,
} from "lucide-react";
import { ReplanProposal } from "@/lib/types";

const QUICK_PROMPTS = [
  "Where should we eat tonight?",
  "Can we save ₹2,000?",
  "What can we do if it rains tomorrow?",
  "Is there enough time to visit another place?",
  "Move today's beach activity to tomorrow.",
];

export function AIAssistantChat() {
  const {
    activeTrip,
    assistantMessages,
    sendAssistantMessage,
    acceptProposal,
    declineProposal,
  } = useRoamwiseStore();

  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [acceptedProposalIds, setAcceptedProposalIds] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [assistantMessages, isThinking]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userText = input;
    setInput("");
    setIsThinking(true);

    try {
      await sendAssistantMessage(userText);
    } finally {
      setIsThinking(false);
    }
  };

  const handlePromptClick = async (promptText: string) => {
    if (isThinking) return;
    setIsThinking(true);

    try {
      await sendAssistantMessage(promptText);
    } finally {
      setIsThinking(false);
    }
  };

  const handleAcceptProposal = (proposal: ReplanProposal, msgId: string) => {
    acceptProposal(proposal);
    setAcceptedProposalIds((prev) => ({ ...prev, [msgId]: true }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header Context Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/20">
            <Bot className="w-6 h-6 animate-pulse-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-slate-900 dark:text-slate-100">
                Roamwise AI Assistant
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                ● Live Trip Agent
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {activeTrip.destination} · Day {activeTrip.currentDayIndex} of {activeTrip.durationDays} · ₹
              {(activeTrip.totalBudget - activeTrip.spentAmount).toLocaleString()} budget remaining
            </p>
          </div>
        </div>

        {/* Translator Shortcut Actions (Req #23) */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => {
              useRoamwiseStore.getState().setActiveTab("translate");
              useRoamwiseStore.getState().showToast("AI Travel Translator Opened 🌐", "Showing dining & restaurant phrases.");
            }}
            className="px-3 py-1.5 rounded-xl border border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold text-xs hover:bg-teal-500/20"
          >
            [ Translate Restaurant Request ]
          </button>
          <button
            onClick={() => {
              useRoamwiseStore.getState().setActiveTab("translate");
              useRoamwiseStore.getState().showToast("AI Travel Translator Opened 🌐", "Showing hotel & check-in phrases.");
            }}
            className="px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold text-xs hover:bg-amber-500/20"
          >
            [ Translate Hotel Request ]
          </button>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 shadow-md overflow-hidden flex flex-col min-h-[520px] max-h-[680px]">
        {/* Messages List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {assistantMessages.map((msg) => {
            const isUser = msg.sender === "user";
            const isProposalAccepted = acceptedProposalIds[msg.id];

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                    isUser
                      ? "bg-slate-800 text-white"
                      : "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`space-y-3 max-w-xl ${isUser ? "text-right" : "text-left"}`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs inline-block ${
                      isUser
                        ? "bg-teal-600 text-white rounded-tr-none font-medium"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-border/60"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span className="text-[10px] opacity-60 block mt-1.5 font-mono">{msg.timestamp}</span>
                  </div>

                  {/* Inline Replan Proposal Card */}
                  {msg.proposal && (
                    <div className="p-4 rounded-2xl bg-slate-900 text-white border border-teal-500/40 shadow-xl space-y-3 text-left animate-in fade-in duration-200">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> Attached Replan Proposal
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          Target Day {msg.proposal.targetDayIndex}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-100">
                        {msg.proposal.triggerTitle}
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {msg.proposal.proposalSummary}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-850 p-2.5 rounded-xl border border-slate-800">
                        <div>
                          <span className="text-slate-400 block">Time Impact:</span>
                          <span className="font-bold text-slate-200">{msg.proposal.timeImpact}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Budget Impact:</span>
                          <span className="font-bold text-emerald-400">
                            {msg.proposal.budgetImpact <= 0
                              ? `Saved ₹${Math.abs(msg.proposal.budgetImpact)}`
                              : `+₹${msg.proposal.budgetImpact}`}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 pt-1">
                        {isProposalAccepted ? (
                          <div className="w-full py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5">
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>✓ Proposal Accepted & Applied to Trip</span>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => handleAcceptProposal(msg.proposal!, msg.id)}
                              className="flex-1 py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Accept & Apply to Trip</span>
                            </button>
                            <button
                              onClick={declineProposal}
                              className="py-2 px-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors"
                            >
                              Decline
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Thinking Indicator */}
          {isThinking && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />
                <span>Roamwise AI is evaluating your trip schedule & budget...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Prompts Bar */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-t border-border/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold text-muted-foreground uppercase shrink-0">
            Quick Prompts:
          </span>
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handlePromptClick(prompt)}
              disabled={isThinking}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-border/80 text-slate-700 dark:text-slate-300 hover:bg-teal-500/10 hover:border-teal-500/30 hover:text-teal-700 dark:hover:text-teal-300 shrink-0 transition-colors disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Form */}
        <form onSubmit={handleSend} className="p-4 border-t border-border/80 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isThinking}
            placeholder="Ask your AI agent to change, save, or optimize your trip..."
            className="flex-1 px-4 py-3 rounded-2xl border border-border bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isThinking || !input.trim()}
            className="px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] flex items-center gap-1.5 shrink-0 disabled:opacity-50"
          >
            <span>{isThinking ? "Thinking..." : "Send"}</span>
            {isThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
