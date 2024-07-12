import {app, core} from 'photoshop'
import findFolder from "../../common/findFolder"
import findFile from "../../common/findFile"
import openFile from "../../common/openFile";
import placeImage from "../../common/placeImage";
import setWorkingLayer from '../../common/setLayer';
import buildLayers from '../buildLayers/layerStructure';
import checkLayers from '../../common/checkLayer';



async function findNotes(){
    await core.executeAsModal(async (executionContext, descriptor) => {
        
        const folderName = "Retouch Notes";

        // Get document path 
        const doc = app.activeDocument

        // Check if layer structure has been applied before carrying on
        let layerStatus = await checkLayers()
        console.log(layerStatus, "layerstatus")
        if(!layerStatus){
            // If no layer structure, run buildLayers then carry on
            await buildLayers()
        }

        // Remove name from the activeDocuments file path
        let docuPath = doc.path.replace(doc.title, "")

        // Get Retouch Notes folder
        let returnArrOfNote = await findFolder(docuPath, folderName);

        // Get Retouch Notes contents
        let contentsOfNote = await findFolder(returnArrOfNote.nativePath, returnArrOfNote.name)
        console.log(contentsOfNote)

        // Look for match between active doc name and filenames in contentsOfNote arr
        let matchFile = await findFile(contentsOfNote, doc)

        let openMatch = await openFile(matchFile)
        if(!openMatch){
            return;
        }

        let importImage = await placeImage(doc)
        if(!importImage){
            throw new Error('Error whilst copying file');
            // return;
        }

        let getWorkingLayer = await setWorkingLayer(doc)
        if(!getWorkingLayer){
            throw new Error('Error whilst selecting WORKING layer')
        }


    }, { "commandName": "General Modal" });




}
export default findNotes;