import { ReactNode } from "react";
import { auth } from "../../../auth";
import { ScrollSpySidebar } from "@/components/layout/ScrollSpySidebar";

const allNavItems = [
  { name: "Dashboard", icon: "🏠", id: "section-dashboard", roles: ["EMPLOYEE", "MANAGER", "ADMIN"] },
  { name: "Create Goal", icon: "🎯", id: "section-goals-create", roles: ["EMPLOYEE", "MANAGER", "ADMIN"] },
  { name: "Check-ins", icon: "✅", id: "section-checkins", roles: ["EMPLOYEE", "MANAGER", "ADMIN"] },
  { name: "Approvals", icon: "👥", id: "section-approvals", roles: ["MANAGER", "ADMIN"] },
  { name: "Shared Goals", icon: "🔗", id: "section-shared-goals", roles: ["MANAGER", "ADMIN"] },
  { name: "Analytics", icon: "📊", id: "section-admin", roles: ["ADMIN"] },
  { name: "Goal DNA", icon: "🧬", id: "section-goal-dna", roles: ["MANAGER", "ADMIN"] },
];

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  const role = session?.user?.image || "EMPLOYEE";
  const filteredNav = allNavItems.filter(item => item.roles.includes(role));

  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0D0B]">
      <ScrollSpySidebar
        items={filteredNav}
        userName={session?.user?.name || "User"}
        userRole={role}
      />

      {/* Main scrollable pane */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Static ambient */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "rgba(143,209,79,0.02)", filter: "blur(150px)" }} />

        {/* Topbar */}
        <header className="h-14 flex-shrink-0 border-b border-white/[0.03] flex items-center justify-between px-8 z-10 bg-[#0A0D0B]/80">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.25em]">Live System</span>
          </div>
          <button className="relative p-2 text-white/20 hover:text-white/50 transition-colors rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          </button>
        </header>

        {/* Content — single scroll container */}
        <main className="flex-1 overflow-auto scroll-smooth">
          <div className="max-w-7xl mx-auto px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
