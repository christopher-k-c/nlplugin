import {app, core} from 'photoshop'
import * as support from "../collector"
import uxp from 'uxp';
const fs = uxp.storage.localFileSystem;


async function batchUploadSpecific(processID, func){

    const result = await core.executeAsModal(async (executionContext, descriptor) => {

        const files = await fs.getFileForOpening({
            allowMultiple: true, // Enables multi-file selection
        });

        for(const item of files){

            if(item.isFile === true && (item.name.includes(".tif") || item.name.includes(".psd"))){

                let opnFile = await support.openFile(item)
                if(opnFile){
                    await support.upload()
                }
            }

        }

  


        //   console.log(files)
        
        
},{commandName: "Batch Process"})

}
export default batchUploadSpecific;