// ES6 import
import { app, core } from 'photoshop';

async function buildLayers() {
    await core.executeAsModal(async (executionContext, descriptor) => {
        const activeDoc = app.activeDocument;
        const layers = activeDoc.layers;
        const backgroundLayer = layers[0];
        const duplicatedLayer = await backgroundLayer.duplicate();
        duplicatedLayer.name = "WORKING";
        await backgroundLayer.delete();
        const originalLayer = await duplicatedLayer.duplicate();
        originalLayer.name = "ORIGINAL";
        originalLayer.visible = false;
        activeDoc.resizeImage(undefined, 2608, 300)
        activeDoc.resizeCanvas(2300, undefined)





        // console.log(originalLayer.visible)






    }, { "commandName": "Layer Structure Modal" });
}

export default buildLayers;
