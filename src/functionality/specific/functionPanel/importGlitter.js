
import {app, core} from 'photoshop'
import uxp from 'uxp';
const fs = uxp.storage.localFileSystem;
import * as support from '../../collector'

async function importGlitter(){
    await core.executeAsModal(async (executionContext, descriptor) => {
        const doc = app.activeDocument
        if(!doc){
            return
        }
        try {
            await support.setWorkingLayer(app.activeDocument, "glitter")
            const pluginFolder = await fs.getPluginFolder();
            const theTemplate = await pluginFolder.getEntry("textures/");
            let contents = await theTemplate.getEntries()
            let arr = []
            for(const item of contents){
                await app.open(item)
                // Rename the layer and duplicate it 
                let imageLayer =  await app.activeDocument.activeLayers[0].duplicate(undefined, undefined, item.name)
                // Paste the layer into the target document 
                await imageLayer.duplicate(doc)
                // Close the current active document 
                await app.activeDocument.closeWithoutSaving()
                let updateLayer = app.activeDocument.activeLayers[0] 
                arr.push(updateLayer)
            }
            const glitterGroup =  await app.activeDocument.createLayerGroup({
                name: "Texture", fromLayers: arr
            })
            glitterGroup.visible = false

        }
        catch(e){
            console.log(e)
            core.showAlert(e)
            return 
        }
    });
}

export default importGlitter;