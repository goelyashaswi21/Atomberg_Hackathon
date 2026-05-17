export type UoM = 'MIN' | 'MAX' | 'TIMELINE' | 'ZERO';

export function calculateProgress(
  uom: UoM,
  target: number,
  achievement: number,
  baselineDate?: Date,
  deadlineDate?: Date
): number {
  const safeDiv = (a: number, b: number) => (b === 0 ? 0 : a / b);

  switch (uom) {
    case 'MAX':
      // Higher achievement = better. Capped at 100%.
      return Math.min(safeDiv(achievement, target) * 100, 100);

    case 'MIN':
      // Lower achievement = better. Progress = how close to target from baseline.
      // If achievement <= target, 100%. Else inversely scored.
      if (achievement <= target) return 100;
      return Math.max(0, (1 - safeDiv(achievement - target, target)) * 100);

    case 'TIMELINE':
      // % of timeline elapsed vs % task completed
      if (!baselineDate || !deadlineDate) return 0;
      const totalDays = (deadlineDate.getTime() - baselineDate.getTime()) / 86400000;
      const elapsed = (Date.now() - baselineDate.getTime()) / 86400000;
      const timeProgress = Math.min(safeDiv(elapsed, totalDays), 1) * 100;
      // achievement is % task done. Compare to time consumed.
      return achievement; // task % directly, but surface time gap as risk

    case 'ZERO':
      // Binary — either 0 or 100
      return achievement >= target ? 100 : 0;

    default:
      return 0;
  }
}

export function getProgressColor(progress: number): string {
  if (progress >= 85) return '#8FD14F';  // On track — green
  if (progress >= 60) return '#E8A838';  // At risk — amber
  return '#E05252';                       // Critical — red
}

export function getRiskLabel(progress: number, daysLeft: number): string {
  if (daysLeft < 7 && progress < 80) return 'CRITICAL';
  if (progress < 50) return 'AT_RISK';
  if (progress < 80) return 'MONITOR';
  return 'ON_TRACK';
}
