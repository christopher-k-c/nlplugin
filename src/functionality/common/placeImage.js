import {app, action} from 'photoshop';
import * as support from "../collector"

async function createMask() {
    const result = await action.batchPlay(
       [
          {
             _obj: "make",
             new: {
                _class: "channel"
             },
             at: {
                _ref: "channel",
                _enum: "channel",
                _value: "mask"
             },
             using: {
                _enum: "userMaskEnabled",
                _value: "revealAll"
             },
             _options: {
                dialogOptions: "dontDisplay"
             }
          }
       ],
       {}
    );
 }

async function invertMask() {
   const result = await action.batchPlay(
      [
         {
            _obj: "invert",
            _options: {
               dialogOptions: "dontDisplay"
            }
         }
      ],
      {}
   );
}


 


async function placeImage(oldActiveDoc){

   try {

      // Place Image assumes the app.activeDocument is the document you want to place elsewhere (Take this into account as it is a common function) also assumes active document to be flattened
      // Returned error regarding doc id not matching when set to const 
      let doc = app.activeDocument;

      //  Get dimensions of active Document 
      const docHeight = doc.height
      const docWidth = doc.width
      
      // First step is to resize 
      if(docHeight !== 2608 && docWidth !== 2300){
         await support.resizeDocument(doc) 
      }


      // Flatten image function required *******
      
      // Retouch Note Placement
      if(doc.name.includes("R") || doc.name.includes("r")){
         // Next step is to get the background layer and duplicate it renaming to Retouch Note 
         let noteLayer =  await doc.activeLayers[0].duplicate(undefined, undefined, "Retouch Note")
         // Create group and move noteLayer into group
         const noteGroup =  await doc.createLayerGroup({
               name: "Retouch Notes", visible: false, fromLayers:[noteLayer]
         })
         // Pastes into old document
         let copyToFile = await noteGroup.duplicate(oldActiveDoc) 

         let turnOffNoteGroup = oldActiveDoc.activeLayers[0].visible = false
         await doc.closeWithoutSaving()

         return true
      }


      // Swatch Image Placement
      if(doc.name.includes("S") || doc.name.includes("s")){

         // Create Swatch Layer
         let swatchLayer =  await doc.activeLayers[0].duplicate(undefined, undefined, "SWATCH")
         await createMask()
         await invertMask()
         // Copy swatch layer
         let copyToFile = await swatchLayer.duplicate(oldActiveDoc)
         // Turn off Swatch layer
         let swatch = oldActiveDoc.activeLayers[0]
         // swatch.visible = false

         await doc.closeWithoutSaving()

         return true
      }

      return false

   } 
      
   catch(e) {

      console.log(e)

   }
    
}

export default placeImage;

