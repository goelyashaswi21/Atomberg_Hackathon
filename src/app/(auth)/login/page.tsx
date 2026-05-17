import { signIn } from "../../../../auth";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#060807]">
      {/* Single static ambient glow — no animation, no heavy blur stacking */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(143,209,79,0.06) 0%, transparent 70%)"
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="glass-strong rounded-3xl p-10 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-primary/40 flex items-center justify-center bg-primary/10">
                <div className="w-3 h-3 rounded-full bg-primary" style={{ boxShadow: "0 0 10px rgba(143,209,79,0.7)" }} />
              </div>
              <h1 className="text-3xl font-heading font-bold text-white tracking-tight">
                Atom<span className="text-gradient-premium">Goals</span> AI
              </h1>
            </div>
            <p className="text-white/35 text-xs font-mono tracking-[0.3em] uppercase">
              Precision · Performance · Intelligence
            </p>
          </div>

          <form className="space-y-5" action={
            async (formData) => {
              "use server";
              const data = Object.fromEntries(formData);
              await signIn("credentials", { ...data, redirectTo: "/dashboard" });
            }
          }>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/40 text-xs uppercase tracking-[0.2em] font-mono">Enterprise Email</Label>
              <Input id="email" name="email" type="text" placeholder="name@atomgoals.ai" className="bg-white/[0.03] border-white/[0.06] focus-visible:ring-primary/30 focus-visible:border-primary/30 text-white placeholder:text-white/25 rounded-xl h-12 transition-colors duration-200" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/40 text-xs uppercase tracking-[0.2em] font-mono">Access Key</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" className="bg-white/[0.03] border-white/[0.06] focus-visible:ring-primary/30 focus-visible:border-primary/30 text-white placeholder:text-white/25 rounded-xl h-12 transition-colors duration-200" />
            </div>

            <Button type="submit" className="w-full bg-primary text-[#0A0D0B] hover:bg-[#A8E063] font-bold py-6 mt-6 rounded-xl transition-colors duration-200 text-sm tracking-wide magnetic-btn">
              Initialize Session →
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.04]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#060807] px-4 text-[10px] text-white/15 tracking-[0.2em] font-mono uppercase">SSO Providers</span>
              </div>
            </div>

            <Button type="button" variant="outline" className="w-full bg-white/[0.02] border-white/[0.05] text-white/30 hover:bg-white/[0.04] hover:text-white/50 transition-colors duration-200 py-6 rounded-xl">
              <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2 opacity-40" fill="currentColor">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
              </svg>
              Continue with Microsoft Entra
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[9px] text-white/8 tracking-[0.15em] uppercase font-mono">
              © 2026 AtomGoals AI · AtomQuest Intelligence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
