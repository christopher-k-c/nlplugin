// Import Common Functions 
// import batchProcess from "./common/batch"
import checkLayers from "./common/checkLayer"
import findFile from "./common/findFile"
import findFolder from "./common/findFolder"
import openFile from "./common/openFile"
import placeImage from "./common/placeImage"
import resizeDocument from "./common/resize"
import setWorkingLayer from "./common/setLayer"

// Specifc Imports
import buildLayers from "./specific/layerStructure"
import freqSep from "./specific/freqSep"
import findNotes from "./specific/noteCheck"
import startUp from "./specific/startUp"
import swatchCheck from "./specific/swatchCheck"
import importGlitter from "./specific/importGlitter"
import upload from "./specific/upload"
import batchUpload from "./specific/batchUpload"
import batchStartUp from "./specific/batchStartUp"
import batchUploadSpecific from "./specific/batchUploadSpecific"
import docCheck from "./common/docCheck"
import layeredUpload from "./specific/layeredUpload"

export {
    // Common Exports
    checkLayers,
    findFile,
    findFolder,
    openFile,
    placeImage,
    resizeDocument,
    setWorkingLayer,
    docCheck,

    // Specifc Exports
    buildLayers, 
    freqSep,
    findNotes,
    startUp,
    swatchCheck,
    importGlitter,
    upload,
    batchUpload,
    batchStartUp,
    batchUploadSpecific,
    layeredUpload
}
