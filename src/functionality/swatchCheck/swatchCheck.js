
import findFolder from "../common/findFolder";
import {app, core, action} from 'photoshop'




async function swatchCheck(){

    await core.executeAsModal(async (executionContext, descriptor) => {
        const folderName = "Swatches";
        // Get document path 
        const doc = app.activeDocument
        let docuPath = doc.path.replace(doc.title, "")


        // Get Swatch folder
        let returnArrOfNote = await findFolder(docuPath, folderName);
        console.log(returnArrOfNote)

        
        // Get Swatch Folder Contents as array
        let contentsOfNote = await findFolder(returnArrOfNote.nativePath, returnArrOfNote.name)
        console.log(contentsOfNote)

    })



    console.log("Test")
}

export default swatchCheck;

