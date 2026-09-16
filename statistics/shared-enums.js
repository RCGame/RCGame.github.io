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
    })
  });
})(window);
