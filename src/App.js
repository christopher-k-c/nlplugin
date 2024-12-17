import "./style.css";
import arr from "./data/buttonData";

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
