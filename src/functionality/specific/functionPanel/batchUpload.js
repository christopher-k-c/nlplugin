import {app, core} from 'photoshop'
import * as support from "../../collector"
import uxp from 'uxp';
const fs = uxp.storage.localFileSystem;


async function batchUpload(processID, func){

    const result = await core.executeAsModal(async (executionContext, descriptor) => {

        const folder = await fs.getFolder();

        const contents = await folder.getEntries()

        for(const item of contents){

            if(item.isFile === true && (item.name.includes(".tif") || item.name.includes(".psd"))){

                let opnFile = await support.openFile(item)
                if(opnFile){
                    await support.upload()
                }
            }

        }

        
        
},{commandName: "Batch Process"})

}
export default batchUpload;

