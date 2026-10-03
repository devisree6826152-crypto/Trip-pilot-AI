"use client";

import React, { useState } from "react";
import { User, Settings, ShieldCheck, Heart, Wallet, Bell, Compass, Check } from "lucide-react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";

export function ProfileView() {
  const { showToast } = useRoamwiseStore();

  const [name, setName] = useState("Devisree Avva");
  const [email, setEmail] = useState("devisree@roamwise.ai");
  const [currency, setCurrency] = useState("INR (₹)");
  const [defaultStyle, setDefaultStyle] = useState("Balanced");
  const [autoReplanning, setAutoReplanning] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profile Settings Saved", "Your preferences have been updated.");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-4 border-b border-border/60 pb-5">
          <div className="w-16 h-16 rounded-full bg-teal-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-teal-600/20">
            D
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{name}</h1>
            <p className="text-xs text-muted-foreground">{email}</p>
            <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
              Roamwise Pro Member
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wider text-teal-700 dark:text-teal-400">
              Personal Preferences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Default Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="INR (₹)">Indian Rupee (₹ INR)</option>
                  <option value="USD ($)">US Dollar ($ USD)</option>
                  <option value="EUR (€)">Euro (€ EUR)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Default Travel Style
                </label>
                <select
                  value={defaultStyle}
                  onChange={(e) => setDefaultStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Relaxed">Relaxed</option>
                  <option value="Balanced">Balanced</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Budget">Budget</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border/60 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wider text-teal-700 dark:text-teal-400">
              Agent Guardrail Settings
            </h3>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-border">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                  Automated Weather Monitoring
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Notify instantly when precipitation chance exceeds 70%
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoReplanning}
                onChange={(e) => setAutoReplanning(e.target.checked)}
                className="w-4 h-4 accent-teal-600 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Save Profile Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
