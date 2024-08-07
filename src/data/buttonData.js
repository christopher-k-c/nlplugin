import * as support from "../functionality/collector.js"

const arr = [
  { id: "0", name: "Start-Up", func: support.startUp, type: "batch"},
  { id: "1", name: "Build Layers", func: support.buildLayers, type: "batch"},
  { id: "2", name: "Notes Check", func: support.findNotes, type: "batch"},
  { id: "3", name: "Swatch Check", func: support.swatchCheck , type: "batch"},
  { id: "4", name: "Freq Sep", func: support.freqSep, type: "single"},
  { id: "5", name: "Start-Up-Batch", func: support.batchProcess, type: "batch"} 
];

export default arr