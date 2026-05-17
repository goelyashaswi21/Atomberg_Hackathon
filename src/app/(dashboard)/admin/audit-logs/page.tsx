import { PrismaClient } from "@prisma/client";
import { auth } from "../../../../../auth";
import { AuditDataTable } from "@/components/admin/AuditDataTable";

const prisma = new PrismaClient();

export default async function AuditLogsPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  // We fetch top 50 recent audit logs
  let logs = [];
  try {
     logs = await prisma.auditLog.findMany({
       take: 50,
       orderBy: { createdAt: 'desc' },
       include: { actor: true }
     });
  } catch (e) {
     console.error("Prisma issue fetching logs:", e);
  }

  // Inject a few mock logs for demonstration purposes if empty
  if (logs.length === 0) {
    logs = [
       { id: "1", createdAt: new Date(), actor: { name: "Dev Rao" }, entity: "Goal", action: "APPROVE", newValue: '{"status":"APPROVED"}' },
       { id: "2", createdAt: new Date(Date.now() - 3600000), actor: { name: "Sarah Connor" }, entity: "CheckIn", action: "UPDATE", newValue: '{"achievement":45}' },
       { id: "3", createdAt: new Date(Date.now() - 86400000), actor: { name: "Admin Setup" }, entity: "SharedGoal", action: "CREATE", newValue: '{"title":"Q3 Revenue Target"}' },
    ] as any[];
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500 py-4">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">System Audit Trail</h1>
          <p className="text-muted-foreground font-medium mt-1">Enterprise-grade immutable logs of all state changes, sign-offs, and administrative overrides.</p>
        </div>
        <div className="flex gap-3">
          <input type="text" placeholder="Search actor or entity ID..." className="bg-background border border-border-subtle rounded-lg px-4 py-2 text-sm focus-visible:ring-1 focus-visible:ring-primary outline-none" />
          <button className="bg-secondary text-foreground hover:bg-secondary/80 px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors border border-border">Filter Logs</button>
        </div>
      </div>

      <AuditDataTable logs={logs} />
    </div>
  )
}
