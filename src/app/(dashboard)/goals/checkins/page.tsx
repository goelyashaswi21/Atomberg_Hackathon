import { auth } from "../../../../../auth";
import { PrismaClient } from "@prisma/client";
import { CheckInModule } from "@/components/goals/CheckInModule";

const prisma = new PrismaClient();

export default async function CheckInsPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { goals: true }
  });

  if (!user || user.goals.length === 0) {
    return (
      <div className="py-20 text-center animate-in fade-in duration-500">
        <h2 className="text-2xl font-heading font-bold text-foreground">No Goals Found</h2>
        <p className="text-muted-foreground mt-2">You do not have any active goals for check-in.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500 py-4">
      <div className="bg-warning/10 border border-warning/30 p-5 rounded-xl flex items-center justify-between mb-8 shadow-sm">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-warning flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-warning animate-pulse"></span>
            Q1 Check-in Window Open
          </span>
          <p className="text-sm text-foreground/80 mt-1.5 font-medium">Please submit your updates. Form closes in 14 days.</p>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">Active Check-ins</h1>
        <p className="text-muted-foreground font-medium mt-1">Update your progress for Q1 against your defined targets.</p>
      </div>

      <div className="space-y-6">
        {user.goals.map(goal => (
          <CheckInModule key={goal.id} goal={typeof goal === 'object' ? goal : {}} />
        ))}
      </div>
    </div>
  )
}
