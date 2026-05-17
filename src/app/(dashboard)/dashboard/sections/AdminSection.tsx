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

export default function AdminSection() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-heading font-bold text-white tracking-tight">Organization Intelligence</h2>
          <p className="text-white/45 font-medium mt-1 text-sm">Company-wide goal health and compliance.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/[0.03] border border-white/[0.06] px-5 py-2.5 text-sm font-semibold rounded-lg hover:bg-white/[0.06] transition-colors text-white/60">Export Report</button>
          <button className="bg-primary text-[#0A0D0B] px-5 py-2.5 text-sm font-bold rounded-lg magnetic-btn">
            Executive Snapshot →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {[
          { label: "Total Users", value: "248" },
          { label: "Goal Complete", value: "82%" },
          { label: "Check-in Coverage", value: "64%" },
          { label: "Overdue Approvals", value: "12", isAlert: true },
          { label: "Avg Align. Score", value: "89%" }
        ].map((stat, i) => (
          <div key={i} className={`glass rounded-2xl p-5 flex flex-col items-center text-center card-3d ${stat.isAlert ? 'border-red-500/20' : ''}`}>
            <span className={`text-[10px] uppercase font-bold tracking-[0.2em] mb-2 ${stat.isAlert ? 'text-red-400' : 'text-white/40'}`}>{stat.label}</span>
            <span className={`font-mono text-2xl font-black ${stat.isAlert ? 'text-red-400' : 'text-white'}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <div className="glass rounded-2xl p-8 relative overflow-hidden">
            <h3 className="font-heading font-semibold text-xl mb-6 text-white">Annual Completion Trend</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={completionData}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 10', 'auto']} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#141714', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '8px' }} itemStyle={{ color: '#fff', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="rate" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-8">
              <h3 className="font-heading font-semibold text-lg mb-6 text-white">Department Metrics</h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deptData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }} barCategoryGap="20%">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} stroke="rgba(255,255,255,0.3)" width={70} fontSize={10} fontWeight={600} />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={14} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 flex flex-col justify-center items-center text-center">
              <h3 className="font-heading font-semibold text-lg mb-1 text-white">Goal Funnel</h3>
              <p className="text-[10px] text-white/35 mb-5 font-mono">Roll-off across cycle</p>
              <div className="w-full space-y-2 max-w-[200px]">
                <div className="bg-primary/15 border border-primary/20 text-primary w-full py-1.5 text-xs font-bold rounded-lg">100% Created</div>
                <div className="bg-green-500/80 text-black w-[85%] mx-auto py-1.5 text-xs font-bold rounded-lg">85% Approved</div>
                <div className="bg-amber-500/80 text-black w-[64%] mx-auto py-1.5 text-xs font-bold rounded-lg">64% Checked-in</div>
                <div className="bg-red-500/60 text-white w-[40%] mx-auto py-1.5 text-xs font-bold rounded-lg">40% Completed</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 space-y-5">
          <div className="mb-4">
            <h3 className="font-heading font-semibold text-lg flex items-center gap-2 text-white/90">
              <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
              AQ Pulse Engine
            </h3>
            <p className="text-[10px] text-white/20 mt-1.5 font-mono">Real-time inference active</p>
          </div>
          <div className="space-y-4">
            <PulseCard insight={{ id: "1", category: "ACTION_NEEDED", severity: "CRITICAL", headline: "12 Approvals Pending", body: "Bottleneck detected in Operations. Window opens in 3 days.", generatedAt: new Date(Date.now() - 120000), affectedUsers: ["Dev Rao", "Riya Desai"], cta: { label: "Escalate", href: "#" } }} />
            <PulseCard insight={{ id: "2", category: "RISK", severity: "WARNING", headline: "Low Check-in Coverage", body: "Revenue team has only 30% check-ins complete vs 85% company avg.", generatedAt: new Date(Date.now() - 3600000) }} />
            <PulseCard insight={{ id: "3", category: "EXCELLENCE", severity: "INFO", headline: "Alignment Goal Lift", body: "Alignment improved by 8% this week, pushing company avg to 89%.", generatedAt: new Date(Date.now() - 86400000) }} />
          </div>
        </div>
      </div>
    </div>
  );
}
