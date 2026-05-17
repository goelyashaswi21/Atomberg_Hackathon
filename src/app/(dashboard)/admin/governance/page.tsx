"use client";
import { Button } from "@/components/ui/button";

export default function GovernancePage() {
  return (
    <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom-4 duration-500 py-4 space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">Governance & Control Core</h1>
        <p className="text-muted-foreground font-medium mt-1">Override locked goals, configure global performance cycles, and address escalated bottlenecks.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-8">
          <div className="bg-secondary/20 border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-heading font-semibold mb-4 border-b border-border-subtle pb-3">Active Goal Cycle Configuration</h2>
            <div className="grid grid-cols-2 gap-8">
               <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2">Cycle Name</h4>
                  <div className="font-mono text-foreground font-bold bg-background border border-border-subtle p-3 rounded-lg">FY 2026-27</div>
               </div>
               <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2">Global Status</h4>
                  <div className="font-mono text-warning font-bold bg-warning/10 border border-warning/20 p-3 rounded-lg flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-warning animate-pulse"></span>
                     Q1 Check-ins Active
                  </div>
               </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
               <Button variant="outline" className="border-border-active bg-background text-foreground transition-all">Extend Window 48 Hrs</Button>
               <Button className="bg-primary text-[#0A0D0B] font-bold shadow-[0_0_15px_var(--accent-glow)] transition-all">Lock Cycle</Button>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-destructive/10 to-transparent blur-2xl"></div>
            <h2 className="text-xl font-heading font-semibold mb-4 border-b border-border-subtle pb-3 relative z-10 font-mono text-destructive">System Overrides</h2>
            
            <div className="space-y-4 relative z-10 w-full overflow-x-auto">
               <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                     <tr className="text-[10px] tracking-widest text-muted-foreground uppercase border-b border-border-subtle">
                        <th className="pb-3 px-2 font-bold">Employee</th>
                        <th className="pb-3 px-2 font-bold">Manager</th>
                        <th className="pb-3 px-2 font-bold">Issue</th>
                        <th className="pb-3 px-2 text-right font-bold w-32">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                     <tr className="group hover:bg-secondary/40 transition-colors">
                        <td className="py-4 px-2 font-medium">Dev Rao <span className="text-xs text-muted-foreground block">dev@atomgoals.ai</span></td>
                        <td className="py-4 px-2 text-muted-foreground">Sarah Connor</td>
                        <td className="py-4 px-2"><span className="bg-destructive/10 text-destructive border border-destructive/20 px-2 py-1 rounded text-xs">Locked Goal Dispute</span></td>
                        <td className="py-4 px-2 text-right">
                           <Button size="sm" variant="outline" className="text-xs" onClick={() => alert("Force Unlocked!")}>Force Unlock</Button>
                        </td>
                     </tr>
                     <tr className="group hover:bg-secondary/40 transition-colors">
                        <td className="py-4 px-2 font-medium">Amit Singh <span className="text-xs text-muted-foreground block">amit@atomgoals.ai</span></td>
                        <td className="py-4 px-2 text-warning">Pending 14 days</td>
                        <td className="py-4 px-2"><span className="bg-warning/10 text-warning border border-warning/20 px-2 py-1 rounded text-xs">Manager Escalation</span></td>
                        <td className="py-4 px-2 text-right">
                           <Button size="sm" variant="outline" className="text-xs" onClick={() => alert("Auto-approved by admin policy.")}>Override Approve</Button>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-secondary/40 border border-border p-6 rounded-xl shadow-sm">
             <h3 className="font-heading font-semibold text-lg flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Governance Insights
             </h3>

             <div className="space-y-4">
                <div className="bg-background border border-border p-4 rounded-lg">
                   <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Overdue Approvals</div>
                   <div className="text-2xl font-mono text-warning font-bold">12</div>
                </div>
                <div className="bg-background border border-border p-4 rounded-lg">
                   <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Completion Bottleneck</div>
                   <div className="text-lg font-medium text-destructive truncate">IT Department</div>
                   <div className="text-xs text-muted-foreground mt-1">45% Check-ins missing</div>
                </div>
                <div className="bg-background border border-border p-4 rounded-lg">
                   <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Audit Anomalies</div>
                   <div className="text-2xl font-mono text-success font-bold">0</div>
                   <div className="text-xs text-muted-foreground mt-1 text-success flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-success"></div> System healthy
                   </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}
