"use server";

import { PrismaClient } from '@prisma/client';
import { auth } from '../../../../../auth';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function submitCheckIn(goalId: string, payload: { achievement: number, status: string, notes: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const goal = await prisma.goal.findUnique({ where: { id: goalId } });
  if (!goal) throw new Error("Goal not found");

  await prisma.checkIn.create({
    data: {
      goalId,
      userId: session.user.id,
      cycleId: goal.cycleId,
      quarter: "Q1", // Hardcoded for demo
      achievement: payload.achievement,
      status: payload.status,
      notes: payload.notes
    }
  });

  // Track an audit log for check-in
  await prisma.auditLog.create({
    data: {
      actorId: session.user.id,
      goalId,
      entity: "CheckIn",
      entityId: goalId,
      action: "UPDATE",
      newValue: JSON.stringify(payload)
    }
  });

  revalidatePath("/dashboard");
}
