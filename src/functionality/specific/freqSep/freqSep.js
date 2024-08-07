import { app, core, action } from 'photoshop';
import * as support from "../../collector"

async function merge() {
    try {
        await action.batchPlay(
            [
                {
                    _obj: "mergeLayersNew",
                    _options: {
                        dialogOptions: "dontDisplay"
                    }
                }
            ],
            {}
        );
    } catch (e) {
        console.log(e);
    }
}

async function gaussianBlur() {
    await action.batchPlay(
        [
            {
                _obj: "gaussianBlur",
                radius: {
                    _unit: "pixelsUnit",
                    _value: 10
                },
                _options: {
                    dialogOptions: "display"
                }
            }
        ],
        {}
    );
}

async function applyImageSettings(low, high) {
    await action.batchPlay(
        [
            {
                _obj: "applyImageEvent",
                with: {
                    _obj: "calculation",
                    to: {
                        _ref: [
                            { _ref: "channel", _enum: "channel", _value: "RGB" },
                            { _ref: "layer", _name: low.name }
                        ]
                    },
                    calculation: { _enum: "calculationType", _value: "subtract" },
                    scale: 2,
                    offset: 128
                },
                _target: [{ _ref: "layer", _name: high.name }],
                _options: { dialogOptions: "dontDisplay" }
            }
        ],
        {}
    );
}

async function blendingModeApplication() {
    await action.batchPlay(
        [
            {
                _obj: "set",
                _target: [{ _ref: "layer", _enum: "ordinal", _value: "targetEnum" }],
                to: {
                    _obj: "layer",
                    mode: { _enum: "blendMode", _value: "linearLight" }
                },
                _options: { dialogOptions: "dontDisplay" }
            }
        ],
        {}
    );
}

async function freqSep() {
    await core.executeAsModal(async (executionContext, descriptor) => {
        try {
            const doc = app.activeDocument;

            let layerStatus = await support.checkLayers()
            if(!layerStatus){
                return false
            }

            // Deselect All Layers
            let allLayers = doc.layers;
            for (const deselect of allLayers) {
                deselect.selected = false;
            }

            // Duplicate visible layers and select them
            let duplicatedLayers = [];
            for (const layer of allLayers) {
                if (layer.visible === true) {
                    let duplicatedEl = await layer.duplicate();
                    duplicatedLayers.push(duplicatedEl);
                }
            }

            for (const layer of duplicatedLayers) {
                layer.selected = true;
            }

            // Merge Selected
            await merge();
            let low = app.activeDocument.activeLayers[0];
            low.name = "Low";

            // Duplicate low layer and apply Gaussian Blur
            let high = await low.duplicate(undefined, undefined, "High");
            high.visible = false;
            high.selected = false;
            low.selected = true;
            await gaussianBlur();
            low.selected = false;
            high.visible = true;
            high.selected = true;

            // Apply Image
            await applyImageSettings(low, high);

            // Set blending mode
            await blendingModeApplication();


                        // // Create group and move noteLayer into group
            const containerGroup =  await doc.createLayerGroup({
                  name: "Frequency Separation", visible: true, fromLayers:[low, high]
            })

        } catch (e) {
            console.log(e);
        }
    });
}

export default freqSep;
