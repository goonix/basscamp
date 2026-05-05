import { describe, expect, it } from "vitest";
import {
  getNoteAtFret,
  getScalePitchClasses,
  getScaleIntervalName,
  getStringNotes,
  isRootNote,
  noteNameToSemitone,
  pitchClassToName,
  tuningToSemitones,
  SCALES,
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

describe("getScaleIntervalName", () => {
  const { intervals, intervalNames } = SCALES["major"]!;

  it("returns 'R' for the root note", () => {
    // G is root; G pitch class = 7
    expect(getScaleIntervalName("G", 7, intervals, intervalNames)).toBe("R");
  });

  it("returns correct interval names for major scale degrees", () => {
    // A major: A=9, B=11, C#=1, D=2, E=4, F#=6, G#=8
    const { intervals: maj, intervalNames: majNames } = SCALES["major"]!;
    expect(getScaleIntervalName("A", 11, maj, majNames)).toBe("2");   // B
    expect(getScaleIntervalName("A", 1,  maj, majNames)).toBe("3");   // C#
    expect(getScaleIntervalName("A", 4,  maj, majNames)).toBe("5");   // E
  });

  it("returns null for notes outside the scale", () => {
    // C# (pitch class 1) is not in G major (G=7, A=9, B=11, C=0, D=2, E=4, F#=6)
    expect(getScaleIntervalName("G", 1, intervals, intervalNames)).toBeNull();
  });

  it("returns correct names for minor pentatonic", () => {
    const { intervals: pent, intervalNames: pentNames } = SCALES["minor-pentatonic"]!;
    // E minor pentatonic: E=4, G=7, A=9, B=11, D=2
    expect(getScaleIntervalName("E", 4,  pent, pentNames)).toBe("R");
    expect(getScaleIntervalName("E", 7,  pent, pentNames)).toBe("b3");
    expect(getScaleIntervalName("E", 9,  pent, pentNames)).toBe("4");
    expect(getScaleIntervalName("E", 11, pent, pentNames)).toBe("5");
    expect(getScaleIntervalName("E", 2,  pent, pentNames)).toBe("b7");
  });
});
