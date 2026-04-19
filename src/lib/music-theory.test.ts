import { describe, expect, it } from "vitest";
import {
  getNoteAtFret,
  getScalePitchClasses,
  getStringNotes,
  isRootNote,
  noteNameToSemitone,
  pitchClassToName,
  tuningToSemitones,
} from "./music-theory";

describe("pitchClassToName", () => {
  it("returns correct note names for all pitch classes", () => {
    expect(pitchClassToName(0)).toBe("C");
    expect(pitchClassToName(4)).toBe("E");
    expect(pitchClassToName(9)).toBe("A");
    expect(pitchClassToName(11)).toBe("B");
  });

  it("wraps around correctly", () => {
    expect(pitchClassToName(12)).toBe("C");
    expect(pitchClassToName(13)).toBe("C#");
  });
});

describe("noteNameToSemitone", () => {
  it("returns correct semitone for note names", () => {
    expect(noteNameToSemitone("C")).toBe(0);
    expect(noteNameToSemitone("E")).toBe(4);
    expect(noteNameToSemitone("A")).toBe(9);
    expect(noteNameToSemitone("G")).toBe(7);
  });

  it("throws for unknown note names", () => {
    expect(() => noteNameToSemitone("H")).toThrow();
  });
});

describe("getNoteAtFret", () => {
  // Standard bass tuning: E A D G (low to high)
  it("returns open string note at fret 0", () => {
    expect(getNoteAtFret("E", 0)).toBe("E");
    expect(getNoteAtFret("A", 0)).toBe("A");
    expect(getNoteAtFret("D", 0)).toBe("D");
    expect(getNoteAtFret("G", 0)).toBe("G");
  });

  it("E string: fret 5 = A", () => {
    expect(getNoteAtFret("E", 5)).toBe("A");
  });

  it("E string: fret 7 = B", () => {
    expect(getNoteAtFret("E", 7)).toBe("B");
  });

  it("E string: fret 12 = E (octave)", () => {
    expect(getNoteAtFret("E", 12)).toBe("E");
  });

  it("A string: fret 2 = B", () => {
    expect(getNoteAtFret("A", 2)).toBe("B");
  });

  it("A string: fret 5 = D", () => {
    expect(getNoteAtFret("A", 5)).toBe("D");
  });

  it("D string: fret 5 = G", () => {
    expect(getNoteAtFret("D", 5)).toBe("G");
  });

  it("D string: fret 7 = A", () => {
    expect(getNoteAtFret("D", 7)).toBe("A");
  });

  it("G string: fret 2 = A", () => {
    expect(getNoteAtFret("G", 2)).toBe("A");
  });
});

describe("getScalePitchClasses", () => {
  it("returns correct pitch classes for G major", () => {
    // G major: G A B C D E F# (semitones: 7,9,11,0,2,4,6)
    const result = getScalePitchClasses("G", [0, 2, 4, 5, 7, 9, 11]);
    expect(result).toContain(7);  // G
    expect(result).toContain(9);  // A
    expect(result).toContain(11); // B
    expect(result).toContain(0);  // C
    expect(result).toContain(2);  // D
    expect(result).toContain(4);  // E
    expect(result).toContain(6);  // F#
    expect(result.size).toBe(7);
  });

  it("returns correct pitch classes for A minor pentatonic", () => {
    // A minor pentatonic: A C D E G (semitones: 9,0,2,4,7)
    const result = getScalePitchClasses("A", [0, 3, 5, 7, 10]);
    expect(result).toContain(9); // A
    expect(result).toContain(0); // C
    expect(result).toContain(2); // D
    expect(result).toContain(4); // E
    expect(result).toContain(7); // G
    expect(result.size).toBe(5);
  });
});

describe("isRootNote", () => {
  it("returns true when pitch class matches root", () => {
    expect(isRootNote("G", 7)).toBe(true);
    expect(isRootNote("A", 9)).toBe(true);
  });

  it("returns false when pitch class does not match root", () => {
    expect(isRootNote("G", 9)).toBe(false);
  });
});

describe("tuningToSemitones", () => {
  it("converts standard bass tuning to semitones", () => {
    expect(tuningToSemitones(["E", "A", "D", "G"])).toEqual([4, 9, 2, 7]);
  });
});

describe("getStringNotes", () => {
  it("returns correct notes for E string through 5 frets", () => {
    const notes = getStringNotes("E", 5);
    expect(notes).toEqual(["E", "F", "F#", "G", "G#", "A"]);
  });

  it("returns correct notes for A string through 5 frets", () => {
    const notes = getStringNotes("A", 5);
    expect(notes).toEqual(["A", "A#", "B", "C", "C#", "D"]);
  });
});
