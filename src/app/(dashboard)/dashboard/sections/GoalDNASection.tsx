export default function GoalDNASection() {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="glass inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 text-primary">Executive View</div>
        <h2 className="text-3xl font-heading font-bold text-white tracking-tight">Organization Goal DNA</h2>
        <p className="text-white/45 font-medium mt-1 text-sm">Strategic alignment, visualized in real-time.</p>
      </div>

      <div className="w-full glass rounded-2xl p-10 relative overflow-hidden flex flex-col items-center">
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Level 1 */}
          <div className="glass-strong rounded-2xl py-5 px-10 text-center z-10" style={{ boxShadow: "0 0 20px rgba(143,209,79,0.1)" }}>
            <h3 className="text-2xl font-heading font-bold text-white tracking-wide">ATOMGOALS<span className="text-primary">.HQ</span></h3>
            <p className="text-[10px] text-primary/60 uppercase tracking-widest mt-1 font-mono">Master Strategic Node</p>
          </div>

          <div className="h-8 w-px bg-gradient-to-b from-primary/30 to-white/[0.04]" />
          <div className="w-2/3 h-px bg-white/[0.06] relative flex justify-between">
            <div className="w-px h-6 bg-white/[0.06]" />
            <div className="w-px h-6 bg-white/[0.06]" />
          </div>
          <div className="h-6" />

          {/* Level 2 */}
          <div className="flex justify-between w-full max-w-4xl -mt-6 z-10">
            {/* Ops Branch */}
            <div className="flex flex-col items-center w-1/2">
              <div className="glass rounded-xl py-4 px-8 text-center min-w-[220px] group">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block mb-3" />
                <h4 className="font-bold text-white text-base group-hover:text-primary transition-colors">Operations</h4>
                <p className="text-xs font-mono text-white/45 mt-1">Shared KPI: -30% Process Time</p>
              </div>
              <div className="h-6 w-px bg-white/[0.06]" />
              <div className="w-3/5 h-px bg-white/[0.06] relative flex justify-between">
                <div className="w-px h-6 bg-white/[0.06]" />
                <div className="w-px h-6 bg-white/[0.06]" />
              </div>
              <div className="h-6" />
              <div className="flex justify-between w-full max-w-sm -mt-6">
                <DnaUserCard initials="SN" name="Sara N." goal="Automation UI" status="on-track" />
                <DnaUserCard initials="DR" name="Dev R." goal="Logistics SLA" status="critical" />
              </div>
            </div>

            {/* Revenue Branch */}
            <div className="flex flex-col items-center w-1/2">
              <div className="glass rounded-xl py-4 px-8 text-center min-w-[220px] group">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block mb-3" />
                <h4 className="font-bold text-white text-base group-hover:text-primary transition-colors">Revenue</h4>
                <p className="text-xs font-mono text-white/45 mt-1">Shared KPI: ₹50Cr Gross</p>
              </div>
              <div className="h-6 w-px bg-white/[0.06]" />
              <div className="w-3/5 h-px bg-white/[0.06] relative flex justify-between">
                <div className="w-px h-6 bg-white/[0.06]" />
                <div className="w-px h-6 bg-white/[0.06]" />
              </div>
              <div className="h-6" />
              <div className="flex justify-between w-full max-w-sm -mt-6">
                <DnaUserCard initials="AJ" name="Ankit J." goal="Enterprise Sales" status="at-risk" progress={60} />
                <DnaUserCard initials="RM" name="Rahul M." goal="New Account Acq." status="on-track" progress={85} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-4 flex gap-6 text-sm text-white/45 items-center justify-center font-mono">
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full" /> On Track</span>
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-amber-400 rounded-full" /> At Risk</span>
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-red-400 rounded-full" /> Critical</span>
      </div>
    </div>
  );
}

function DnaUserCard({ initials, name, goal, status, progress }: { 
  initials: string; name: string; goal: string; status: "on-track" | "at-risk" | "critical"; progress?: number 
}) {
  const color = status === "on-track" ? "green" : status === "at-risk" ? "amber" : "red";
  return (
    <div className="glass rounded-xl p-4 text-center w-40 card-3d">
      <div className={`w-6 h-6 rounded-full bg-${color}-500/15 text-${color}-400 text-[10px] font-bold flex items-center justify-center mx-auto mb-2 font-mono`}>{initials}</div>
      <h5 className="font-semibold text-xs text-white mb-1">{name}</h5>
      <p className="text-[10px] text-white/30 truncate">{goal}</p>
      {progress ? (
        <div className="w-full bg-white/[0.04] h-1 rounded-full mt-3 overflow-hidden">
          <div className={`bg-${color}-400 h-full`} style={{ width: `${progress}%` }} />
        </div>
      ) : (
        <div className={`mt-2 text-${color}-400 font-mono font-bold text-[10px] uppercase`}>
          {status === "on-track" ? "On Track" : status === "at-risk" ? "At Risk" : "40% Gap"}
        </div>
      )}
    </div>
  );
}
