import { GoalWizard } from "@/components/goals/GoalWizard";

export default function CreateGoalPage() {
  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500 py-4">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">Goal Blueprint</h1>
        <p className="text-muted-foreground font-medium mt-1">Design your strategic contribution using the guided wizard.</p>
      </div>
      <GoalWizard />
    </div>
  )
}
