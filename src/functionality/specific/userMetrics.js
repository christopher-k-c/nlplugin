import {app, core} from 'photoshop'
import uxp from 'uxp';
const fs = uxp.storage.localFileSystem;


async function userMetrics(){

    const result = await core.executeAsModal(async (executionContext, descriptor) => {

        let folderObject = await fs.getFolder()
        let folders = await fs.getEntryWithUrl(folderObject.nativePath);
        let contents = await folders.getEntries()


        // Filter and map file names
        const fileNames = contents
        .filter((entry) => entry.isFile) 
        .map((entry) => entry.name);    
        
        // Constructing snap shot of folder state
        let object = {
            folderName: folderObject.name,
            path: folderObject.nativePath,
            uneditedImages: fileNames
        }

        // Store the current selection in local storage 
        await localStorage.setItem(folderObject.name, JSON.stringify(object))
        let storedPrefs = await JSON.parse(localStorage.getItem(folderObject.name))
        console.log(storedPrefs)

    },{commandName: "User Metrics"})

}
export default userMetrics;