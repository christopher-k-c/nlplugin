// // Importing alert function from functionality 
import testOne from "../functionality/specific/alert/alertFunction.js"
import testTwo from "../functionality/specific/buildLayers/layerStructure.js"
import testThree from "../functionality/specific/noteCheck/noteCheck.js"
import testFour from "../functionality/specific/swatchCheck/swatchCheck.js"
// import testFunction from "../functionality/common/testFunc.js"
import startUp from "../functionality/specific/startUp/startUp.js"
import batchProcess from "../functionality/common/batch.js"
import freqSep from "../functionality/specific/freqSep/freqSep.js"


// import * as support from "../functionality/collector.js"


const arr = [
  { id: "0", name: "Start-Up", func: startUp, type: "batch"},
  { id: "1", name: "Build Layers", func: testTwo, type: "batch"},
  { id: "2", name: "Notes Check", func: testThree, type: "batch"},
  { id: "3", name: "Swatch Check", func: testFour , type: "batch"},
  { id: "4", name: "Freq Sep", func: freqSep, type: "single"},
  { id: "5", name: "MPK", func: testOne, type: "single"},
  { id: "6", name: "Start-Up-Batch", func: batchProcess, type: "batch"} 
  // { id: "6", name: "Test", func: testFunction},
  // { id: "7", name: "Test", func: testFunction},
];

// exporting as default because theres only one function, for more than one export use export {}
export default arr