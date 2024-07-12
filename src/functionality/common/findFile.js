const fs = require('uxp').storage.localFileSystem;

// function that finds files based on strings passed
async function findFile(arr, openFile){

    try {

        const match = arr.find((element) => {

            if(element.name.replace("_R.jpg", "") === openFile.name.replace(".tif", "") 
                || element.name.replace("M0_R.jpg", "") === openFile.name.replace(".tif", ""))
            {
                return element.nativePath; // Return the path

                // console.log(element.nativePath)
            }

            // This needs to be cleaned up, needs to handle multiple file types etc


            if(element.name.replace("_swatches.tif", "") === openFile.name.replace(".tif", "") 
                || element.name.replace("M0_swatches.tif", "") === openFile.name.replace(".tif", ""))
            {
                return element.nativePath; // Return the path

                // console.log(element.nativePath)
            }



        })

        return match // Return an object if theres a match 


    }
    catch (error) {
        console.log(error)
    }




}

export default findFile;