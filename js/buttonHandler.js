const { processRetouchNotes, runFunction2, runFunction3 } = require("/js/retouchNote/functions");

function onButtonClick(action) {
    switch (action) {
        case "retouchNotes": 
            processRetouchNotes();
            break;
        case "function2":
            runFunction2();
            break;
        case "function3":
            runFunction3();
            break;
        default:
            console.error("Invalid action");
    }
}

module.exports = { onButtonClick };