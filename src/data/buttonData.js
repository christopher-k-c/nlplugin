import * as support from "../functionality/collector.js"

const arr = [
  { id: "0", name: "Start-Up", func: support.startUp, type: "batch"},
  { id: "1", name: "Build Layers", func: support.buildLayers, type: "batch"},
  { id: "2", name: "Notes Check", func: support.findNotes, type: "batch"},
  { id: "3", name: "Swatch Check", func: support.swatchCheck , type: "batch"},
  { id: "4", name: "Freq Sep", func: support.freqSep, type: "single"},
  { id: "5", name: "Start-Up-Batch", func: support.batchProcess, type: "batch"},
  { id: "6", name: "Sparkle/Glitter", func: support.importGlitter, type: "single"},
  { id: "7", name: "Upload", func: support.upload, type: "single"},
  // { id: "6", name: "Logs", func: null, type: "single"}
];

export default arr