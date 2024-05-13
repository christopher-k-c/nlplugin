const app = require('photoshop').app;


 async function buildLayers(){
    // This should be at the top most level i.e. main.js
    await require('photoshop').core.executeAsModal(async (executionContext, descriptor) => {

    const activeDoc = app.activeDocument;
    const layers = activeDoc.layers;
    const backgroundLayer = layers[0];
    const duplicatedLayer = await backgroundLayer.duplicate();
    duplicatedLayer.name = "WORKING";
    await backgroundLayer.delete();
    const originalLayer = await duplicatedLayer.duplicate();
    originalLayer.name = "ORIGINAL";
    
}, { "commandName": "Layer Structure Modal" });
    
}


module.exports = { buildLayers };
