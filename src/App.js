import styles from "./css/App.modules.css";
import arr from "./data/buttonData";
import pkg from '../package.json'

const App = () => {

  const renderButtonsByType = (type) =>
    arr
      .filter((el) => el.type === type)
      .map((el) => (
        <sp-action-button 
          key={el.id} 
          onClick={el.func} 
          size="s"
          class={styles.spActionButton} 
          style={{
            backgroundColor: 
              el.name.includes("Upload") ? "black"
              :
              undefined,
          }}
          >
        {el.name}

        </sp-action-button>
      ));

  return (
    
    <>


      <div className="single-buttons">
        <h4>Single Actions</h4>
        {/* <hr/> */}
        {renderButtonsByType("single")}
      </div>
    
      <div className="batch-buttons">
        <h4 className={styles.h4}>Batch Actions</h4>
        {renderButtonsByType("Batch")}
      </div>
    
      <div className={styles.version}>
        <div>v: {pkg.version}</div>
      </div>


    </>
  );
};


export default App;