"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SharedGoalsPage() {
  const [target, setTarget] = useState("department");
  const [syncing, setSyncing] = useState(false);

  const handlePush = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      alert("Goal successfully propagated to 14 employees!");
    }, 1500);
  }

  return (
    <div className="max-w-5xl mx-auto animate-in slide-in-from-bottom-4 duration-500 py-4">
      <div className="mb-8">
        <div className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold w-fit uppercase tracking-widest mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          Shared Goals Engine
        </div>
        <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">Enterprise KPI Propagation</h1>
        <p className="text-muted-foreground font-medium mt-1">Create master goals and push them downward to automatically construct derived employee goal sheets.</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-secondary/40 border border-border rounded-xl p-8 shadow-sm">
          <h3 className="font-heading font-semibold text-lg mb-6 text-foreground">Create Master Goal</h3>
          <div className="space-y-6">
            <div>
              <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Master Title</Label>
              <Input placeholder="e.g. Q3 Company Revenue Target" className="mt-1.5 bg-background border-border-subtle focus-visible:ring-primary text-foreground" />
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div>
                <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Thrust Area</Label>
                <select className="w-full mt-1.5 bg-background border border-border-subtle rounded-md p-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary hover:border-primary/50 transition-colors">
                  <option>REVENUE</option>
                  <option>OPERATIONS</option>
                  <option>CUSTOMER</option>
                </select>
              </div>
              <div>
                <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">KPI Type</Label>
                <select className="w-full mt-1.5 bg-background border border-border-subtle rounded-md p-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary hover:border-primary/50 transition-colors">
                  <option>QUANTITATIVE</option>
                  <option>MILESTONE</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Global Target</Label>
                <Input type="number" placeholder="50" className="mt-1.5 bg-background border-border-subtle focus-visible:ring-primary text-foreground" />
              </div>
              <div>
                <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">UoM</Label>
                <select className="w-full mt-1.5 bg-background border border-border-subtle rounded-md p-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary hover:border-primary/50 transition-colors">
                  <option>MAX</option>
                  <option>PERCENTAGE</option>
                </select>
              </div>
            </div>

            <div className="border-t border-border pt-6 mt-4">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-3 block">Propagation Subject Target</Label>
              <div className="flex gap-6 mb-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors">
                  <input type="radio" checked={target==='department'} onChange={() => setTarget('department')} className="accent-primary" />
                  Department
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors">
                  <input type="radio" checked={target==='role'} onChange={() => setTarget('role')} className="accent-primary" />
                  Specific Role
                </label>
              </div>
              <select className="w-full bg-background border border-border-subtle rounded-md p-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary hover:border-primary/50 transition-colors">
                <option>Revenue Team (14 Users)</option>
                <option>Operations Team (22 Users)</option>
              </select>
            </div>

            <Button disabled={syncing} onClick={handlePush} className="w-full bg-primary text-primary-foreground hover:bg-accent-bright font-bold py-6 mt-2 shadow-[0_0_15px_var(--accent-glow)] transition-all flex items-center justify-center gap-2">
              {syncing ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-r-transparent rounded-full animate-spin"></div>
                  Propagating Downward...
                </>
              ) : "Push to Goal Sheets"}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-background border border-border p-6 rounded-2xl flex items-start gap-4 shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-success/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 w-10 h-10 rounded-full bg-success/20 flex flex-shrink-0 items-center justify-center text-success border border-success/30 shadow-[0_0_10px_rgba(143,209,79,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div className="relative z-10 w-full">
               <h3 className="font-semibold text-foreground">Active Shared Goal: Q2 Expansion Target</h3>
               <p className="text-xs text-muted-foreground mt-1">Pushed 2 days ago to <span className="font-bold text-foreground">Revenue Team</span></p>
               <div className="mt-4 bg-secondary/50 rounded-lg p-3 text-xs w-full flex justify-between items-center border border-border border-dashed">
                 <span className="text-muted-foreground">Derived Sheets Synced</span>
                 <span className="font-mono font-bold text-success">12 / 14 <span className="text-[10px] text-muted-foreground ml-1">users</span></span>
               </div>
            </div>
          </div>
          
          <div className="bg-background border border-border p-6 rounded-2xl relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 to-transparent blur-2xl rounded-full pointer-events-none"></div>
            <h3 className="font-heading font-semibold mb-3 relative z-10">How it works</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed relative z-10">
              When you push a master goal, the system automatically creates <strong className="text-foreground font-semibold px-1 bg-secondary rounded">locked</strong> derived goals on the specified employees' goal sheets. The Employee cannot edit the <i>Target</i> or <i>Unit of Measure</i>, but they are required to specify its weightage in their own sheet to ensure alignment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
