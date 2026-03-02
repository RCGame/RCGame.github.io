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
})(window);
