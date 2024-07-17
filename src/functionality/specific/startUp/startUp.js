import {app} from 'photoshop'
import buildLayers from '../buildLayers/layerStructure'
import findNotes from '../noteCheck/noteCheck'
import swatchCheck from '../swatchCheck/swatchCheck'

async function startUp(){
    

    // If more layers than just background cancel operation
    if(app.activeDocument.layers.length > 1){
        return
    }

    let createLayers = await buildLayers();


    let checkNotes = await findNotes();


    let checkSwatch = await swatchCheck();


}

export default startUp;