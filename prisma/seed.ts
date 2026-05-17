import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing old data...')
  await prisma.notification.deleteMany()
  await prisma.auditLog.deleteMany()
  await prisma.approvalLog.deleteMany()
  await prisma.checkIn.deleteMany()
  await prisma.goal.deleteMany()
  await prisma.sharedGoal.deleteMany()
  await prisma.departmentKPI.deleteMany()
  await prisma.user.deleteMany()
  await prisma.department.deleteMany()
  await prisma.goalCycle.deleteMany()

  console.log('Seeding Database...')

  // password is 'password123'
  const passwordHash = bcrypt.hashSync('password123', 10);

  // Departments
  const hrDept = await prisma.department.create({ data: { name: "HR", code: "HR01" }});
  const revDept = await prisma.department.create({ data: { name: "Revenue", code: "REV01" }});
  const opDept = await prisma.department.create({ data: { name: "Operations", code: "OPS01" }});

  // Cycle
  const now = new Date();
  const nextYear = new Date(); nextYear.setFullYear(now.getFullYear() + 1);
  const cycle = await prisma.goalCycle.create({
    data: {
      name: "FY 2025-26",
      year: 2025,
      goalSettingStart: now,
      goalSettingEnd: new Date(now.getTime() + 14 * 86400000),
      q1Start: new Date(now.getTime() + 30 * 86400000),
      q1End: new Date(now.getTime() + 120 * 86400000),
      q2Start: new Date(now.getTime() + 121 * 86400000),
      q2End: new Date(now.getTime() + 210 * 86400000),
      q3Start: new Date(now.getTime() + 211 * 86400000),
      q3End: new Date(now.getTime() + 300 * 86400000),
      q4Start: new Date(now.getTime() + 301 * 86400000),
      q4End: new Date(now.getTime() + 365 * 86400000),
      isActive: true
    }
  });

  // Users
  const admin = await prisma.user.create({
    data: { name: "Yashaswi Goel", employeeId: "EMP001", email: "yashaswi@atomgoals.ai", passwordHash, role: "ADMIN", departmentId: hrDept.id }
  });
  
  const mgr1 = await prisma.user.create({
    data: { name: "Rahul Mehta", employeeId: "EMP002", email: "rahul@atomgoals.ai", passwordHash, role: "MANAGER", departmentId: revDept.id }
  });

  const mgr2 = await prisma.user.create({
    data: { name: "Priya Sharma", employeeId: "EMP003", email: "priya@atomgoals.ai", passwordHash, role: "MANAGER", departmentId: opDept.id }
  });

  const emp1 = await prisma.user.create({
    data: { name: "Ankit Joshi", employeeId: "EMP004", email: "ankit@atomgoals.ai", passwordHash, role: "EMPLOYEE", departmentId: revDept.id, managerId: mgr1.id }
  });

  const emp2 = await prisma.user.create({
    data: { name: "Sara Nair", employeeId: "EMP005", email: "sara@atomgoals.ai", passwordHash, role: "EMPLOYEE", departmentId: revDept.id, managerId: mgr1.id }
  });

  const emp3 = await prisma.user.create({
    data: { name: "Dev Rao", employeeId: "EMP006", email: "dev@atomgoals.ai", passwordHash, role: "EMPLOYEE", departmentId: opDept.id, managerId: mgr2.id }
  });

  const emp4 = await prisma.user.create({
    data: { name: "Meera Iyer", employeeId: "EMP007", email: "meera@atomgoals.ai", passwordHash, role: "EMPLOYEE", departmentId: opDept.id, managerId: mgr2.id }
  });

  const emp5 = await prisma.user.create({
    data: { name: "Kabir Singh", employeeId: "EMP008", email: "kabir@atomgoals.ai", passwordHash, role: "EMPLOYEE", departmentId: revDept.id, managerId: mgr1.id }
  });

  const emp6 = await prisma.user.create({
    data: { name: "Riya Desai", employeeId: "EMP009", email: "riya@atomgoals.ai", passwordHash, role: "EMPLOYEE", departmentId: opDept.id, managerId: mgr2.id }
  });

  console.log('Seeding Goals...')
  
  // Create goals for employees
  const goal1 = await prisma.goal.create({
    data: {
      userId: emp1.id, cycleId: cycle.id,
      title: "Increase Enterprise Sales",
      thrustArea: "REVENUE",
      uom: "MAX", target: 50, weightage: 60,
      deadline: new Date(now.getTime() + 100 * 86400000),
      kpiType: "QUANTITATIVE",
      status: "APPROVED"
    }
  });

  const goal2 = await prisma.goal.create({
    data: {
      userId: emp1.id, cycleId: cycle.id,
      title: "Upsell to 20 Existing Accounts",
      thrustArea: "REVENUE",
      uom: "MAX", target: 20, weightage: 40,
      deadline: new Date(now.getTime() + 120 * 86400000),
      kpiType: "QUANTITATIVE",
      status: "APPROVED"
    }
  });
  
  const emp2GoalUnderReview = await prisma.goal.create({
    data: {
      userId: emp2.id, cycleId: cycle.id,
      title: "Q2 Expansion Target",
      thrustArea: "REVENUE",
      uom: "MAX", target: 15, weightage: 100,
      deadline: new Date(now.getTime() + 100 * 86400000),
      kpiType: "QUANTITATIVE",
      status: "UNDER_REVIEW"
    }
  });

  const emp3GoalRework = await prisma.goal.create({
    data: {
      userId: emp3.id, cycleId: cycle.id,
      title: "Launch Internal Tool V2",
      thrustArea: "OPERATIONS",
      uom: "TIMELINE", target: 100, weightage: 100,
      deadline: new Date(now.getTime() + 80 * 86400000),
      kpiType: "QUANTITATIVE",
      status: "REWORK"
    }
  });

  // Seed Checkins
  await prisma.checkIn.create({
    data: {
      goalId: goal1.id, userId: emp1.id, cycleId: cycle.id, quarter: "Q1", achievement: 20, status: "ON_TRACK", managerComment: "Good start!"
    }
  });
  
  await prisma.checkIn.create({
    data: {
      goalId: goal2.id, userId: emp1.id, cycleId: cycle.id, quarter: "Q1", achievement: 5, status: "AT_RISK", managerComment: "Need more push here."
    }
  });

  console.log('Seed completed successfully.')
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); })
