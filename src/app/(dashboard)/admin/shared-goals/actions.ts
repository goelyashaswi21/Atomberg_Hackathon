"use server";

import { PrismaClient } from '@prisma/client';
import { auth } from '../../../../../auth';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function pushSharedGoal(data: any) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // Fallback to active cycle
  let cycle = await prisma.goalCycle.findFirst({ where: { isActive: true } });
  if (!cycle) {
    cycle = await prisma.goalCycle.findFirst();
  }

  // Create Shared Goal
  const shared = await prisma.sharedGoal.create({
    data: {
      title: data.title,
      target: Number(data.target),
      uom: data.uom,
      kpiType: data.kpiType,
      thrustArea: data.thrustArea,
      createdBy: session.user.id,
      departmentId: null, // Hardcoded global for demonstration
    }
  });

  // Fetch users to propagate to (all non-admin/manager users for demonstration, or all employees)
  const users = await prisma.user.findMany({ where: { role: "EMPLOYEE" } });

  // Create derived goals
  if (users.length > 0 && cycle) {
    await prisma.goal.createMany({
      data: users.map(u => ({
        userId: u.id,
        cycleId: cycle!.id,
        thrustArea: shared.thrustArea,
        title: shared.title,
        description: "Shared Department Priority",
        uom: shared.uom,
        target: shared.target,
        weightage: 0, // Employee MUST set weightage for shared goals later
        deadline: new Date(),
        kpiType: shared.kpiType,
        status: "DRAFT",
        isShared: true,
        sharedGoalId: shared.id,
      }))
    });
  }

  revalidatePath("/dashboard");
  return users.length;
}
