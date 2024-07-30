import {app} from 'photoshop'
import buildLayers from '../buildLayers/layerStructure'
import findNotes from '../noteCheck/noteCheck'
import swatchCheck from '../swatchCheck/swatchCheck'

async function startUp(){
    // Returns true if either string is found 
    // let result = app.activeDocument.layers.some(element => element.name === 'WORKING' && element.name === 'ORIGINAL')

    // console.log(result)
    // If more layers than just background cancel operation && !result
    if(app.activeDocument.layers.length > 1){
        return
    }

    let createLayers = await buildLayers();


    let checkNotes = await findNotes();


    let checkSwatch = await swatchCheck();


}

export default startUp;