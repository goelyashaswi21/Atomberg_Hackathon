import { auth } from "../../../../auth";
import { PrismaClient } from "@prisma/client";
import { ProgressRing } from "@/components/goals/ProgressRing";
import { PulseCard } from "@/components/pulse/PulseCard";
import { GoalWizard } from "@/components/goals/GoalWizard";
import { CheckInModule } from "@/components/goals/CheckInModule";
import { ApprovalPanel } from "@/components/goals/ApprovalPanel";
import { format, differenceInDays } from "date-fns";
import { calculateProgress } from "@/lib/progress";
import AdminSection from "./sections/AdminSection";
import SharedGoalsSection from "./sections/SharedGoalsSection";
import GoalDNASection from "./sections/GoalDNASection";

const prisma = new PrismaClient();

export default async function UnifiedDashboard() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { goals: { include: { checkIns: true } } }
  });
  if (!user) return null;

  const role = session?.user?.image || "EMPLOYEE";
  const activeGoals = user.goals.length;
  const weightageSum = user.goals.reduce((acc, g) => acc + g.weightage, 0);

  let totalProgress = 0;
  user.goals.forEach(g => {
    const latestCheckIn = g.checkIns.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
    const achievement = latestCheckIn ? latestCheckIn.achievement : 0;
    totalProgress += calculateProgress(g.uom as any, g.target, achievement);
  });
  const avgProgress = activeGoals > 0 ? (totalProgress / activeGoals) : 0;

  const nextDeadlineGoal = user.goals.filter(g => g.deadline > new Date()).sort((a, b) => a.deadline.getTime() - b.deadline.getTime())[0];
  const daysToDeadline = nextDeadlineGoal ? differenceInDays(nextDeadlineGoal.deadline, new Date()) : 0;

  // Data for approvals
  const pendingGoals = await prisma.goal.findMany({
    where: { user: { managerId: session.user.id }, status: "UNDER_REVIEW" },
    include: { user: true }
  });

  const stats = [
    { label: "Goals Active", value: String(activeGoals), accent: "from-primary/20 to-primary/5" },
    { label: "Avg Progress", value: `${Math.round(avgProgress)}%`, accent: "from-blue-500/20 to-blue-500/5" },
    { label: "Pending Reviews", value: "0", accent: "from-purple-500/20 to-purple-500/5" },
    { label: "Next Deadline", value: nextDeadlineGoal ? `${daysToDeadline}d` : "—", accent: "from-amber-500/20 to-amber-500/5" },
    { label: "Weightage", value: weightageSum === 100 ? "100%" : `${weightageSum}%`, accent: weightageSum === 100 ? "from-primary/20 to-primary/5" : "from-red-500/20 to-red-500/5" }
  ];

  return (
    <div className="space-y-0">

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  SECTION 1: DASHBOARD OVERVIEW                        */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="section-dashboard" className="scroll-mt-20 pb-16">
        <div className="relative mb-8">
          <h1 className="text-4xl font-heading font-bold tracking-tight text-white flex items-center gap-3">
            Welcome back, {user.name.split(' ')[0]}
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary" style={{ boxShadow: "0 0 10px rgba(143,209,79,0.6)" }} />
          </h1>
          <p className="text-white/40 mt-2 tracking-[0.15em] text-xs uppercase font-mono">Goal Cycle: FY 2025-26 · Q1 Active</p>
        </div>

        <div className="grid grid-cols-5 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden group card-3d">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mb-2 relative z-10">{stat.label}</span>
              <span className="font-mono text-3xl font-black text-white relative z-10">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-3 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-xl text-white">Goal Progress</h3>
              <span className="text-xs font-mono text-white/30 uppercase tracking-[0.3em]">{activeGoals} Active</span>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {user.goals.map(g => {
                const latestCheckIn = g.checkIns.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
                const achievement = latestCheckIn ? latestCheckIn.achievement : 0;
                const progress = calculateProgress(g.uom as any, g.target, achievement);
                return (
                  <div key={g.id} className="glass rounded-2xl p-1 card-3d">
                    <ProgressRing
                      title={g.title} thrustArea={g.thrustArea}
                      deadline={format(g.deadline, 'MMM dd, yyyy')}
                      progress={progress} status={latestCheckIn?.status || g.status}
                    />
                  </div>
                );
              })}
              {user.goals.length === 0 && (
                <div className="col-span-3 text-center py-16 glass rounded-3xl border border-dashed border-white/[0.06]">
                  <p className="text-white/25 text-sm">No active goals found.</p>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-1 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
              <h3 className="font-heading font-semibold text-lg text-white/90">AQ Pulse</h3>
            </div>
            <div className="space-y-4">
              {weightageSum !== 100 && (
                <PulseCard insight={{ id: "1", category: "ACTION_NEEDED", severity: "WARNING", headline: "Weightage Imbalance", body: `Goal weightage sums to ${weightageSum}%. Must be 100%.`, generatedAt: new Date(), cta: { label: "Adjust", href: "#section-goals-create" } }} />
              )}
              <PulseCard insight={{ id: "2", category: "EXCELLENCE", severity: "INFO", headline: "Top Performer", body: "Q1 progress tracking 12% above dept avg.", generatedAt: new Date() }} />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  SECTION 2: GOAL CREATION WIZARD                      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="section-goals-create" className="scroll-mt-20 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-heading font-bold text-white tracking-tight">Goal Blueprint</h2>
            <p className="text-white/30 font-medium mt-1 text-sm">Design your strategic contribution using the guided wizard.</p>
          </div>
          <GoalWizard />
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  SECTION 3: CHECK-INS                                 */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="section-checkins" className="scroll-mt-20 py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="glass rounded-xl p-4 flex items-center gap-3 mb-6 border border-amber-500/10">
            <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono">Q1 Check-in Window Open</span>
              <p className="text-xs text-white/40 mt-0.5">Submit updates. Window closes in 14 days.</p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-3xl font-heading font-bold text-white tracking-tight">Active Check-ins</h2>
            <p className="text-white/30 font-medium mt-1 text-sm">Update Q1 progress against defined targets.</p>
          </div>
          <div className="space-y-6">
            {user.goals.length > 0 ? user.goals.map(goal => (
              <CheckInModule key={goal.id} goal={typeof goal === 'object' ? goal : {}} />
            )) : (
              <div className="py-16 text-center glass rounded-2xl">
                <p className="text-white/25 text-sm">No goals found for check-in.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Conditionally render manager/admin sections */}
      {(role === "MANAGER" || role === "ADMIN") && (
        <>
          <SectionDivider />

          {/* ═══════════════════════════════════════════════════════ */}
          {/*  SECTION 4: APPROVALS                                 */}
          {/* ═══════════════════════════════════════════════════════ */}
          <section id="section-approvals" className="scroll-mt-20 py-16">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-heading font-bold text-white tracking-tight">Approval Inbox</h2>
                <p className="text-white/30 font-medium mt-1 text-sm">Review and approve goal sheets from direct reports.</p>
              </div>
              <ApprovalPanel goals={pendingGoals} />
            </div>
          </section>

          <SectionDivider />

          {/* ═══════════════════════════════════════════════════════ */}
          {/*  SECTION 5: SHARED GOALS                              */}
          {/* ═══════════════════════════════════════════════════════ */}
          <section id="section-shared-goals" className="scroll-mt-20 py-16">
            <SharedGoalsSection />
          </section>
        </>
      )}

      {role === "ADMIN" && (
        <>
          <SectionDivider />

          {/* ═══════════════════════════════════════════════════════ */}
          {/*  SECTION 6: ADMIN ANALYTICS                           */}
          {/* ═══════════════════════════════════════════════════════ */}
          <section id="section-admin" className="scroll-mt-20 py-16">
            <AdminSection />
          </section>
        </>
      )}

      {(role === "MANAGER" || role === "ADMIN") && (
        <>
          <SectionDivider />

          {/* ═══════════════════════════════════════════════════════ */}
          {/*  SECTION 7: GOAL DNA                                  */}
          {/* ═══════════════════════════════════════════════════════ */}
          <section id="section-goal-dna" className="scroll-mt-20 py-16">
            <GoalDNASection />
          </section>
        </>
      )}

      {/* Footer spacer so last section can scroll to top */}
      <div className="h-[40vh]" />
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="relative py-4">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}
