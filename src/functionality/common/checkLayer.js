import {app, core} from 'photoshop';

async function checkLayers(){

try{

    const doc = app.activeDocument

    // Check document is open 
    if(!doc){
        // console.log("File Does not exist!")
        // core.showAlert("Missing an active document")
        return false
    }

    // Check if working and original layers exist 
    let testArr = []
    for(const layer of doc.layers){
        if(layer.name === "WORKING" || layer.name === "ORIGINAL"){
            testArr.push(layer.name)
        }
    }
    
    
    // If working and original exist or only background exists carry on, otherwise cancel operation
    if(testArr.length === 2 || testArr.length === 0 && app.activeDocument.activeLayers[0].name === "Background"){
        return true 
    } else{
        return false
    }

}
catch(e){

    console.log(e)
}


}

export default checkLayers