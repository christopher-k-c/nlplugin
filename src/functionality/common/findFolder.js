const fs = require('uxp').storage.localFileSystem;
import {app, core, action} from 'photoshop'


// function that finds folders based on strings passed

async function findFolder(path, folderName){

    try {

        // access folder path
        const folders = await fs.getEntryWithUrl(path);
        // return array of path contents
        const contents = await folders.getEntries()

        if(folders.name.includes(folderName)){

            return contents

        } else {

            for(const objOfArr of contents){

                if(objOfArr.name.includes(folderName)){
    
                    return objOfArr
                }                
            }
        }

        return null;
    }
    catch (error) {
        console.log(error)
    }




}

export default findFolder;