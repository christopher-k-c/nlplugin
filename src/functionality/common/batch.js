
import {app, core} from 'photoshop'
import openFile from './openFile';
import startUp from '../specific/startUp/startUp';
const fs =  require('uxp').storage.localFileSystem;


async function batchProcess(){
    const result = await core.executeAsModal(async (executionContext, descriptor) => {
        const folder = await fs.getFolder();

        const contents = await folder.getEntries()

        for(const item of contents){

            if(item.isFile === true && (item.name.includes(".tif") || item.name.includes(".psd"))){

                let opnFile = await openFile(item)
                if(opnFile){
                    await startUp()
                    if(app.activeDocument.saved === true){
                        app.activeDocument.close()
                    } else{
                        app.activeDocument.save()
                        app.activeDocument.close()
                    }
                }
            }

        }
    })

}
export default batchProcess;