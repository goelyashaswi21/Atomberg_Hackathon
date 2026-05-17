export function GoalHealthMeter({
  weightageSum,
  goalsCount,
}: {
  weightageSum: number;
  goalsCount: number;
}) {
  const isHealthy = weightageSum === 100 && goalsCount <= 6;
  const isRisky = weightageSum !== 100 || goalsCount > 8;
  const color = isHealthy ? 'var(--success)' : isRisky ? 'var(--danger)' : 'var(--warning)';
  const statusLabel = isHealthy ? 'BALANCED' : isRisky ? 'NEEDS ATTENTION' : 'RISKY';
  const pct = Math.min(weightageSum, 100) + "%";

  return (
    <div className="w-full bg-secondary border border-border-card rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden shadow-sm">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 to-transparent blur-2xl"></div>

      <div className="flex justify-between items-center mb-1 relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          Health Meter
          <span className="text-[10px] bg-background border border-border px-1.5 py-0.5 rounded text-foreground">{statusLabel}</span>
        </span>
        <span className="font-mono text-sm font-bold" style={{ color }}>{weightageSum}%</span>
      </div>
      
      <div className="h-2 w-full bg-background rounded-full overflow-hidden relative z-10 border border-border-subtle">
        <div className="h-full transition-all duration-700 ease-in-out shadow-[0_0_10px_currentColor]" style={{ width: pct, backgroundColor: color, color: color }}></div>
      </div>
      
      <div className="space-y-2 mt-3 relative z-10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground group">
          <div className="w-5 h-5 rounded-full bg-background flex items-center justify-center border border-border">
            <span className={`w-2 h-2 rounded-full ${weightageSum === 100 ? 'bg-success shadow-[0_0_8px_var(--success)]' : 'bg-danger shadow-[0_0_8px_var(--danger)] animate-pulse'}`}></span>
          </div>
          <span className="group-hover:text-foreground transition-colors">Goal weightage distributes perfectly to 100%</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground group">
          <div className="w-5 h-5 rounded-full bg-background flex items-center justify-center border border-border">
            <span className={`w-2 h-2 rounded-full ${goalsCount <= 6 ? 'bg-success shadow-[0_0_8px_var(--success)]' : (goalsCount <= 8 ? 'bg-warning' : 'bg-danger shadow-[0_0_8px_var(--danger)]')}`}></span>
          </div>
          <span className="group-hover:text-foreground transition-colors">Manageable concurrent goal count (Current: <span className="font-mono">{goalsCount}</span>)</span>
        </div>
      </div>
    </div>
  )
}
