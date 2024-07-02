import Button from "./components/Buttons";
import "./style.css";
import arr from "./data/buttonData"

const App = () => {

  return (

    <>

      {arr.map((el) => (

        <Button key={el.id} onClick={el.func}>
          {el.name}
        </Button>  
          
      ))}

    </>

  );

};

export default App;

