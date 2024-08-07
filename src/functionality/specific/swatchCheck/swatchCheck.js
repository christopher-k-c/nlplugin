// import findFolder from "../../common/findFolder";
import {app, core, action} from 'photoshop'
import * as support from "../../collector"


async function swatchCheck(){

   let result = await core.executeAsModal(async (executionContext, descriptor) => {

        // Folder string
        const folderName = "SWATCHES";

        // Get document  
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

        // Remove filename from path string
        let docuPath = doc.path.replace(doc.title, "")

        // Get Swatch folder
        let returnArrOfSwatch = await support.findFolder(docuPath, folderName);
        if(!returnArrOfSwatch){

            return false
        }

        // Get Swatch Folder Contents as array
        let contentsOfSwatch = await support.findFolder(returnArrOfSwatch.nativePath, returnArrOfSwatch.name)
        if(!contentsOfSwatch){
  
            return false
        }

        // Look for match between active doc name and filenames in contentsOfSwatch arr
        let matchFile = await support.findFile(contentsOfSwatch, doc)
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

        let getWorkingLayer = await support.setWorkingLayer(doc, "swatch")
        if(!getWorkingLayer){
            return false
        }


        return true
    })
    return result
}

export default swatchCheck;


