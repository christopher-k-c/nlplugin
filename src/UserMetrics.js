import React, { useState, useEffect } from 'react';
import * as support from './functionality/collector';
// import styles from './css/UserMetrics.modules.css'

const UserMetrics = () => {
  const [folderDataList, setFolderDataList] = useState([]); // To store the list of folder data objects

  // Load all folder data from localStorage on component mount
  useEffect(() => {
    const loadAllFolderData = () => {
      const keys = Object.keys(localStorage); // Get all keys in localStorage
      const allData = keys.map((key) => {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : null;
      }).filter(Boolean); // Filter out null values
      setFolderDataList(allData); // Update the state with all data
    };

    loadAllFolderData(); // Call the function to load the data when component mounts
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle adding the path when the button is clicked
  const handleAddPath = async () => {
    await support.userMetrics(); // Call userMetrics to save the data to localStorage
    // After saving, load all the folder data from localStorage
    const keys = Object.keys(localStorage);
    const allData = keys.map((key) => {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : null;
    }).filter(Boolean); 
    setFolderDataList(allData); // Update the state
  };

  // Handle removing a folder data entry
  const handleRemove = (folderName) => {
    localStorage.removeItem(folderName); // Remove item from localStorage
    // After removing, reload the folder data from localStorage
    const keys = Object.keys(localStorage);
    const allData = keys.map((key) => {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : null;
    }).filter(Boolean);
    setFolderDataList(allData); // Update the state to remove the item
  };

  return (
    <>
      <h3>User Metrics</h3>
      
      <sp-action-button onClick={handleAddPath}>Add Path</sp-action-button>

      {/* Display folder data */}
      {/* {folderDataList.length > 0 ? (
        folderDataList.map((folderData, index) => (
          <div key={index}>
            <p><strong>Hello: </strong>{folderData.hello}</p>
            <p><strong>Folder: </strong>{folderData.folderName}</p>
            <p><strong>Path: </strong>{folderData.path}</p>
            <p><strong>Unedited Images:</strong></p>
            <ul>
              {folderData.uneditedImages.map((image, i) => (
                <li key={i}>{image}</li>
              ))}
            </ul>
            
            <sp-action-button onClick={() => handleRemove(folderData.folderName)}>Remove</sp-action-button>
            <sp-action-button>Update</sp-action-button>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )} */}

     
    </>
  );
};

export default UserMetrics;