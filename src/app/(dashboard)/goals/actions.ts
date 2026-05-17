"use server";

import { PrismaClient } from '@prisma/client';
import { auth } from '../../../../auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function createGoal(formData: any) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Fallback to finding or creating a dummy Cycle if one doesn't exist
  let cycle = await prisma.goalCycle.findFirst({ where: { isActive: true } });
  if (!cycle) {
    cycle = await prisma.goalCycle.create({
      data: {
        name: "FY 2026-27",
        year: 2026,
        goalSettingStart: new Date(),
        goalSettingEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        q1Start: new Date(),
        q1End: new Date(),
        q2Start: new Date(),
        q2End: new Date(),
        q3Start: new Date(),
        q3End: new Date(),
        q4Start: new Date(),
        q4End: new Date(),
        isActive: true,
      }
    });
  }

  await prisma.goal.create({
    data: {
      userId: session.user.id,
      cycleId: cycle.id,
      thrustArea: formData.thrustArea,
      title: formData.title,
      description: formData.description,
      uom: formData.uom,
      target: Number(formData.target),
      weightage: Number(formData.weightage),
      deadline: new Date(formData.deadline),
      kpiType: formData.kpiType,
      status: "UNDER_REVIEW", // Submitted by wizard directly for manager review
    }
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
