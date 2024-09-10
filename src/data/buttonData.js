import * as support from "../functionality/collector.js"

const arr = [
  { id: "0", name: "Start-Up", func: support.startUp, type: "single"},
  { id: "1", name: "Build Layers", func: support.buildLayers, type: "single"},
  { id: "2", name: "Notes Check", func: support.findNotes, type: "single"},
  { id: "3", name: "Swatch Check", func: support.swatchCheck , type: "single"},
  { id: "4", name: "Freq-Sep", func: support.freqSep, type: "single"},
  { id: "5", name: "Sparkle-Glitter", func: support.importGlitter, type: "single"},
  { id: "6", name: "Upload", func: support.upload, type: "single"},
  { id: "7", name: "Batch-Upload-Folder", func: support.batchUpload, type: "batch"},
  { id: "8", name: "Batch-Upload-Files", func: support.batchUploadSpecific, type: "batch"},
  { id: "9", name: "Batch-Start-Up", func: support.batchStartUp, type: "batch"}
];

export default arr