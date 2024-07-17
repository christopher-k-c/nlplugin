import Button from "./components/Buttons";
import "./style.css";
import arr from "./data/buttonData"
import Dropdown from "./components/Dropdown";

const App = () => {

  return (

    <>

      {arr.map((el) => (

        <Button key={el.id} onClick={el.func}>
          {el.name}
        </Button>  
          
      ))}


      {/* <sp-field-label for="picker-m" size="m">
            Selection type:
      </sp-field-label> */}

      {/* <sp-picker id="picker-m" size="m" label="Selection type" value="">
      
        {arr.map((dropdownOption) => (
          dropdownOption.type === "batch" 
          ? 
          <Dropdown key={dropdownOption.id}>{dropdownOption.name}</Dropdown> 
          : null
        ))}

      </sp-picker> */}

    </>

  );

};

export default App;

