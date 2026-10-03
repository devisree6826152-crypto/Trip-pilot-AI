"use client";

import React from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { Landmark, Compass, ShieldCheck, MapPin, Clock, BookOpen } from "lucide-react";

export function CultureHistoryPortal() {
  const { selectedDestination } = useRoamwiseStore();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-slate-900/90 to-black/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80"
          alt="Culture banner"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="relative z-20 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
            <Landmark className="w-3.5 h-3.5" />
            <span>Culture & Heritage Guide</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Culture & History of <span className="text-emerald-400">{selectedDestination}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Uncover centuries of Portuguese colonial architecture, UNESCO cathedrals, traditional folk dance, and heritage Latin quarter walks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-border/80 space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                Colonial Portuguese & Indo-Goan Heritage
              </h3>
              <p className="text-xs text-muted-foreground">450 Years of Cultural Fusion</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Goa's unique culture is shaped by over four centuries of Portuguese rule blended with ancient Konkani traditions. This is reflected in the vibrant azulejos hand-painted tiles, baroque basilicas, and festive folk music.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-border/80 space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                UNESCO World Heritage Sites
              </h3>
              <p className="text-xs text-muted-foreground">Churches & Convents of Old Goa</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            The Basilica of Bom Jesus and Se Cathedral in Old Goa stand as monumental examples of Manueline and Baroque architecture in Asia, attracting historians and art lovers worldwide.
          </p>
        </div>
      </div>
    </div>
  );
}
