[Home](./readMeIndex.md)
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


