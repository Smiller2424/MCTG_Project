"use client";
// components/ReplicationConfig.tsx
// Lets a visitor configure how they'd copy (or fade/inverse) a trader's
// positions. Purely local UI state for now — there is no backend
// CopySetting endpoint yet, so "saving" just flips this panel into an
// "Active" state to demonstrate the intended flow.

import { useState } from "react";

type Mode = "copy" | "fade";

export function ReplicationConfig({ traderName }: { traderName: string }) {
  const [mode, setMode] = useState<Mode>("copy");
  const [percentage, setPercentage] = useState(25);
  const [maxAmount, setMaxAmount] = useState(500);
  const [isActive, setIsActive] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  function handleSave() {
    setIsActive(true);
    setSavedAt(new Date().toLocaleTimeString());
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-100">
          Replicate {traderName}
        </h3>
        {isActive && (
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
            Active
          </span>
        )}
      </div>

      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setMode("copy")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
            mode === "copy"
              ? "bg-emerald-500 text-slate-950"
              : "bg-slate-800 text-slate-300 hover:text-white"
          }`}
        >
          Copy
        </button>
        <button
          type="button"
          onClick={() => setMode("fade")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
            mode === "fade"
              ? "bg-emerald-500 text-slate-950"
              : "bg-slate-800 text-slate-300 hover:text-white"
          }`}
        >
          Fade (Inverse)
        </button>
      </div>

      <label className="mb-1 block text-xs font-medium text-slate-400">
        Position size ({percentage}%)
      </label>
      <input
        type="range"
        min={1}
        max={100}
        value={percentage}
        onChange={(e) => setPercentage(Number(e.target.value))}
        className="mb-4 w-full accent-emerald-500"
      />

      <label className="mb-1 block text-xs font-medium text-slate-400">
        Max amount per trade ($)
      </label>
      <input
        type="number"
        min={1}
        value={maxAmount}
        onChange={(e) => setMaxAmount(Number(e.target.value))}
        className="mb-5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
      />

      <button
        type="button"
        onClick={handleSave}
        className="w-full rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
      >
        {isActive ? "Update Replication Settings" : "Start Replicating"}
      </button>

      {savedAt && (
        <p className="mt-2 text-center text-xs text-slate-500">
          Last saved at {savedAt}
        </p>
      )}
    </div>
  );
}
