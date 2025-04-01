import { app, core, action } from "photoshop";

async function colourMatch() {
  await core.executeAsModal(async () => {

    const activeDoc = app.activeDocument;
    const matchingDocs = app.documents.filter(doc => 
      doc.name.slice(0, 9) === activeDoc.name.slice(0, 9)
    );
    console.log(matchingDocs)

    const ccGroup = activeDoc.layers.find(layer => {
      return layer.kind === "group" && layer.name === "CC";
    });
    if (!ccGroup) {
        core.showAlert("Missing CC Group");
      return;
    }


    for (const doc of matchingDocs) {
      
      if (doc._id === activeDoc._id) continue; // Skip the remaining operations as this is the active document 

      // does it have a group
      const hasCC = doc.layers.some(layer => 
        layer.kind === "group" && layer.name === "CC"
      );
      if (hasCC) continue // Skip the remaining operations as this document already has a CC group
      
      // Store cc group from activedocument 
      await action.batchPlay([
        {
          _obj: "select",
          _target: [{ _ref: "layer", _id: ccGroup.id }],
          makeVisible: false,
          _options: { dialogOptions: "dontDisplay" },
        },
      ], {});
      
      // Duplicated cc group from active doc to the current for loop element 
      await action.batchPlay([
        {
          _obj: "duplicate",
          _target: [
            {
              _ref: "layer",
              _enum: "ordinal",
              _value: "targetEnum",
            },
          ],
          to: {
            _ref: "document",
            _id: doc._id,
          },
          _options: { dialogOptions: "dontDisplay" },
        },
      ], {});

      
    }
  }, { commandName: "Colour Correction Transfer" });
}

export default colourMatch;
