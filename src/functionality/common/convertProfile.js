import { action } from 'photoshop';

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

export default convertProfile;