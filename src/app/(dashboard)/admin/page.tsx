"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from "recharts";
import { PulseCard } from "@/components/pulse/PulseCard";

const deptData = [
  { name: 'Product', score: 91, fill: 'var(--success)' },
  { name: 'Revenue', score: 85, fill: 'var(--success)' },
  { name: 'Operations', score: 72, fill: 'var(--warning)' },
  { name: 'HR', score: 64, fill: 'var(--danger)' },
];

const completionData = [
  { month: 'Jan', rate: 65 }, { month: 'Feb', rate: 70 }, { month: 'Mar', rate: 75 },
  { month: 'Apr', rate: 72 }, { month: 'May', rate: 78 }, { month: 'Jun', rate: 84 },
  { month: 'Jul', rate: 82 }, { month: 'Aug', rate: 88 }, { month: 'Sep', rate: 91 },
  { month: 'Oct', rate: 89 }, { month: 'Nov', rate: 94 }, { month: 'Dec', rate: 96 },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500 py-4">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">Organization Intelligence</h1>
          <p className="text-muted-foreground font-medium mt-1">High-level view of company-wide goal health and compliance.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-background border border-border px-5 py-2.5 text-sm font-semibold rounded-lg hover:bg-muted transition-colors shadow-sm">Export Report</button>
          <button className="bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold rounded-lg shadow-[0_0_15px_var(--accent-glow)] hover:bg-accent-bright transition-all group">
            Executive Snapshot <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-5">
        {[
          { label: "Total Users", value: "248" },
          { label: "Goal Complete", value: "82%" },
          { label: "Check-in Coverage", value: "64%" },
          { label: "Overdue Approvals", value: "12", isAlert: true },
          { label: "Avg Align. Score", value: "89%" }
        ].map((stat, i) => (
          <div key={i} className={`bg-secondary/40 border rounded-2xl p-6 flex flex-col justify-center items-center text-center transition-all hover:-translate-y-1 ${stat.isAlert ? 'border-destructive/50 shadow-[0_0_24px_rgba(224,82,82,0.15)] bg-destructive/5' : 'border-border-card shadow-sm hover:border-border-active'}`}>
            <span className={`text-[10px] uppercase font-bold tracking-widest mb-1.5 ${stat.isAlert ? 'text-destructive' : 'text-muted-foreground'}`}>{stat.label}</span>
            <span className={`font-mono text-3xl font-bold ${stat.isAlert ? 'text-destructive drop-shadow-[0_0_8px_rgba(224,82,82,0.4)] animate-pulse' : 'text-foreground'}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <div className="bg-background border border-border p-8 rounded-2xl shadow-sm hover:border-primary/20 transition-colors duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 to-transparent blur-3xl pointer-events-none"></div>
            <h3 className="font-heading font-semibold text-xl mb-6 relative z-10">Annual Completion Trend</h3>
            <div className="h-64 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={completionData}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} domain={['dataMin - 10', 'auto']} />
                  <RechartsTooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} itemStyle={{ color: 'var(--foreground)', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="rate" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" activeDot={{ r: 6, fill: 'var(--primary)', stroke: 'var(--background)', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-background border border-border p-8 rounded-2xl shadow-sm">
              <h3 className="font-heading font-semibold text-lg mb-6">Department Metrics</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deptData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }} barCategoryGap="20%">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} stroke="var(--muted-foreground)" width={70} fontSize={11} fontWeight={600} />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-background border border-border p-8 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center">
              <h3 className="font-heading font-semibold text-lg mb-1">Goal Funnel</h3>
              <p className="text-xs text-muted-foreground mb-6 font-mono">Roll-off across cycle</p>
              
              <div className="w-full space-y-2.5 max-w-[220px]">
                <div className="bg-primary/20 border border-primary/30 text-primary w-full py-1.5 text-xs font-bold rounded-lg shadow-sm">100% Created</div>
                <div className="bg-success text-background w-[85%] mx-auto py-1.5 text-xs font-bold rounded-lg shadow-[0_0_10px_var(--success)] relative z-10 hover:scale-105 transition-transform cursor-pointer">85% Approved</div>
                <div className="bg-warning text-background w-[64%] mx-auto py-1.5 text-xs font-bold rounded-lg shadow-[0_0_10px_rgba(232,168,56,0.5)]">64% Checked-in</div>
                <div className="bg-danger text-foreground w-[40%] mx-auto py-1.5 text-xs font-bold rounded-lg opacity-90 shadow-sm">40% Completed</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 border-l border-border pl-8 py-2 space-y-5">
          <div className="mb-6">
            <h3 className="font-heading font-semibold text-xl flex items-center gap-2.5 text-foreground">
              <div className="w-3 h-3 rounded-full bg-primary flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-background rounded-full animate-pulse"></div>
              </div>
              AQ Pulse Engine
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 bg-background border border-border px-2 py-1 rounded inline-block">Real-time inference active</p>
          </div>
          
          <div className="space-y-4">
            <PulseCard insight={{
              id: "1", category: "ACTION_NEEDED", severity: "CRITICAL", headline: "12 Approvals Pending",
              body: "Bottleneck detected in Operations. Department check-in window opens in 3 days.",
              generatedAt: new Date(Date.now() - 120000), affectedUsers: ["Dev Rao", "Riya Desai"],
              cta: { label: "Escalate to Head", href: "#" }
            }} />
            <PulseCard insight={{
              id: "2", category: "RISK", severity: "WARNING", headline: "Low Check-in Coverage",
              body: "Revenue team has only 30% check-ins complete vs 85% company average.",
              generatedAt: new Date(Date.now() - 3600000),
            }} />
            <PulseCard insight={{
              id: "3", category: "EXCELLENCE", severity: "INFO", headline: "Alignment Goal Lift",
              body: "Overall objective alignment improved by 8% this week, pushing company average to 89%.",
              generatedAt: new Date(Date.now() - 86400000),
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}
