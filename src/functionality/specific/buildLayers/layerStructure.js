import { app, core, action } from 'photoshop';
import * as support from "../../collector"






async function convertProfile() {
    
    try{
    await action.batchPlay(
      [
         {
            _obj: "convertToProfile",
            _target: [
               {
                  _ref: "document",
                  _enum: "ordinal",
                  _value: "targetEnum"
               }
            ],
            to: "sRGB IEC61966-2.1",
            intent: {
               _enum: "intent",
               _value: "colorimetric"
            },
            mapBlack: true,
            dither: true,
            flatten: false,
            rasterizePlaced: false,
            shadowMode: -1,
            _options: {
               dialogOptions: "dontDisplay"
            }
         }
      ],
      {}
   );
}
catch (e){
console.log(e)    
}
}


async function buildLayers() {
    let result = await core.executeAsModal(async (executionContext, descriptor) => {

        
        try{



            

            // If more layers than just background cancel operation
            if(app.activeDocument.layers.length > 1){
                return false
            }
            
            const activeDoc = app.activeDocument;


            await support.resizeDocument(activeDoc) 
            await convertProfile()

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

        
    }, { "commandName": "Build Layer Structure" });

    return result
}

export default buildLayers;
