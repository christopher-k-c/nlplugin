# Introduction

An Adobe Photoshop Plugin for the Newlook retouch team. An all-encompassing automation solution that aims to centralise all actions, scripts and plugins.

![Plugin](/assets/documention/plugin.png)


#### Plugin Features 
- [x] Layer Structure Composite Function
- [x] Retouch Notes Script
- [x] Swatches Script 
- [x] Colour Correction Script
- [x] Frequency Separation Script
- [x] Multipack Template Script
- [x] Upload Colour Correction file
- [x] Upload Final Images 
- [x] Batch Start-up
- [x] Batch Upload
- [x] Basic Responsive User Interface 

#### In-Progress
- [ ] User Metrics i.e. Retouching KPIs and daily output 
- [ ] Running unit tests with Mocha 
- [ ] Apply color corrections to files sharing the same SKU
- [ ] Moire Reduction (Access camera raw)
- [ ] Acccess to team guides
- [ ] Notification system (scraping dam for sku metadata)

#### Long Term Goals 

- [ ] Code review and best-practices: 
    * Error handling needs a review/strategy  
    * Re-write/breakdown large code blocks into more resuseable functions i.e helper functions 
    * Ensure comments are clear and frequent  




## Documentation

For development:
```
npm run watch 
```
For Production:
```
npm run prod 
```
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

* Adobe Photoshop API
* Adobe UXP API
* React, 
* ES6 Javascript (Not using common JS gives issues when compiling for production) 
* CSS Modular (Might implement tailwindcss)
* Node
* Webpack
* Mocha 
* UXP Developer Tool
* Visual Studio Code







* Read more about creating and debugging plugins using the UDT application [here](https://developer.adobe.com/photoshop/uxp/2022/guides/devtool/udt-walkthrough/). 
* We build on this starter template and show you how to [edit a document](https://developer.adobe.com/photoshop/uxp/2022/guides/getting-started/editing-the-document/) and [write a file](https://developer.adobe.com/photoshop/uxp/2022/guides/getting-started/writing-a-file/) using UXP. 
