const fs = require('uxp').storage.localFileSystem;
const app = require('photoshop').app;
const retouchNotesFolderName = 'Retouch Notes';
// const { batchPlay } = require("photoshop").action;

let oldActiveDocumentName;
let retouchNotesFound;




// Events recognized as notifiers are not re-playable in most of the cases. There is high chance that generated code won't work.

const {executeAsModal} = require("photoshop").core;
const {batchPlay} = require("photoshop").action;

function actionCommands() {

    const result = batchPlay(
      [
         {
            _obj: "move",
            _target: [
               {
                  _ref: "layer",
                  _enum: "ordinal",
                  _value: "targetEnum"
               }
            ],
            to: {
               _ref: "layer",
               _enum: "ordinal",
               _value: "front"
            },
            _options: {
               dialogOptions: "dontDisplay"
            }
         }
      ],
      {}
   );
  }




// Event Handler Function - Sperating the concerns 
async function processRetouchNotes() {
    await require('photoshop').core.executeAsModal(async (executionContext, descriptor) => {
    // Reset the found retouch notes variable to stop errors when re-running the script
    retouchNotesFound = false;
    // Store Current Active Documemnt Object
    oldActiveDocumentName = app.activeDocument
    try {

        // Step One: Check for open image otherwise throw error
        const activeDocument = app.activeDocument ? app.activeDocument : (() => { throw new Error('No active document.'); })()

        // Step Two: Get the folder object
        const retouchNotesFolder = await findRetouchNotesFolder(activeDocument, retouchNotesFolderName);

        // Step Three: Get the folders contents as array of objects
        const retouchNotesContents = await retouchNotesFolder.getEntries();
        
        // Step Four: Iterate over the array elements, calling another set of functions that find matchs bewteen activeDoc and retouchNote images, opening the matched images 
        await folderContents(retouchNotesContents);
        
        // // Step Five: Check if the retouch notes have already been placed inside the corresponding image
        // let notyAlreadyExists = await checkLayersForNotes()
        
        // // Step Six: Place the matched retouch note image onto the original active document 
        // if(!notyAlreadyExists){await placeImage()}
        // // await app.activeDocument.closeWithoutSaving()
  
        

        return

    } catch (error) {
        
        console.error('Error:', error);
        return
    }
}, { "commandName": "General Modal" });
}

document.getElementById("btnPopulate").addEventListener("click", processRetouchNotes);

// Find the retouch notes
async function findRetouchNotesFolder(currentDocumentObject, folderName) {
    // Remove name from path 
    let docuPath = currentDocumentObject.path.includes(currentDocumentObject.title) ? currentDocumentObject.path.replace(currentDocumentObject.title, "") : null;
    if (!docuPath) {
        return null; // Handle the case where the document path is not valid
    }
    // console.log(docuPath)

    try {
        const folders = await fs.getEntryWithUrl(docuPath);
        // console.log(folders)
    
        const contents = await folders.getEntries();
        // console.log(contents)

        let found = false;
        for (const item of contents) {

            // console.log(item, item.name)
            if (item.name === folderName) {
                found = true;
                return item;
            }
        }
        
        // Activate the catch when the loop fails to find the retouch notes folder     
        if (!found) {
            throw new Error('Folder not found');
        }

    } catch (e) {
        console.log(e);
        appendText('Retouch Notes folder not found.');
        throw e; // Rethrow the error to propagate it further
    }
}

// Get contents of Retouch Folder
async function folderContents(arr) {

    for (const arrayElement of arr) {

        // KILL THE LOOP
        if (retouchNotesFound) {
            return;
        }


        // Check for matching name
        await matchNames(arrayElement);
    }
}

async function matchNames(documentObject) {
    const pattern = /_R\.jpg/g;
    const regex = /\..*/;
    try {
        const name = documentObject.name;

        let cleanedName = name.replace(pattern, '');
        let updatingCleanedName = cleanedName.includes('M0') ? cleanedName.replace('M0', '') : cleanedName;
        cleanedName = updatingCleanedName;
        const activeName = app.activeDocument.name;
        // oldActiveDocumentName = app.activeDocument

        const activeDocumentName = activeName.replace(regex, "");

        if (cleanedName === activeDocumentName) {

            let test = await checkLayersForNotes();

            // If it returns true it means retouch notes exist 
            // If the test var returns false it means the retouch notes do not exists 
            
            // this test var is true then it's sett o false menaing it won't open a image
            if(!test){
                // await require('photoshop').core.executeAsModal(async (executionContext, descriptor) => {
                await openImage(documentObject.nativePath);
                appendText('File opened successfully.');
            // }, { "commandName": "Test Scope" });
            }
            retouchNotesFound = true;
     
            
        } else {
            appendText("No retouch notes available");
        }
    } catch (e) {
        console.log(e + " Matching names error");
    }
}

async function openImage(pathString) {
    try {
        const getObject = await fs.getEntryWithUrl(pathString);
        // await require('photoshop').core.executeAsModal(async (executionContext, descriptor) => {
            try {
                
                
                // Open Retouch Note
                await app.open(getObject);
                // Switch back to old active document 
                // app.activeDocument = oldActiveDocumentName

                await placeImage()
                // await app.activeDocument.closeWithoutSaving()
       
                
            } catch (e) {
                console.error(e);
            }
        // }, { "commandName": "Open Image" });
    } catch (e) {
        console.error(e);
    }
}

async function checkLayersForNotes() {
    // await require('photoshop').core.executeAsModal(async (executionContext, descriptor) => {
        console.log("checkLayersForNotes")
    try {
        // const activeDocument = app.activeDocument; // Get the active document
        // const layers = activeDocument.layers; // Get the layers of the active document

        let activeDocLayers = Array.from(oldActiveDocumentName.layers)
        // console.log(activeDocLayers);
        
        // Now you can iterate over the layers if needed
        for (const element of activeDocLayers) {
            // Your code to process each layer goes here

            console.log(element)

            if(element.name == "Retouch Notes"){
                // await app.activeDocument.closeWithoutSaving()
                // return true
                throw new Error('Retouch Notes already exist test');
                
            }

            
        }
    } catch (error) {
        console.error('Error:', error);
        appendText('Retouch Notes already exist');
        await app.activeDocument.closeWithoutSaving()
        return true
    }
// }, { "commandName": "FirstModalContext" });
}





async function placeImage(){


// Received Error without executing as modal, see error:
// Error: Event: select may modify the state of Photoshop. Such events are only allowed from inside a modal scope
    // await require('photoshop').core.executeAsModal(async (executionContext, descriptor) => {
        try {    


            app.activeDocument.resizeImage(2300, 2608);
            const constants = require('photoshop').constants;
            const layers = app.activeDocument.layers
            const topLayer = layers[0]
            let noteLayer = await topLayer.duplicate()
            noteLayer.name = "Retouch Note"
            let newGroup = await app.activeDocument.createLayerGroup({ name: "Retouch Notes"});
            newGroup.visible = false
            await noteLayer.move(newGroup, constants.ElementPlacement.PLACEINSIDE);
            await newGroup.duplicate(oldActiveDocumentName, constants.ElementPlacement.PLACEINSIDE);
            await app.activeDocument.closeWithoutSaving()
            // let retouchNotesGroup = Array.from(oldActiveDocumentName.layer).find(ba => console.log("tets"))

            // let retouchNotesGroup = Array.from(oldActiveDocumentName.layers)

            // for(const lay of retouchNotesGroup){
            //     console.log(lay)
            // }

            

            // // ba.name === "Retouch Notes" && layer.isGroup
            // console.log(retouchNotesGroup, "retouch group")
            // if(retouchNotesGroup){

                
            //     // await retouchNotesGroup.addChild(retouchNotesGroup, { position: 'front' })
            // }

            // // const selectLayers = oldActiveDocumentName.activeLayers;
            // // const SelectedLayer = selectLayers[0];
            // // await SelectedLayer.moveAbove(oldActiveDocumentName.layerTree[0]);


            // require("photoshop").action.batchPlay(
            //     [{
            //       "_obj": "select",
            //       "_target": [{
            //         "_ref": "layer",
            //         "_id": require('photoshop').app.activeDocument.layers[0]._id
            //       }],
            //     }], {});
            // await batchPlay([
            //     {
            //         "_obj": "move",
            //         "_target": [
            //             {
            //                 "_ref": "group",
            //                 "_name": "Retouch Notes"
            //             }
            //         ],
            //         "to": {
            //             "_ref": "layer",
            //             "_index": 0
            //         },
            //         "adjustment": true
            //     }
            // ], {});

            // await runModalFunction();


            await actionCommands()
            await app.activeDocument.save()
            await app.activeDocument.close()
       



        } catch (e) {
            console.error(e);
        }
    // }, { "commandName": "SecondModalContext" });
}

function appendText(msg) {
    const errorMessage = document.getElementById('layers');
    errorMessage.textContent = msg;
}





// processRetouchNotes();

