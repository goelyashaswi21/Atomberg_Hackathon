"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ApprovalPanel({ goals }: { goals: any[] }) {
  const [selectedGoalId, setSelectedGoalId] = useState(goals[0]?.id || null);
  const selectedGoal = goals.find(g => g.id === selectedGoalId);

  if (goals.length === 0) {
    return (
      <div className="py-20 text-center animate-in fade-in duration-500 border border-border rounded-xl bg-secondary/10">
        <h2 className="text-2xl font-heading font-bold text-foreground">Inbox Zero</h2>
        <p className="text-muted-foreground mt-2">All team goals have been reviewed.</p>
      </div>
    );
  }

  return (
    <div className="flex h-[75vh] border border-border rounded-2xl overflow-hidden bg-secondary/20 shadow-xl">
      {/* Left Panel - Inbox */}
      <div className="w-1/3 border-r border-border bg-background flex flex-col z-10 transition-colors shadow-sm">
        <div className="p-5 border-b border-border bg-secondary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full"></div>
          <h3 className="font-heading font-semibold text-foreground relative z-10">Pending Approvals</h3>
          <p className="text-xs text-muted-foreground font-mono mt-0.5 relative z-10">{goals.length} item{goals.length === 1 ? '' : 's'} waiting</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {goals.map(goal => (
            <div 
              key={goal.id} 
              onClick={() => setSelectedGoalId(goal.id)}
              className={`p-4 border-b border-border cursor-pointer transition-all duration-200 group ${selectedGoalId === goal.id ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-secondary/50 border-l-4 border-l-transparent'}`}
            >
              <div className="flex justify-between items-start mb-1.5">
                <span className={`text-xs font-bold truncate max-w-[150px] transition-colors ${selectedGoalId === goal.id ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>{goal.user?.name || "Employee"}</span>
                <span className="text-[9px] bg-warning/10 border border-warning/20 text-warning px-2 py-0.5 rounded font-bold uppercase tracking-widest">{goal.status}</span>
              </div>
              <h4 className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-foreground transition-colors">{goal.title}</h4>
              <p className="text-[11px] text-muted-foreground mt-2 truncate max-w-full font-mono">{goal.thrustArea} • {goal.target} {goal.uom}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Detail */}
      <div className="w-2/3 flex flex-col bg-background/50 relative">
        {selectedGoal ? (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-8 border-b border-border bg-background">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground leading-tight">{selectedGoal.title}</h2>
                  <p className="text-sm text-muted-foreground mt-2">Submitted by <span className="text-foreground tracking-wide">{selectedGoal.user?.name || "Employee"}</span> &bull; {selectedGoal.thrustArea}</p>
                </div>
                <div className="font-mono text-3xl text-primary font-bold drop-shadow-[0_0_8px_rgba(143,209,79,0.2)] bg-primary/10 border border-primary/20 px-3 py-1 rounded-lg">
                  {selectedGoal.weightage}%<span className="text-[9px] block text-center uppercase tracking-widest text-primary/80 mt-1">Impact</span>
                </div>
              </div>

              {/* Workflow Stepper */}
              <div className="mt-10 mb-2">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase font-bold tracking-widest relative px-4">
                  <div className="absolute top-1/2 left-4 w-[calc(100%-2rem)] h-px bg-border -z-10"></div>
                  <div className="flex flex-col items-center bg-background px-2">
                    <div className="w-3 h-3 rounded-full bg-success mb-2 shadow-[0_0_8px_var(--success)]"></div>
                    <span>Draft</span>
                  </div>
                  <div className="flex flex-col items-center bg-background px-2">
                    <div className="w-3 h-3 rounded-full bg-success mb-2 shadow-[0_0_8px_var(--success)]"></div>
                    <span>Submitted</span>
                  </div>
                  <div className="flex flex-col items-center bg-background px-2 text-warning">
                    <div className="w-3 h-3 rounded-full bg-warning animate-pulse mb-2 shadow-[0_0_8px_var(--warning)]"></div>
                    <span>Manager Review</span>
                  </div>
                  <div className="flex flex-col items-center bg-background px-2">
                    <div className="w-3 h-3 rounded-full border border-border mb-2"></div>
                    <span>Approved</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="p-4 bg-secondary/30 rounded-xl border border-border/80 shadow-sm">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Target Result</span>
                  <p className="text-2xl font-mono text-foreground mt-1.5">{selectedGoal.target} <span className="text-sm font-sans font-medium text-muted-foreground ml-1">{selectedGoal.uom}</span></p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-xl border border-border/80 shadow-sm">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Deadline Target</span>
                  <p className="text-lg font-mono text-foreground mt-2">{new Date(selectedGoal.deadline).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="col-span-2 p-5 bg-secondary/30 rounded-xl border border-border/80 shadow-sm">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Manager Comments & Feedback</span>
                  <textarea className="w-full mt-2.5 bg-background border border-border-subtle rounded-md p-3 text-sm text-foreground focus:ring-1 focus:ring-primary outline-none h-24 resize-none transition-colors" placeholder="Leave context regarding approval or rework requirements here..."></textarea>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border bg-secondary/40 flex justify-end gap-4 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
              <Button variant="outline" className="border-destructive/40 text-destructive hover:bg-destructive/10 font-bold tracking-wide transition-all" onClick={() => alert("Returned for rework")}>Return for Rework</Button>
              <Button className="bg-primary text-primary-foreground hover:bg-accent-bright font-bold px-8 shadow-[0_0_15px_var(--accent-glow)] transition-all" onClick={() => alert("Goal Approved!")}>Sign & Approve</Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">Select a goal sheet to begin review</div>
        )}
      </div>
    </div>
  )
}
