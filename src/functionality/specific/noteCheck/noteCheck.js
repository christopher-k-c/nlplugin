import {app, core} from 'photoshop'
import * as support from "../../collector"



async function findNotes(){
    const result = await core.executeAsModal(async (executionContext, descriptor) => {
        
        const folderName = "Retouch Notes";

        // Get document path 
        const doc = app.activeDocument

        // Check if layer structure has been applied before carrying on
        let layerStatus = await support.checkLayers()

        if(!layerStatus){
            // If no layer structure, run buildLayers then carry on
            let layerStatus = await support.buildLayers()
            if(!layerStatus){
                // End Operation
                return
            }
        }

        // Remove name from the activeDocuments file path
        let docuPath = doc.path.replace(doc.title, "")

        // Get Retouch Notes folder
        let returnArrOfNote = await support.findFolder(docuPath, folderName);
        if(!returnArrOfNote){
            return false
        }

        // Get Retouch Notes contents
        let contentsOfNote = await support.findFolder(returnArrOfNote.nativePath, returnArrOfNote.name)
        if(!contentsOfNote){
            return false
        }

        // Look for match between active doc name and filenames in contentsOfNote arr
        let matchFile = await support.findFile(contentsOfNote, doc)
        if(!matchFile){
            return false
        }

        let openMatch = await support.openFile(matchFile)
        if(!openMatch){
            return false
        }

        let importImage = await support.placeImage(doc)
        if(!importImage){
            return false
        }

        let getWorkingLayer = await support.setWorkingLayer(doc, "findNotes")
        if(!getWorkingLayer){
            return false
        }

        // app.activeDocument.save()
        return true;


    }, { "commandName": "General Modal" });

    return result


}
export default findNotes;