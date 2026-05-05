import type { PracticeSession } from "../types/progress";

export interface SessionStats {
  streak: number;
  totalSessions: number;
  totalMinutes: number;
  sessionsThisWeek: number;
}

/** ISO date string → local midnight Date */
function parseDate(isoDate: string): Date {
  const d = new Date(isoDate + "T00:00:00");
  return d;
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function offsetDayStr(baseStr: string, days: number): string {
  const d = parseDate(baseStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Counts consecutive days with at least one session ending at today
 * (or yesterday if today has no session yet — so the streak isn't
 * broken on a day you haven't practiced yet).
 */
export function computeStreak(sessionDates: string[]): number {
  if (sessionDates.length === 0) return 0;

  const dateSet = new Set(sessionDates.map((d) => d.slice(0, 10)));
  const today = todayStr();
  const yesterday = offsetDayStr(today, -1);

  // Streak must start from today or yesterday
  const startDay = dateSet.has(today)
    ? today
    : dateSet.has(yesterday)
      ? yesterday
      : null;

  if (!startDay) return 0;

  let streak = 0;
  let cursor = startDay;
  while (dateSet.has(cursor)) {
    streak++;
    cursor = offsetDayStr(cursor, -1);
  }
  return streak;
}

export function countThisWeek(sessionDates: string[]): number {
  const cutoff = offsetDayStr(todayStr(), -6); // last 7 days inclusive
  return sessionDates.filter((d) => d.slice(0, 10) >= cutoff).length;
}

export function computeStats(sessions: Pick<PracticeSession, "date" | "durationMinutes">[]): SessionStats {
  return {
    streak: computeStreak(sessions.map((s) => s.date)),
    totalSessions: sessions.length,
    totalMinutes: sessions.reduce((sum, s) => sum + s.durationMinutes, 0),
    sessionsThisWeek: countThisWeek(sessions.map((s) => s.date)),
  };
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function formatSessionDate(isoDate: string): string {
  return parseDate(isoDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
