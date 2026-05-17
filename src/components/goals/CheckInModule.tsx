"use client";
  import { useState, useTransition } from "react";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { calculateProgress, getProgressColor } from "@/lib/progress";
  import { submitCheckIn } from "@/app/(dashboard)/goals/checkins/actions";

  export function CheckInModule({ goal }: { goal: any }) {
    const [achievement, setAchievement] = useState<number>(0);
    const [status, setStatus] = useState(goal.status || "ON_TRACK");
    const [notes, setNotes] = useState("");
    const [isPending, startTransition] = useTransition();
    const progress = calculateProgress(goal.uom as any, goal.target, achievement);
    const color = getProgressColor(progress);

    const handleSubmit = () => {
      startTransition(async () => {
        try {
          await submitCheckIn(goal.id, { achievement, status, notes });
          alert("Check-in successfully recorded!");
        } catch(e) {
          alert("Failed to submit check-in");
        }
      });
    };

  return (
    <div className="bg-secondary/40 border border-border-card rounded-2xl p-6 transition-all hover:border-border-active shadow-sm group">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{goal.title}</h3>
          <p className="text-xs text-muted-foreground mt-1.5 font-mono">Target: <span className="text-foreground tracking-wide">{goal.target} {goal.uom}</span></p>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground bg-background px-3 py-1.5 rounded-full border border-border shadow-sm">
          {goal.thrustArea}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-3 space-y-5">
          <div>
            <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Current Achievement</label>
            <div className="flex items-center gap-3 mt-1.5">
              <Input type="number" min="0" value={achievement} onChange={(e) => setAchievement(Number(e.target.value))} className="bg-background border-border-subtle focus-visible:ring-primary text-foreground" />
              <span className="text-xs font-mono text-muted-foreground uppercase">{goal.uom}</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Self-Assessed Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full mt-1.5 bg-background border border-border-subtle rounded-md p-2.5 text-sm text-foreground focus:ring-1 focus:ring-primary outline-none hover:border-primary/50 transition-colors">
              <option value="ON_TRACK">On Track</option>
              <option value="AT_RISK">At Risk</option>
              <option value="COMPLETED">Completed</option>
              <option value="NOT_STARTED">Not Started</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Notes for Manager</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Context or blockers..." className="w-full mt-1.5 bg-background border border-border-subtle rounded-md p-3 text-sm text-foreground focus:ring-1 focus:ring-primary outline-none h-20 resize-none hover:border-primary/50 transition-colors" />
          </div>
        </div>

        <div className="col-span-2 flex flex-col justify-center items-center bg-background/50 rounded-xl p-5 border border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 to-transparent blur-2xl pointer-events-none"></div>

          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-3 z-10">Calculated Progress</span>
          <div className="relative flex justify-center items-center my-2 z-10">
            <svg className="w-24 h-24 transform -rotate-90 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
              <circle cx="48" cy="48" r="40" className="stroke-muted/30 fill-none" strokeWidth="6" />
              <circle 
                cx="48" cy="48" r="40" 
                className="fill-none transition-all duration-700 ease-out drop-shadow-md" 
                stroke={color} 
                strokeWidth="6" 
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 - (Math.min(progress, 100) / 100) * (2 * Math.PI * 40)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-xl font-bold" style={{ color: "var(--foreground)", textShadow: `0 0 12px ${color}40` }}>
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          <Button 
            disabled={isPending}
            className="w-full mt-6 bg-primary text-primary-foreground hover:bg-accent-bright font-bold shadow-[0_0_15px_var(--accent-glow)] transition-all z-10 disabled:opacity-50" 
            onClick={handleSubmit}
          >
            {isPending ? "Submitting..." : "Submit Check-In"}
          </Button>
        </div>
      </div>
    </div>
  )
}
