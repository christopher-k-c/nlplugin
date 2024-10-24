import {app, action, core, constants} from 'photoshop';
import * as support from "../collector"

async function makeTopSelection() {
   await action.batchPlay(
   [
      {
         _obj: "set",
         _target: [
            {
               _ref: "channel",
               _property: "selection"
            }
         ],
         to: {
            _obj: "rectangle",
            top: {
               _unit: "pixelsUnit",
               _value: 0
            },
            left: {
               _unit: "pixelsUnit",
               _value: 0
            },
            bottom: {
               _unit: "pixelsUnit",
               _value: 1664
            },
            right: {
               _unit: "pixelsUnit",
               _value: 2300
            }
         },
         _options: {
         //    dialogOptions: "dontDisplay"
         }
      }
   ],
   {}
);
}

async function makeBottomSelection() {
    await action.batchPlay(
      [
         {
            _obj: "set",
            _target: [
               {
                  _ref: "channel",
                  _property: "selection"
               }
            ],
            to: {
               _obj: "rectangle",
               top: {
                  _unit: "pixelsUnit",
                  _value: 1708
               },
               left: {
                  _unit: "pixelsUnit",
                  _value: 0
               },
               bottom: {
                  _unit: "pixelsUnit",
                  _value: 2608
               },
               right: {
                  _unit: "pixelsUnit",
                  _value: 2300
               }
            },
            _options: {
            //    dialogOptions: "dontDisplay"
            }
         }
      ],
      {}
   );
}

async function maskFromSelection(){
    await action.batchPlay(
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
                   _value: "revealSelection"
                }
             }
        ],
        {}
     );
  
}

async function topAlignSelection(){
   await action.batchPlay(
      [
         {
            _obj: "align",
            _target: [
               {
                  _ref: "layer",
                  _enum: "ordinal",
                  _value: "targetEnum"
               }
            ],
            using: {
               _enum: "alignDistributeSelector",
               _value: "ADSTops"
            },
            alignToCanvas: false,
            _options: {
               dialogOptions: "dontDisplay"
            }
         }
      ],
      {}
   );
}

async function fillFlatLayLayer(){
   // console.log("hey")
   await action.batchPlay(
      [
         {
            _obj: "fill",
            using: {
               _enum: "fillContents",
               _value: "color"
            },
            color: {
               _obj: "RGBColor",
               red: 243,
               grain: 243.99610894941634,
               blue: 243.99610894941634
            },
            opacity: {
               _unit: "percentUnit",
               _value: 100
            },
            mode: {
               _enum: "blendMode",
               _value: "normal"
            },
            _options: {
               dialogOptions: "dontDisplay"
            }
         }
      ],
      {}
   );

}

async function fillWhite(){
   await action.batchPlay(
   [
      {
         _obj: "fill",
         using: {
            _enum: "fillContents",
            _value: "white"
         },
         opacity: {
            _unit: "percentUnit",
            _value: 100
         },
         mode: {
            _enum: "blendMode",
            _value: "normal"
         },
         _options: {
            dialogOptions: "dontDisplay"
         }
      }
   ],
   {}
);
}

async function recursLayerSearch(arr){

   for(const layer of arr){
      if(layer.name !== "Flat-Lay"){
         layer.selected = true
         if(layer.name === "Retouch Notes"){
            recursLayerSearch(layer.layers )
         }
      }
   }
}


async function multiPackTemplate(){
   await core.executeAsModal(async () => {
      try{
         // Get the active document 
         let doc = app.activeDocument
         // Cancel operation if layers can't be built
         if(doc.layers.length === 1) {
            let layerStatus = await support.buildLayers()
            if (!layerStatus) return false;
         }
         // Try importing the retouch notes 
         let note = doc.layers.find((el) => el.name === "Retouch Notes")
         if(!note){
            await support.findNotes();
         }
         let swatch = doc.layers.find((el) => el.name === "SWATCH")
         // Try importing the swatch notes 
         if(!swatch) {await support.swatchCheck();}
         // Convert the colour profile if needed
         await support.convertProfile()
         // Resize Image Width 
         await doc.resizeImage(2300, 2028)
         // Resize Canvas Height 
         await doc.resizeCanvas(2300, 2608)
         // Create flatlay layer
         doc.createLayer({name: "F3F4F4"})
         // Fill flatlay layer with #F3F4F4
         await fillFlatLayLayer()
         // Create a flatlay group and move the flayer layer into group
         const flatLayGroup =  await doc.createLayerGroup({
            name: "Flat-Lay", visible: true, fromLayers: [doc.activeLayers[0]], group: true
         })
         // Set flatlay group selection 
         await makeBottomSelection()
         // Apply a mask to the flatlay group using the active selection
         await maskFromSelection()
         let workingLayer = doc.layers.find((el) => el.name === "WORKING");
         // Move Flay-Lay below model group
         doc.activeLayers[0].move(workingLayer, constants.ElementPlacement.PLACEBEFORE)
         // Deselect the flat-lay group
         doc.activeLayers[0].selected = false
         // Iterate over all layers/groups (except for Retouch Notes group and its contents) setting selected property to true 
         await recursLayerSearch(doc.layers)
         // Activate 2300px x 1664px selection 
         await makeTopSelection()
         // Align allselected layers to top of active selection 
         await topAlignSelection()
         // Store array of active layers/groups
         let spreadArray = doc.activeLayers
         // Create Group Container For Model and move model layer into group
         const modelGroup =  await doc.createLayerGroup({
            name: "Model", visible: true, fromLayers: [...spreadArray], group: true
         })
         // Target the original
         let turnOriginalOff = doc.activeLayers[0].layers.find((original) => original.name === "ORIGINAL")
         // Turn the original layer off
         turnOriginalOff.visible = false
         // Apply active selection to model group as mask
         await maskFromSelection()
         // Create the special/main background layer 
         let mainBackground = await doc.createLayer({
            name: "Background"
         })
         // Fill the special background layer with white
         await fillWhite()
         // Move background layer to bottom of layer structure 
         mainBackground.move(flatLayGroup, constants.ElementPlacement.PLACEAFTER)
         return
      }
      catch(e){
         console.log(e)
      }
   });
}
export default multiPackTemplate



