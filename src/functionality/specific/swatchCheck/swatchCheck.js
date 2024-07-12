
// import findFolder from "../../common/findFolder";
import {app, core, action} from 'photoshop'

import findFolder from "../../common/findFolder"
import findFile from "../../common/findFile"
import openFile from "../../common/openFile";
import placeImage from "../../common/placeImage";


async function swatchCheck(){

    await core.executeAsModal(async (executionContext, descriptor) => {

        // Folder string
        const folderName = "SWATCHES";

        // Get document  
        const doc = app.activeDocument

        // Remove filename from path string
        let docuPath = doc.path.replace(doc.title, "")

        // Get Swatch folder
        let returnArrOfSwatch = await findFolder(docuPath, folderName);
        if(!returnArrOfSwatch){
            throw new Error('Swatch folder not found.');
            // return;
        }

        // Get Swatch Folder Contents as array
        let contentsOfSwatch = await findFolder(returnArrOfSwatch.nativePath, returnArrOfSwatch.name)
        if(!contentsOfSwatch){
            throw new Error('Error searching for contents of Swatch folder.');
            // return;
        }

        // Look for match between active doc name and filenames in contentsOfSwatch arr
        let matchFile = await findFile(contentsOfSwatch, doc)
        if(!matchFile){
            throw new Error('Matching file not found.');
            // return;
        }
        let openMatch = await openFile(matchFile)
        if(!openMatch){
            throw new Error('Unable to open file');
            // return;
        }

        let importImage = await placeImage(doc)
        if(!importImage){
            throw new Error('Error whilst copying file');
            // return;
        }

    })
}

export default swatchCheck;


/*

To Do:


implement throw new error / try/catch error propagation 

swatchCheck requires control flow
- is nest try/catch recommended or redundant?
- Long term wire all errors to a notification system  

findFile requires:
- Clean up conditional/dynamism 
- Handle multiple file types .jpg etc 

findFolder requires:
- Long term goal a recursive function, parameters that determine the output/action applied 

openFile requires:
- Control flow/clean up

placeImage requires:
- Dynamic re-write

collector.js needs to be implemented 

*/
