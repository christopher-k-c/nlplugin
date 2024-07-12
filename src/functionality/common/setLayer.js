

import {app} from 'photoshop';

async function setWorkingLayer(){

try{
    const test = app.activeDocument

    // Deselect all active layers
    for(const actvLayer of test.activeLayers){
        actvLayer.selected = false
    }
    // Select the WORKING layer
    for(const allLayers of test.layers){
        if(allLayers.name === "WORKING"){
            allLayers.selected = true
            return true
        }
    }
}
catch(e){

    console.log(e)
}


}

export default setWorkingLayer