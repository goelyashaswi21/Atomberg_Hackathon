import { auth } from "../../../../../auth";
import { PrismaClient } from "@prisma/client";
import { ApprovalPanel } from "@/components/goals/ApprovalPanel";

const prisma = new PrismaClient();

export default async function ApprovalsPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const pendingGoals = await prisma.goal.findMany({
    where: { 
      user: { managerId: session.user.id },
      status: "UNDER_REVIEW" 
    },
    include: {
      user: true
    }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500 py-4">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">Approval Inbox</h1>
        <p className="text-muted-foreground font-medium mt-1">Review, comment, and approve goal sheets submitted by your direct reports.</p>
      </div>

      <ApprovalPanel goals={pendingGoals} />
    </div>
  )
}
