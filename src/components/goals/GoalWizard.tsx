"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoalHealthMeter } from "./GoalHealthMeter";

const GoalSchema = z.object({
  thrustArea: z.enum(['REVENUE','OPERATIONS','PEOPLE','CUSTOMER','INNOVATION','QUALITY']),
  title: z.string().min(5).max(120),
  description: z.string().optional(),
  kpiType: z.enum(['QUANTITATIVE','QUALITATIVE','MILESTONE','PERCENTAGE']),
  uom: z.enum(['MIN','MAX','TIMELINE','ZERO']),
  target: z.number().positive(),
  weightage: z.number().min(10).max(100),
  deadline: z.string() // keeping string for simplicity
});

type GoalFormValues = z.infer<typeof GoalSchema>;

export function GoalWizard() {
  const [step, setStep] = useState(1);
  const [baseWeightage] = useState(60); // Mocking existing weightage sum
  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm<GoalFormValues>({
    resolver: zodResolver(GoalSchema),
    defaultValues: {
      thrustArea: 'REVENUE',
      title: '',
      description: '',
      kpiType: 'QUANTITATIVE',
      uom: 'MAX',
      target: 100,
      weightage: 40
    }
  });

  const weightage = watch("weightage") || 0;
  const currentTotal = baseWeightage + Number(weightage);

  const onSubmit = (data: GoalFormValues) => {
    console.log("Submitting goal:", data);
    alert("Goal Successfully Submitted!");
  };

  const nextStep = async () => {
    // Basic validation trigger before continuing
    const fieldsToValidate = step === 1 ? ["title", "thrustArea"] : step === 2 ? ["target", "deadline"] : [];
    const isStepValid = await trigger(fieldsToValidate as any);
    if(isStepValid) setStep(s => Math.min(s + 1, 4));
  };
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="max-w-2xl mx-auto bg-secondary/30 backdrop-blur-md border border-border-card rounded-2xl p-8 relative overflow-hidden shadow-xl">
      <div className="absolute top-0 left-0 h-1 bg-background w-full">
        <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${(step / 4) * 100}%` }}></div>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground">Create New Goal</h2>
        <span className="text-sm font-mono text-muted-foreground bg-background px-3 py-1 rounded-full border border-border shadow-sm">Step {step} of 4</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="min-h-[340px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
              <div>
                <Label className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold">Thrust Area</Label>
                <select {...register("thrustArea")} className="w-full mt-1.5 bg-background border border-border-subtle rounded-md p-2.5 text-sm text-foreground focus:ring-1 focus:ring-primary outline-none">
                  {['REVENUE','OPERATIONS','PEOPLE','CUSTOMER','INNOVATION','QUALITY'].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <Label className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold">Goal Title</Label>
                <Input {...register("title")} className="mt-1.5 bg-background border-border-subtle text-foreground focus-visible:ring-primary" placeholder="e.g. Increase Enterprise Sales by 50%" />
                {errors.title && <p className="text-destructive text-xs mt-1.5">{errors.title.message}</p>}
              </div>
              <div>
                <Label className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold">Description</Label>
                <textarea {...register("description")} className="w-full mt-1.5 bg-background border border-border-subtle rounded-md p-2 text-sm text-foreground focus:ring-1 focus:ring-primary outline-none h-20 resize-none" placeholder="Optional context..." />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
              <div>
                <Label className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold">KPI Type</Label>
                <div className="grid grid-cols-2 gap-3 mt-1.5">
                  {['QUANTITATIVE','QUALITATIVE','MILESTONE','PERCENTAGE'].map(kpi => (
                    <label key={kpi} className="flex items-center justify-between p-3 border border-border-subtle rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-background has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:shadow-[0_0_12px_rgba(143,209,79,0.1)]">
                      <span className="text-xs font-semibold">{kpi}</span>
                      <input type="radio" value={kpi} {...register("kpiType")} className="accent-primary w-4 h-4" />
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold">Unit of Measure (UoM)</Label>
                <select {...register("uom")} className="w-full mt-1.5 bg-background border border-border-subtle rounded-md p-2.5 text-sm text-foreground focus:ring-1 focus:ring-primary outline-none">
                  <option value="MAX">Maximize (Higher is better)</option>
                  <option value="MIN">Minimize (Lower is better)</option>
                  <option value="TIMELINE">Timeline / Project</option>
                  <option value="ZERO">Zero-based (Binary)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold">Target Value</Label>
                  <Input type="number" {...register("target", { valueAsNumber: true })} className="mt-1.5 bg-background border-border-subtle text-foreground focus-visible:ring-primary" placeholder="100" />
                </div>
                <div>
                  <Label className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold">Deadline Q2</Label>
                  <Input type="date" {...register("deadline")} className="mt-1.5 bg-background border-border-subtle text-foreground focus-visible:ring-primary [color-scheme:dark]" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
              <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">Goal Priority</h4>
                    <p className="text-xs text-muted-foreground">Allocate weightage carefully.</p>
                  </div>
                  <span className="text-primary font-mono font-bold text-3xl drop-shadow-[0_0_8px_rgba(143,209,79,0.3)]">{weightage}%</span>
                </div>
                <input type="range" min="10" max="60" step="5" {...register("weightage", { valueAsNumber: true })} className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary" />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-2 font-mono">
                  <span>10%</span>
                  <span>15%</span>
                  <span>...</span>
                  <span>60%</span>
                </div>
              </div>

              <GoalHealthMeter weightageSum={currentTotal} goalsCount={4} />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4 shadow-[0_0_24px_rgba(143,209,79,0.15)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground">Review & Submit</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Once submitted, this will be locked and sent to your manager.
                </p>
              </div>
              
              <div className="bg-background border border-border rounded-xl px-5 py-4 text-sm space-y-3">
                <div className="flex justify-between border-b border-border-subtle pb-2"><span className="text-muted-foreground">Title</span> <span className="font-medium text-right max-w-[200px] truncate">{watch("title") || "Untitled"}</span></div>
                <div className="flex justify-between border-b border-border-subtle pb-2"><span className="text-muted-foreground">Strategy</span> <span className="font-medium">{watch("thrustArea")}</span></div>
                <div className="flex justify-between border-b border-border-subtle pb-2"><span className="text-muted-foreground">Measurement</span> <span className="font-medium font-mono">{watch("target")} ({watch("uom")})</span></div>
                <div className="flex justify-between pt-1"><span className="text-muted-foreground">Impact</span> <span className="font-bold font-mono text-primary">{watch("weightage")}%</span></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          {step > 1 ? (
             <Button type="button" variant="outline" onClick={prevStep} className="bg-transparent border-muted-foreground/30 text-foreground hover:bg-muted font-semibold transition-all">Back</Button>
          ) : <div></div>}
          
          {step < 4 ? (
             <Button type="button" onClick={nextStep} className="bg-primary text-primary-foreground hover:bg-accent-bright font-bold px-8 shadow-[0_0_15px_var(--accent-glow)] transition-all">Next Step</Button>
          ) : (
             <Button type="submit" disabled={currentTotal !== 100} className="bg-primary text-primary-foreground hover:bg-accent-bright font-bold px-8 shadow-[0_0_15px_var(--accent-glow)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">Sign & Submit</Button>
          )}
        </div>
      </form>
    </div>
  )
}
