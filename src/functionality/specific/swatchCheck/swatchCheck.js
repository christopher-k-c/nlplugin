
// import findFolder from "../../common/findFolder";
import {app, core, action} from 'photoshop'

import findFolder from "../../common/findFolder"
import findFile from "../../common/findFile"
import openFile from "../../common/openFile";
import placeImage from "../../common/placeImage";
import setWorkingLayer from '../../common/setLayer';
import checkLayers from '../../common/checkLayer';
import buildLayers from '../buildLayers/layerStructure';


async function swatchCheck(){

    await core.executeAsModal(async (executionContext, descriptor) => {

        // Folder string
        const folderName = "SWATCHES";

        // Get document  
        const doc = app.activeDocument

        // Check if layer structure has been applied before carrying on
        let layerStatus = await checkLayers()
        console.log(layerStatus, "layerstatus")
        if(!layerStatus){
            // If no layer structure, run buildLayers then carry on
            await buildLayers()
        }
        

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

        let getWorkingLayer = await setWorkingLayer(doc)
        if(!getWorkingLayer){
            throw new Error('Error whilst selecting WORKING layer')
        }

    })
}

export default swatchCheck;


