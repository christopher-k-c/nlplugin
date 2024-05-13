
const { onButtonClick } = require("/js/buttonHandler");

// Retouch Notes Event Listener 
document.getElementById("btnPopulate").addEventListener("click", () => {
    onButtonClick("retouchNotes");
});

// Swatch Image Event Listener 
document.getElementById("layerButton").addEventListener("click", () => {
    onButtonClick("layerFunc");
});

// // Layer Structure Event Listener 
// document.getElementById("btnPopulate3").addEventListener("click", () => {
//     onButtonClick("function3");
// });
