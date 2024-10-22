import * as support from "../collector"
import {core, app, action} from 'photoshop';


// async function convertProfile() {
    
//     try{
//     await action.batchPlay(
//       [
//          {
//             _obj: "convertToProfile",
//             _target: [
//                {
//                   _ref: "document",
//                   _enum: "ordinal",
//                   _value: "targetEnum"
//                }
//             ],
//             to: "sRGB IEC61966-2.1",
//             intent: {
//                _enum: "intent",
//                _value: "colorimetric"
//             },
//             mapBlack: true,
//             dither: true,
//             flatten: false,
//             rasterizePlaced: false,
//             shadowMode: -1,
//             _options: {
//                dialogOptions: "dontDisplay"
//             }
//          }
//       ],
//       {}
//    );
// }
// catch (e){
// console.log(e)    
// }
// }




async function startUp(){
    await core.executeAsModal(async (executionContext, descriptor) => {

    // Events recognized as notifiers are not re-playable in most of the cases. There is high chance that generated code won't work.






    try{   

        // await convertProfile()

        
        let layerStatus = await support.checkLayers()
        if(!layerStatus){
            // End Operation
            console.log("Helo")
            return
        }
        let createLayers = await support.buildLayers();
        if(!createLayers){
            // End Operation
            return
        }
        // Search for a retouch note image 
        let checkNotes = await support.findNotes();
        // Search for a swatch image 
        let checkSwatch = await support.swatchCheck();

    } catch(error){

    }
});
}

export default startUp;