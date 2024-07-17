// ES6 import
import { app, core } from 'photoshop';
import resizeDocument from '../../common/resize';

async function buildLayers() {
    let result = await core.executeAsModal(async (executionContext, descriptor) => {

        
        try{

                // If more layers than just background cancel operation
                if(app.activeDocument.layers.length > 1){
                    return
                }
            
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
            let setAct = await app.activeDocument.layers[1]
            setAct.selected = true

            return true

        }catch(e){

        }

        
    }, { "commandName": "Layer Structure Modal" });

    return result
}

export default buildLayers;
