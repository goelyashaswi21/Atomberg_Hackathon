export default function GoalDNA() {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 py-4">
      <div className="mb-4">
        <div className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold w-fit uppercase tracking-widest mb-4">Executive View</div>
        <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">Organization Goal DNA</h1>
        <p className="text-muted-foreground font-medium mt-1">Your organization&apos;s strategic alignment, visualized in real-time.</p>
      </div>
      
      <div className="w-full bg-secondary/20 border border-border rounded-2xl p-10 relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent blur-3xl pointer-events-none"></div>

        <div className="relative z-10 w-full flex flex-col items-center">
          
          {/* Level 1 - Organization */}
          <div className="bg-background border border-primary/50 shadow-[0_0_30px_rgba(143,209,79,0.2)] rounded-2xl py-5 px-10 text-center z-10">
            <h3 className="text-2xl font-heading font-bold text-foreground tracking-wide">ATOMGOALS<span className="text-primary">.HQ</span></h3>
            <p className="text-[10px] text-primary uppercase tracking-widest mt-1">Master Strategic Node</p>
          </div>

          {/* Lines */}
          <div className="h-8 w-px bg-primary/30 z-0 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/50 to-border"></div>
          </div>
          <div className="w-2/3 h-px border-t border-border relative z-0 flex justify-between">
            <div className="w-px h-6 bg-border"></div>
            <div className="w-px h-6 bg-border"></div>
          </div>
          <div className="h-6"></div>

          {/* Level 2 - Departments */}
          <div className="flex justify-between w-full max-w-4xl -mt-6 z-10">
            
            {/* Ops Branch */}
            <div className="flex flex-col items-center w-1/2">
              <div className="bg-secondary/50 border border-border backdrop-blur-sm rounded-xl py-4 px-8 text-center min-w-[240px] shadow-sm hover:border-primary/40 transition-colors cursor-pointer group">
                <span className="w-2 h-2 rounded-full bg-success inline-block shadow-[0_0_8px_var(--success)] mb-3"></span>
                <h4 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">Operations</h4>
                <p className="text-[11px] font-mono text-muted-foreground mt-1 bg-background rounded px-2 py-0.5 border border-border inline-block">Shared KPI: -30% Process Time</p>
              </div>

              {/* Sub lines Ops */}
              <div className="h-6 w-px bg-border z-0"></div>
              <div className="w-3/5 h-px border-t border-border relative z-0 flex justify-between">
                <div className="w-px h-6 bg-border"></div>
                <div className="w-px h-6 bg-border"></div>
              </div>
              <div className="h-6"></div>

              {/* Operations Users */}
              <div className="flex justify-between w-full max-w-sm -mt-6">
                <div className="bg-background border border-border-card p-4 rounded-xl text-center shadow-sm w-40 hover:-translate-y-1 transition-transform cursor-pointer group">
                  <div className="w-6 h-6 rounded-full bg-success/20 text-success text-[10px] font-bold flex items-center justify-center mx-auto mb-2 font-mono">SN</div>
                  <h5 className="font-semibold text-xs text-foreground mb-1">Sara N.</h5>
                  <p className="text-[10px] text-muted-foreground truncate" title="Automation Scripting V2">Automation UI</p>
                  <div className="mt-2 bg-success/10 text-success text-[9px] px-2 py-0.5 rounded uppercase font-bold">On Track</div>
                </div>
                
                <div className="bg-background border border-border-card p-4 rounded-xl text-center shadow-sm w-40 hover:-translate-y-1 transition-transform cursor-pointer relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-danger/10 rotate-45 translate-x-4 -translate-y-4"></div>
                  <div className="w-6 h-6 rounded-full bg-danger/20 text-danger text-[10px] font-bold flex items-center justify-center mx-auto mb-2 font-mono shadow-[0_0_8px_rgba(224,82,82,0.3)]">DR</div>
                  <h5 className="font-semibold text-xs text-foreground mb-1">Dev R.</h5>
                  <p className="text-[10px] text-muted-foreground line-clamp-1" title="Logistics SLA reduction">Logistics SLA reduction</p>
                  <div className="mt-2 text-danger font-mono font-bold text-xs animate-pulse">40% Gap</div>
                </div>
              </div>
            </div>

            {/* Rev Branch */}
            <div className="flex flex-col items-center w-1/2">
              <div className="bg-secondary/50 border border-border backdrop-blur-sm rounded-xl py-4 px-8 text-center min-w-[240px] shadow-sm hover:border-primary/40 transition-colors cursor-pointer group">
                <span className="w-2 h-2 rounded-full bg-warning inline-block shadow-[0_0_8px_var(--warning)] mb-3 animate-pulse"></span>
                <h4 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">Revenue</h4>
                <p className="text-[11px] font-mono text-muted-foreground mt-1 bg-background rounded px-2 py-0.5 border border-border inline-block">Shared KPI: ₹50Cr Gross</p>
              </div>

              {/* Sub lines Rev */}
              <div className="h-6 w-px bg-border z-0"></div>
              <div className="w-3/5 h-px border-t border-border relative z-0 flex justify-between">
                <div className="w-px h-6 bg-border"></div>
                <div className="w-px h-6 bg-border"></div>
              </div>
              <div className="h-6"></div>

              {/* Rev Users */}
              <div className="flex justify-between w-full max-w-sm -mt-6">
                <div className="bg-background border border-border-card p-4 rounded-xl text-center shadow-sm w-40 hover:-translate-y-1 transition-transform cursor-pointer group relative overflow-hidden">
                  <div className="absolute inset-0 bg-warning/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-6 h-6 rounded-full bg-warning/20 text-warning text-[10px] font-bold flex items-center justify-center mx-auto mb-2 font-mono">AJ</div>
                  <h5 className="font-semibold text-xs text-foreground mb-1">Ankit J.</h5>
                  <p className="text-[10px] text-muted-foreground line-clamp-1" title="Enterprise Sales Expansion">Enterprise Sales</p>
                  <div className="w-full bg-secondary h-1 rounded-full mt-3 overflow-hidden"><div className="bg-warning h-full w-[60%]"></div></div>
                </div>
                
                <div className="bg-background border border-border-card p-4 rounded-xl text-center shadow-sm w-40 hover:-translate-y-1 transition-transform cursor-pointer group">
                  <div className="w-6 h-6 rounded-full bg-success/20 text-success text-[10px] font-bold flex items-center justify-center mx-auto mb-2 font-mono">RM</div>
                  <h5 className="font-semibold text-xs text-foreground mb-1">Rahul M.</h5>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">New Account Acq.</p>
                  <div className="w-full bg-secondary h-1 rounded-full mt-3 overflow-hidden"><div className="bg-success h-full w-[85%]"></div></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <div className="bg-background border border-border rounded-xl p-4 flex gap-6 text-xs text-muted-foreground items-center justify-center font-mono">
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-success rounded-full"></span> On Track / Aligned</span>
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-warning rounded-full"></span> At Risk / Moderate Deviation</span>
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-danger rounded-full"></span> Critical / Severe Detachment</span>
      </div>
    </div>
  )
}
