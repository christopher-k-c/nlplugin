import uxp from 'uxp';
const fs = uxp.storage.localFileSystem;

// function that finds files based on strings passed
async function findFile(arr, openFile){

    try {
        const match = arr.find((element) => {

            let noteName = element.name
            let openName = openFile.name
            // console.log("RAW Note Filename: ", noteName)
            // console.log("RAW Open Filename: ", openName)


            // Remove all from underscore 
            let slicedNoteName = noteName.slice(0, noteName.lastIndexOf('_'));

            let slicedOpenName = openName.slice(0, openName.lastIndexOf('.'));

            // Remove from .
            let noteNameSlicedFromDot = openName.slice(0, openName.lastIndexOf('.'))
            // Remove from M0
            let openNameSlicedFromM0 = noteName.slice(0, noteName.lastIndexOf('M0'))


            // Types of match:
            if(noteName.includes("M0") && openNameSlicedFromM0 === noteNameSlicedFromDot){
                return element.nativePath;
            }
            if (noteName.includes("_") && slicedNoteName === slicedOpenName){
                return element.nativePath;
            }

        })



        return match // Return an object if theres a match 

    }
    catch (error) {
        console.log(error)
        return false
    }
}

export default findFile;