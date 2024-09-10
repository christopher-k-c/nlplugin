async function setWorkingLayer(actvDoc, layerID){

try{
    // const test = app.activeDocument

    // Deselect all active layers
    for(const actvLayer of actvDoc.activeLayers){
        actvLayer.selected = false
    }
    // Select the WORKING layer
    for(const allLayers of actvDoc.layers){

        let stringCase;

        // Find Retouch Notes or Find Swatch Image Functions
        if(layerID === "findNotes" || "swatch"){
            stringCase = "WORKING"
        }
        
        if(layerID === "glitter"){
            stringCase = "ORIGINAL"
        }
        // // Frequency Separation 
        // if(layerID === "freqSep"){
        //     stringCase = "LOW"
        // }




        if(allLayers.name === stringCase || allLayers.id === layerID){
            allLayers.selected = true
            if(stringCase === "ORIGINAL")
                allLayers.visible = false
            return true
        }
    }
}
catch(e){

    console.log(e)
}


}

export default setWorkingLayer