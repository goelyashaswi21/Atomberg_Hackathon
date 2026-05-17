"use server";

import { PrismaClient } from '@prisma/client';
import { auth } from '../../../../../auth';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function approveGoal(goalId: string, comment: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.goal.update({
    where: { id: goalId },
    data: {
      status: "APPROVED",
      lockedAt: new Date(),
    }
  });

  await prisma.approvalLog.create({
    data: {
      goalId,
      actorId: session.user.id,
      action: "APPROVE",
      comment,
      snapshot: JSON.stringify({ status: "APPROVED" })
    }
  });

  revalidatePath("/dashboard");
}

export async function rejectGoal(goalId: string, comment: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.goal.update({
    where: { id: goalId },
    data: {
      status: "DRAFT", // Send back to draft/rework
    }
  });

  await prisma.approvalLog.create({
    data: {
      goalId,
      actorId: session.user.id,
      action: "REWORK",
      comment,
      snapshot: JSON.stringify({ status: "DRAFT" })
    }
  });

  revalidatePath("/dashboard");
}
