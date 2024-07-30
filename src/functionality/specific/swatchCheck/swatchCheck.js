
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

   let result = await core.executeAsModal(async (executionContext, descriptor) => {

        // Folder string
        const folderName = "SWATCHES";

        // Get document  
        const doc = app.activeDocument

        // Check if layer structure has been applied before carrying on
        let layerStatus = await checkLayers()
        if(!layerStatus){
            // If no layer structure, run buildLayers then carry on
            await buildLayers()
        }
        

        // Remove filename from path string
        let docuPath = doc.path.replace(doc.title, "")

        // Get Swatch folder
        let returnArrOfSwatch = await findFolder(docuPath, folderName);
        if(!returnArrOfSwatch){

            return false
        }

        // Get Swatch Folder Contents as array
        let contentsOfSwatch = await findFolder(returnArrOfSwatch.nativePath, returnArrOfSwatch.name)
        if(!contentsOfSwatch){
  
            return false
        }

        // Look for match between active doc name and filenames in contentsOfSwatch arr
        let matchFile = await findFile(contentsOfSwatch, doc)
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

        let getWorkingLayer = await setWorkingLayer(doc, "swatch")
        console.log(getWorkingLayer)
        if(!getWorkingLayer){
            return false
        }


        return true
    })
    return result
}

export default swatchCheck;


