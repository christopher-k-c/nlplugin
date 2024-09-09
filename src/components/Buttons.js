// // import { useState, useEffect } from "react";
// import {app} from "photoshop"

// const Button = ({ children, onClick, disabled}) => {



  
//   return (
//     <sp-action-button onClick={onClick} disabled={disabled}>
//       {children}
//     </sp-action-button>
//   );
// };

// export default Button;


import { app } from "photoshop";

const Button = ({ children, onClick, disabled }) => {
  
  return (
    <sp-action-button onClick={onClick} disabled={disabled}>
      {children}
    </sp-action-button>
  );
};

export default Button;









  // const [isDisabled, setIsDisabled] = useState(true);

  // // Effect to check for activeDocument and update state
  // useEffect(() => {
  //   const checkActiveDocument = () => {
  //     setIsDisabled(!app.activeDocument);
  //   };

  //   // Initial check
  //   checkActiveDocument();

  //   // Optional: Set up an event listener if Photoshop supports events for document changes
  //   // app.event.on('documentChange', checkActiveDocument);

  //   return () => {
  //     // Optional: Clean up the event listener if set up
  //     // app.event.off('documentChange', checkActiveDocument);
  //   };
  // }, []);















  // const ToggleButton = () => {

    


  //   return (
  //     <sp-action-button style={{color: isPressed ? "#0AF" : "var(--uxp-host-text-color)"}} onClick={handler}>
  //       {isPressed ? "ON" : "OFF"}
  //     </sp-action-button>
  //   )

  // }

    // if(app.activeDocument){
  //   setIsPressed(!isPressed)
  // }


  // useEffect(() => {
  //   if (app.activeDocument) {
  //     setbuttonState(false);
  //   }
  // }, []);