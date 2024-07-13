import {app} from 'photoshop'
import buildLayers from '../buildLayers/layerStructure'
import findNotes from '../noteCheck/noteCheck'
import swatchCheck from '../swatchCheck/swatchCheck'

async function startUp(){

    let createLayers = await buildLayers();
    if(!createLayers){
        throw new Error("Build Layers failed");
    }

    let checkNotes = await findNotes();
    if(!checkNotes){
        throw new Error("Find Notes function failed");
    }

    let checkSwatch = await swatchCheck();
    if(!checkSwatch){
        throw new Error("Swatch search function failed");
    }
    

}

export default startUp;