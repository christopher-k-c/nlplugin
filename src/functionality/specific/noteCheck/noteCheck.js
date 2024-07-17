import {app, core} from 'photoshop'
import findFolder from "../../common/findFolder"
import findFile from "../../common/findFile"
import openFile from "../../common/openFile";
import placeImage from "../../common/placeImage";
import setWorkingLayer from '../../common/setLayer';
import buildLayers from '../buildLayers/layerStructure';
import checkLayers from '../../common/checkLayer';



async function findNotes(){
    const result = await core.executeAsModal(async (executionContext, descriptor) => {
        
        const folderName = "Retouch Notes";

        // Get document path 
        const doc = app.activeDocument

        // Check if layer structure has been applied before carrying on
        let layerStatus = await checkLayers()
        if(!layerStatus){
            // If no layer structure, run buildLayers then carry on
            await buildLayers()
        }

        // Remove name from the activeDocuments file path
        let docuPath = doc.path.replace(doc.title, "")

        // Get Retouch Notes folder
        let returnArrOfNote = await findFolder(docuPath, folderName);
        if(!returnArrOfNote){
            return false
        }

        // Get Retouch Notes contents
        let contentsOfNote = await findFolder(returnArrOfNote.nativePath, returnArrOfNote.name)
        if(!contentsOfNote){
            return false
        }

        // Look for match between active doc name and filenames in contentsOfNote arr
        let matchFile = await findFile(contentsOfNote, doc)
        if(!matchFile){
            return false
        }

        let openMatch = await openFile(matchFile)
        if(!openMatch){
            return false
        }

        let importImage = await placeImage(doc)
        if(!importImage){
            return false
        }

        let getWorkingLayer = await setWorkingLayer(doc)
        if(!getWorkingLayer){
            return false
        }
        return true;


    }, { "commandName": "General Modal" });

    return result


}
export default findNotes;