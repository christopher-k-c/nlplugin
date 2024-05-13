const { processRetouchNotes, runFunction2, runFunction3 } = require("/js/retouchNote/noteFunctions");
const { buildLayers } = require("/js/layerStructure/layerFunction");

function onButtonClick(action) {
    switch (action) {
        case "retouchNotes": 
            processRetouchNotes();
            break;
        case "layerFunc":
            buildLayers();
            break;
        default:
            console.error("Invalid action");
    }
}

module.exports = { onButtonClick };