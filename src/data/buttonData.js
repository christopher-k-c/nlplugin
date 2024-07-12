// // Importing alert function from functionality 
import testOne from "../functionality/specific/alert/alertFunction.js"
import testTwo from "../functionality/specific/buildLayers/layerStructure.js"
import testThree from "../functionality/specific/noteCheck/noteCheck.js"
import testFour from "../functionality/specific/swatchCheck/swatchCheck.js"
import testFunction from "../functionality/common/testFunc.js"


// import * as support from "../functionality/collector.js"


const arr = [
  { id: "0", name: "Alert", func: testOne},
  { id: "1", name: "Start-up", func: testTwo},
  { id: "2", name: "Notes Check", func: testThree},
  { id: "3", name: "Swatch Check", func: testFour },
  { id: "4", name: "Freq Sep", func: testOne},
  { id: "5", name: "MPK", func: testOne},
  { id: "6", name: "Test", func: testFunction},
];

// exporting as default because theres only one function, for more than one export use export {}
export default arr