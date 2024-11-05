import {app, action, core} from 'photoshop'
import uxp from 'uxp';
const fs = uxp.storage.localFileSystem;

// Batch Play path requires a session token to save 



async function batchTest(docToken){

    await action.batchPlay
    (
        [
        
            {

            "_obj":"save",
            
            "as":
                {
                    "_obj": "TIFF",
                    "byteOrder":
                    {
                        "_enum": "platform",
                        "_value": "IBMPC"
                    },
                    "LZWCompression": true,
                    "saveTransparency": true,
                    "layerCompression":
                    {
                        "_enum": "encoding",
                        "_value": "RLE"
                    }
                },
            "in": 
                {
                    "_path": docToken,
                    "_kind": "local"
                },
            }
            
        ],
        {}
    );

 }

async function saveLZW(){

    await core.executeAsModal( async () => {
        // get the active document as an entry 
        let activeFileEntry = await fs.getEntryWithUrl(app.activeDocument.path);
        // get the activeFileEntry as a token
        let token = await fs.createSessionToken(activeFileEntry)

        await batchTest(token)
    
    })

}

export default saveLZW;
