"use function";

export function AlignmentScore({ score }: { score: number }) {
  const color = score >= 80 ? "text-success" : score >= 50 ? "text-warning" : "text-destructive";
  const bg = score >= 80 ? "bg-success/10" : score >= 50 ? "bg-warning/10" : "bg-destructive/10";
  const border = score >= 80 ? "border-success/20" : score >= 50 ? "border-warning/20" : "border-destructive/20";
  
  return (
    <div className={`p-4 rounded-xl border ${border} ${bg} shadow-sm`}>
      <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground flex items-center justify-between">
        Alignment Score
        <div className={`w-1.5 h-1.5 rounded-full ${color.replace('text', 'bg')} shadow-[0_0_8px_currentColor]`} />
      </span>
      <div className="flex items-end gap-2 mt-1.5">
        <p className={`text-3xl font-mono ${color} font-bold leading-none`}>
          {score}%
        </p>
        <span className="text-xs text-muted-foreground mb-1 block">Match w/ Dept KPIs</span>
      </div>
    </div>
  );
}
