"use client";
import { getProgressColor } from "@/lib/progress";

export function ProgressRing({ 
  progress, 
  title, 
  thrustArea, 
  deadline, 
  status 
}: { 
  progress: number; 
  title: string; 
  thrustArea: string; 
  deadline: string; 
  status: string;
}) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(progress, 100) / 100) * circumference;
  const color = getProgressColor(progress);

  return (
    <div className="bg-secondary/40 border border-border-card rounded-2xl p-5 hover:bg-secondary/60 hover:-translate-y-1 hover:border-border-active hover:shadow-[0_0_24px_rgba(143,209,79,0.1)] transition-all duration-300 group cursor-pointer flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground bg-background px-2.5 py-1 rounded-full border border-border shadow-sm">
          {thrustArea}
        </span>
        <div className="flex items-center gap-1.5 bg-background/50 px-2.5 py-1 rounded-full border border-border shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{status.replace('_', ' ')}</span>
        </div>
      </div>
      
      <div className="w-full flex justify-center items-center py-4 relative">
        <svg className="w-28 h-28 transform -rotate-90 drop-shadow-md">
          <circle cx="56" cy="56" r={radius} className="stroke-muted/50 fill-none" strokeWidth="8" />
          <circle 
            cx="56" cy="56" r={radius} 
            className="fill-none transition-all duration-1000 ease-out" 
            stroke={color} 
            strokeWidth="8" 
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-bold" style={{ color: "var(--foreground)", textShadow: `0 0 12px ${color}33` }}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <div className="mt-auto text-center pt-2">
        <h4 className="font-semibold text-foreground text-sm line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-[11px] text-muted-foreground mt-2 font-mono">{deadline}</p>
      </div>
    </div>
  )
}
