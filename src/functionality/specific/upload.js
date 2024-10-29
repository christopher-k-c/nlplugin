

import {app, core, action} from 'photoshop'
import * as support from "../collector"
import uxp from 'uxp';
const fs = uxp.storage.localFileSystem;

async function saveAsLzw(){
    await action.batchPlay(
        [
        {
            _obj: "save",
            in: {
                _path: app.activeDocument.path.replace(app.activeDocument.name, ""),
                _kind: "local"
            },
            documentID: 1123,
            saveStage: {
                _enum: "saveStageType",
                _value: "saveSucceeded"
            },
            _options: {
                dialogOptions: "dontDisplay"
            }
        }
        ],
        {}
    );
}

async function upload(){
    try {
        await core.executeAsModal( async () => {
            // If no open file end function 
            let doesDocExist = await support.docCheck()
            if(!doesDocExist){
                return
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
            console.log(folderContents)

            let checkActDocDirectory = folderContents
                .filter((entry) => entry.isFolder)
                .find((fldr) => fldr.name === "Completed Flattened")

            // console.log(checkActDocDirectory)
            // if done exists but spelt upper case or all lower case

            // If Completed Flattened is missing alert user and end function 
            if(checkActDocDirectory === undefined){
                core.showAlert(doc.name + " is not in the Set Folder")
                return;
            }
            // Check for Done folder, returns either undefined or object
            let doneFolder = folderContents
                .filter((entry) => entry.isFolder)
                .find((element) => element.name.toLowerCase() === "done"); // .toLowerCase()

            // If doneFolder returns true but its name is in the incorrect case 
            if(doneFolder && doneFolder.name !== "Done"){
                // Get the doneFolder name as string
                var entry = await folder.getEntry(doneFolder.name); 
                try{
                    // renameEntry not working so using moveTo() to rename the folder
                    await entry.moveTo(folder, { newName: "Done", overwrite: true })
                }
                catch(e){
                    console.log(e)
                }
            }

            // Create Done folder if missing
            if(doneFolder === undefined){
                // Create a Done folder 
                let createFolder = await folder.createFolder("Done");

                if(!createFolder) {
                    core.showAlert(createFolder)
                    return
                }
            }

            // Before proceeding save the current state of the active document
            await doc.save()
            // Copies the active document to a done folder - layers intact 
            let openFile = await folder.getEntry(doc.name);
            let layeredFileDestination = await folder.getEntry("Done");
            console.log(layeredFileDestination)
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

