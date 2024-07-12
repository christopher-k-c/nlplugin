const fs = require('uxp').storage.localFileSystem;

// function that finds files based on strings passed
async function findFile(arr, openFile){

    try {

<<<<<<< HEAD
        // console.log(arr, openFile, "hello world")

        // Match file names 
        // let match = 
        
        // arr.some(element => element.name.replace("_R.jpg", "") === openFile.name.replace(".tif", "") 
        
        // || 
        
        // element.name.replace("M0_R.jpg", "") === openFile.name.replace(".tif", ""));

        // if(match){
            
        // }


         const match = arr.find((element) => {
=======
        const match = arr.find((element) => {
>>>>>>> origin/react-plugin-update-laptop

            if(element.name.replace("_R.jpg", "") === openFile.name.replace(".tif", "") 
                || element.name.replace("M0_R.jpg", "") === openFile.name.replace(".tif", ""))
            {
                return element.nativePath; // Return the path

                // console.log(element.nativePath)
            }

<<<<<<< HEAD
        })

        

        
=======
            // This needs to be cleaned up, needs to handle multiple file types etc


            if(element.name.replace("_swatches.tif", "") === openFile.name.replace(".tif", "") 
                || element.name.replace("M0_swatches.tif", "") === openFile.name.replace(".tif", ""))
            {
                return element.nativePath; // Return the path

                // console.log(element.nativePath)
            }



        })

>>>>>>> origin/react-plugin-update-laptop
        return match // Return an object if theres a match 


    }
    catch (error) {
        console.log(error)
    }




}

export default findFile;