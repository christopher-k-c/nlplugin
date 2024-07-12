



import {app} from 'photoshop';

async function checkLayers(){

try{

    const doc = app.activeDocument

    // Check document is open 
    if(!doc){
        return false
    }

    // Check if working and original layers exist 
    let testArr = []
    for(const layer of doc.layers){
        if(layer.name === "WORKING" || layer.name === "ORIGINAL"){
            testArr.push(layer.name)
        }
    }
    // Check there are only two late
    if(testArr.length === 2){
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