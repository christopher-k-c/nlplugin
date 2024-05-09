# Introduction

An Adobe Photoshop Plugin for the Newlook retouch team. An all-encompassing automation solution that aims to centralise all actions, scripts and plugins.

## To-do

### Scripts/Solutions

#### Key Functionality 
- [ ] Build Retouch Layer Structure Script
- [x] Retouch Notes Script
- [ ] Swatches Script 
- [ ] Colour Correction Script
- [ ] Frequency Separation Script
- [ ] Dust and scratches Script
- [ ] Multipack Template Script

#### Uploading
- [ ] Upload Colour Correction file
- [ ] Upload Final Images 

#### Nice-to-haves
- [ ] Moire Reduction (Access camera raw)
- [ ] Acccess to guides
- [ ] Notification system

### Modular programming to-do

- [ ] main.js to handle button eventlisteners 
- [ ] handler.js  to contain the handler function for the button event, using a switch case to target correct function on click event 
- [ ] An organized folder structure containing specific and non-specific/Reusable blocks of code


## Documentation

### Set-up

Important to paste the following into the manifest.json otherwise read/writing to the local file system is not possible, place key/pair value below host key/[air value]:

```
  "requiredPermissions": {
    "localFileSystem": "fullAccess"
  },  

```

Developer mode needs to be enabled inside your Photoshop Application, Photoshop > Settings > Plugins:

</br>

![Developer Mode Enabled](/assets/documention/dev.png)

### Packaging and installing a plugin 

1. To save a plugin, open Adobes UXP Developer tools, locate the specific plugin in the menu and click on its ellipsis:

</br>

![Save/Package a plugin](/assets/documention/package.png)

</br>

2. A folder dialog box will appear, select a location for you packaged plugin to be saved
3. The plugin will now be available for photoshop installation 

## Tech Stack

* Adobe Photoshop & UXP API
* Javascript, HTML & CSS
* UXP Developer Tool
* Visual Studio Code
* Aim to convert to the react template and tailwindcss once I understand adobes plugin fundamentals/it runs smoothly with the quick-layers starter template 


* Read more about creating and debugging plugins using the UDT application [here](https://developer.adobe.com/photoshop/uxp/2022/guides/devtool/udt-walkthrough/). 
* We build on this starter template and show you how to [edit a document](https://developer.adobe.com/photoshop/uxp/2022/guides/getting-started/editing-the-document/) and [write a file](https://developer.adobe.com/photoshop/uxp/2022/guides/getting-started/writing-a-file/) using UXP. 
