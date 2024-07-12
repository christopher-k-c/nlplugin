// Importing alert function from functionality 
import testOne from "../functionality/alert/alertFunction.js"
import testTwo from "../functionality/buildLayers/layerStructure.js"
import testThree from "../functionality/noteCheck/noteCheck.js"
import testFour from "../functionality/swatchCheck/swatchCheck.js"



const arr = [
  { id: "0", name: "Alert", func: testOne},
  { id: "1", name: "Start-up", func: testTwo},
  { id: "2", name: "Notes Check", func: testThree},
  { id: "3", name: "Swatch Check", func: testFour },
  { id: "4", name: "Freq Sep", func: testOne},
  { id: "5", name: "MPK", func: testOne },
];

// exporting as default because theres only one function, for more than one export use export {}
export default arr