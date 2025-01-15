import {app, core} from 'photoshop'
import uxp from 'uxp';
const fs = uxp.storage.localFileSystem;


async function metricsFolderObject(){

    const result = await core.executeAsModal(async (executionContext, descriptor) => {

        let folderObject = await fs.getFolder()
        
        let findEntries = async (path) => {
            let folders = await fs.getEntryWithUrl(path);
            let contents = await folders.getEntries()
            return contents
        }

        let sortEntries = async (folderEntries) => {
            const fileTypes = [".tif", ".tiff", ".jpeg", ".jpg", ".png", ".psd"];
            let sortedEntries = folderEntries
            .filter((entry) => entry.isFile && [...fileTypes].some((type) => entry.name.endsWith(type)))
            .map((entry) => entry.name);  

            return sortedEntries
        }

        let doneContents = async (folderEntries) => {

            let findDone = folderEntries.filter((entry) => entry.name === "Done")

            if(findDone[0].isFolder){

                let getDoneEntries = await findEntries(findDone[0].nativePath)

                let filterDoneEntries = await sortEntries(getDoneEntries)

                return filterDoneEntries
            }
            return false
        }

        let rootContents = await findEntries(folderObject.nativePath)
        let filterRootEntries = await sortEntries(rootContents)
        let doneExists = await doneContents(rootContents)
        let currentDate = new Date()

        let folderSnapShot = {
            folderName: folderObject.name,
            path: folderObject.nativePath,
            folderContents: {
                root: filterRootEntries,
                completed: doneExists ? doneExists : null
            },
            dateCreated: currentDate.toLocaleString(),

        }

        await localStorage.setItem(folderObject.name, JSON.stringify(folderSnapShot))
        let storedPrefs = await JSON.parse(localStorage.getItem(folderObject.name))
        console.log(storedPrefs)

    },{commandName: "User Metrics"})

}
export default metricsFolderObject;