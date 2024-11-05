// import Button from "./components/Buttons";
import "./style.css";
import arr from "./data/buttonData";
import { app } from "photoshop";
import { useState, useEffect } from "react";

const App = () => {

  return (
    
    <>

      {arr.map((el) => (

        <sp-action-button key={el.id} onClick={el.func} size="s"  >

         {el.name}
          
        </sp-action-button>
      
      ))}



      <div className="version">

      {/* <div>v: 1.1.1</div> */}

      </div>

    </>
  );
};


export default App;




































// const App = () => {

//   return (
    
//     <>

//       {arr.map((el) => (

//         <Button key={el.id} onClick={el.func}>
          
//           {el.name}
          
//         </Button>
//       ))}

//     </>
//   );
// };


// export default App;


