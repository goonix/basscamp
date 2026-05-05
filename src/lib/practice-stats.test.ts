import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  computeStreak,
  countThisWeek,
  computeStats,
  formatDuration,
} from "./practice-stats";

// Pin "today" to a fixed date so tests are deterministic
const FAKE_TODAY = "2026-05-05";

function daysAgo(n: number): string {
  const d = new Date(FAKE_TODAY + "T00:00:00");
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(FAKE_TODAY + "T12:00:00"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("computeStreak", () => {
  it("returns 0 for empty input", () => {
    expect(computeStreak([])).toBe(0);
  });

  it("returns 1 when only today has a session", () => {
    expect(computeStreak([FAKE_TODAY])).toBe(1);
  });

  it("returns 1 when only yesterday has a session", () => {
    expect(computeStreak([daysAgo(1)])).toBe(1);
  });

  it("returns 0 when most recent session was 2+ days ago", () => {
    expect(computeStreak([daysAgo(2)])).toBe(0);
  });

  it("counts a consecutive streak correctly", () => {
    const dates = [FAKE_TODAY, daysAgo(1), daysAgo(2), daysAgo(3)];
    expect(computeStreak(dates)).toBe(4);
  });

  it("stops at a gap in the streak", () => {
    // Today and yesterday, then a gap, then older sessions
    const dates = [FAKE_TODAY, daysAgo(1), daysAgo(4), daysAgo(5)];
    expect(computeStreak(dates)).toBe(2);
  });

  it("deduplicates multiple sessions on the same day", () => {
    const dates = [FAKE_TODAY, FAKE_TODAY, daysAgo(1), daysAgo(1)];
    expect(computeStreak(dates)).toBe(2);
  });
});

describe("countThisWeek", () => {
  it("counts sessions within the last 7 days", () => {
    const dates = [FAKE_TODAY, daysAgo(3), daysAgo(6), daysAgo(7)];
    expect(countThisWeek(dates)).toBe(3); // daysAgo(7) is outside the window
  });

  it("returns 0 when no recent sessions", () => {
    expect(countThisWeek([daysAgo(10)])).toBe(0);
  });
});

describe("formatDuration", () => {
  it("shows minutes only under an hour", () => {
    expect(formatDuration(45)).toBe("45m");
  });

  it("shows hours only when no remainder", () => {
    expect(formatDuration(120)).toBe("2h");
  });

  it("shows hours and minutes", () => {
    expect(formatDuration(75)).toBe("1h 15m");
  });
});

describe("computeStats", () => {
  it("computes all stats correctly", () => {
    const sessions = [
      { date: FAKE_TODAY, durationMinutes: 30 },
      { date: daysAgo(1), durationMinutes: 45 },
      { date: daysAgo(8), durationMinutes: 60 },
    ];
    const stats = computeStats(sessions);
    expect(stats.streak).toBe(2);
    expect(stats.totalSessions).toBe(3);
    expect(stats.totalMinutes).toBe(135);
    expect(stats.sessionsThisWeek).toBe(2);
  });
});
