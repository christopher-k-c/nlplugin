const fs = require('uxp').storage.localFileSystem;

// function that finds files based on strings passed
async function findFile(arr, openFile){

    try {
        const match = arr.find((element) => {

            const { name: noteName } = element;
            const { name: openName } = openFile;

            const sliceBeforeLastUnderscore = (str) => str.slice(0, str.lastIndexOf('_'));

            const slicedNoteName = sliceBeforeLastUnderscore(noteName);
            const slicedOpenName = sliceBeforeLastUnderscore(openName);

            // Remove from .
            let noteNameSlicedFromDot = openName.slice(0, openName.lastIndexOf('.'))
            // Remove from M0
            let openNameSlicedFromM0 = noteName.slice(0, noteName.lastIndexOf('M0'))

            if(noteName.includes("M0") && openNameSlicedFromM0 === noteNameSlicedFromDot){
                return element.nativePath;
            } else if (noteName.includes("_") && slicedNoteName === slicedOpenName){
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