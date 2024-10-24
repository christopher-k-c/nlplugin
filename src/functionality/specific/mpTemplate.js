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

async function multiPackTemplate(){
   await core.executeAsModal(async () => {
      await support.convertProfile()
      // Get the active document 
      let doc = app.activeDocument
      // Resize Image Width 
      await doc.resizeImage(2300, 2028)
      // Duplicate layer 
      let model = await doc.activeLayers[0].duplicate()
      model.name = "Model"
      // Resize Canvas Height 
      await doc.resizeCanvas(2300, 2600)
      // Set flatlay layer name as BG 
      let options = {name: "BG"}
      // Create flatlay layer 
      doc.createLayer(options)
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
      // Create Group Container For Model and move model layer into group
      const modelGroup =  await doc.createLayerGroup({
         name: "Model", visible: true, fromLayers: [model], group: true
      })
      // Set model group selection 
      await makeTopSelection()
      // Align Model image to top of active selection
      await topAlignSelection()
      // Apply a mask to the model group using the active selection
      await maskFromSelection()
      // Move model group above flatlay group
      doc.activeLayers[0].move(flatLayGroup, constants.ElementPlacement.PLACEBEFORE)
      // Get the special background layer 
      let originalBgLayer = doc.layers.find((layer) => layer.isBackgroundLayer === true) 
      // Deselect the model group layer (The only active layer)
      doc.activeLayers[0].selected = false
      // Select the special background layer 
      originalBgLayer.selected = true
      // Fill the special background layer with white
      await fillWhite()

      return
      
   });

}
export default multiPackTemplate



