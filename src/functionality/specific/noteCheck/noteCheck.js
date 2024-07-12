import {app, core} from 'photoshop'
import findFolder from "../../common/findFolder"
import findFile from "../../common/findFile"
import openFile from "../../common/openFile";
import placeImage from "../../common/placeImage";




async function findNotes(){
    await core.executeAsModal(async (executionContext, descriptor) => {
        const folderName = "Retouch Notes";
        // Get document path 
        const doc = app.activeDocument
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

        await placeImage(doc)


    }, { "commandName": "General Modal" });




}
export default findNotes;