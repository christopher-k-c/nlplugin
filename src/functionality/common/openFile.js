import uxp from 'uxp';
const fs = uxp.storage.localFileSystem;
import {app} from 'photoshop'
import * as support from "../collector"

async function openFile(obj) {
    
try{
        // Mount/Access path
        const getObject = await fs.getEntryWithUrl(obj.nativePath);
        // Open image
        await app.open(getObject)


        let width = app.activeDocument.width;
        let height = app.activeDocument.height;
        if (width !== 2300 || height !== 2608) {
            
            await support.resizeDocument(app.activeDocument);
        }
        
        return true;
}
catch(e){
    console.log(e)
    return false;
}


}

export default openFile;



