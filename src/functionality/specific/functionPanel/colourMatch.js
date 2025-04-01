import {app, core} from 'photoshop'





async function colourMatch(){

    await core.executeAsModal(async (executionContext, descriptor) => {

        // Batch option

            // Get array of all images in a directory 
            // Sort all images into groups (within a array or object?) based on their filenames/sku codes
            // Open one group of images at a time 
            // Call single option function 
               
            
        // Single option 
            // Requires user to open a group of images that share the same filename/sku codes
                // Check if all images contain cc group 
                    // Save and close all images
                // Check if all images do not contain a cc group 
                    // Save and close all images
                // Check if one or more, but not all images contain a cc group, do the following:
                    // Find the first document that has a cc group
                    // Copy the cc group from this document
                    // Next iterate through the open images
                        // If the active document contains a cc group 
                            // Save and close
                        // Where an image does not contain a cc group 
                            // paste the cc group, save and close that active document

        

    },{commandName: "Colour Correction Transfer"})
}

export default colourMatch;