"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SharedGoalsSection() {
  const [target, setTarget] = useState("department");
  const [syncing, setSyncing] = useState(false);

  const handlePush = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      alert("Goal successfully propagated to 14 employees!");
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="glass inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          Shared Goals Engine
        </div>
        <h2 className="text-3xl font-heading font-bold text-white tracking-tight">Enterprise KPI Propagation</h2>
        <p className="text-white/45 font-medium mt-1 text-sm">Create master goals and push them downward to construct derived employee goal sheets.</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="glass rounded-xl p-8">
          <h3 className="font-heading font-semibold text-xl mb-6 text-white">Create Master Goal</h3>
          <div className="space-y-5">
            <div>
              <Label className="text-[10px] uppercase font-bold tracking-widest text-white/40 font-mono">Master Title</Label>
              <Input placeholder="e.g. Q3 Company Revenue Target" className="mt-1.5 bg-white/[0.03] border-white/[0.06] text-white rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[10px] uppercase font-bold tracking-widest text-white/40 font-mono">Thrust Area</Label>
                <select className="w-full mt-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl p-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-primary/30">
                  <option>REVENUE</option><option>OPERATIONS</option><option>CUSTOMER</option>
                </select>
              </div>
              <div>
                <Label className="text-[10px] uppercase font-bold tracking-widest text-white/40 font-mono">KPI Type</Label>
                <select className="w-full mt-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl p-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-primary/30">
                  <option>QUANTITATIVE</option><option>MILESTONE</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[10px] uppercase font-bold tracking-widest text-white/40 font-mono">Global Target</Label>
                <Input type="number" placeholder="50" className="mt-1.5 bg-white/[0.03] border-white/[0.06] text-white rounded-xl" />
              </div>
              <div>
                <Label className="text-[10px] uppercase font-bold tracking-widest text-white/40 font-mono">UoM</Label>
                <select className="w-full mt-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl p-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-primary/30">
                  <option>MAX</option><option>PERCENTAGE</option>
                </select>
              </div>
            </div>

            <div className="border-t border-white/[0.04] pt-5">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-3 block font-mono">Propagation Target</Label>
              <div className="flex gap-5 mb-3">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-white/60 hover:text-white transition-colors">
                  <input type="radio" checked={target==='department'} onChange={() => setTarget('department')} className="accent-primary" /> Department
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-white/60 hover:text-white transition-colors">
                  <input type="radio" checked={target==='role'} onChange={() => setTarget('role')} className="accent-primary" /> Specific Role
                </label>
              </div>
              <select className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl p-2.5 text-sm text-white outline-none">
                <option>Revenue Team (14 Users)</option><option>Operations Team (22 Users)</option>
              </select>
            </div>

            <Button disabled={syncing} onClick={handlePush} className="w-full bg-primary text-[#0A0D0B] hover:bg-[#A8E063] font-bold py-6 mt-2 rounded-xl magnetic-btn transition-colors">
              {syncing ? (
                <><div className="w-4 h-4 border-2 border-[#0A0D0B] border-r-transparent rounded-full animate-spin mr-2" />Propagating...</>
              ) : "Push to Goal Sheets"}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 relative overflow-hidden group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500/15 flex flex-shrink-0 items-center justify-center text-green-400 border border-green-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div className="w-full">
                <h3 className="font-semibold text-white text-sm">Active: Q2 Expansion Target</h3>
                <p className="text-[10px] text-white/30 mt-1">Pushed 2 days ago to <span className="font-bold text-white/60">Revenue Team</span></p>
                <div className="mt-3 glass rounded-lg p-3 text-xs flex justify-between items-center">
                  <span className="text-white/30">Derived Sheets Synced</span>
                  <span className="font-mono font-bold text-green-400">12 / 14</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-heading font-semibold mb-3 text-white/90 text-sm">How it works</h3>
            <p className="text-xs text-white/30 leading-relaxed">
              When you push a master goal, the system creates <strong className="text-white/60">locked</strong> derived goals on employee sheets. Employees cannot edit the Target or UoM, but must specify its weightage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
