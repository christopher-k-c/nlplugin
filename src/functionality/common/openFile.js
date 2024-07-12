const fs = require('uxp').storage.localFileSystem;
import {app} from 'photoshop'


async function openFile(obj) {
    
try{


        // Mount/Access path
        const getObject = await fs.getEntryWithUrl(obj.nativePath);
        // console.log(getObject)
        // Open image
        await app.open(getObject)
        return true;
}
catch(e){
    console.log(e)
    return false;
}


}

export default openFile;



