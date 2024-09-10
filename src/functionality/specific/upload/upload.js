

import {app, core} from 'photoshop'
import * as support from "../../collector"
import uxp from 'uxp';
const fs = uxp.storage.localFileSystem;

async function upload(){
    try {
        await core.executeAsModal( async () => {

            // If no open file end function 
            let initialFileCheck = await support.checkLayers();
            if(!initialFileCheck){
                return; 
            }
            // Get Active Doucment 
            let doc = app.activeDocument
            // Get the open files path as string
            let pathName = doc.path.replace(doc.title, "")
            // Use uxp to access the folder structure, get the uxp object by passing the path as string
            let folder = await fs.getEntryWithUrl(pathName);
            // Get folder contents as an array of objects 
            let folderContents = await folder.getEntries()
            // Search for the Completed Flattened folder

            let checkActDocDirectory = folderContents.filter((entry) => entry.isFolder).find((fldr) => fldr.name === "Completed Flattened")
            console.log("Hello")
            // If Completed Flattened is misisng alert user and end function 
            if(checkActDocDirectory === undefined){
                core.showAlert(doc.name + " is not in the correct folder")
                return;
            }
            // Check for Done folder, returns either undefined or object
            const doneFolder = folderContents.filter((entry) => entry.isFolder).find((element) => element.name === "Done");
            // Create Done folder if missing
            if(doneFolder === undefined){
                await folder.createFolder("Done");
            }
            // Before Proceeding save the current state of the active document
            await doc.save()
            // Copies the active document to a done folder - layers intact 
            let openFile = await folder.getEntry(doc.name);
            let layeredFileDestination = await folder.getEntry("Done");
            await openFile.copyTo(layeredFileDestination, {overwrite: true});

            // Copies the active document to the Completed Flattened folder - flattens layers
            await doc.flatten()
            await doc.save()
            let flattenedFileDestination = await folder.getEntry("Completed Flattened");
            await openFile.moveTo(flattenedFileDestination, {overwrite: true});
            
            // Closes open file
            await doc.closeWithoutSaving()
        });
    } catch(e) {console.log(e);}
}
export default upload