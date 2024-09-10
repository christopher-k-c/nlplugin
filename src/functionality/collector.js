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
import buildLayers from "./specific/buildLayers/layerStructure"
import freqSep from "./specific/freqSep/freqSep"
import findNotes from "./specific/noteCheck/noteCheck"
import startUp from "./specific/startUp/startUp"
import swatchCheck from "./specific/swatchCheck/swatchCheck"
import importGlitter from "./specific/glitterFiles/importGlitter"
import upload from "./specific/upload/upload"
import batchUpload from "./specific/batchUpload/batchUpload"
import batchStartUp from "./specific/batchStartUp/batchStartUp"
import batchUploadSpecific from "./specific/batchUpload/batchUploadSpecific"

export {
    // Common Exports
    checkLayers,
    findFile,
    findFolder,
    openFile,
    placeImage,
    resizeDocument,
    setWorkingLayer,

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
    batchUploadSpecific
}
