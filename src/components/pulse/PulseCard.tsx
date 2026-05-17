import { AlertCircle, AlertTriangle, Zap } from "lucide-react";

export interface PulseInsight {
  id: string;
  category: 'STALL' | 'RISK' | 'OVERLOAD' | 'ALIGNMENT' | 'EXCELLENCE' | 'ACTION_NEEDED';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  headline: string;
  body: string;
  affectedUsers?: string[];
  cta?: { label: string; href: string };
  generatedAt: Date;
}

export function PulseCard({ insight }: { insight: PulseInsight }) {
  const getSeverityStyle = () => {
    switch(insight.severity) {
      case 'CRITICAL': return { border: 'border-destructive/30', bg: 'bg-destructive/5', text: 'text-destructive', glow: 'shadow-[0_0_15px_rgba(224,82,82,0.15)]', icon: <AlertCircle className="w-5 h-5 text-destructive" /> };
      case 'WARNING': return { border: 'border-warning/30', bg: 'bg-warning/5', text: 'text-warning', glow: '', icon: <AlertTriangle className="w-5 h-5 text-warning" /> };
      case 'INFO': return { border: 'border-primary/20', bg: 'bg-primary/5', text: 'text-primary', glow: '', icon: <Zap className="w-5 h-5 text-primary" /> };
      default: return { border: 'border-border', bg: 'bg-background', text: 'text-foreground', glow: '', icon: <Zap className="w-5 h-5" /> };
    }
  }
  
  const styles = getSeverityStyle();

  return (
    <div className={`p-5 rounded-2xl border ${styles.border} ${styles.bg} ${styles.glow} flex flex-col gap-3 transition-all hover:bg-opacity-80`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 bg-background p-1.5 rounded-lg shadow-sm border border-border/50">{styles.icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className={`text-[10px] uppercase font-bold tracking-widest ${styles.text}`}>
              {insight.category} ALERT
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">
              {Math.floor((Date.now() - insight.generatedAt.getTime()) / 60000)}m ago
            </span>
          </div>
          <h4 className="font-heading font-semibold text-foreground text-sm mt-1.5 mb-1">{insight.headline}</h4>
          <p className="text-[13px] text-muted-foreground leading-relaxed drop-shadow-sm">{insight.body}</p>
        </div>
      </div>
      
      {(insight.affectedUsers || insight.cta) && (
        <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between bg-black/10 -mx-5 -mb-5 px-5 pb-4">
          <div className="text-[11px] text-muted-foreground">
            {insight.affectedUsers && (
              <span>Affected: <span className="text-foreground font-medium">{insight.affectedUsers.join(", ")}</span></span>
            )}
          </div>
          {insight.cta && (
            <a href={insight.cta.href} className={`text-xs font-semibold ${styles.text} hover:underline decoration-dashed underline-offset-4 flex items-center gap-1`}>
              {insight.cta.label} &rarr;
            </a>
          )}
        </div>
      )}
    </div>
  )
}
