[Home](./README.md)
# User Metric Plugin

## Aim

The User Metric Plugin is designed to track and optimize productivity in Photoshop. It monitors selected folders, tracks file progress, and provides real-time updates on task completion. Planned features include folder filtering, per-file time tracking, and automated tally updates. By leveraging event listeners and file management tools, the plugin will enable efficient workflow monitoring, helping users meet KPIs and maintain organized outputs.

## Plugin Planning and Pseudocode

### Folder, file and target selection:

* Select the folder to watch 
    * Check folder has been selected 
        * If not plugin options disabled
        * If yes plugin options enabled 
            * Warn if folder is empty and disable run/watch button
* Filter contents of folder option (Optional)
    * Define the file type (Optional)
    * Filter by keywords? (Optional)
* Option to monitor how much time you spend per file (Optional)
    * Option to set a time limit per file (kpi target) (Optional)
* Click Run watch ()
    * If folder missing images disable Run and alert user to move files into the folder before running 
    * Clicking run creates a list of files to do/snap shot 
        * Creates an object:
            * Folder Path
            * Folder Contents 
                * Root files
                * Done files (only if exists)
                    * If done folder exists option provided to not include what’s currently in the done folder, by moving files into a subfolder 
            * Date created
* Running the tracker will initialise a event listener 
    * https://forums.creativeclouddeveloper.com/t/how-can-i-detect-when-activedocument-changed/2681/6
```
require('photoshop').action.addNotificationListener([
        { event: "select" },
        { event: "open" },
        { event: "close" }
], this.managePanelState);

```

### Progress Tracker Display:

* Display mode minimises the folder set-up etc 
* Display mode brings up a progress tracker listing
    * Display number of completed files
    * Display number of remaining files  
    * Display average time per file (Optional)
    * Track your time per against kpi target (Optional)
* Pause button 
* Update folder (Optional)


### Image monitoring:

Image Monitoring:
* When a file is active:
    * Immediately apply the debounce event listener to delay the timing of file tracking.
        * The debounce delay is set to 3 seconds (or your chosen threshold).
        * If the active document remains the same after the debounce period:
            * Begin timing for the file (the user is likely focusing on this document).
        * If the active document changes during the debounce period:
            * Reset the debounce timer and check again after the next focus change.
            * Repeat the check until the user settles on a document for the full debounce period.
    * If the active image doesn’t have an object:
        * Check the snapshot for the file.
            * If the file doesn’t exist in the snapshot:
                * Run a snapshot update and check if the file exists.
                    * If the file exists, move on.
                    * If the file doesn’t exist, do not create an object (the file won’t be monitored, it may be unrelated).
                    * Notify the user: "File not listed in monitored folder snapshot. Ignoring."
    * If the file is listed in the snapshot but no object exists:
        * Create the object with the following properties:
            * Done Status
            * isActive
            * Filename
            * File Path
            * Time opened in minutes
    * If the file is listed in the snapshot and an object exists:
        * The debounce ensures that only after the user has settled on the document (i.e., after 3 seconds of continuous focus), will tracking start.
        * Once the active document is consistent for the debounce period, begin timing and update the object’s properties.






### Updating tally:

* Done button moves open file into a done folder 
    * Check done folder exists 
        * if not create one 
        * if yes move file 
* Moving files triggers folder recount 
    * Take a snap shot of root folder and done folder each time 
    * Compare previous snap shot against recent
    * Update tally if changes occur 
        * Revert option 
        * Restore option 
        * Reset to beginning 
* Folder recount updates tally
    * Displays an updated tally 
        * Remaining vs Total 
        * Average time taken per image 
