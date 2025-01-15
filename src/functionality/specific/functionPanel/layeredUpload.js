import {app} from 'photoshop';
import * as support from "../../collector"
import uxp from 'uxp';
const fs = uxp.storage.localFileSystem;


async function layeredUpload() {

    // If no open file end function 
    let doesDocExist = await support.docCheck()
    if(!doesDocExist){
        return
    }
    // Get the files path 
    let updatedPath = app.activeDocument.path.replace(app.activeDocument.name, "")

    // Access the Active Document in the file system 
    let getE = await fs.getEntryWithUrl(app.activeDocument.path)

    // Find the Completed Layered folder
    let result = await support.findFolder(updatedPath, "Completed Layered")
    if(!result){

        return 
    }

    // Copy Active Document to the found folder
    let copyLayeredFile = await getE.copyTo(result, {overwrite: true});
    if(!copyLayeredFile){
        return
    }
}

export default layeredUpload;