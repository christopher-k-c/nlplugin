[Home](./readMeIndex.md)
# User Metric Plugin

## Plugin Planning and Pseudocode

### Folder, file and target selection:

* Select the folder to watch 
    * Check folder has been selected 
        * If not plugin options disabled
        * If yes plugin options enabled 
            * Warn if folder is empty  
* Filter contents of folder option (Optional)
    * Define the file type (Optional)
    * Filter by keywords? (Optional)
* Option to monitor how much time you spend per file (Optional)
    * Option to set a time limit per file (kpi target) (Optional)
* Click Run watch 
    * If folder missing images cancel Run and alert user to move files into the folder before running 
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

* When a file is opened
    * If open image doesn’t have an object check snap shot for file 
        * If file does not exist in snap shot do not create object (file will not be monitored)
        * If file is listed in snap shot create object and begin to time 
            * Object could contain: 
                * Done Status 
                * Filename
                * File Path 
                * Time opened in minutes 
    * If object exists of open image begin to time (while active document run timer)
    * If no longer active document update object, how do I achieve this???????


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
