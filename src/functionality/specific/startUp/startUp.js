import * as support from "../../collector"

async function startUp(){


    try{   
        
        let layerStatus = await support.checkLayers()
        if(!layerStatus){
            // End Operation
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

}

export default startUp;