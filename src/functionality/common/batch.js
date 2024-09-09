import {app, core} from 'photoshop'
import * as support from "../collector"
import uxp from 'uxp';
const fs = uxp.storage.localFileSystem;


async function batchProcess(){

    const result = await core.executeAsModal(async (executionContext, descriptor) => {

        const folder = await fs.getFolder();

        const contents = await folder.getEntries()

        for(const item of contents){

            if(item.isFile === true && (item.name.includes(".tif") || item.name.includes(".psd"))){

                let opnFile = await support.openFile(item)
                if(opnFile){
                    await support.startUp()
                    if(app.activeDocument.saved === true){
                        await app.activeDocument.close()
                    } else{
                        await app.activeDocument.save()
                        await app.activeDocument.close()
                    }
                }
            }

        }

        
        
},{commandName: "Batch Process"})

}
export default batchProcess;