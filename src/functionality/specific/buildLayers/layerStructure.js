// ES6 import
import { app, core } from 'photoshop';
import resizeDocument from '../../common/resize';

async function buildLayers() {
    await core.executeAsModal(async (executionContext, descriptor) => {

        
try{
    const activeDoc = app.activeDocument;


    await resizeDocument(activeDoc) 


    const layers = activeDoc.layers;
    const backgroundLayer = layers[0];
    const duplicatedLayer = await backgroundLayer.duplicate();
    duplicatedLayer.name = "WORKING";
    await backgroundLayer.delete();
    const originalLayer = await duplicatedLayer.duplicate();
    originalLayer.name = "ORIGINAL";
    originalLayer.visible = false;
    originalLayer.selected = false;
    console.log("test")
    let setAct = await app.activeDocument.layers[1]
    console.log(setAct)
    setAct.selected = true

    // let actvLayer = await  app.activeDocument.activeLayers[setAct]
    // console.log(actvLayer)
    // actvLayer = setAct

}catch(e){

}
        
    }, { "commandName": "Layer Structure Modal" });
}

export default buildLayers;
