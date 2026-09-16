(function exposeSharedEnums(global) {
  const LanguageRegionEnum = Object.freeze({
    1: "English",
    2: "Traditional Chinese",
    4: "Japanese",
    8: "Korean",
    16: "Simplified Chinese",
    32: "Spanish",
    64: "German",
    128: "Portuguese",
    256: "Dutch",
    512: "French",
    1024: "Italian",
    2048: "Russian"
  });

  const shared = global.SharedEnums || (global.SharedEnums = {});
  shared.LanguageRegionEnum = LanguageRegionEnum;
  // Backward-compatible alias for existing variable name typo in current scripts.
  shared.LangaugeRegionEnum = LanguageRegionEnum;
  Object.assign(shared, {
    AcrylicTouchableEnum: Object.freeze({
      0: "Bass Clef",
      1: "Treble Clef",
      2: "Mix Clef",
      3: "C Major",
      4: "G Major",
      5: "D Major",
      6: "A Major",
      7: "E Major",
      8: "B Major",
      9: "F# Major",
      10: "F Major",
      11: "Bb Major",
      12: "Eb Major",
      13: "Ab Major",
      14: "Db Major",
      15: "Gb Major",
      16: "Natural",
      17: "Double Sharp",
      18: "Double Flat",
      19: "Sharp Accidental",
      20: "Flat Accidental",
      21: "Single Note",
      22: "Double Note",
      23: "Triple Note",
      24: "C Clef",
      25: "Alto Clef",
      26: "Tenor Clef",
      27: "French Horn Notation New",
      28: "French Horn Notation Old",
      29: "Practice Mode: Pitch Only",
      30: "Practice Mode: Pitch & Rhythm"
    }),
    InstrumentEnum: Object.freeze({
      0: "Other",
      1: "Piano",
      2: "Violin",
      3: "Viola",
      4: "Cello",
      5: "Guitar",
      6: "Clarinet",
      7: "Piccolo",
      8: "French Horn",
      9: "Flute",
      10: "Double Bass",
      11: "Trumpet",
      12: "Harp",
      13: "Bass",
      14: "Oboe",
      15: "Bassoon",
      16: "Saxophone",
      17: "Trombone",
      18: "Tuba"
    }),
    PlatformEnum: Object.freeze({
      0: "iOS",
      1: "Android",
      2: "Windows"
    }),
    PracticeCategoriesEnum: Object.freeze({
      0: "FlashCard",
      1: "FullFlowSheetMusic",
      2: "RealSongs",
      3: "MusicTheory"
    }),
    PracticeModeEnum: Object.freeze({
      0: "PitchOnly",
      1: "Rhythm"
    }),
    MusicTheoryCategoryEnum: Object.freeze({
      0: "Scale",
      1: "Chord",
      2: "Rhythm",
      3: "Aural"
    }),
    AuralCategoryEnum: Object.freeze({
      0: "RhythmMetre",
      1: "MelodyMemory",
      2: "IntervalsPitch",
      3: "ChordsHarmony",
      4: "MusicalFeatures"
    }),
    ScaleModeEnum: Object.freeze({
      0: "Major",
      1: "Minor",
      2: "Chromatic"
    }),
    MinorScaleTypeEnum: Object.freeze({
      0: "Harmonic",
      1: "Melodic"
    }),
    ChordTypeEnum: Object.freeze({
      0: "MajorTriad",
      1: "MinorTriad",
      2: "MajorSeventh",
      3: "MinorSeventh",
      4: "DominantSeventh",
      5: "DiminishedSeventh"
    }),
    RhythmTypeSelectionEnum: Object.freeze({
      0: "NoteTypes",
      1: "TimeSignatures"
    }),
    RhythmNoteTypeEnum: Object.freeze({
      0: "Semibreve",
      1: "Minim",
      2: "Crotchet",
      3: "Quaver",
      4: "Semiquaver",
      5: "Rests",
      6: "DottedNotes",
      7: "Triplet"
    }),
    RhythmRestTypeEnum: Object.freeze({
      0: "Whole",
      1: "Half",
      2: "Quarter",
      3: "Eighth"
    }),
    DottedNoteTypeEnum: Object.freeze({
      0: "Half",
      1: "Quarter",
      2: "Eighth"
    }),
    RhythmTimeSignatureEnum: Object.freeze({
      0: "FourFour",
      1: "TwoFour",
      2: "ThreeFour",
      3: "SixFour",
      4: "ThreeEight",
      5: "SixEight",
      6: "NineEight",
      7: "TwelveEight"
    }),
    ToolsEnum: Object.freeze({
      0: "InstrumentTuner",
      1: "FullRangeTuner",
      2: "Metronome"
    }),
    ViolinTypeEnum: Object.freeze({
      0: "Traditional",
      1: "Suzuki"
    }),
    ClarinetTypeEnum: Object.freeze({
      0: "Bb",
      1: "A"
    }),
    FrenchHornTypeEnum: Object.freeze({
      0: "F",
      1: "Bb"
    }),
    TrumpetTypeEnum: Object.freeze({
      0: "C",
      1: "Bb"
    }),
    TromboneTypeEnum: Object.freeze({
      0: "Tenor",
      1: "Bass"
    }),
    SaxophoneTypeEnum: Object.freeze({
      0: "Alto",
      1: "Tenor",
      2: "Soprano",
      3: "Baritone"
    }),
    BookEnum: Object.freeze({
      0: "Book1",
      1: "Book2",
      2: "Book3",
      3: "Book4",
      4: "Book5",
      5: "Book6",
      6: "Book7",
      7: "Book8",
      8: "Book9",
      9: "Book10",
      10: "Book11"
    }),
    StaffSelectionEnum: Object.freeze({
      0: "BothHands",
      1: "LeftHand",
      2: "RightHand"
    }),
    SongOrganisationModeEnum: Object.freeze({
      0: "Albums",
      1: "Composers",
      2: "Grades"
    }),
    HintTypeEnum: Object.freeze({
      0: "Fingerboard",
      1: "Intonation"
    }),
    PitchPrecisionLevelEnum: Object.freeze({
      0: "Low",
      1: "Medium",
      2: "High"
    }),
  });
})(window);
