import Button from "./components/Buttons";
import "./style.css";
import arr from "./data/buttonData";
import { app } from "photoshop";
import { useState, useEffect } from "react";

const App = () => {
  // const [isDisabled, setIsDisabled] = useState(true);
  // console.log("Var that active doucment will  change, should be true: ", isDisabled)

  // // // Function to check for activeDocument and update state
  // const checkActiveDocument = () => {
  //   const activeDoc = app.activeDocument;
  //   console.log("Active document should be true:", activeDoc);
  //   console.log("Active document should be false: ", !activeDoc)
  //   setIsDisabled(!activeDoc);
  //   console.log("Check of active Document: ", !activeDoc)
  // }; 

  // // Effect to check for activeDocument once when the component mounts
  // useEffect(() => {
    
  //   console.log("Inside useeffect isDisabled should be true:")
  //   checkActiveDocument();
  //   console.log("Inside useeffect isDisabled should be false:")
  //   // Optional: Set up an event listener if Photoshop supports events for document changes
  //   // app.event.on('documentChange', checkActiveDocument);

  //   return () => {
  //     // Optional: Clean up the event listener if set up
  //     // app.event.off('documentChange', checkActiveDocument);
  //   };
  // }, []);

  return (
    <>
      {arr.map((el) => (
        <Button key={el.id} onClick={el.func} >
          {el.name}
          
        </Button>
      ))}
    </>
  );
};


export default App;



