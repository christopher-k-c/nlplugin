const fs = require('uxp').storage.localFileSystem;

// function that finds files based on strings passed
async function findFile(arr, openFile){

    try {

        const match = arr.find((element) => {
            // Part of file name variable 
            // str.slice(0, str.lastIndexOf('_'));

            console.log(element, "tetstststs")
            let str = element.name
            console.log(str, "tetstststs")
            let fromUnderScore = str.slice(0, str.lastIndexOf('_'));
            let fromDot = str.slice(0, str.lastIndexOf('.'))
            let fromM0 = str.slice(0, str.lastIndexOf('M0'))

            console.log(fromUnderScore, "fromUnderScore")
            console.log(fromDot, "fromDot")
            console.log(fromM0, "fromM0")
            // select from the _ up to but not including the dot

            // file extension variable 
            // select from the . onwards 

            // In first replace call append both var1 + var2 
            // In second replace call, var2 (the extension) to be replaced by nothing
            // Same for the other one or a conditional for the swatches and _r but currently very short of time 
        


            if(element.name.replace(fromUnderScore, "") === openFile.name.replace(fromDot, "") 
                || element.name.replace(fromM0, "") === openFile.name.replace(fromDot, ""))
            {
                console.log(element, "tettststst")
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